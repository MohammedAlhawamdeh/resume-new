"use client";

import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-white" size={20} />;
      case "error":
        return <FaExclamationCircle className="text-white" size={20} />;
      case "warning":
        return <FaExclamationCircle className="text-white" size={20} />;
      case "info":
        return <FaInfoCircle className="text-white" size={20} />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-700";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-3 mb-3 text-white rounded-lg shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${getBackgroundColor()}`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-2">
        {getIcon()}
      </div>
      <div className="ml-2 text-sm font-semibold">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 hover:bg-white hover:bg-opacity-20"
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        aria-label="Close"
      >
        <FaTimesCircle size={16} />
      </button>
    </div>
  );
};

export default Toast;
