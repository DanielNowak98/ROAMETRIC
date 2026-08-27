import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminSessionSeconds, clearFailedLogins, createAdminSession, loginRetryAfter, recordFailedLogin, requestHasTrustedOrigin, validateAdminPassword } from '../../../../lib/admin-auth';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    if (!requestHasTrustedOrigin(request)) return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 403 });
    const retryAfter = await loginRetryAfter(request);
    if (retryAfter) return NextResponse.json({ error: 'Zu viele Anmeldeversuche. Bitte später erneut versuchen.' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } });
    const body = await request.json() as { password?: unknown };
    if (typeof body.password !== 'string' || !validateAdminPassword(body.password)) {
      await recordFailedLogin(request);
      return NextResponse.json({ error: 'Das Kennwort ist nicht korrekt.' }, { status: 401 });
    }
    await clearFailedLogins(request);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, await createAdminSession(), {
      httpOnly: true,
      sameSite: 'strict',
      secure: new URL(request.url).protocol === 'https:',
      path: '/',
      maxAge: adminSessionSeconds,
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Die Anmeldung ist momentan nicht möglich.';
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  if (!requestHasTrustedOrigin(request)) return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, sameSite: 'strict', secure: new URL(request.url).protocol === 'https:', path: '/', maxAge: 0 });
  return response;
}
