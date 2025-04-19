"use client";
import Link from "next/link";
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  const { user, isLoaded } = useUser();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Resume Builder
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Home
              </Link>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/resume-builder"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Create Resume
                </Link>
              </SignedIn>
            </div>
          </div>

          <div className="flex items-center">
            <SignedIn>
              <div className="flex items-center space-x-4">
                {isLoaded && user && (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500 hidden md:inline">
                      {user.emailAddresses[0]?.emailAddress}
                    </span>
                    <Link
                      href="/user-profile"
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      My Profile
                    </Link>
                  </div>
                )}
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                    },
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex space-x-4">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
