import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/post/login/manage-login";

export async function middleware(req: NextRequest) {
    const isLoginPage = req.nextUrl.pathname.startsWith('/admin/login');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
    const isGetReq = req.method === 'GET';
    const shouldBeAuthenticated = isAdminPage && !isLoginPage;
    const shouldRedirect = shouldBeAuthenticated && isGetReq;

    if (!shouldRedirect) return NextResponse.next();

    const loginSession = req.cookies.get(process.env.LOGIN_COOKIE_NAME || 'loginSession')?.value;

    const isAuthenticated = await verifyJwt(loginSession);

    if (!isAuthenticated) {
        const loginUrl = new URL('/admin/login', req.url);
        return NextResponse.redirect(loginUrl);
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
}