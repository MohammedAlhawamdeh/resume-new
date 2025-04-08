"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "../types/resume";
import { Card, Form } from "react-bootstrap";

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
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Job Description Analyzer</h2>
        <p className="mb-3 text-secondary">
          Paste a job description to analyze how well your resume matches the
          requirements. This will help identify important keywords to include
          for better ATS performance.
        </p>

        <div className="mb-4">
          <Form.Group controlId="job-description">
            <Form.Label className="fw-medium">Job Description</Form.Label>
            <Form.Control
              as="textarea"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              placeholder="Paste the job description here..."
            />
          </Form.Group>
        </div>

        {keywords.length > 0 && (
          <div className="bg-light p-3 rounded border">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fs-5 fw-medium">ATS Match Analysis</h3>
              <div className="d-flex align-items-center">
                <span className="me-2">Match Score:</span>
                <div
                  className={`text-white fw-bold rounded px-3 py-1 ${
                    score > 70
                      ? "bg-success"
                      : score > 40
                      ? "bg-warning"
                      : "bg-danger"
                  }`}
                >
                  {score}%
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <h4 className="fw-medium text-success mb-2">
                  Keywords in Your Resume
                </h4>
                {matchedKeywords.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {matchedKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-success bg-opacity-10 text-success py-1 px-2 rounded-pill fs-6"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="fst-italic text-muted">
                    No matching keywords found
                  </p>
                )}
              </div>

              <div className="col-md-6">
                <h4 className="fw-medium text-danger mb-2">Missing Keywords</h4>
                {missingKeywords.length > 0 ? (
                  <div className="d-flex flex-wrap gap-2">
                    {missingKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-danger bg-opacity-10 text-danger py-1 px-2 rounded-pill fs-6"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="fst-italic text-muted">No missing keywords</p>
                )}
              </div>
            </div>

            <div className="mt-3 small text-secondary">
              <p>
                <strong>Tip:</strong> Try to incorporate missing keywords into
                your resume to improve ATS compatibility. Focus especially on
                skills and qualifications that you genuinely possess.
              </p>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
