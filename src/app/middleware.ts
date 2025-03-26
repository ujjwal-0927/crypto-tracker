import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key_here';

export function middleware(request: NextRequest) {
  // Get the token from the request headers
  const token = request.headers.get('authorization')?.split(' ')[1];

  // If no token is present, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
}