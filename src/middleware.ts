// src/middleware.ts

import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const user = req.nextauth?.token?.user;
    const role = user?.roleId;
    const path = req.nextUrl.pathname;

    if (path.includes("/administration") && role !== 1) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

  },
)

export const config = { matcher: 
  [
    "/api/:path*",
    "/administration/:path*",
    "/mon-compte/:path*",
    "/offres-mentorat*",
    "/offres-mentorat/:path*",
    "/mon-compte/:path*",
    "/profil/:path*",
] }

