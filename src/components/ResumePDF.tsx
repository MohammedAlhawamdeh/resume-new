import React, { useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import LoadingSpinner from "./LoadingSpinner";
import { useToast } from "./ToastContext";

// Move font registration inside a function so it's not executed on module load
const registerFonts = () => {
  // Check if fonts are already registered to avoid duplicates
  if (!Font.getRegisteredFontFamilies().includes("Roboto")) {
    // Register standard fonts with unicode support for Turkish characters
    Font.register({
      family: "Roboto",
      fonts: [
        { src: "/fonts/roboto-regular.ttf" },
        { src: "/fonts/roboto-bold.ttf", fontWeight: "bold" },
        { src: "/fonts/roboto-italic.ttf", fontStyle: "italic" },
      ],
    });
  }

  if (!Font.getRegisteredFontFamilies().includes("JetBrainsMono")) {
    Font.register({
      family: "JetBrainsMono",
      fonts: [
        {
          src: "/fonts/JetBrainsMono-Regular.ttf",
          fontWeight: 400,
          fontStyle: "normal",
        },
        {
          src: "/fonts/JetBrainsMono-Bold.ttf",
          fontWeight: "bold",
          fontStyle: "normal",
        },
      ],
    });
  }

  // Register hyphenation callback for better text wrapping
  Font.registerHyphenationCallback((word) => [word]);
};

// Minimal styling for basic structure only
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    fontSize: 11,
  },
  section: {
    marginBottom: 8, // Reduced from 10
    marginTop: 8, // Reduced from 10
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4, // Reduced from 5
    textTransform: "uppercase",
  },
  paragraph: {
    marginBottom: 3, // Reduced from 5
    lineHeight: 1.25,
  },
  bulletList: {
    marginTop: 4, // Reduced from 5
    marginBottom: 4, // Reduced from 5
  },
  bullet: {
    width: 10,
    marginRight: 5,
    textAlign: "center",
  },
  bulletText: {
    flex: 1,
  },
  certificationName: {
    fontWeight: "bold",
  },
});

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
    // Strip out any level information in parentheses
    const cleanSkill = skill.replace(/\s*\(.+\)$/, "");

    let found = false;
    for (const [category, keywords] of Object.entries(categories)) {
      if (
        keywords.some((keyword) =>
          cleanSkill.toLowerCase().includes(keyword.toLowerCase())
        )
      ) {
        grouped[category].push(cleanSkill);
        found = true;
        break;
      }
    }

    if (!found) {
      grouped["Development Practices"].push(cleanSkill);
    }
  });

  return grouped;
};

