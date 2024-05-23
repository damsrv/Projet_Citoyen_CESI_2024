// src/middleware.ts

import { NextRequest } from "next/server";

export { default } from "next-auth/middleware"

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ["/api"],
};

