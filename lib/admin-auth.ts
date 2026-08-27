import { runtimeEnv, runtimeValue } from './runtime';

export const ADMIN_COOKIE = 'roametric_admin';
const SESSION_SECONDS = 12 * 60 * 60;

function equal(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return result === 0;
}

async function signature(value: string) {
  const secret = runtimeValue('ADMIN_SESSION_SECRET');
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET muss mindestens 32 Zeichen lang sein.');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function adminIsConfigured() {
  return Boolean(runtimeValue('ADMIN_PASSWORD') && (runtimeValue('ADMIN_SESSION_SECRET')?.length || 0) >= 32);
}

export function validateAdminPassword(password: string) {
  const expected = runtimeValue('ADMIN_PASSWORD');
  if (!expected || expected.length < 12) throw new Error('ADMIN_PASSWORD muss mindestens 12 Zeichen lang sein.');
  return equal(password, expected);
}

export async function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const value = String(expires);
  return `${value}.${await signature(value)}`;
}

export async function verifyAdminSession(token?: string | null) {
  if (!token) return false;
  const [expires, provided, extra] = token.split('.');
  if (!expires || !provided || extra || !/^\d+$/.test(expires) || Number(expires) < Date.now() / 1000) return false;
  try { return equal(provided, await signature(expires)); } catch { return false; }
}

export function cookieFromHeader(header: string | null, name = ADMIN_COOKIE) {
  const entry = header?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
}

export async function requestIsAdmin(request: Request) {
  return verifyAdminSession(cookieFromHeader(request.headers.get('cookie')));
}

export const adminSessionSeconds = SESSION_SECONDS;

type LoginAttempt = { key: string; attempts: number; window_started_at: number; blocked_until: number | null };
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;

async function loginKey(request: Request) {
  const forwarded = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(forwarded));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function attemptsDatabase() {
  const db = runtimeEnv().DB;
  if (!db) throw new Error('Die Admin-Datenbank ist noch nicht konfiguriert.');
  await db.prepare(`CREATE TABLE IF NOT EXISTS admin_login_attempts (
    key TEXT PRIMARY KEY NOT NULL,
    attempts INTEGER DEFAULT 0 NOT NULL,
    window_started_at INTEGER NOT NULL,
    blocked_until INTEGER
  )`).run();
  return db;
}

export function requestHasTrustedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

export async function loginRetryAfter(request: Request) {
  const db = await attemptsDatabase();
  const attempt = await db.prepare('SELECT * FROM admin_login_attempts WHERE key = ? LIMIT 1').bind(await loginKey(request)).first<LoginAttempt>();
  if (!attempt?.blocked_until || attempt.blocked_until <= Date.now()) return 0;
  return Math.ceil((attempt.blocked_until - Date.now()) / 1000);
}

export async function recordFailedLogin(request: Request) {
  const db = await attemptsDatabase();
  const key = await loginKey(request);
  const now = Date.now();
  const current = await db.prepare('SELECT * FROM admin_login_attempts WHERE key = ? LIMIT 1').bind(key).first<LoginAttempt>();
  const attempts = !current || now - current.window_started_at >= LOGIN_WINDOW_MS ? 1 : current.attempts + 1;
  const windowStarted = !current || now - current.window_started_at >= LOGIN_WINDOW_MS ? now : current.window_started_at;
  const blockedUntil = attempts >= MAX_LOGIN_ATTEMPTS ? now + LOGIN_WINDOW_MS : null;
  await db.prepare(`INSERT INTO admin_login_attempts (key, attempts, window_started_at, blocked_until)
    VALUES (?, ?, ?, ?) ON CONFLICT(key) DO UPDATE SET attempts = excluded.attempts,
    window_started_at = excluded.window_started_at, blocked_until = excluded.blocked_until`)
    .bind(key, attempts, windowStarted, blockedUntil).run();
}

export async function clearFailedLogins(request: Request) {
  const db = await attemptsDatabase();
  await db.prepare('DELETE FROM admin_login_attempts WHERE key = ?').bind(await loginKey(request)).run();
}
