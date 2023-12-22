import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest){
  const authTokens = req.cookies.get("authTokens")?.value;

  if((req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/about')) && !authTokens){
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ["/admin(.*)", "/login", "/about(.*)"]
}