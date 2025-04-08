"use client";

import { useState } from "react";
import { Card, Form, Button, InputGroup } from "react-bootstrap";

interface SkillsFormProps {
  skills: string[];
  updateSkills: (skills: string[]) => void;
}

export default function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      updateSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    updateSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Skills</h2>

        <div className="mb-4">
          <Form.Group controlId="skill-input">
            <Form.Label className="fw-medium">Add Skills</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add relevant skills (e.g., JavaScript, Project Management)"
              />
              <Button variant="primary" onClick={handleAddSkill}>
                Add
              </Button>
            </InputGroup>
            <Form.Text className="text-muted">
              Press Enter to add a skill
            </Form.Text>
          </Form.Group>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-light rounded-pill px-3 py-1 fs-6 d-flex align-items-center"
            >
              <span>{skill}</span>
              <Button
                variant="link"
                size="sm"
                onClick={() => handleRemoveSkill(index)}
                className="ms-1 text-secondary p-0 border-0"
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-3 small text-secondary">
          <p>
            Tip: Include skills relevant to the job you're applying for. ATS
            systems scan for specific keywords.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
