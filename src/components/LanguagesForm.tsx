"use client";

import { useState } from "react";
import { Card, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { Language } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";

interface LanguagesFormProps {
  languages: Language[];
  updateLanguages: (languages: Language[]) => void;
}

export default function LanguagesForm({
  languages,
  updateLanguages,
}: LanguagesFormProps) {
  const [newLanguage, setNewLanguage] = useState("");
  const [newProficiency, setNewProficiency] = useState("");

  const handleAddLanguage = () => {
    if (newLanguage.trim() && newProficiency.trim()) {
      const languageExists = languages.some(
        (lang) => lang.name.toLowerCase() === newLanguage.trim().toLowerCase()
      );

      if (!languageExists) {
        updateLanguages([
          ...languages,
          {
            id: uuidv4(),
            name: newLanguage.trim(),
            proficiency: newProficiency.trim(),
          },
        ]);
        setNewLanguage("");
        setNewProficiency("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  const handleRemoveLanguage = (id: string) => {
    updateLanguages(languages.filter((lang) => lang.id !== id));
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Languages</h2>

        <div className="mb-4">
          <Row>
            <Col md={8}>
              <Form.Group controlId="language-input">
                <Form.Label className="fw-medium">Language</Form.Label>
                <Form.Control
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a language (e.g., English, Spanish)"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="proficiency-input">
                <Form.Label className="fw-medium">Proficiency</Form.Label>
                <Form.Control
                  type="text"
                  value={newProficiency}
                  onChange={(e) => setNewProficiency(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Fluent, Native"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-2">
            <Button variant="primary" onClick={handleAddLanguage}>
              Add Language
            </Button>
          </div>
        </div>

        <div className="mb-3">
          {languages.map((language) => (
            <div
              key={language.id}
              className="bg-light rounded p-2 mb-2 d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{language.name}</strong>: {language.proficiency}
              </span>
              <Button
                variant="link"
                size="sm"
                onClick={() => handleRemoveLanguage(language.id)}
                className="text-secondary p-0 border-0"
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-3 small text-secondary">
          <p>
            Tip: Include language proficiency levels like "Native", "Fluent",
            "Intermediate", or "Basic".
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
