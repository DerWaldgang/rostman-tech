import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'session-cookie';

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? 'secret-code',
);

export async function createSessionToken(username: string): Promise<string> {
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { username: payload.sub as string };
  } catch {
    return null;
  }
}
