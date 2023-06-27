import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const allCookies = req.cookies;
  console.log('all cookies = ', allCookies);
  return NextResponse.next();
}
