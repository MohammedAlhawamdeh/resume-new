"use client";

import { ResumeData } from "../types/resume";
import { Form, Row, Col, Card } from "react-bootstrap";

interface PersonalInfoFormProps {
  personalInfo: ResumeData["personalInfo"];
  updatePersonalInfo: (info: ResumeData["personalInfo"]) => void;
}

export default function PersonalInfoForm({
  personalInfo,
  updatePersonalInfo,
}: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Personal Information</h2>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={personalInfo.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone *</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location *</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={personalInfo.location}
                  onChange={handleChange}
                  required
                  placeholder="City, State/Province"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="linkedIn">
                <Form.Label>LinkedIn URL</Form.Label>
                <Form.Control
                  type="url"
                  name="linkedIn"
                  value={personalInfo.linkedIn || ""}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="website">
                <Form.Label>Website/Portfolio</Form.Label>
                <Form.Control
                  type="url"
                  name="website"
                  value={personalInfo.website || ""}
                  onChange={handleChange}
                  placeholder="https://your-website.com"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="github">
                <Form.Label>Github</Form.Label>
                <Form.Control
                  type="url"
                  name="github"
                  value={personalInfo.github || ""}
                  onChange={handleChange}
                  placeholder="https://github.com/your-username"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
