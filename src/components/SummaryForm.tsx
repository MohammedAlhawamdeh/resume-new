"use client";

interface SummaryFormProps {
  summary: string;
  updateSummary: (summary: string) => void;
}

export default function SummaryForm({
  summary,
  updateSummary,
}: SummaryFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummary(e.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Professional Summary</h2>
      <p className="text-gray-600 mb-4">
        Write a concise overview of your professional background, skills, and
        career goals. This appears at the top of your resume and makes a strong
        first impression.
      </p>

      <div className="mb-4">
        <label htmlFor="summary" className="form-label">
          Summary <span className="text-red-500">*</span>
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={handleChange}
          rows={6}
          placeholder="Brief overview of your professional background, key strengths, and career goals (2-4 sentences recommended)"
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 p-4 rounded-md border-l-4 border-green-400">
          <h3 className="text-sm font-medium text-green-700 mb-2">
            Tips for a Great Summary
          </h3>
          <ul className="list-disc pl-4 text-sm text-green-800 space-y-1">
            <li>Keep it concise (3-5 lines)</li>
            <li>Customize it for each job application</li>
            <li>Highlight your most relevant skills and achievements</li>
            <li>Use keywords from the job description</li>
            <li>Quantify your experience when possible</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
          <h3 className="text-sm font-medium text-yellow-700 mb-2">Examples</h3>
          <div className="text-sm text-yellow-800">
            <p className="mb-2">
              <strong>For a software developer:</strong> "Innovative Software
              Engineer with 5+ years of experience designing and developing
              user-centered applications. Proficient in JavaScript, React, and
              Node.js, with a track record of improving application performance
              by 30%."
            </p>
            <p>
              <strong>For a marketing professional:</strong> "Results-driven
              Marketing Manager with 7+ years of experience creating successful
              campaigns across digital channels. Proven ability to increase
              brand awareness and drive 25% growth in sales through strategic
              content initiatives."
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">
          Current Length: {summary.length} characters
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              summary.length === 0
                ? "bg-gray-300"
                : summary.length < 100
                ? "bg-red-500"
                : summary.length < 300
                ? "bg-yellow-500"
                : summary.length < 800
                ? "bg-green-500"
                : "bg-red-500"
            }`}
            style={{ width: `${Math.min(100, (summary.length / 800) * 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {summary.length === 0
            ? "Add your professional summary"
            : summary.length < 100
            ? "Too short - add more details about your skills and experience"
            : summary.length < 300
            ? "Getting better - consider adding more relevant keywords"
            : summary.length < 800
            ? "Great length for an ATS-friendly summary"
            : "Too long - consider making it more concise"}
        </p>
      </div>
    </div>
  );
}
