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
            margin: 0.5in;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
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
        }

        /* Web font imports */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        /* General resume styling */
        #resume-container {
          font-family: 'Roboto', Arial, sans-serif;
          line-height: 1.5;
          color: #333333;
        }

        #resume-container h1 {
          font-size: 24px;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 5px;
        }

        #resume-container h2 {
          font-size: 16px;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 15px;
        }

        #resume-container h3 {
          font-size: 16px;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        #resume-container .contact-info {
          text-align: center;
          margin-bottom: 20px;
          font-size: 12px;
        }

        #resume-container .section-divider {
          border-top: 1px solid #888;
          margin: 5px 0 15px 0;
        }

        #resume-container .job-title,
        #resume-container .company-name,
        #resume-container .institution-name,
        #resume-container .certification-name {
          font-weight: bold;
        }

        #resume-container .job-details,
        #resume-container .edu-details {
          margin-bottom: 3px;
        }

        #resume-container ul {
          padding-left: 20px;
          margin: 5px 0 15px 0;
        }

        #resume-container li {
          margin-bottom: 5px;
        }

        #resume-container .section {
          margin-bottom: 20px;
        }

        #resume-container .skills-category {
          margin-bottom: 8px;
        }

        #resume-container .skills-label {
          font-weight: bold;
          display: inline;
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
            {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
            {personalInfo.linkedIn && personalInfo.website && <span> | </span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
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
              <div key={exp.id} className="mb-4">
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
