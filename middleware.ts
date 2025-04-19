import { authMiddleware } from "@clerk/nextjs";

// This middleware protects routes that require authentication
export default authMiddleware({
  // Routes that can be accessed without authentication
  publicRoutes: [
    "/", 
    "/sign-in",
    "/sign-up", 
    "/api/webhook"
  ],
});

// Configure matcher to catch all routes except public assets
// This is the recommended configuration from Clerk documentation
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
