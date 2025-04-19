"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Custom KWIK CV Navbar */}
      <header className="bg-oxford-blue text-white border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-white">KWIK</span>
              <span className="text-vivid-orange">CV</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center hover:text-vivid-orange transition-colors text-sm font-medium"
            >
              <FaHome className="mr-1" /> Home
            </Link>
            <Link
              href="/sign-up"
              className="border border-white hover:border-vivid-orange hover:text-vivid-orange text-white px-5 py-2 rounded-md font-medium text-sm transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your resumes and continue building your career
            </p>
          </div>
          <div className="mt-8">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-vivid-orange hover:bg-opacity-90 text-sm normal-case",
                  card: "rounded-md shadow-sm",
                },
              }}
              redirectUrl="/dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
