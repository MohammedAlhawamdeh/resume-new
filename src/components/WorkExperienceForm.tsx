"use client";

import { useState } from "react";
import { WorkExperience } from "../types/resume";
import { Card, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

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

  const startEditingAchievement = (expId: string, index: number, text: string) => {
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
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Work Experience</h2>

        {experiences.map((exp) => (
          <div key={exp.id} className="mb-4 border rounded p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-medium">
                {exp.title
                  ? `${exp.title} at ${exp.company || "Company"}`
                  : "New Experience"}
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant="link"
                  className="p-0 text-primary"
                  onClick={() => toggleExpanded(exp.id)}
                >
                  {expandedId === exp.id ? "Collapse" : "Expand"}
                </Button>
                <Button
                  variant="link"
                  className="p-0 text-danger"
                  onClick={() => removeExperience(exp.id)}
                >
                  Remove
                </Button>
              </div>
            </div>

            {expandedId === exp.id && (
              <>
                <Row className="mb-3 g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium">Job Title *</Form.Label>
                      <Form.Control
                        type="text"
                        value={exp.title}
                        onChange={(e) =>
                          handleChange(exp.id, "title", e.target.value)
                        }
                        placeholder="e.g., Software Engineer"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium">Company *</Form.Label>
                      <Form.Control
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleChange(exp.id, "company", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium">Location</Form.Label>
                      <Form.Control
                        type="text"
                        value={exp.location}
                        onChange={(e) =>
                          handleChange(exp.id, "location", e.target.value)
                        }
                        placeholder="City, State/Country or Remote"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <div className="d-flex align-items-center h-100 mt-4">
                      <Form.Check
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) =>
                          handleCurrentChange(exp.id, e.target.checked)
                        }
                        label="I currently work here"
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="mb-3 g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium">
                        Start Date *
                      </Form.Label>
                      <Form.Control
                        type="month"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleChange(exp.id, "startDate", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium">
                        End Date {!exp.current && "*"}
                      </Form.Label>
                      <Form.Control
                        type="month"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleChange(exp.id, "endDate", e.target.value)
                        }
                        disabled={exp.current}
                        required={!exp.current}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">Job Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={exp.description}
                    onChange={(e) =>
                      handleChange(exp.id, "description", e.target.value)
                    }
                    rows={3}
                    placeholder="Briefly describe your role and responsibilities"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium mb-2">
                    Key Achievements
                  </Form.Label>

                  {exp.achievements.map((achievement, index) => (
                    <div key={index} className="d-flex mb-2">
                      {editingAchievement.expId === exp.id && 
                       editingAchievement.index === index ? (
                        <div className="flex-grow-1 d-flex">
                          <span className="me-2 flex-shrink-0">•</span>
                          <div className="flex-grow-1">
                            <Form.Control
                              type="text"
                              value={editingAchievement.text}
                              onChange={(e) => setEditingAchievement({
                                ...editingAchievement,
                                text: e.target.value
                              })}
                              autoFocus
                            />
                            <div className="mt-1 d-flex gap-2">
                              <Button 
                                variant="success"
                                size="sm"
                                className="d-flex align-items-center py-1"
                                onClick={saveEditedAchievement}
                              >
                                <FaCheck size={12} className="me-1"/> Save
                              </Button>
                              <Button 
                                variant="secondary"
                                size="sm"
                                className="d-flex align-items-center py-1"
                                onClick={cancelEditingAchievement}
                              >
                                <FaTimes size={12} className="me-1"/> Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-grow-1 d-flex">
                            <span className="me-2 flex-shrink-0">•</span>
                            <span>{achievement}</span>
                          </div>
                          <div className="d-flex">
                            <Button
                              variant="link"
                              className="p-0 text-primary ms-2 align-self-start mt-1"
                              onClick={() => startEditingAchievement(exp.id, index, achievement)}
                              title="Edit achievement"
                              style={{ 
                                minWidth: '20px', 
                                height: '20px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}
                            >
                              <FaEdit size={14} />
                            </Button>
                            <Button
                              variant="link"
                              className="p-0 text-danger ms-2 align-self-start mt-1"
                              onClick={() => removeAchievement(exp.id, index)}
                              title="Remove achievement"
                              style={{ 
                                minWidth: '20px', 
                                height: '20px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}
                            >
                              <FaTrash size={14} />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                  <InputGroup className="mt-2">
                    <Form.Control
                      type="text"
                      value={newAchievement[exp.id] || ""}
                      onChange={(e) =>
                        handleAchievementChange(exp.id, e.target.value)
                      }
                      onKeyPress={(e) => handleAchievementKeyPress(e, exp.id)}
                      placeholder="Add a key achievement or responsibility"
                    />
                    <Button
                      variant="primary"
                      onClick={() => addAchievement(exp.id)}
                    >
                      Add
                    </Button>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Tip: Use action verbs and quantify results when possible
                    (e.g., "Increased sales by 20%")
                  </Form.Text>
                </Form.Group>
              </>
            )}
          </div>
        ))}

        <Button variant="primary" onClick={addExperience}>
          Add Work Experience
        </Button>

        <div className="mt-3 small text-secondary">
          <p>
            Tip: List your work experience in reverse-chronological order (most
            recent first) for better ATS performance.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
