import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
var jwt = require("jsonwebtoken");

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookie = request.headers.get("cookie");

  const tokenPattern = /(?<=spots\-user\-token\=)\S[^;]*/i;
  const refreshTokenPattern = /refresh\S[^;]*/i;
  const loggedInUserRoute =
    /\/((?=admin|owner|booking|transaksi|profile|riwayat-booking|booking-detail).*)/i;
  const authRoute = /\/((?=login|signup|auth).*)/i;

  const signedUserPath = path.match(loggedInUserRoute);
  const authPath = path.match(authRoute);

  let typeOfUser: string | undefined;

  if (cookie) {
    let token = cookie.match(tokenPattern) ?? null;

    if (token && token[0]) {
      let decodedToken = jwt.decode(token[0]);
      typeOfUser = decodedToken?.userType;
    }
  }

  // redirect main admin route
  if (request.nextUrl.pathname.endsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/penyewa", request.url));
  }

  // redirect admin
  if (typeOfUser === "ADMIN" && !path.startsWith("/admin") && !authPath) {
    return NextResponse.redirect(new URL("/admin/penyewa", request.url));
  }

  // redirent owner
  if (typeOfUser === "OWNER" && !path.startsWith("/owner") && !authPath) {
    return NextResponse.redirect(new URL("/owner", request.url));
  }

  // redirect tenant
  if (
    (path.startsWith("/admin") || path.startsWith("/owner")) &&
    typeOfUser === "TENANT"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // redirect unsigned user
  if (signedUserPath && !typeOfUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|lib|.*.png|.*.svg|.*.ico|.*.jpeg|.*.jpg|.*.ttf).*)",
  ],
};
