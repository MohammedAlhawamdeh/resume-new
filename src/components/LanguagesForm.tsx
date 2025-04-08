"use client";

import { useState } from "react";
import { Card, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { Language } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

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
  const [editingLanguage, setEditingLanguage] = useState<{
    index: number | null;
    language: string;
    proficiency: string;
  }>({ index: null, language: "", proficiency: "" });

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

  const startEditingLanguage = (
    index: number,
    lang: Language
  ) => {
    setEditingLanguage({
      index,
      language: lang.name, // Fixed: using lang.name instead of lang.language
      proficiency: lang.proficiency || "",
    });
  };

  const cancelEditingLanguage = () => {
    setEditingLanguage({ index: null, language: "", proficiency: "" });
  };

  const saveEditedLanguage = () => {
    if (editingLanguage.index !== null && editingLanguage.language.trim()) {
      const updatedLanguages = [...languages];
      updatedLanguages[editingLanguage.index] = {
        id: languages[editingLanguage.index].id, // Preserve the existing ID
        name: editingLanguage.language.trim(), // Fixed: using name instead of language
        proficiency: editingLanguage.proficiency,
      };
      updateLanguages(updatedLanguages);
      cancelEditingLanguage();
    }
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
          {languages.map((language, index) => (
            <div key={index} className="mb-2">
              {editingLanguage.index === index ? (
                <div className="d-flex gap-2">
                  <Form.Group className="flex-grow-1 me-2">
                    <Form.Control
                      type="text"
                      value={editingLanguage.language}
                      onChange={(e) =>
                        setEditingLanguage({
                          ...editingLanguage,
                          language: e.target.value,
                        })
                      }
                      placeholder="Language name"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="me-2" style={{ width: "150px" }}>
                    <Form.Select
                      value={editingLanguage.proficiency}
                      onChange={(e) =>
                        setEditingLanguage({
                          ...editingLanguage,
                          proficiency: e.target.value,
                        })
                      }
                    >
                      <option value="">Proficiency (optional)</option>
                      <option value="Elementary">Elementary</option>
                      <option value="Limited Working">Limited Working</option>
                      <option value="Professional Working">
                        Professional Working
                      </option>
                      <option value="Full Professional">
                        Full Professional
                      </option>
                      <option value="Native/Bilingual">Native/Bilingual</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="d-flex gap-1">
                    <Button
                      variant="success"
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: "38px", height: "38px" }}
                      onClick={saveEditedLanguage}
                      title="Save language"
                    >
                      <FaCheck size={14} />
                    </Button>
                    <Button
                      variant="secondary"
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: "38px", height: "38px" }}
                      onClick={cancelEditingLanguage}
                      title="Cancel edit"
                    >
                      <FaTimes size={14} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-medium">{language.name}</span> {/* Fixed: using language.name */}
                    {language.proficiency && (
                      <small className="text-muted ms-2">
                        ({language.proficiency})
                      </small>
                    )}
                  </div>
                  <div className="d-flex">
                    <Button
                      variant="link"
                      className="p-1 text-primary"
                      onClick={() => startEditingLanguage(index, language)}
                      title="Edit language"
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
                      onClick={() => handleRemoveLanguage(language.id)}
                      title="Remove language"
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
