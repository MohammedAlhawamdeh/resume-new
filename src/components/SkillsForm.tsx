"use client";

import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

interface SkillsFormProps {
  skills: string[];
  updateSkills: (skills: string[]) => void;
}

export default function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  // State for new skill input
  const [newSkill, setNewSkill] = useState("");
  const [editingSkill, setEditingSkill] = useState<{
    index: number | null;
    name: string;
  }>({ index: null, name: "" });

  // Clean skills to remove any level information
  const cleanSkills = skills.map((skill) => {
    // Remove any level information in parentheses
    return skill.replace(/\s*\(.+\)$/, '');
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
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Skills</h2>

        {/* All Skills in a single list */}
        <div className="mb-4">
          <div>
            {cleanSkills.map((skill, index) => {
              return (
                <div key={`skill-${index}`} className="mb-2">
                  {editingSkill.index === index ? (
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
                      <Button
                        variant="success"
                        size="sm"
                        onClick={saveEditedSkill}
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "38px", height: "38px" }}
                      >
                        <FaCheck size={14} />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={cancelEditingSkill}
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "38px", height: "38px" }}
                      >
                        <FaTimes size={14} />
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-1">
                      <div>
                        <span className="fw-medium">{skill}</span>
                      </div>
                      <div className="d-flex">
                        <Button
                          variant="link"
                          className="p-1 text-primary"
                          onClick={() =>
                            startEditingSkill(index, skill)
                          }
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
                          onClick={() => removeSkill(index)}
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
            <Col md={9}>
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
