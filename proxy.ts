import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';
import { checkServerSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile','/notes'];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        const data = await checkServerSession();
        const setCookie = data.headers['set-cookie'];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parseSetCookie(cookieStr);
            
            if (parsed.value) {
		      cookieStore.set(parsed.name, parsed.value, parsed);
			}
          }
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile','/notes/:path*'],
};