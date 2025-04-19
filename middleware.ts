import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This middleware protects routes that require authentication
export default authMiddleware({
  // Routes that can be accessed without authentication
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api/webhook"],

  // Optional callback for custom logic after Clerk's auth check
  afterAuth(auth, req) {
    // If the user is authenticated or on a public route, proceed normally
    if (auth.userId || auth.isPublicRoute) {
      return NextResponse.next();
    }

    // Redirect to sign-in if attempting to access a private route
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  },
});

export const config = {
  matcher: [
    // Skip static files and public files
    "/((?!_next|public|.*\\.(.*)$).*)",
    // Run for API routes
    "/(api|trpc)(.*)",
  ],
};
