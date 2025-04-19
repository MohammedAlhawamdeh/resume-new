"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Metadata } from "next";
import { useState } from "react";
import { FaUser, FaEnvelope, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

export default function UserProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState("profile");

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vivid-orange"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Not Signed In
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be signed in to view your profile.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-vivid-orange transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your personal details and account information
              </p>
            </div>
            <button
              onClick={() => window.open(user?.userProfileUrl || "", "_blank")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Manage Account
            </button>
          </div>

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-vivid-orange text-vivid-orange"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "preferences"
                    ? "border-vivid-orange text-vivid-orange"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Preferences
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "security"
                    ? "border-vivid-orange text-vivid-orange"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Security
              </button>
            </nav>
          </div>

          {activeTab === "profile" && (
            <div className="p-6">
              <div className="flex items-center mb-8">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={`${user.firstName}'s profile`}
                    className="h-24 w-24 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-500 flex items-center mt-1">
                    <FaEnvelope className="mr-2" />
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                  <p className="text-gray-500 flex items-center mt-1">
                    <FaCalendarAlt className="mr-2" />
                    Member since{" "}
                    {new Date(user?.createdAt || "").toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Profile Information
                </h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user?.fullName || "Not provided"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user?.primaryEmailAddress?.emailAddress}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      User ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Created at
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(user?.createdAt || "").toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Email Addresses
                </h3>
                <ul className="divide-y divide-gray-200">
                  {user?.emailAddresses.map((email) => (
                    <li
                      key={email.id}
                      className="py-4 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <FaEnvelope className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {email.emailAddress}
                          </p>
                          <p className="text-xs text-gray-500">
                            {email.id === user.primaryEmailAddressId && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Primary
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div>
                        {email.verification?.status === "verified" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Unverified
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="p-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Preference settings are managed through the Clerk
                      Dashboard. Click "Manage Account" above to change your
                      preferences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Resume Builder Preferences
                </h3>
                <div className="mt-4 space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="emailNotifications"
                        name="emailNotifications"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="emailNotifications"
                        className="font-medium text-gray-700"
                      >
                        Email notifications
                      </label>
                      <p className="text-gray-500">
                        Receive email notifications about resume tips and job
                        opportunities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="darkMode"
                        name="darkMode"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="darkMode"
                        className="font-medium text-gray-700"
                      >
                        Dark mode
                      </label>
                      <p className="text-gray-500">
                        Enable dark mode for the resume builder interface.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="language"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Language preference
                    </label>
                    <select
                      id="language"
                      name="language"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="p-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Security settings are managed through the Clerk Dashboard.
                      Click "Manage Account" above to change your security
                      settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Account Security
                </h3>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Password
                    </h4>
                    <button
                      className="text-sm text-blue-600 hover:text-blue-500"
                      onClick={() =>
                        window.open(user?.userProfileUrl || "", "_blank")
                      }
                    >
                      Change
                    </button>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Password is set
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Two-factor authentication
                    </h4>
                    <button
                      className="text-sm text-blue-600 hover:text-blue-500"
                      onClick={() =>
                        window.open(user?.userProfileUrl || "", "_blank")
                      }
                    >
                      Enable
                    </button>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md flex items-center">
                    <svg
                      className="h-5 w-5 text-yellow-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Not enabled (recommended)
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Connected accounts
                  </h4>
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {user?.externalAccounts?.length > 0 ? (
                      user.externalAccounts.map((account) => (
                        <li
                          key={account.id}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="ml-2 flex-1 w-0 truncate">
                              {account.provider}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              className="font-medium text-blue-600 hover:text-blue-500"
                              onClick={() =>
                                window.open(
                                  user?.userProfileUrl || "",
                                  "_blank"
                                )
                              }
                            >
                              Manage
                            </button>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-2 flex-1 w-0 truncate">
                            No connected accounts
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            className="font-medium text-blue-600 hover:text-blue-500"
                            onClick={() =>
                              window.open(user?.userProfileUrl || "", "_blank")
                            }
                          >
                            Connect
                          </button>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
