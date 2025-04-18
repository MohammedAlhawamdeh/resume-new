"use client";

import { useState } from "react";
import { WorkExperience } from "../types/resume";
import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaChevronUp,
  FaChevronDown,
  FaPlus,
} from "react-icons/fa";

interface WorkExperienceFormProps {
  experiences: WorkExperience[];
  updateExperiences: (experiences: WorkExperience[]) => void;
}

export default function WorkExperienceForm({
  experiences,
  updateExperiences,
}: WorkExperienceFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState<{
    [key: string]: string;
  }>({});
  const [editingAchievement, setEditingAchievement] = useState<{
    expId: string | null;
    index: number | null;
    text: string;
  }>({ expId: null, index: null, text: "" });

  // If there are no experiences, we should add one
  useState(() => {
    if (experiences.length === 0) {
      addExperience();
    }
  });

  const handleChange = (
    id: string,
    field: keyof WorkExperience,
    value: any
  ) => {
    const updatedExperiences = experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateExperiences(updatedExperiences);
  };

  const addExperience = () => {
    const newId = `exp-${Date.now()}`;
    updateExperiences([
      ...experiences,
      {
        id: newId,
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        achievements: [],
      },
    ]);
    setExpandedId(newId);
  };

  const removeExperience = (id: string) => {
    updateExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCurrentChange = (id: string, checked: boolean) => {
    handleChange(id, "current", checked);
    if (checked) {
      handleChange(id, "endDate", "");
    }
  };

  const addAchievement = (id: string) => {
    if (newAchievement[id]?.trim()) {
      const updatedExperiences = experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              achievements: [...exp.achievements, newAchievement[id].trim()],
            }
          : exp
      );
      updateExperiences(updatedExperiences);
      setNewAchievement((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const updatedExperiences = experiences.map((exp) =>
      exp.id === expId
        ? {
            ...exp,
            achievements: exp.achievements.filter((_, i) => i !== index),
          }
        : exp
    );
    updateExperiences(updatedExperiences);
  };

  const handleAchievementChange = (id: string, value: string) => {
    setNewAchievement((prev) => ({ ...prev, [id]: value }));
  };

  const handleAchievementKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAchievement(id);
    }
  };

  const startEditingAchievement = (
    expId: string,
    index: number,
    text: string
  ) => {
    setEditingAchievement({ expId, index, text });
  };

  const cancelEditingAchievement = () => {
    setEditingAchievement({ expId: null, index: null, text: "" });
  };

  const saveEditedAchievement = () => {
    if (
      editingAchievement.expId !== null &&
      editingAchievement.index !== null &&
      editingAchievement.text.trim()
    ) {
      const updatedExperiences = experiences.map((exp) =>
        exp.id === editingAchievement.expId
          ? {
              ...exp,
              achievements: exp.achievements.map((achievement, i) =>
                i === editingAchievement.index
                  ? editingAchievement.text.trim()
                  : achievement
              ),
            }
          : exp
      );
      updateExperiences(updatedExperiences);
      cancelEditingAchievement();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Work Experience</h2>
      <p className="text-gray-600 mb-4">
        Add your work history starting with your most recent position. Focus on
        accomplishments and quantifiable results.
      </p>

      {experiences.map((exp, index) => (
        <div
          key={exp.id}
          className="mb-4 border rounded-lg p-4 bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="font-medium">
              {index + 1}.{" "}
              {exp.title
                ? `${exp.title} at ${exp.company || "Company"}`
                : "New Experience"}
            </div>
            <div className="flex gap-2">
              <button
                className="p-1 text-oxford-blue hover:text-vivid-orange flex items-center justify-center min-w-8 h-8 rounded-full"
                onClick={() => toggleExpanded(exp.id)}
                title={expandedId === exp.id ? "Collapse" : "Expand"}
              >
                {expandedId === exp.id ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
              {experiences.length > 1 && (
                <button
                  className="delete-btn"
                  onClick={() => removeExperience(exp.id)}
                  title="Remove experience"
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>
          </div>

          {expandedId === exp.id && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="form-label">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) =>
                      handleChange(exp.id, "title", e.target.value)
                    }
                    placeholder="e.g., Software Engineer"
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleChange(exp.id, "company", e.target.value)
                    }
                    placeholder="e.g., Tech Solutions Inc."
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      handleChange(exp.id, "location", e.target.value)
                    }
                    placeholder="City, State/Country or Remote"
                    className="form-input"
                  />
                </div>

                <div className="flex items-center h-full mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) =>
                        handleCurrentChange(exp.id, e.target.checked)
                      }
                      className="h-4 w-4 text-vivid-orange focus:ring-vivid-orange border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I currently work here
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="form-label">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleChange(exp.id, "startDate", e.target.value)
                    }
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    End Date{" "}
                    {!exp.current && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleChange(exp.id, "endDate", e.target.value)
                    }
                    disabled={exp.current}
                    required={!exp.current}
                    className={`form-input ${exp.current ? "bg-gray-100" : ""}`}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Job Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    handleChange(exp.id, "description", e.target.value)
                  }
                  rows={3}
                  placeholder="Briefly describe your role and responsibilities"
                  className="form-input"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Key Achievements <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Use bullet points to highlight your most impressive
                  accomplishments in this role.
                </p>

                {exp.achievements.length > 0 ? (
                  <div className="bg-gray-50 p-3 rounded-md mb-3">
                    {exp.achievements.map((achievement, index) => (
                      <div key={index} className="flex mb-2">
                        {editingAchievement.expId === exp.id &&
                        editingAchievement.index === index ? (
                          <div className="flex-grow flex">
                            <span className="mr-2 flex-shrink-0">•</span>
                            <div className="flex-grow">
                              <input
                                type="text"
                                value={editingAchievement.text}
                                onChange={(e) =>
                                  setEditingAchievement({
                                    ...editingAchievement,
                                    text: e.target.value,
                                  })
                                }
                                autoFocus
                                className="form-input"
                              />
                              <div className="mt-1 flex gap-2">
                                <button
                                  className="btn-primary !py-1 !text-xs flex items-center"
                                  onClick={saveEditedAchievement}
                                >
                                  <FaCheck size={12} className="mr-1" /> Save
                                </button>
                                <button
                                  className="btn-ghost !py-1 !text-xs flex items-center"
                                  onClick={cancelEditingAchievement}
                                >
                                  <FaTimes size={12} className="mr-1" /> Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex-grow flex">
                              <span className="mr-2 flex-shrink-0">•</span>
                              <span>{achievement}</span>
                            </div>
                            <div className="flex">
                              <button
                                className="edit-btn !p-1"
                                onClick={() =>
                                  startEditingAchievement(
                                    exp.id,
                                    index,
                                    achievement
                                  )
                                }
                                title="Edit achievement"
                              >
                                <FaEdit size={12} />
                              </button>
                              <button
                                className="delete-btn !p-1 ml-1"
                                onClick={() => removeAchievement(exp.id, index)}
                                title="Remove achievement"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic mb-3">
                    No achievements added yet. Add some to make your resume
                    stand out!
                  </div>
                )}

                <div className="flex mt-2">
                  <input
                    type="text"
                    value={newAchievement[exp.id] || ""}
                    onChange={(e) =>
                      handleAchievementChange(exp.id, e.target.value)
                    }
                    onKeyPress={(e) => handleAchievementKeyPress(e, exp.id)}
                    placeholder="Add a key achievement or responsibility"
                    className="flex-grow form-input !rounded-r-none"
                  />
                  <button
                    className="btn-primary !rounded-l-none"
                    onClick={() => addAchievement(exp.id)}
                  >
                    Add
                  </button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-700 mb-1">
                    Achievement Writing Tips:
                  </h4>
                  <ul className="list-disc pl-4 text-sm text-blue-800 space-y-1">
                    <li>
                      Start with strong action verbs (Developed, Created, Led,
                      etc.)
                    </li>
                    <li>
                      Quantify results when possible (increased sales by 20%,
                      reduced costs by $10K)
                    </li>
                    <li>
                      Focus on your contributions and impact, not just
                      responsibilities
                    </li>
                    <li>Keep each bullet point concise (1-2 lines)</li>
                    <li>
                      Use keywords relevant to the jobs you're applying for
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="my-4 flex justify-center">
        <button
          className="btn-primary flex items-center"
          onClick={addExperience}
        >
          <FaPlus className="mr-2" size={14} /> Add Another Work Experience
        </button>
      </div>

      <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
        <h4 className="font-medium mb-1">Work Experience Tips:</h4>
        <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
          <li>
            List your work experience in reverse-chronological order (most
            recent first)
          </li>
          <li>
            Focus on your achievements rather than just listing responsibilities
          </li>
          <li>Use numbers and metrics to quantify your accomplishments</li>
          <li>Match keywords from the job descriptions you're targeting</li>
          <li>
            Include experience from internships or volunteer work if relevant
          </li>
        </ul>
      </div>
    </div>
  );
}
