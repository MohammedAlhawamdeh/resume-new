"use client";

import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { Certification } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

interface CertificationsFormProps {
  certifications: Certification[];
  updateCertifications: (certifications: Certification[]) => void;
}

export default function CertificationsForm({
  certifications,
  updateCertifications,
}: CertificationsFormProps) {
  const [newCertification, setNewCertification] = useState("");
  const [newIssuer, setNewIssuer] = useState("");
  const [newDate, setNewDate] = useState("");
  const [editingCert, setEditingCert] = useState<{
    index: number | null;
    name: string;
    issuer: string;
    date: string;
  }>({ index: null, name: "", issuer: "", date: "" });

  const handleAddCertification = () => {
    if (newCertification.trim() && newIssuer.trim()) {
      updateCertifications([
        ...certifications,
        {
          id: uuidv4(),
          name: newCertification.trim(),
          issuer: newIssuer.trim(),
          date: newDate.trim(),
        },
      ]);
      setNewCertification("");
      setNewIssuer("");
      setNewDate("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCertification();
    }
  };

  const handleRemoveCertification = (id: string) => {
    updateCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const startEditingCertification = (
    index: number,
    cert: {
      name: string;
      issuer: string;
      date?: string;
    }
  ) => {
    setEditingCert({
      index,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date || "",
    });
  };

  const cancelEditingCertification = () => {
    setEditingCert({ index: null, name: "", issuer: "", date: "" });
  };

  const saveEditedCertification = () => {
    if (
      editingCert.index !== null &&
      editingCert.name.trim() &&
      editingCert.issuer.trim()
    ) {
      const updatedCertifications = [...certifications];
      updatedCertifications[editingCert.index] = {
        id: certifications[editingCert.index].id, // Preserve the existing ID
        name: editingCert.name.trim(),
        issuer: editingCert.issuer.trim(),
        date: editingCert.date.trim(),
      };
      updateCertifications(updatedCertifications);
      cancelEditingCertification();
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Professional Certifications</h2>

        <div className="mb-4">
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group controlId="certification-input">
                <Form.Label className="fw-medium">
                  Certification Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Advanced React and Redux"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="issuer-input">
                <Form.Label className="fw-medium">Issuer</Form.Label>
                <Form.Control
                  type="text"
                  value={newIssuer}
                  onChange={(e) => setNewIssuer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Udemy, Microsoft"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group controlId="date-input">
                <Form.Label className="fw-medium">Date (Year)</Form.Label>
                <Form.Control
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., 2023"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-2">
            <Button variant="primary" onClick={handleAddCertification}>
              Add Certification
            </Button>
          </div>
        </div>

        <div className="mb-3">
          {certifications.map((cert, index) => (
            <div key={index} className="mb-3 border-bottom pb-2">
              {editingCert.index === index ? (
                <div className="mb-3">
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-medium">
                      Certificate Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={editingCert.name}
                      onChange={(e) =>
                        setEditingCert({ ...editingCert, name: e.target.value })
                      }
                      placeholder="e.g., AWS Certified Solutions Architect"
                      required
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-medium">
                      Issuing Organization *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={editingCert.issuer}
                      onChange={(e) =>
                        setEditingCert({
                          ...editingCert,
                          issuer: e.target.value,
                        })
                      }
                      placeholder="e.g., Amazon Web Services"
                      required
                    />
                  </Form.Group>
                  <Row className="mb-2">
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="fw-medium">
                          Issue Date
                        </Form.Label>
                        <Form.Control
                          type="month"
                          value={editingCert.date}
                          onChange={(e) =>
                            setEditingCert({
                              ...editingCert,
                              date: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      className="d-flex align-items-center"
                      size="sm"
                      onClick={saveEditedCertification}
                    >
                      <FaCheck size={12} className="me-1" /> Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="d-flex align-items-center"
                      size="sm"
                      onClick={cancelEditingCertification}
                    >
                      <FaTimes size={12} className="me-1" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <div className="fw-medium">{cert.name}</div>
                      <div className="small text-muted">
                        {cert.issuer}
                        {cert.date && ` • ${cert.date}`}
                      </div>
                    </div>
                    <div className="d-flex">
                      <Button
                        variant="link"
                        className="p-1 text-primary"
                        onClick={() => startEditingCertification(index, cert)}
                        title="Edit certification"
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
                        onClick={() => handleRemoveCertification(cert.id)}
                        title="Remove certification"
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
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 small text-secondary">
          <p>
            Tip: Include relevant professional certifications that show your
            expertise and commitment to ongoing learning.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