// Simple HTML parsing for PDF content
const parseHTML = (htmlString: string) => {
  if (!htmlString) return [];

  // Basic parsing to handle common rich text elements
  // This is a simple approach that handles common HTML tags from the rich text editor

  try {
    // Replace common HTML tags with React-PDF compatible components
    // Bold text
    const boldMatches = htmlString.match(/<strong>(.*?)<\/strong>/g) || [];
    for (const match of boldMatches) {
      const content = match.replace(/<strong>(.*?)<\/strong>/, "$1");
      htmlString = htmlString.replace(
        match,
        `__BOLD_START__${content}__BOLD_END__`
      );
    }

    // Italic text
    const italicMatches = htmlString.match(/<em>(.*?)<\/em>/g) || [];
    for (const match of italicMatches) {
      const content = match.replace(/<em>(.*?)<\/em>/, "$1");
      htmlString = htmlString.replace(
        match,
        `__ITALIC_START__${content}__ITALIC_END__`
      );
    }

    // Links
    const linkMatches = htmlString.match(/<a href="(.*?)">(.*?)<\/a>/g) || [];
    for (const match of linkMatches) {
      const content = match.replace(/<a href="(.*?)">(.*?)<\/a>/, "$2");
      htmlString = htmlString.replace(match, content);
    }

    // Remove paragraph tags but keep line breaks
    htmlString = htmlString.replace(/<p>/g, "").replace(/<\/p>/g, "\n\n");

    // Handle lists
    htmlString = htmlString.replace(/<ul>/g, "").replace(/<\/ul>/g, "");
    htmlString = htmlString.replace(/<ol>/g, "").replace(/<\/ol>/g, "");
    htmlString = htmlString.replace(/<li>/g, "• ").replace(/<\/li>/g, "\n");

    // Remove any remaining HTML tags
    htmlString = htmlString.replace(/<[^>]*>/g, "");

    // Split into paragraphs
    const paragraphs = htmlString.split("\n\n").filter((p) => p.trim());

    // Generate React-PDF components
    return paragraphs.map((paragraph, i) => {
      let parts = [];
      let currentIndex = 0;

      // Process bold sections
      const boldPattern = /__BOLD_START__(.*?)__BOLD_END__/g;
      let boldMatch;

      while ((boldMatch = boldPattern.exec(paragraph)) !== null) {
        // Add text before the bold part
        if (boldMatch.index > currentIndex) {
          parts.push(
            <Text key={`text-${i}-${currentIndex}`}>
              {paragraph.substring(currentIndex, boldMatch.index)}
            </Text>
          );
        }

        // Add the bold part
        parts.push(
          <Text
            key={`bold-${i}-${boldMatch.index}`}
            style={{ fontWeight: "bold" }}
          >
            {boldMatch[1]}
          </Text>
        );

        currentIndex = boldMatch.index + boldMatch[0].length;
      }

      // Process italic sections - added handling for italic text markers
      if (currentIndex === 0) {
        // Only process if bold processing didn't change anything
        const italicPattern = /__ITALIC_START__(.*?)__ITALIC_END__/g;
        let italicMatch;

        while ((italicMatch = italicPattern.exec(paragraph)) !== null) {
          // Add text before the italic part
          if (italicMatch.index > currentIndex) {
            parts.push(
              <Text key={`text-${i}-${currentIndex}`}>
                {paragraph.substring(currentIndex, italicMatch.index)}
              </Text>
            );
          }

          // Add the italic part
          parts.push(
            <Text
              key={`italic-${i}-${italicMatch.index}`}
              style={{ fontStyle: "italic" }}
            >
              {italicMatch[1]}
            </Text>
          );

          currentIndex = italicMatch.index + italicMatch[0].length;
        }
      }

      // Add remaining text
      if (currentIndex < paragraph.length) {
        parts.push(
          <Text key={`text-${i}-${currentIndex}`}>
            {paragraph.substring(currentIndex)}
          </Text>
        );
      }

      // If there were no special parts, just return the paragraph
      if (parts.length === 0) {
        // Check if the paragraph contains any formatting markers
        if (paragraph.includes("__ITALIC_START__")) {
          // Clean up the markers and render with italic style
          const cleanText = paragraph
            .replace(/__ITALIC_START__/g, "")
            .replace(/__ITALIC_END__/g, "");
          parts.push(
            <Text key={`text-${i}-0`} style={{ fontStyle: "italic" }}>
              {cleanText}
            </Text>
          );
        } else if (paragraph.includes("__BOLD_START__")) {
          // Clean up the markers and render with bold style
          const cleanText = paragraph
            .replace(/__BOLD_START__/g, "")
            .replace(/__BOLD_END__/g, "");
          parts.push(
            <Text key={`text-${i}-0`} style={{ fontWeight: "bold" }}>
              {cleanText}
            </Text>
          );
        } else {
          // No formatting needed
          parts.push(<Text key={`text-${i}-0`}>{paragraph}</Text>);
        }
      }

      // For bullet points
      if (paragraph.trim().startsWith("• ")) {
        return (
          <View
            key={`para-${i}`}
            style={{ flexDirection: "row", marginBottom: 5 }}
            wrap={false}
          >
            <Text style={styles.bullet}>•</Text>
            <View style={styles.bulletText}>{parts}</View>
          </View>
        );
      }

      return (
        <Text key={`para-${i}`} style={{ marginBottom: 3 }}>
          {parts}
        </Text>
      );
    });
  } catch (error) {
    console.error("Error parsing HTML content for PDF:", error);
    return [<Text key="error">Error rendering content</Text>];
  }
};

