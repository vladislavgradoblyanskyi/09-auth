import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile','/notes'];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

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
          return NextResponse.redirect(new URL("/profile", request.url));
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
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile','/notes/:path*','/sign-in'],
};