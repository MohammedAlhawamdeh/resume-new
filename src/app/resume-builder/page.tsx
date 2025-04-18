"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { ResumeData } from "@/types/resume";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import SummaryForm from "@/components/SummaryForm";
import WorkExperienceForm from "@/components/WorkExperienceForm";
import EducationForm from "@/components/EducationForm";
import SkillsForm from "@/components/SkillsForm";
import LanguagesForm from "@/components/LanguagesForm";
import CertificationsForm from "@/components/CertificationsForm";
import ResumePreview from "@/components/ResumePreview";
import StepIndicator from "@/components/StepIndicator";
import { DownloadPDFButton } from "@/components/ResumePDF";
import { useToast } from "@/components/ToastContext";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaHome,
  FaRedo,
  FaDownload,
} from "react-icons/fa";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "MOHAMMED ALHAWAMDEH",
      email: "mohawamdehtech@gmail.com",
      title: "Full Stack Developer",
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

  const { addToast } = useToast();

  // Define step names and descriptions for the stepper
  const steps = [
    "Personal Details",
    "Summary",
    "Work Experience",
    "Education",
    "Skills",
    "Additional Info",
    "Review",
  ];

  const stepDescriptions = [
    "Your contact information",
    "Professional overview",
    "Work history",
    "Academic background",
    "Key abilities",
    "Languages & certificates",
    "Final check",
  ];

  // Current step state
  const [currentStep, setCurrentStep] = useState(0);

  // Track which steps have been visited
  const [visitedSteps, setVisitedSteps] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
        addToast("Resume data loaded successfully", "success");
      } catch (e) {
        console.error("Failed to parse saved resume data", e);
        addToast("Failed to load saved resume data", "error");
      }
    }

    // Also load visited steps state
    const savedVisitedSteps = localStorage.getItem("visitedSteps");
    if (savedVisitedSteps) {
      try {
        setVisitedSteps(JSON.parse(savedVisitedSteps));
      } catch (e) {
        console.error("Failed to load visited steps data", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty dependency array to run only once on mount

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Save visited steps state
  useEffect(() => {
    localStorage.setItem("visitedSteps", JSON.stringify(visitedSteps));
  }, [visitedSteps]);

  // Mark current step as visited
  useEffect(() => {
    if (!visitedSteps[currentStep]) {
      const updatedVisitedSteps = [...visitedSteps];
      updatedVisitedSteps[currentStep] = true;
      setVisitedSteps(updatedVisitedSteps);
    }
  }, [currentStep, visitedSteps]);

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
    if (
      confirm(
        "Are you sure you want to reset all your resume data? This action cannot be undone."
      )
    ) {
      setResumeData({
        personalInfo: {
          name: "",
          title: "",
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
      setCurrentStep(0);
      setVisitedSteps(Array(steps.length).fill(false));
      addToast("Resume data has been reset", "info");
    }
  };

  // Navigation between steps
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step: number) => {
    if (
      step >= 0 &&
      step < steps.length &&
      (step <= currentStep || visitedSteps[step])
    ) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step > currentStep) {
      addToast("Please complete the current step first", "warning");
    }
  };

  // Check if required fields are filled for current step to enable Next button
  const canProceed = () => {
    switch (currentStep) {
      case 0: // Personal Details
        return (
          resumeData.personalInfo.name.trim() !== "" &&
          resumeData.personalInfo.email.trim() !== ""
        );
      case 1: // Summary
        return resumeData.summary.trim() !== "";
      case 2: // Work Experience
        return resumeData.workExperience.length > 0;
      case 3: // Education
        return resumeData.education.length > 0;
      case 4: // Skills
        return resumeData.skills.length > 0;
      case 5: // Additional Info (Languages/Certifications - optional)
        return true;
      default:
        return true;
    }
  };

  // Render the current step's form
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            updatePersonalInfo={updatePersonalInfo}
          />
        );
      case 1:
        return (
          <SummaryForm
            summary={resumeData.summary}
            updateSummary={updateSummary}
          />
        );
      case 2:
        return (
          <WorkExperienceForm
            experiences={resumeData.workExperience}
            updateExperiences={updateWorkExperience}
          />
        );
      case 3:
        return (
          <EducationForm
            education={resumeData.education}
            updateEducation={updateEducation}
          />
        );
      case 4:
        return (
          <SkillsForm skills={resumeData.skills} updateSkills={updateSkills} />
        );
      case 5:
        return (
          <div className="space-y-6">
            <LanguagesForm
              languages={resumeData.languages}
              updateLanguages={updateLanguages}
            />
            <CertificationsForm
              certifications={resumeData.certifications}
              updateCertifications={updateCertifications}
            />
          </div>
        );
      case 6:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Final Review</h2>
            <p className="mb-6 text-gray-600">
              Review your resume and make any final adjustments before
              downloading. You can go back to any section by clicking on the
              steps above.
            </p>

            <div className="space-y-6 mb-8">
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">
                  Completion Checklist
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span
                      className={`mr-2 mt-0.5 ${
                        resumeData.personalInfo.name
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {resumeData.personalInfo.name ? (
                        <FaCheck size={16} />
                      ) : (
                        "•"
                      )}
                    </span>
                    <span>
                      Personal Information{" "}
                      {resumeData.personalInfo.name ? "✓" : "- Required"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`mr-2 mt-0.5 ${
                        resumeData.summary ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {resumeData.summary ? <FaCheck size={16} /> : "•"}
                    </span>
                    <span>
                      Professional Summary{" "}
                      {resumeData.summary ? "✓" : "- Required"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`mr-2 mt-0.5 ${
                        resumeData.workExperience.length > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {resumeData.workExperience.length > 0 ? (
                        <FaCheck size={16} />
                      ) : (
                        "•"
                      )}
                    </span>
                    <span>
                      Work Experience{" "}
                      {resumeData.workExperience.length > 0
                        ? "✓"
                        : "- Required"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`mr-2 mt-0.5 ${
                        resumeData.education.length > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {resumeData.education.length > 0 ? (
                        <FaCheck size={16} />
                      ) : (
                        "•"
                      )}
                    </span>
                    <span>
                      Education{" "}
                      {resumeData.education.length > 0 ? "✓" : "- Required"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className={`mr-2 mt-0.5 ${
                        resumeData.skills.length > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {resumeData.skills.length > 0 ? (
                        <FaCheck size={16} />
                      ) : (
                        "•"
                      )}
                    </span>
                    <span>
                      Skills {resumeData.skills.length > 0 ? "✓" : "- Required"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5 text-green-500">
                      <FaCheck size={16} />
                    </span>
                    <span>Languages & Certifications (Optional)</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">
                  Ready to finalize your resume?
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                  Your resume looks great! Click the button below to download it
                  as a PDF.
                </p>
                <div className="flex justify-center">
                  <DownloadPDFButton resumeData={resumeData} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-oxford-blue border-b sticky top-0 shadow-sm z-50 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold m-0 hover:opacity-90">
              <span className="text-white">KWIK</span>
              <span className="text-vivid-orange">CV</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/" className="btn-secondary flex items-center">
                <FaHome className="mr-2" size={14} /> Home
              </Link>

              <button
                className="btn-danger flex items-center"
                onClick={handleReset}
                title="Reset resume data"
              >
                <FaRedo className="mr-2" size={14} /> Reset
              </button>

              {currentStep === steps.length - 1 && (
                <DownloadPDFButton resumeData={resumeData} />
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stepper Component */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={steps.length}
            stepNames={steps}
            stepDescriptions={stepDescriptions}
            onStepClick={goToStep}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Column */}
          <div className="lg:w-7/12">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  className={`btn-secondary flex items-center ${
                    currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={currentStep === 0}
                >
                  <FaChevronLeft className="mr-2" size={14} /> Previous
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className={`btn-primary flex items-center ${
                      !canProceed() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!canProceed()}
                  >
                    Next <FaChevronRight className="ml-2" size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToast(
                        "Your CV is ready to download!",
                        "success",
                        5000
                      );
                    }}
                    className="btn-success flex items-center"
                  >
                    <FaCheck className="mr-2" size={14} /> Complete
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:w-5/12">
            <div
              className="sticky top-20 preview-container overflow-y-auto bg-white shadow-sm rounded-xl p-4 mb-4"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <div className="flex justify-between items-center mb-3 pb-3 border-b">
                <h2 className="text-lg font-bold">Resume Preview</h2>
                {resumeData.personalInfo.name && (
                  <DownloadPDFButton
                    resumeData={resumeData}
                    btnText={
                      <>
                        <FaDownload className="mr-2" size={12} /> PDF
                      </>
                    }
                    className="!py-1 !px-3 text-sm"
                  />
                )}
              </div>
              <div className="border rounded-lg">
                <ResumePreview resumeData={resumeData} />
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
