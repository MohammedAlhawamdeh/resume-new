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
    <div className="bg-white rounded-xl shadow-sm mb-4 p-6">
      <h2 className="text-xl font-bold mb-4">Work Experience</h2>

      {experiences.map((exp) => (
        <div key={exp.id} className="mb-4 border rounded-lg p-3">
          <div className="flex justify-between items-center mb-3">
            <div className="font-medium">
              {exp.title
                ? `${exp.title} at ${exp.company || "Company"}`
                : "New Experience"}
            </div>
            <div className="flex gap-2">
              <button
                className="p-1 text-oxford-blue hover:text-vivid-orange flex items-center justify-center min-w-8 h-8"
                onClick={() => toggleExpanded(exp.id)}
                title={expandedId === exp.id ? "Collapse" : "Expand"}
              >
                {expandedId === exp.id ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </button>
              <button
                className="p-1 text-red-500 hover:text-red-700 flex items-center justify-center min-w-8 h-8"
                onClick={() => removeExperience(exp.id)}
                title="Remove experience"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>

          {expandedId === exp.id && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) =>
                      handleChange(exp.id, "title", e.target.value)
                    }
                    placeholder="e.g., Software Engineer"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleChange(exp.id, "company", e.target.value)
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
                    value={exp.location}
                    onChange={(e) =>
                      handleChange(exp.id, "location", e.target.value)
                    }
                    placeholder="City, State/Country or Remote"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I currently work here
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleChange(exp.id, "startDate", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date {!exp.current && "*"}
                  </label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleChange(exp.id, "endDate", e.target.value)
                    }
                    disabled={exp.current}
                    required={!exp.current}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      exp.current ? "bg-gray-100" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    handleChange(exp.id, "description", e.target.value)
                  }
                  rows={3}
                  placeholder="Briefly describe your role and responsibilities"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Achievements
                </label>

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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <div className="mt-1 flex gap-2">
                            <button
                              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs rounded flex items-center"
                              onClick={saveEditedAchievement}
                            >
                              <FaCheck size={12} className="mr-1" /> Save
                            </button>
                            <button
                              className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 text-xs rounded flex items-center"
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
                            className="p-0 text-indigo-600 hover:text-indigo-800 ml-2 self-start mt-1 flex items-center justify-center min-w-5 h-5"
                            onClick={() =>
                              startEditingAchievement(
                                exp.id,
                                index,
                                achievement
                              )
                            }
                            title="Edit achievement"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            className="p-0 text-red-500 hover:text-red-700 ml-2 self-start mt-1 flex items-center justify-center min-w-5 h-5"
                            onClick={() => removeAchievement(exp.id, index)}
                            title="Remove achievement"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                <div className="flex mt-2">
                  <input
                    type="text"
                    value={newAchievement[exp.id] || ""}
                    onChange={(e) =>
                      handleAchievementChange(exp.id, e.target.value)
                    }
                    onKeyPress={(e) => handleAchievementKeyPress(e, exp.id)}
                    placeholder="Add a key achievement or responsibility"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md"
                    onClick={() => addAchievement(exp.id)}
                  >
                    Add
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Tip: Use action verbs and quantify results when possible
                  (e.g., "Increased sales by 20%")
                </p>
              </div>
            </>
          )}
        </div>
      ))}

      <button
        className="bg-vivid-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-md"
        onClick={addExperience}
      >
        Add Work Experience
      </button>

      <div className="mt-3 text-sm text-gray-500">
        <p>
          Tip: List your work experience in reverse-chronological order (most
          recent first) for better ATS performance.
        </p>
      </div>
    </div>
  );
}
