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
    <div className="bg-white rounded-xl shadow-sm mb-4 p-6">
      <h2 className="text-xl font-bold mb-4">Professional Summary</h2>
      <div>
        <label
          htmlFor="summary"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Summary
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={handleChange}
          rows={4}
          placeholder="Brief overview of your professional background, key strengths, and career goals (2-4 sentences recommended)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
        />
        <p className="mt-2 text-sm text-gray-500">
          Tip: Tailor your summary to highlight relevant skills and experience
          for the position you're applying to.
        </p>
      </div>
    </div>
  );
}
