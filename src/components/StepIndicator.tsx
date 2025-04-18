"use client";

import { FaCheck } from "react-icons/fa";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
  onStepClick?: (step: number) => void;
  stepDescriptions?: string[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  stepNames,
  onStepClick,
  stepDescriptions,
}: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="relative flex items-center justify-between mb-6">
        {/* Steps */}
        {stepNames.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            <button
              onClick={() => onStepClick && onStepClick(index)}
              disabled={!onStepClick || index > currentStep}
              aria-current={index === currentStep ? "step" : undefined}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "bg-vivid-orange text-white ring-4 ring-vivid-orange ring-opacity-30"
                  : index < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-white border-2 border-gray-300 text-gray-400"
              } ${
                onStepClick && index <= currentStep
                  ? "cursor-pointer hover:opacity-90"
                  : ""
              }`}
              title={step}
            >
              {index < currentStep ? (
                <FaCheck className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </button>

            <div className="mt-2 flex flex-col items-center">
              <span
                className={`text-sm md:text-base font-medium ${
                  index === currentStep
                    ? "text-vivid-orange"
                    : index < currentStep
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>

              {stepDescriptions && (
                <span className="hidden md:block text-xs text-gray-500 text-center mt-1 max-w-[120px]">
                  {stepDescriptions[index]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress information */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {totalSteps}
        </div>

        {/* Progress bar */}
        <div className="flex-1 mx-4">
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-vivid-orange rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${(currentStep / (totalSteps - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div
          className="text-sm font-medium"
          style={{ color: "var(--vivid-orange)" }}
        >
          {Math.round((currentStep / (totalSteps - 1)) * 100)}% Complete
        </div>
      </div>
    </div>
  );
}
