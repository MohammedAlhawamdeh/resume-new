"use client";

import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

interface SkillWithLevel {
  name: string;
  level: string;
}

interface SkillsFormProps {
  skills: string[];
  updateSkills: (skills: string[]) => void;
}

export default function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  // State for new skill input
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [editingSkill, setEditingSkill] = useState<{
    index: number | null;
    name: string;
    level: string;
  }>({ index: null, name: "", level: "" });

  // Convert the array of skill strings to array of skill objects with name and level
  const skillsWithLevels: SkillWithLevel[] = skills.map((skill) => {
    // Extract the level if it's already in the format "Skill (Level)"
    const match = skill.match(/(.+?)\s*\((.+?)\)$/);
    if (match) {
      return { name: match[1], level: match[2] };
    }

    // Determine level based on common patterns
    let level = "";
    if (skill.includes("Advanced") || skill.includes("Expert")) {
      level = "Expert";
    } else if (
      skill.includes("React") ||
      skill.includes("TypeScript") ||
      skill.includes("JavaScript") ||
      skill.includes("NodeJs")
    ) {
      level = "Advanced";
    } else if (
      skill.includes("Testing") ||
      skill.includes("CI/CD") ||
      skill.includes("DevOps")
    ) {
      level = "Intermediate";
    }

    return { name: skill, level };
  });

  const addSkill = () => {
    if (newSkill.trim()) {
      const skillToAdd = newLevel
        ? `${newSkill.trim()} (${newLevel})`
        : newSkill.trim();

      updateSkills([...skills, skillToAdd]);
      setNewSkill("");
      setNewLevel("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    updateSkills(updatedSkills);
  };

  const startEditingSkill = (index: number, skill: SkillWithLevel) => {
    setEditingSkill({ index, name: skill.name, level: skill.level || "" });
  };

  const cancelEditingSkill = () => {
    setEditingSkill({ index: null, name: "", level: "" });
  };

  const saveEditedSkill = () => {
    if (editingSkill.index !== null && editingSkill.name.trim()) {
      const updatedSkills = [...skills];
      const skillToSave = editingSkill.level
        ? `${editingSkill.name.trim()} (${editingSkill.level})`
        : editingSkill.name.trim();

      updatedSkills[editingSkill.index] = skillToSave;
      updateSkills(updatedSkills);
      cancelEditingSkill();
    }
  };

  // Helper function to find the original index of a skill in the skills array
  const findSkillIndex = (skillName: string): number => {
    return skills.findIndex(
      (skill) => skill === skillName || skill.startsWith(`${skillName} (`)
    );
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Skills</h2>

        {/* All Skills in a single list */}
        <div className="mb-4">
          <div>
            {skillsWithLevels.map((skill, index) => {
              const originalIndex = findSkillIndex(skill.name);
              return (
                <div key={`skill-${index}`} className="mb-2">
                  {editingSkill.index === originalIndex ? (
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        size="sm"
                        value={editingSkill.name}
                        onChange={(e) =>
                          setEditingSkill({
                            ...editingSkill,
                            name: e.target.value,
                          })
                        }
                      />
                      <Form.Select
                        size="sm"
                        value={editingSkill.level}
                        onChange={(e) =>
                          setEditingSkill({
                            ...editingSkill,
                            level: e.target.value,
                          })
                        }
                      >
                        <option value="">No Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </Form.Select>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={saveEditedSkill}
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: '38px', height: '38px' }}
                      >
                        <FaCheck size={14} />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={cancelEditingSkill}
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: '38px', height: '38px' }}
                      >
                        <FaTimes size={14} />
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-1">
                      <div>
                        <span className="fw-medium">{skill.name}</span>
                        {skill.level && (
                          <small className="text-muted ms-2">({skill.level})</small>
                        )}
                      </div>
                      <div className="d-flex">
                        <Button
                          variant="link"
                          className="p-1 text-primary"
                          onClick={() => startEditingSkill(originalIndex, skill)}
                          title="Edit skill"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "32px",
                            height: "32px",
                          }}
                        >
                          <FaEdit size={14} />
                        </Button>
                        <Button
                          variant="link"
                          className="p-1 text-danger"
                          onClick={() => removeSkill(originalIndex)}
                          title="Remove skill"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "32px",
                            height: "32px",
                          }}
                        >
                          <FaTrash size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form to add new skills */}
        <Form className="mt-3">
          <Row className="align-items-end">
            <Col md={5}>
              <Form.Group>
                <Form.Label className="fw-medium">Add Skill</Form.Label>
                <Form.Control
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., JavaScript"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-medium">Level (Optional)</Form.Label>
                <Form.Select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Button variant="primary" onClick={addSkill} className="w-100">
                Add Skill
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
