import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Public routes
const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"])

// Admin routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const IsAdminUser = userId === process.env.ADMIN_USER_ID

  // Check if admin is accesing admin routes
  if (isAdminRoute(req) && !IsAdminUser) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Protect non public routes
  if (!isPublicRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