const ResumePDF = ({ resumeData }: { resumeData: ResumeData }) => {
  const groupedSkills = groupSkillsByCategory(resumeData.skills);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Personal Information */}
        <View style={{ textAlign: "center", marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {resumeData.personalInfo.name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
            {resumeData.personalInfo.title || "YOUR JOB TITLE"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                marginBottom: 5,
                marginTop: 5,
              }}
            >
              {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}{" "}
              | {resumeData.personalInfo.location}
              {resumeData.personalInfo.linkedIn &&
                ` | ${resumeData.personalInfo.linkedIn
                  .replace(/^https?:\/\/(www\.)?/i, "")
                  .replace(/\/$/, "")}`}
              {resumeData.personalInfo.website &&
                ` | ${resumeData.personalInfo.website
                  .replace(/^https?:\/\/(www\.)?/i, "")
                  .replace(/\/$/, "")}`}
              {resumeData.personalInfo.github &&
                ` | ${resumeData.personalInfo.github
                  .replace(/^https?:\/\/(www\.)?/i, "")
                  .replace(/\/$/, "")}`}
            </Text>
          </View>
        </View>

        {/* Professional Summary */}
        {resumeData.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <View
              style={{
                borderBottom: 1,
                borderBottomColor: "#888",
                marginBottom: 5,
              }}
            />
            <Text style={{ lineHeight: 1.25 }}>{resumeData.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View
              style={{
                borderBottom: 1,
                borderBottomColor: "#888",
                marginBottom: 10,
              }}
            />

            {Object.entries(groupedSkills).map(([category, skillsList]) =>
              skillsList.length > 0 ? (
                <View key={category} style={{ marginBottom: 12 }}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>{category}:</Text>{" "}
                    {skillsList.join(", ")}
                  </Text>
                </View>
              ) : null
            )}
          </View>
        )}

        {/* Work Experience */}
        {resumeData.workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            <View
              style={{
                borderBottom: 1,
                borderBottomColor: "#888",
                marginBottom: 5,
              }}
            />

            {resumeData.workExperience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 10 }}>
                <Text
                  style={{ fontSize: 11, fontWeight: "bold", marginBottom: 8 }}
                >
                  {exp.title}
                </Text>
                <Text
                  style={{ fontSize: 11, fontWeight: "bold", marginBottom: 8 }}
                >
                  {exp.company}
                </Text>
                <Text
                  style={{ fontStyle: "italic", fontSize: 12, marginBottom: 8 }}
                >
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)} |{" "}
                  {exp.location}
                </Text>
                {exp.description && (
                  <Text style={{ marginBottom: 3 }}>{exp.description}</Text>
                )}

                {exp.achievements.filter(Boolean).map((achievement, idx) => (
                  <View
                    key={idx}
                    style={{ flexDirection: "row", marginBottom: 5 }}
                    wrap={false}
                  >
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View
              style={{
                borderBottom: 1,
                borderBottomColor: "#888",
                marginBottom: 5,
              }}
            />

            {resumeData.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  {edu.institution}
                </Text>
                <Text
                  style={{ fontStyle: "italic", fontSize: 10, marginBottom: 4 }}
                >
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)} |{" "}
                  {edu.location}
                </Text>
                <Text>
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ""}
                </Text>
                {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {resumeData.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL CERTIFICATIONS</Text>
            <View
              style={{
                borderBottom: 1,
                borderBottomColor: "#888",
                marginBottom: 5,
              }}
            />

            {resumeData.certifications.map((cert) => (
              <View
                key={cert.id}
                style={{ flexDirection: "row", marginBottom: 10 }}
                wrap={false}
              >
                <Text style={styles.bullet}>•</Text>
                <View style={styles.bulletText}>
                  <Text>
                    <Text style={styles.certificationName}>{cert.name}</Text>
                    {cert.issuer ? ` (${cert.issuer}` : ""}
                    {cert.date ? `, ${cert.date})` : cert.issuer ? ")" : ""}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {resumeData.languages?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>
            <View
              style={{
                borderBottom: 1,
                borderBottomColor: "#888",
                marginBottom: 5,
              }}
            />

            {resumeData.languages.map((lang) => (
              <View
                key={lang.id}
                style={{ flexDirection: "row", marginBottom: 10 }}
                wrap={false}
              >
                <Text style={styles.bullet}>•</Text>
                <View style={styles.bulletText}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>{lang.name}</Text>:{" "}
                    {lang.proficiency}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {resumeData.customSections?.length > 0 &&
          resumeData.customSections.map(
            (section) =>
              section.items.length > 0 && (
                <View key={section.id} style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {section.title.toUpperCase()}
                  </Text>
                  <View
                    style={{
                      borderBottom: 1,
                      borderBottomColor: "#888",
                      marginBottom: 5,
                    }}
                  />

                  {section.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 8 }}>
                      {Object.entries(item.fields).map(
                        ([fieldName, fieldValue]) => {
                          if (!fieldValue) return null;

                          // Special handling for content field with rich text
                          if (fieldName === "content") {
                            return (
                              <View key={fieldName} style={{ marginTop: 2 }}>
                                {parseHTML(fieldValue)}
                              </View>
                            );
                          }

                          // Standard fields
                          return (
                            <Text
                              key={fieldName}
                              style={
                                fieldName === "title"
                                  ? { fontWeight: "bold" }
                                  : fieldName.toLowerCase().includes("date")
                                  ? {
                                      fontStyle: "italic",
                                      fontSize: 10,
                                      marginBottom: 4,
                                    }
                                  : {}
                              }
                            >
                              {fieldValue}
                            </Text>
                          );
                        }
                      )}
                    </View>
                  ))}
                </View>
              )
          )}
      </Page>
    </Document>
  );
};

export const DownloadPDFButton = ({
  resumeData,
  btnText,
  className = "",
}: {
  resumeData: ResumeData;
  btnText?: React.ReactNode;
  className?: string;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const { addToast } = useToast();

  // Use useEffect to ensure this only runs on client side
  useEffect(() => {
    let isMounted = true; // Add this flag to prevent state updates if component unmounts
    setIsClient(true);

    // Register fonts when the component mounts
    try {
      // Register fonts only once
      registerFonts();
      setIsFontsLoaded(true);
    } catch (err) {
      console.error("Font registration error:", err);
      if (isMounted) {
        addToast("Failed to prepare PDF generation", "error");
        // Still set fonts loaded to true to avoid getting stuck
        setIsFontsLoaded(true);
      }
    }

    // Add cleanup function
    return () => {
      isMounted = false;
    };
  }, [addToast]);

  // Only render the PDFDownloadLink on the client side and when fonts are loaded
  if (!isClient || !isFontsLoaded) {
    return (
      <button
        className={`bg-vivid-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-md inline-flex items-center justify-center ${className}`}
        disabled
      >
        <LoadingSpinner size="small" text="" />
        <span className="ml-2">Initializing...</span>
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDF resumeData={resumeData} />}
      fileName={`${
        resumeData.personalInfo.name.replace(/\s+/g, "_") || "Your"
      }_Resume.pdf`}
      className={`bg-vivid-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-md inline-flex items-center justify-center ${className}`}
    >
      {({ loading, error }) => {
        if (error) {
          console.error("PDF generation error:", error);
          addToast("Error generating PDF", "error");
          return "Error generating PDF";
        }

        if (loading) {
          return (
            <>
              <LoadingSpinner size="small" text="" />
              <span className="ml-2">Preparing PDF...</span>
            </>
          );
        }

        return btnText || "Download PDF";
      }}
    </PDFDownloadLink>
  );
};

export default ResumePDF;
