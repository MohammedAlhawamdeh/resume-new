"use client";

import { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaPlus } from "react-icons/fa";

interface SkillsFormProps {
  skills: string[];
  updateSkills: (skills: string[]) => void;
}

export default function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("");
  const [editingSkill, setEditingSkill] = useState<{
    index: number | null;
    name: string;
  }>({ index: null, name: "" });

  // Common skill suggestions by category
  const skillSuggestions = {
    Technical: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "SQL",
      "CSS",
      "HTML",
      "MongoDB",
      "AWS",
      "Docker",
      "Kubernetes",
      "Git",
      "Redux",
      "REST API",
      "GraphQL",
      "Express.js",
      "Next.js",
      "Vue.js",
      "Angular",
      "C#",
      "C++",
      "PHP",
    ],
    "Soft Skills": [
      "Communication",
      "Teamwork",
      "Problem-solving",
      "Leadership",
      "Time management",
      "Critical thinking",
      "Adaptability",
      "Collaboration",
      "Project management",
      "Attention to detail",
      "Creativity",
      "Conflict resolution",
    ],
    Design: [
      "UI/UX Design",
      "Adobe XD",
      "Figma",
      "Photoshop",
      "Illustrator",
      "Wireframing",
      "Prototyping",
      "Responsive Design",
      "Accessibility",
    ],
  };

  const cleanSkills = skills.map((skill) => {
    return skill.replace(/\s*\(.+\)$/, "");
  });

  const addSkill = () => {
    if (newSkill.trim()) {
      updateSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      updateSkills([...skills, skill]);
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    updateSkills(updatedSkills);
  };

  const startEditingSkill = (index: number, skillName: string) => {
    setEditingSkill({ index, name: skillName });
  };

  const cancelEditingSkill = () => {
    setEditingSkill({ index: null, name: "" });
  };

  const saveEditedSkill = () => {
    if (editingSkill.index !== null && editingSkill.name.trim()) {
      const updatedSkills = [...skills];
      updatedSkills[editingSkill.index] = editingSkill.name.trim();
      updateSkills(updatedSkills);
      cancelEditingSkill();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      <p className="text-gray-600 mb-4">
        Add technical and soft skills relevant to the jobs you're applying for.
        Being specific about your skills helps match with job requirements.
      </p>

      {/* Skills list */}
      <div className="mb-4">
        {cleanSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-5 bg-gray-50 p-4 rounded-md border border-gray-200">
            {cleanSkills.map((skill, index) => (
              <div key={`skill-${index}`} className="mb-2">
                {editingSkill.index === index ? (
                  <div className="flex w-full gap-2">
                    <input
                      type="text"
                      value={editingSkill.name}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          name: e.target.value,
                        })
                      }
                      className="form-input"
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={saveEditedSkill}
                        className="btn-primary !p-2 flex items-center justify-center"
                      >
                        <FaCheck size={12} />
                      </button>
                      <button
                        onClick={cancelEditingSkill}
                        className="btn-ghost !p-2 flex items-center justify-center"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-full px-3 py-1">
                    <span className="text-gray-700 text-sm mr-2">{skill}</span>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => startEditingSkill(index, skill)}
                        className="edit-btn !p-1 !rounded-full"
                        title="Edit skill"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="delete-btn !p-1 !rounded-full ml-1"
                        title="Remove skill"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-5 text-center text-gray-500 mb-5">
            <p>
              Add skills that highlight your strengths and match job
              requirements
            </p>
          </div>
        )}
      </div>

      {/* Form to add new skills */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter a skill"
          className="form-input !rounded-r-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />
        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="btn-primary !rounded-l-none flex items-center"
        >
          <FaPlus size={12} className="mr-2" />
          Add
        </button>
      </div>

      {/* Skill suggestions */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3">Popular Skills by Category</h3>

        {Object.entries(skillSuggestions).map(([category, categorySkills]) => (
          <div key={category} className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSuggestedSkill(skill)}
                  disabled={skills.includes(skill)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${
                    skills.includes(skill)
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-100 text-oxford-blue hover:bg-gray-200"
                  }`}
                >
                  {skill}
                  {!skills.includes(skill) && <span className="ml-1">+</span>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
        <h4 className="font-medium text-blue-700 mb-1">Skills Tips:</h4>
        <ul className="list-disc pl-4 text-sm text-blue-800 space-y-1">
          <li>
            Include a mix of technical skills, soft skills, and tools you're
            proficient with
          </li>
          <li>
            Look at job descriptions for your target roles and include matching
            keywords
          </li>
          <li>
            Be specific with technical skills (e.g., "React.js" instead of just
            "JavaScript")
          </li>
          <li>
            Include skills at various expertise levels, but be honest about your
            proficiency
          </li>
          <li>
            ATS systems scan for skills, so include industry-standard
            terminology
          </li>
        </ul>
      </div>
    </div>
  );
}
