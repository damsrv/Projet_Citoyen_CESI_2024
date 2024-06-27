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
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
);

export const config = {
    matcher: [
        "/api/offers",
        "/api/offers/:path*",
        "/api/delete-account",
        "/api/delete-account/:path*",
        "/api/emails",
        "/api/emails/:path*",
        "/api/messages",
        "/api/messages/:path*",
        "/api/offer-student",
        "/api/offer-student/:path*",
        "/api/password",
        "/api/password/:path*",
        "/api/rooms",
        "/api/rooms/:path*",
        "/api/saved-offers",
        "/api/saved-offers/:path*",
        "/api/uploads",
        "/api/uploads/:path*",
        "/api/users",
        "/api/users/:path*",
        "/administration/:path*",
        "/mon-compte/:path*",
        "/offres-mentorat",
        "/offres-mentorat/:path*",
        "/mon-compte/:path*",
        "/profil/:path*",
    ],
};
