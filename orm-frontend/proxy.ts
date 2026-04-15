import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/signup",
  "/signup/verify-otp",
  "/partner/login",
  "/partner/signin",
  "/blog",
  "/courses",
  "/interview",
  "/jobs",
  "/partner",
];

const IGNORED_PATHS = [
  "/_next",
  "/static",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
];

function isPublicPath(pathname: string) {
  if (IGNORED_PATHS.some((ignored) => pathname.startsWith(ignored))) {
    return true;
  }

  return PUBLIC_PATHS.some(
    (publicPath) => pathname === publicPath || pathname.startsWith(`${publicPath}/`)
  );
}

function getRefreshToken(request: NextRequest): boolean {
  return (
    request.cookies.get("refreshToken")?.value !== undefined &&
    request.cookies.get("refreshToken")?.value !== ""
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const refreshToken = getRefreshToken(request);
  if (!refreshToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|static|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};

