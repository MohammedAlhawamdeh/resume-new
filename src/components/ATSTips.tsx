"use client";

import { useState } from "react";

export default function ATSTips() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border-l-4 border-vivid-orange p-4 mb-4 rounded shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-oxford-blue">
          ATS Compatibility Tips
        </h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-oxford-blue hover:text-vivid-orange"
        >
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 transition-all">
          <ul className="list-disc pl-5 space-y-1 text-oxford-blue">
            <li>
              Use standard section headings (Experience, Education, Skills)
            </li>
            <li>
              Stick with common fonts like Arial, Calibri, or Times New Roman
            </li>
            <li>
              Use simple formatting - avoid tables, text boxes, and columns
            </li>
            <li>
              Include keywords from the job description throughout your resume
            </li>
            <li>Use standard bullet points rather than custom symbols</li>
            <li>Save your final resume as a PDF to maintain formatting</li>
            <li>
              Keep your file name professional (FirstName_LastName_Resume.pdf)
            </li>
            <li>
              Include both hard skills (technical) and soft skills
              (communication)
            </li>
            <li>Add a LinkedIn URL to your contact information</li>
            <li>
              Proofread carefully - spelling and grammar errors can trigger ATS
              rejections
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
