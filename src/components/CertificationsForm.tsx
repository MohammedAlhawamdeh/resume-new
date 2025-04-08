"use client";

import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { Certification } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";

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
          {certifications.map((certification) => (
            <div
              key={certification.id}
              className="bg-light rounded p-2 mb-2 d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{certification.name}</strong>
                {certification.issuer && <> • {certification.issuer}</>}
                {certification.date && <> • {certification.date}</>}
              </span>
              <Button
                variant="link"
                size="sm"
                onClick={() => handleRemoveCertification(certification.id)}
                className="text-secondary p-0 border-0"
              >
                ×
              </Button>
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
