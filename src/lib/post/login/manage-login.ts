import { JWTPayload } from './../../../../node_modules/jose/dist/types/types.d';
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from 'jose'
import { string } from "zod";

const jwtSecreyKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecreyKey);

const loginExpirationSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpirationString = process.env.LOGIN_EXPIRATION_STRING || '1d';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

interface MyJwtPayload extends JWTPayload {
    username: string,
    expiresAt: Date
}

export async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    const base64 = Buffer.from(hash).toString('base64');
    return base64;
}

export async function verifyPassword(password: string, base64Hash: string) {
    const hash = Buffer.from(base64Hash, 'base64').toString('utf8');
    return bcrypt.compare(password, hash);
}

export async function createLoginSession(username: string) {
    const expiresAt = new Date(Date.now() + loginExpirationSeconds * 1000);
    const loginSession = await signJwt({username, expiresAt});
    const cookieStore = await cookies();

    cookieStore.set(loginCookieName, loginSession, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: expiresAt
    })
}

export async function deleteLoginSession() {
    const cookieStore = await cookies();
    cookieStore.set(loginCookieName, "", { expires: new Date(0) });
    cookieStore.delete(loginCookieName);
}

export async function signJwt(jwtPayload: MyJwtPayload) {
    return new SignJWT(jwtPayload)
    .setProtectedHeader({ 
        alg: 'HS256', typ: 'JWT'
    })
    .setIssuedAt()
    .setExpirationTime(loginExpirationString)
    .sign(jwtEncodedKey);
}

(async () => {
    const hashedPassword = await hashPassword('12345678');
    console.log(hashedPassword);
})();