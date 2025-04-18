"use client";

import { useState, useEffect } from "react";
import { Education } from "../types/resume";
import { FaTrash, FaChevronUp, FaChevronDown, FaPlus } from "react-icons/fa";

interface EducationFormProps {
  education: Education[];
  updateEducation: (education: Education[]) => void;
}

export default function EducationForm({
  education,
  updateEducation,
}: EducationFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // If there are no education entries, we should add one
  useEffect(() => {
    if (education.length === 0) {
      addEducation();
    }
  }, [education.length]);

  const handleChange = (id: string, field: keyof Education, value: any) => {
    const updatedEducation = education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateEducation(updatedEducation);
  };

  const addEducation = () => {
    const newId = `edu-${Date.now()}`;
    updateEducation([
      ...education,
      {
        id: newId,
        institution: "",
        degree: "",
        field: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
    setExpandedId(newId);
  };

  const removeEducation = (id: string) => {
    updateEducation(education.filter((edu) => edu.id !== id));
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Education</h2>
      <p className="text-gray-600 mb-4">
        Add your educational background, starting with your most recent degree
        or certification.
      </p>

      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="mb-4 border rounded-lg p-4 bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="font-medium">
              {index + 1}.{" "}
              {edu.institution
                ? `${edu.institution} - ${edu.degree || "Degree"}`
                : "New Education"}
            </div>
            <div className="flex gap-2">
              <button
                className="p-1 text-oxford-blue hover:text-vivid-orange flex items-center justify-center min-w-8 h-8 rounded-full"
                onClick={() => toggleExpanded(edu.id)}
                title={expandedId === edu.id ? "Collapse" : "Expand"}
              >
                {expandedId === edu.id ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
              {education.length > 1 && (
                <button
                  className="delete-btn"
                  onClick={() => removeEducation(edu.id)}
                  title="Remove education"
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>
          </div>

          {expandedId === edu.id && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="form-label">
                    Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      handleChange(edu.id, "institution", e.target.value)
                    }
                    placeholder="e.g., University of California"
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) =>
                      handleChange(edu.id, "location", e.target.value)
                    }
                    placeholder="City, State/Country"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Degree <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleChange(edu.id, "degree", e.target.value)
                    }
                    placeholder="e.g., Bachelor of Science, Master's"
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Field of Study <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) =>
                      handleChange(edu.id, "field", e.target.value)
                    }
                    placeholder="e.g., Computer Science"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="form-label">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleChange(edu.id, "startDate", e.target.value)
                    }
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleChange(edu.id, "endDate", e.target.value)
                    }
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">GPA (Optional)</label>
                  <input
                    type="text"
                    value={edu.gpa || ""}
                    onChange={(e) =>
                      handleChange(edu.id, "gpa", e.target.value)
                    }
                    placeholder="e.g., 3.8/4.0"
                    className="form-input"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="my-4 flex justify-center">
        <button
          className="btn-primary flex items-center"
          onClick={addEducation}
        >
          <FaPlus className="mr-2" size={14} /> Add Another Education
        </button>
      </div>

      <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
        <h4 className="font-medium mb-1">Education Tips:</h4>
        <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
          <li>
            List your education in reverse-chronological order (most recent
            first)
          </li>
          <li>
            Include professional certifications, bootcamps, and relevant
            coursework
          </li>
          <li>
            For recent graduates, you can add relevant coursework and academic
            achievements
          </li>
          <li>
            Only include GPA if it's impressive (typically 3.5+ on a 4.0 scale)
          </li>
          <li>
            If you're a more experienced professional, you can minimize
            education details to focus on work experience
          </li>
        </ul>
      </div>
    </div>
  );
}
