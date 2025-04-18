"use client";

import React from "react";

interface LoadingSpinnerProps {
  text?: string;
  size?: "small" | "medium" | "large";
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
  size = "medium",
  overlay = false,
}) => {
  const getSpinnerSize = () => {
    switch (size) {
      case "small":
        return "w-5 h-5";
      case "medium":
        return "w-8 h-8";
      case "large":
        return "w-12 h-12";
      default:
        return "w-8 h-8";
    }
  };

  const Spinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${getSpinnerSize()} border-4 border-gray-300 border-t-vivid-orange rounded-full animate-spin`}
        role="status"
      ></div>
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <Spinner />
        </div>
      </div>
    );
  }

  return <Spinner />;
};

export default LoadingSpinner;
