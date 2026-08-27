import { env } from 'cloudflare:workers';

export type RoametricEnv = {
  DB?: D1Database;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  SITE_URL?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
  RESEND_API_KEY?: string;
  ORDER_FROM_EMAIL?: string;
  ORDER_REPLY_TO?: string;
};

export function runtimeEnv(): RoametricEnv {
  return env as unknown as RoametricEnv;
}

export function runtimeValue(key: Exclude<keyof RoametricEnv, 'DB'>) {
  return runtimeEnv()[key] || process.env[key];
}
