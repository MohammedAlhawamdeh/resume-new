import React from "react";
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

// Register standard fonts with unicode support for Turkish characters
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
      fontStyle: "italic",
    },
  ],
});

// Register hyphenation callback for better text wrapping
Font.registerHyphenationCallback((word) => [word]);

// Minimal styling for basic structure only
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    fontSize: 11,
  },
  section: {
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  paragraph: {
    marginBottom: 5,
    lineHeight: 1.5,
  },
  bulletList: {
    marginTop: 5,
    marginBottom: 5,
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
            FULL STACK DEVELOPER
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Text style={{ fontSize: 10 }}>
              {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}{" "}
              | {resumeData.personalInfo.location}
              {resumeData.personalInfo.linkedIn &&
                ` | ${resumeData.personalInfo.linkedIn}`}
              {resumeData.personalInfo.website &&
                ` | ${resumeData.personalInfo.website}`}
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
            <Text style={styles.paragraph}>{resumeData.summary}</Text>
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
                marginBottom: 5,
              }}
            />

            {Object.entries(groupedSkills).map(([category, skillsList]) =>
              skillsList.length > 0 ? (
                <View key={category} style={{ marginBottom: 8 }}>
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
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {exp.title}
                </Text>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {exp.company}
                </Text>
                <Text style={{ fontSize: 10, marginBottom: 5 }}>
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
                <Text style={{ fontWeight: "bold" }}>{edu.institution}</Text>
                <Text style={{ fontSize: 10, marginBottom: 2 }}>
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
      </Page>
    </Document>
  );
};

export const DownloadPDFButton = ({
  resumeData,
}: {
  resumeData: ResumeData;
}) => (
  <PDFDownloadLink
    document={<ResumePDF resumeData={resumeData} />}
    fileName={`${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`}
    className="btn btn-primary"
  >
    {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
  </PDFDownloadLink>
);

export default ResumePDF;
