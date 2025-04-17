"use client";

import { useState } from "react";
import { Education } from "../types/resume";
import { FaTrash, FaChevronUp, FaChevronDown } from "react-icons/fa";

interface EducationFormProps {
  education: Education[];
  updateEducation: (education: Education[]) => void;
}

export default function EducationForm({
  education,
  updateEducation,
}: EducationFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    <div className="bg-white rounded-xl shadow-sm mb-4 p-6">
      <h2 className="text-xl font-bold mb-4">Education</h2>

      {education.map((edu) => (
        <div key={edu.id} className="mb-4 border rounded-lg p-3">
          <div className="flex justify-between items-center mb-3">
            <div className="font-medium">
              {edu.institution
                ? `${edu.institution} - ${edu.degree || "Degree"}`
                : "New Education"}
            </div>
            <div className="flex gap-2">
              <button
                className="p-1 text-oxford-blue hover:text-vivid-orange flex items-center justify-center min-w-8 h-8"
                onClick={() => toggleExpanded(edu.id)}
                title={expandedId === edu.id ? "Collapse" : "Expand"}
              >
                {expandedId === edu.id ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
              <button
                className="p-1 text-red-500 hover:text-red-700 flex items-center justify-center min-w-8 h-8"
                onClick={() => removeEducation(edu.id)}
                title="Remove education"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>

          {expandedId === edu.id && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      handleChange(edu.id, "institution", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) =>
                      handleChange(edu.id, "location", e.target.value)
                    }
                    placeholder="City, State/Country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleChange(edu.id, "degree", e.target.value)
                    }
                    placeholder="e.g., Bachelor of Science, Master's"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study *
                  </label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) =>
                      handleChange(edu.id, "field", e.target.value)
                    }
                    placeholder="e.g., Computer Science"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleChange(edu.id, "startDate", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleChange(edu.id, "endDate", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ""}
                    onChange={(e) =>
                      handleChange(edu.id, "gpa", e.target.value)
                    }
                    placeholder="e.g., 3.8/4.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      <button
        className="bg-vivid-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-md"
        onClick={addEducation}
      >
        Add Education
      </button>
    </div>
  );
}
