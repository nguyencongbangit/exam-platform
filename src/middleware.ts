import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/student') && token?.role !== 'STUDENT' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (pathname.startsWith('/teacher') && token?.role !== 'TEACHER' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (pathname.startsWith('/parent') && token?.role !== 'PARENT' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        const protectedPaths = ['/student', '/teacher', '/parent', '/admin'];
        if (protectedPaths.some((p) => pathname.startsWith(p))) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*', '/parent/:path*', '/admin/:path*'],
};
