import { type NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const token = request.nextauth.token;
    const isApi = request.nextUrl.pathname.startsWith("/api");

    if (token) return NextResponse.next();
    
    if (isApi) return NextResponse.json({message: 'Unauthenticated.'}, {status: 401});

    return NextResponse.redirect(new URL('/auth/signin', request.url));
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
)

export const config = { 
  matcher: [
    "/api/:path*",
    "/products/:path*"
  ],
}
