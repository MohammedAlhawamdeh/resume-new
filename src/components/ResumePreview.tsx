"use client";

import { ResumeData } from "../types/resume";
import React from "react";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    languages,
    certifications,
  } = resumeData;

  // Format date to MM/YYYY format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Group skills by category
  const groupSkillsByCategory = (skillList: string[]) => {
    const categories = {
      "Front-End": [
        "React",
        "Redux",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Hook",
        "Testing",
        "Formik",
        "Jest",
        "Web App",
        "Responsive",
      ],
      "Back-End": [
        "Node",
        "Express",
        "REST",
        "MongoDB",
        "API",
        "Database",
        "Microservice",
      ],
      "DevOps & Tools": [
        "Git",
        "CI/CD",
        "Azure",
        "Version Control",
        "Debug",
        "Performance",
        "Deploy",
      ],
      "Development Practices": [
        "Agile",
        "Scrum",
        "TDD",
        "Test",
        "Component",
        "Scalability",
        "System",
        "Review",
      ],
    };

    const grouped: Record<string, string[]> = {
      "Front-End": [],
      "Back-End": [],
      "DevOps & Tools": [],
      "Development Practices": [],
    };

    skillList.forEach((skill) => {
      let found = false;
      for (const [category, keywords] of Object.entries(categories)) {
        if (
          keywords.some((keyword) =>
            skill.toLowerCase().includes(keyword.toLowerCase())
          )
        ) {
          grouped[category].push(skill);
          found = true;
          break;
        }
      }

      if (!found) {
        grouped["Development Practices"].push(skill);
      }
    });

    return grouped;
  };

  const groupedSkills = groupSkillsByCategory(skills);

  // Trigger browser print dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        /* Print-specific styles that will only apply when printing */
        @media print {
          @page {
            size: A4;
            margin: 0.5in 0.7in;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: "Helvetica", "Arial", sans-serif;
            font-size: 11pt;
            line-height: 1.2;
            color: #333333;
          }

          /* Hide everything except the resume */
          body * {
            visibility: hidden;
          }

          #resume-container,
          #resume-container * {
            visibility: visible;
          }

          #resume-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            box-shadow: none;
            border: none;
          }

          /* Page break controls */
          #resume-container .job-title {
            page-break-before: auto;
            page-break-after: avoid;
          }

          #resume-container .experience-entry {
            page-break-inside: avoid;
            break-inside: avoid-page;
          }
        }

        /* Web font imports */
        @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

        /* General resume styling */
        #resume-container {
          font-family: "Open Sans", "Helvetica", "Arial", sans-serif;
          line-height: 1.2;
          color: #333333;
          max-width: 8.5in;
          margin: 0 auto;
        }

        #resume-container h1 {
          font-size: 20pt;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 6pt;
        }

        #resume-container h2 {
          font-size: 14pt;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 14pt;
        }

        #resume-container h3 {
          font-size: 16pt;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 6pt;
          margin-top: 24pt;
        }

        #resume-container .contact-info {
          text-align: center;
          margin-bottom: 20pt;
          font-size: 11pt;
        }

        #resume-container .section-divider {
          border-top: 1px solid #888;
          margin: 5pt 0 18pt 0;
        }

        #resume-container .job-title {
          font-size: 14pt;
          font-weight: 600;
          margin-bottom: 4pt;
        }

        #resume-container .company-name {
          font-size: 12pt;
          font-weight: bold;
          margin-bottom: 4pt;
        }

        /* Date and location styling */
        #resume-container .job-details {
          font-size: 11pt;
          font-style: italic !important;
          margin-bottom: 6pt;
        }

        #resume-container .edu-details {
          font-size: 11pt;
          font-style: italic !important;
          margin-bottom: 4pt;
        }

        #resume-container ul {
          padding-left: 0.3in;
          margin: 6pt 0 16pt 0;
          list-style-type: disc;
        }

        #resume-container li {
          margin-bottom: 8pt;
          text-align: justify;
          font-size: 11pt;
        }

        #resume-container .section {
          margin-bottom: 20pt;
        }

        #resume-container .skills-category {
          margin-bottom: 10pt;
        }

        #resume-container .skills-label {
          font-weight: bold;
          font-size: 12pt;
          display: inline;
        }

        /* Spacing between job entries */
        #resume-container .mb-4 {
          margin-bottom: 18pt;
        }

        /* Spacing between education entries */
        #resume-container .mb-3 {
          margin-bottom: 14pt;
        }

        #resume-container p {
          margin-bottom: 8pt;
          margin-top: 2pt;
          line-height: 1.15;
          text-align: justify;
          font-size: 11pt;
        }
      `}</style>

      <div className="mb-3">
        <button
          onClick={handlePrint}
          className="btn btn-outline-primary"
          title="Print resume using browser print dialog"
        >
          Print Resume
        </button>
      </div>

      <div id="resume-container" className="bg-white p-4">
        {/* Header with Personal Information */}
        <header className="mb-4">
          <h1>{personalInfo.name || "YOUR NAME"}</h1>
          <h2>FULL STACK DEVELOPER</h2>
          <div className="contact-info">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.email && personalInfo.phone && <span> | </span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.location && <span> | </span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.location && personalInfo.linkedIn && <span> | </span>}
            {personalInfo.linkedIn && (
              <span>
                {personalInfo.linkedIn
                  .replace(/^https?:\/\/(www\.)?/i, "")
                  .replace(/\/$/, "")}
              </span>
            )}
            {personalInfo.linkedIn && personalInfo.website && <span> | </span>}
            {personalInfo.website && (
              <span>
                {personalInfo.website
                  .replace(/^https?:\/\/(www\.)?/i, "")
                  .replace(/\/$/, "")}
              </span>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {summary && (
          <section className="section">
            <h3>PROFESSIONAL SUMMARY</h3>
            <div className="section-divider"></div>
            <p>{summary}</p>
          </section>
        )}

        {/* Skills - Organized by category */}
        {skills.length > 0 && (
          <section className="section">
            <h3>SKILLS</h3>
            <div className="section-divider"></div>
            {Object.entries(groupedSkills).map(
              ([category, skillsList]) =>
                skillsList.length > 0 && (
                  <div key={category} className="skills-category">
                    <div className="skills-label">
                      <strong>{category}:</strong>{" "}
                    </div>
                    <span>{skillsList.join(", ")}</span>
                  </div>
                )
            )}
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="section">
            <h3>EXPERIENCE</h3>
            <div className="section-divider"></div>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-4 experience-entry">
                <div className="job-title">{exp.title}</div>
                <div className="company-name">{exp.company}</div>
                <div className="job-details">
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)} |{" "}
                  {exp.location}
                </div>
                {exp.description && <p>{exp.description}</p>}
                {exp.achievements.length > 0 && exp.achievements[0] && (
                  <ul>
                    {exp.achievements.map(
                      (achievement, index) =>
                        achievement && <li key={index}>{achievement}</li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="section">
            <h3>EDUCATION</h3>
            <div className="section-divider"></div>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="institution-name">{edu.institution}</div>
                <div className="edu-details">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)} |{" "}
                  {edu.location}
                </div>
                <div>
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ""}
                </div>
                {edu.gpa && <div>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <section className="section">
            <h3>PROFESSIONAL CERTIFICATIONS</h3>
            <div className="section-divider"></div>
            <ul>
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <span className="certification-name">{cert.name}</span>
                  {cert.issuer ? ` (${cert.issuer}` : ""}
                  {cert.date ? `, ${cert.date})` : cert.issuer ? ")" : ""}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <section className="section">
            <h3>LANGUAGES</h3>
            <div className="section-divider"></div>
            <ul>
              {languages.map((lang) => (
                <li key={lang.id}>
                  <strong>{lang.name}</strong>: {lang.proficiency}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
