"use client";

import { useState } from "react";
import { Education } from "../types/resume";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

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
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Education</h2>

        {education.map((edu) => (
          <div key={edu.id} className="mb-4 border rounded p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-medium">
                {edu.institution
                  ? `${edu.institution} - ${edu.degree || "Degree"}`
                  : "New Education"}
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant="link"
                  className="p-0 text-primary"
                  onClick={() => toggleExpanded(edu.id)}
                >
                  {expandedId === edu.id ? "Collapse" : "Expand"}
                </Button>
                <Button
                  variant="link"
                  className="p-0 text-danger"
                  onClick={() => removeEducation(edu.id)}
                >
                  Remove
                </Button>
              </div>
            </div>

            {expandedId === edu.id && (
              <>
                <Row className="mb-3 g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium">
                        Institution *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleChange(edu.id, "institution", e.target.value)
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
                        value={edu.location}
                        onChange={(e) =>
                          handleChange(edu.id, "location", e.target.value)
                        }
                        placeholder="City, State/Country"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium">Degree *</Form.Label>
                      <Form.Control
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleChange(edu.id, "degree", e.target.value)
                        }
                        placeholder="e.g., Bachelor of Science, Master's"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-medium">
                        Field of Study *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={edu.field}
                        onChange={(e) =>
                          handleChange(edu.id, "field", e.target.value)
                        }
                        placeholder="e.g., Computer Science"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3 g-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-medium">
                        Start Date *
                      </Form.Label>
                      <Form.Control
                        type="month"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleChange(edu.id, "startDate", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-medium">End Date *</Form.Label>
                      <Form.Control
                        type="month"
                        value={edu.endDate}
                        onChange={(e) =>
                          handleChange(edu.id, "endDate", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="fw-medium">
                        GPA (Optional)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={edu.gpa || ""}
                        onChange={(e) =>
                          handleChange(edu.id, "gpa", e.target.value)
                        }
                        placeholder="e.g., 3.8/4.0"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
          </div>
        ))}

        <Button variant="primary" onClick={addEducation}>
          Add Education
        </Button>
      </Card.Body>
    </Card>
  );
}
