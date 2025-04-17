"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "../types/resume";

interface JobDescriptionAnalyzerProps {
  resumeData: ResumeData;
}

export default function JobDescriptionAnalyzer({
  resumeData,
}: JobDescriptionAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  // Extract keywords from job description
  useEffect(() => {
    if (!jobDescription.trim()) {
      setKeywords([]);
      setMatchedKeywords([]);
      setMissingKeywords([]);
      setScore(0);
      return;
    }

    // Common tech skills, languages, and qualifications to look for
    const commonKeywords = [
      "leadership",
      "communication",
      "project management",
      "teamwork",
      "problem solving",
      "javascript",
      "typescript",
      "react",
      "node",
      "python",
      "java",
      "c#",
      ".net",
      "aws",
      "cloud",
      "agile",
      "scrum",
      "devops",
      "ci/cd",
      "testing",
      "analytics",
      "data",
      "machine learning",
      "artificial intelligence",
      "ai",
      "product management",
      "ux",
      "ui",
      "user experience",
      "customer service",
      "sales",
      "marketing",
      "finance",
      "accounting",
      "human resources",
      "mba",
      "bachelor",
      "master",
      "phd",
      "database",
      "sql",
      "nosql",
      "mongodb",
      "postgres",
      "docker",
      "kubernetes",
      "git",
      "rest",
      "api",
      "microservices",
      "architecture",
      "responsive",
      "mobile",
      "cross-functional",
      "full-stack",
      "frontend",
      "backend",
      // Language keywords
      "english",
      "spanish",
      "french",
      "german",
      "chinese",
      "mandarin",
      "japanese",
      "korean",
      "arabic",
      "russian",
      "portuguese",
      "italian",
      "hindi",
      "turkish",
      "dutch",
      "bilingual",
      "multilingual",
      "fluent",
      "native",
      "proficient",
      "intermediate",
      "basic",
      "language skills",
      // Certification keywords
      "certification",
      "certified",
      "certificate",
      "aws certified",
      "microsoft certified",
      "scrum",
      "pmp",
      "ccna",
      "comptia",
      "cissp",
      "itil",
      "prince2",
      "cism",
      "cisa",
      "ceh",
      "azure",
      "google cloud",
      "professional development",
      "continuing education",
    ];

    // Extract potential keywords from job description
    const extractedKeywords = commonKeywords.filter((keyword) =>
      jobDescription.toLowerCase().includes(keyword.toLowerCase())
    );

    setKeywords(extractedKeywords);

    // Check if resume contains these keywords
    // Include language data in the analysis
    const resumeText = JSON.stringify({
      ...resumeData,
      languagesText: resumeData.languages
        .map((lang) => `${lang.name} ${lang.proficiency}`)
        .join(" "),
    }).toLowerCase();

    const matched = extractedKeywords.filter((keyword) =>
      resumeText.includes(keyword.toLowerCase())
    );
    const missing = extractedKeywords.filter(
      (keyword) => !resumeText.includes(keyword.toLowerCase())
    );

    setMatchedKeywords(matched);
    setMissingKeywords(missing);

    // Calculate a simple match score
    const matchPercentage =
      extractedKeywords.length > 0
        ? (matched.length / extractedKeywords.length) * 100
        : 0;

    setScore(Math.round(matchPercentage));
  }, [jobDescription, resumeData]);

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 p-6">
      <h2 className="text-xl font-bold mb-3">Job Description Analyzer</h2>
      <p className="mb-3 text-gray-600">
        Paste a job description to analyze how well your resume matches the
        requirements. This will help identify important keywords to include for
        better ATS performance.
      </p>

      <div className="mb-4">
        <div>
          <label
            htmlFor="job-description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Description
          </label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            placeholder="Paste the job description here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {keywords.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
            <h3 className="text-lg font-medium">ATS Match Analysis</h3>
            <div className="flex items-center mt-2 md:mt-0">
              <span className="mr-2">Match Score:</span>
              <div
                className={`text-white font-bold rounded-md px-3 py-1 ${
                  score > 70
                    ? "bg-green-600"
                    : score > 40
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {score}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-600 mb-2">
                Keywords in Your Resume
              </h4>
              {matchedKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {matchedKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 py-1 px-2 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-500">
                  No matching keywords found
                </p>
              )}
            </div>

            <div>
              <h4 className="font-medium text-red-600 mb-2">
                Missing Keywords
              </h4>
              {missingKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-700 py-1 px-2 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-500">No missing keywords</p>
              )}
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <p>
              <strong>Tip:</strong> Try to incorporate missing keywords into
              your resume to improve ATS compatibility. Focus especially on
              skills and qualifications that you genuinely possess.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
