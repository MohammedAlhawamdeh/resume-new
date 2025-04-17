"use client";

import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
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
    <Card className="border-0 mb-4">
      <Card.Body className="p-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title">Skills</h2>
        </div>

        {/* Skills list with resume-now styling */}
        <div className="mb-4">
          {cleanSkills.length > 0 ? (
            <div className="skills-container">
              {cleanSkills.map((skill, index) => (
                <div key={`skill-${index}`} className="skill-item mb-2">
                  {editingSkill.index === index ? (
                    <div className="d-flex skill-edit-container">
                      <Form.Control
                        type="text"
                        value={editingSkill.name}
                        onChange={(e) =>
                          setEditingSkill({
                            ...editingSkill,
                            name: e.target.value,
                          })
                        }
                        className="skill-edit-input"
                        autoFocus
                      />
                      <div className="skill-edit-actions">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={saveEditedSkill}
                          className="action-btn save-btn"
                        >
                          <FaCheck size={12} />
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={cancelEditingSkill}
                          className="action-btn cancel-btn"
                        >
                          <FaTimes size={12} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="skill-display">
                      <span className="skill-text">{skill}</span>
                      <div className="skill-actions">
                        <button
                          type="button"
                          onClick={() => startEditingSkill(index, skill)}
                          className="skill-action-btn edit-btn"
                          title="Edit skill"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="skill-action-btn delete-btn"
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
            <div className="empty-state">
              <p>Add skills that highlight your strengths</p>
            </div>
          )}
        </div>

        {/* Form to add new skills with resume-now styling */}
        <div className="skill-add-container">
          <Form.Control
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill"
            className="skill-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button
            onClick={addSkill}
            className="skill-add-btn"
            disabled={!newSkill.trim()}
          >
            <FaPlus size={14} className="me-2" />
            Add
          </Button>
        </div>
      </Card.Body>

      <style jsx global>{`
        /* Resume-now inspired styling */
        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3e50;
          margin-bottom: 0;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .skill-item {
          margin-bottom: 5px;
          width: auto;
        }

        .skill-display {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #f7f9fc;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 8px 12px;
          width: 100%;
        }

        .skill-text {
          font-size: 0.95rem;
          color: #334155;
        }

        .skill-actions {
          display: flex;
          gap: 8px;
          opacity: 0.7;
        }

        .skill-display:hover .skill-actions {
          opacity: 1;
        }

        .skill-action-btn {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 2px;
        }

        .edit-btn:hover {
          color: #3b82f6;
        }

        .delete-btn:hover {
          color: #ef4444;
        }

        .skill-edit-container {
          width: 100%;
          gap: 8px;
        }

        .skill-edit-input {
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 0.95rem;
        }

        .skill-edit-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
        }

        .skill-edit-actions {
          display: flex;
          gap: 5px;
        }

        .action-btn {
          border-radius: 4px;
          padding: 6px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-btn {
          background-color: #10b981;
          border-color: #10b981;
        }

        .save-btn:hover {
          background-color: #059669;
          border-color: #059669;
        }

        .cancel-btn {
          background-color: #f1f5f9;
          border-color: #e2e8f0;
          color: #64748b;
        }

        .cancel-btn:hover {
          background-color: #e2e8f0;
          border-color: #cbd5e1;
        }

        .empty-state {
          background-color: #f7f9fc;
          border: 1px dashed #cbd5e1;
          border-radius: 4px;
          padding: 20px;
          text-align: center;
          color: #64748b;
        }

        .skill-add-container {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .skill-input {
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          padding: 10px 12px;
          font-size: 0.95rem;
        }

        .skill-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .skill-add-btn {
          background-color: #0284c7;
          border-color: #0284c7;
          color: white;
          border-radius: 4px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }

        .skill-add-btn:hover:not(:disabled) {
          background-color: #0369a1;
          border-color: #0369a1;
        }

        .skill-add-btn:disabled {
          background-color: #cbd5e1;
          border-color: #cbd5e1;
        }
      `}</style>
    </Card>
  );
}
