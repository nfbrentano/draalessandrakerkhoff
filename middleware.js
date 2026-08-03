import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/fisioterapia-do-sono' || pathname === '/fisioterapia-do-sono/') {
    const url = request.nextUrl.clone();
    url.pathname = '/apneia-e-ronco';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/fisioterapia-do-sono', '/fisioterapia-do-sono/'],
};
