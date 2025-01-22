import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Allow other paths to proceed normally
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: '/',
};
