"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ResumeData } from "@/types/resume";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import SummaryForm from "@/components/SummaryForm";
import WorkExperienceForm from "@/components/WorkExperienceForm";
import EducationForm from "@/components/EducationForm";
import SkillsForm from "@/components/SkillsForm";
import LanguagesForm from "@/components/LanguagesForm";
import CertificationsForm from "@/components/CertificationsForm";
import ResumePreview from "@/components/ResumePreview";
// Removed ATSTips import
// Removed JobDescriptionAnalyzer import
import { DownloadPDFButton } from "@/components/ResumePDF";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "MOHAMMED ALHAWAMDEH",
      email: "mohawamdehtech@gmail.com",
      phone: "+905343359042",
      location: "Eskişehir, Türkiye",
      linkedIn: "https://www.linkedin.com/in/mohammed-alhawamdeh/",
      website: "mohawamdeh.tech",
      github: "https://github.com/MohammedAlhawamdeh",
    },
    summary:
      "Full Stack Developer with 3+ years of experience building responsive and scalable web applications using JavaScript/Typescript, React, NodeJs, and modern frameworks. Proven track record of translating UI/UX designs into intuitive user interfaces and implementing complex business logic. Experienced in Agile methodologies with a strong focus on code quality, system design, debugging, and cross-functional collaboration. Adept at both front-end and back-end development with expertise in performance tuning and microservices architecture.",
    workExperience: [
      {
        id: uuidv4(),
        title: "Software Engineer",
        company: "Lloyds Banking Group (via AND DIGITAL consultancy)",
        location: "Halifax, United Kingdom (Hybrid Work Model)",
        startDate: "2022-09",
        endDate: "2025-07",
        current: false,
        description: "",
        achievements: [
          "Developed responsive and user-friendly interfaces using React, Redux, and Typescript for financial applications, resulting in a 30% reduction in user-reported interface issues",
          "Implemented complex form validation and state management using Formik and Redux, ensuring 99.8% data integrity and a smooth user experience across all banking applications",
          "Designed and implemented reusable components that reduced development time for new features by 40% while maintaining design consistency",
          "Resolved critical state synchronization issues between application pages, decreasing data inconsistency incidents by 85% throughout the user journey",
          "Successfully delivered end-to-end features while navigating complex business logic and regulatory requirements in the financial services sector",
          "Established comprehensive testing strategies with Jest and React Testing Library for unit tests, and Selenium/Playwright for integration testing, achieving 90% code coverage",
          "Enhanced API error handling by implementing detailed schema validation, reducing critical error 500 responses by 65% and improving debugging efficiency",
          "Collaborated with cross-functional teams using Microsoft Teams and Jira to ensure efficient communication in a hybrid work environment",
        ],
      },
      {
        id: uuidv4(),
        title: "Associate Product Developer",
        company: "AND DIGITAL",
        location: "Halifax, United Kingdom (Remote)",
        startDate: "2022-03",
        endDate: "2025-01",
        current: false,
        description: "",
        achievements: [
          "Developed the Health Check feature using React and Typescript, enabling club executives to view health metrics for client engagements, increasing project visibility by 45%",
          "Created an intuitive dashboard that reduced executive reporting time by 35% and improved data-driven decision making",
          "Participated in Agile ceremonies and regularly demonstrated completed work to stakeholders, receiving 95% positive feedback on presentations",
          "Proactively expanded technical capabilities by taking on challenging work outside my comfort zone, including back-end development and system design",
          "Conducted user research sessions with 20+ stakeholders, creating tailored documentation that improved feature adoption rates by 50%",
          "Utilized Slack, Zoom, and Azure DevOps to maintain seamless collaboration in a fully remote work environment",
          "Mentored 3 junior developers, helping them improve their front-end development skills and adopt best practices",
        ],
      },
      {
        id: uuidv4(),
        title: "Professional Development & Relocation",
        company: "Self-Employed",
        location: "Eskişehir, Turkiye",
        startDate: "2025-01",
        endDate: "",
        current: true,
        description: "",
        achievements: [
          "Successfully managed international relocation from the UK to Turkey, maintaining professional skills through self-directed learning",
          "Developing personal portfolio website (Mohawamdeh.tech) using React and Typescript to showcase projects and technical capabilities",
          "Contributing to open-source projects to maintain and expand development skills during transition period",
          "Exploring microservices architecture and containerization technologies to broaden technical expertise",
        ],
      },
      {
        id: uuidv4(),
        title: "Career Transition & Skill Development",
        company: "Self-Employed",
        location: "United Kingdom",
        startDate: "2020-11",
        endDate: "2022-03",
        current: false,
        description: "",
        achievements: [
          "Relocated from Jordan to the United Kingdom to pursue advanced career opportunities in software development",
          "Focused on English language proficiency development to enhance communication skills for the UK tech market",
          "Built several personal projects using React, NodeJs, and MongoDB to strengthen full-stack development capabilities",
          "Practiced algorithm problem-solving daily, completing 100+ challenges to improve technical interview readiness",
          "Completed advanced courses in React, Typescript, and testing methodologies to align skills with UK market demands",
        ],
      },
      {
        id: uuidv4(),
        title: "Junior Software Developer",
        company: "Luminus Technical University College",
        location: "Amman, Jordan",
        startDate: "2020-05",
        endDate: "2020-11",
        current: false,
        description: "",
        achievements: [
          "Integrated Zoom APIs with the university's Content Management System, developing frontend components for data visualization that improved virtual classroom access for 2,000+ students",
          "Developed an API monitoring system that reduced integration failures by 40% during the university's rapid shift to online learning",
          "Mentored 15+ students as a teaching assistant, helping them understand web development fundamentals with 90% passing their assessments",
          "Created comprehensive documentation for the Zoom integration, reducing support requests by 60% and enabling smooth onboarding for new staff",
          "Collaborated with the IT department to implement progressive web app techniques that improved mobile responsiveness by 70%",
        ],
      },
    ],
    education: [
      {
        id: uuidv4(),
        institution: "Luminus Technical University College",
        degree: "Advanced Software Development",
        field: "Certified Full Stack Developer (900 hours - 8 months)",
        location: "Amman, Jordan",
        startDate: "2019-11",
        endDate: "2020-04",
        gpa: "",
      },
      {
        id: uuidv4(),
        institution: "Tafila Technical University",
        degree: "Bachelor's Degree",
        field: "Civil Engineering",
        location: "Tafila, Jordan",
        startDate: "2011-09",
        endDate: "2016-01",
        gpa: "",
      },
    ],
    skills: [
      // Front-End
      "React",
      "Redux",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "React Hooks",
      "React Testing Library",
      "Formik",
      "Jest",
      "Progressive Web Apps",
      "Responsive Design",
      // Back-End
      "NodeJs",
      "Express",
      "RESTful API Design",
      "MongoDB",
      "API Integration",
      "Database Management",
      "Microservices",
      // DevOps & Tools
      "Git/Github",
      "CI/CD",
      "Azure DevOps",
      "Version Control",
      "Debugging",
      "Performance Tuning",
      "Continuous Deployment",
      // Development Practices
      "Agile/Scrum",
      "Test Driven Development",
      "Unit Testing",
      "Integration Testing",
      "Component Design",
      "Scalability",
      "System Design",
      "Code Review",
    ],
    languages: [
      {
        id: uuidv4(),
        name: "Arabic",
        proficiency: "Native Speaker",
      },
      {
        id: uuidv4(),
        name: "English",
        proficiency: "Fluent Speaker",
      },
      {
        id: uuidv4(),
        name: "Turkish",
        proficiency: "Intermediate",
      },
    ],
    certifications: [
      {
        id: uuidv4(),
        name: "Advanced React and Redux",
        issuer: "Udemy",
        date: "2023",
      },
      {
        id: uuidv4(),
        name: "Typescript Masterclass",
        issuer: "",
        date: "2022",
      },
      {
        id: uuidv4(),
        name: "Nodejs Backend Development",
        issuer: "",
        date: "2021",
      },
      {
        id: uuidv4(),
        name: "Test-Driven Development with Jest",
        issuer: "",
        date: "2022",
      },
    ],
  });

  const [activeTab, setActiveTab] = useState("edit");

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved resume data", e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (personalInfo: ResumeData["personalInfo"]) => {
    setResumeData((prev) => ({ ...prev, personalInfo }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const updateWorkExperience = (
    workExperience: ResumeData["workExperience"]
  ) => {
    setResumeData((prev) => ({ ...prev, workExperience }));
  };

  const updateEducation = (education: ResumeData["education"]) => {
    setResumeData((prev) => ({ ...prev, education }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const updateLanguages = (languages: ResumeData["languages"]) => {
    setResumeData((prev) => ({ ...prev, languages }));
  };

  const updateCertifications = (
    certifications: ResumeData["certifications"]
  ) => {
    setResumeData((prev) => ({ ...prev, certifications }));
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all your resume data?")) {
      setResumeData({
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          location: "",
          linkedIn: "",
          website: "",
          github: "",
        },
        summary: "",
        workExperience: [],
        education: [],
        skills: [],
        languages: [],
        certifications: [],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-oxford-blue border-b sticky top-0 shadow-sm z-10 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold m-0">Resume Builder</h1>
            <div className="flex items-center">
              <DownloadPDFButton resumeData={resumeData} />
              <button
                className="ml-2 bg-vivid-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: "#FB5607", color: "white" }}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        {/* Removed ATS Tips section */}

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Form Column */}
          <div className="lg:w-7/12 pr-0 lg:pr-4">
            <div className="flex flex-col gap-4 pb-5">
              <PersonalInfoForm
                personalInfo={resumeData.personalInfo}
                updatePersonalInfo={updatePersonalInfo}
              />

              <SummaryForm
                summary={resumeData.summary}
                updateSummary={updateSummary}
              />

              <WorkExperienceForm
                experiences={resumeData.workExperience}
                updateExperiences={updateWorkExperience}
              />

              <EducationForm
                education={resumeData.education}
                updateEducation={updateEducation}
              />

              <SkillsForm
                skills={resumeData.skills}
                updateSkills={updateSkills}
              />

              <LanguagesForm
                languages={resumeData.languages}
                updateLanguages={updateLanguages}
              />

              <CertificationsForm
                certifications={resumeData.certifications}
                updateCertifications={updateCertifications}
              />

              {/* Removed JobDescriptionAnalyzer component */}
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:w-5/12 pl-0 lg:pl-4">
            <div
              className="sticky top-20 preview-container overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <div className="bg-white shadow-sm rounded-xl p-4 mb-4">
                <h2 className="text-lg font-bold mb-3">Resume Preview</h2>
                <div className="border rounded-lg">
                  <ResumePreview resumeData={resumeData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .preview-container {
          border-left: 1px solid #eaecf0;
        }
        @media (max-width: 1024px) {
          .preview-container {
            border-left: none;
            position: relative !important;
            max-height: none !important;
            overflow-y: visible !important;
          }
        }
      `}</style>
    </div>
  );
}
