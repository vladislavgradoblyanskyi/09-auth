import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';

const privateRoutes = ['/profile','/notes'];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some((route) =>pathname.startsWith(route),);
  const isPublicRoute = publicRoutes.some((route) =>pathname.startsWith(route),);

  if (!accessToken && refreshToken) {
    try {
      const res = await checkServerSession();

      const newAccessToken = res?.data?.accessToken;
      const newRefreshToken = res?.data?.refreshToken;

      if (newAccessToken) {
        accessToken = newAccessToken;

        const response = NextResponse.next();

        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        if (newRefreshToken) {
          response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });
        }
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url));
        }

        return response;
      }
    } catch (e) {
      console.log(e);
    }
  }
  if (!accessToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*','/notes/:path*','/sign-in','/sign-up'],
};