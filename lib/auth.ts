import { SignJWT, jwtVerify } from 'jose';

const getSecret = () => {
  const secretStr = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
  return new TextEncoder().encode(secretStr);
};

export const AUTH_COOKIE = 'vv-auth-token';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function signToken(payload: { id: number; email: string }) {
  const secret = getSecret();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: number; email: string };
  } catch {
    return null;
  }
}
