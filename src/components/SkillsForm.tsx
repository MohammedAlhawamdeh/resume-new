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

  const cleanSkills = skills.map((skill) => {
    return skill.replace(/\s*\(.+\)$/, "");
  });

  const addSkill = () => {
    if (newSkill.trim()) {
      updateSkills([...skills, newSkill.trim()]);
      setNewSkill("");
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
    <div className="bg-white rounded-xl shadow-sm mb-4 p-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Skills</h2>
      </div>

      {/* Skills list */}
      <div className="mb-4">
        {cleanSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-5">
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
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={saveEditedSkill}
                        className="bg-vivid-orange hover:bg-opacity-90 text-white rounded-md p-2 flex items-center justify-center"
                      >
                        <FaCheck size={12} />
                      </button>
                      <button
                        onClick={cancelEditingSkill}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md p-2 flex items-center justify-center"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2 w-full group">
                    <span className="text-gray-700 text-sm">{skill}</span>
                    <div className="flex gap-2 opacity-70 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => startEditingSkill(index, skill)}
                        className="text-gray-500 hover:text-vivid-orange p-1"
                        title="Edit skill"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-gray-500 hover:text-red-600 p-1"
                        title="Remove skill"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-5 text-center text-gray-500 mb-5">
            <p>Add skills that highlight your strengths</p>
          </div>
        )}
      </div>

      {/* Form to add new skills */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter a skill"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
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
          className="bg-vivid-orange hover:bg-opacity-90 disabled:bg-gray-300 text-white px-4 py-2 rounded-md flex items-center justify-center"
        >
          <FaPlus size={14} className="mr-2" />
          Add
        </button>
      </div>
    </div>
  );
}
