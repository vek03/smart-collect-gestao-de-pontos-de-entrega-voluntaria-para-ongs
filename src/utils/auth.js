import { SignJWT, jwtVerify } from 'jose';

const STORAGE_KEY = 'auth_token';
const DEFAULT_EXP_MINUTES = 60;

function getSecretKey() {
  const secret = 'smart-collect-demo-secret';
  return new TextEncoder().encode(secret);
}

function toBase64Url(obj) {
  try {
    const json = typeof obj === 'string' ? obj : JSON.stringify(obj);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  } catch (err) {
    console.warn('Base64 encode failed', err);
    return '';
  }
}

function fromBase64Url(b64url) {
  try {
    const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
  } catch (err) {
    console.warn('Base64 decode failed', err);
    return null;
  }
}

export async function generateToken(payload, expiresInMinutes = DEFAULT_EXP_MINUTES) {
  try {
    const expSeconds = Math.floor(Date.now() / 1000) + expiresInMinutes * 60;
    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(expSeconds)
      .setIssuedAt()
      .sign(getSecretKey());
    return token;
  } catch {
    // Fallback: very simple unsigned token with exp in ms
    const header = { alg: 'none', typ: 'JWT' };
    const exp = Date.now() + expiresInMinutes * 60 * 1000;
    const fullPayload = { ...payload, exp };
    const headerPart = toBase64Url(header);
    const payloadPart = toBase64Url(fullPayload);
    const signaturePart = 'dummy';
    return `${headerPart}.${payloadPart}.${signaturePart}`;
  }
}

export function saveToken(token) {
  try {
    localStorage.setItem(STORAGE_KEY, token);
  } catch (err) {
    console.warn('Failed to save token', err);
  }
}

export function getToken() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to get token', err);
    return null;
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear token', err);
  }
}

export async function decodePayload(token) {
  if (!token) return null;
  // Try verify signed token first
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch {
    // Fallback to decode unsigned
    const parts = token.split('.');
    if (parts.length < 2) return null;
    return fromBase64Url(parts[1]);
  }
}

export async function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  // Try verify signed
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return !!payload;
  } catch {
    // Fallback: check exp in ms or seconds for unsigned fallback
    const parts = token.split('.');
    if (parts.length < 2) return false;
    const payload = fromBase64Url(parts[1]);
    if (!payload || !payload.exp) return false;
    const expMs = payload.exp > 1e12 ? payload.exp : payload.exp * 1000;
    return Date.now() < expMs;
  }
}

export function isAuthenticatedQuick() {
  const token = getToken();
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length < 2) return false;
  const payload = fromBase64Url(parts[1]);
  if (payload && payload.exp) {
    const expMs = payload.exp > 1e12 ? payload.exp : payload.exp * 1000;
    return Date.now() < expMs;
  }
  return false;
} 