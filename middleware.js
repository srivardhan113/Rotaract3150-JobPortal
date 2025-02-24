import { NextResponse } from 'next/server'

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get('authToken')?.value;
  const userType = request.cookies.get('type')?.value;
  const userId = request.cookies.get('userId')?.value;

  // Quick check before making network request
  if (!authToken || !userId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 5 second timeout

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/protected`, {
      method: 'POST',
      headers: {
        'Authorization': authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
      signal: controller.signal,
      // Add cache control
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // User type validation
    if (path.includes('/candidates-dashboard') && userType !== 'Applicant') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (path.includes('/employers-dashboard') && userType !== 'Company') {
      return NextResponse.redirect(new URL('/', request.url));
    }

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Auth error:', error);
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Cache the successful response
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  return response;
}

export const config = {
  matcher: [
    '/candidates-dashboard/:path*',
    '/employers-dashboard/:path*',
    '/job-single/:path*',
    '/candidate-single/:path*'
  ]
};