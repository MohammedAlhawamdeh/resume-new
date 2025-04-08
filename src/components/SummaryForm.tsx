"use client";

import { Card, Form } from "react-bootstrap";

interface SummaryFormProps {
  summary: string;
  updateSummary: (summary: string) => void;
}

export default function SummaryForm({
  summary,
  updateSummary,
}: SummaryFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummary(e.target.value);
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">Professional Summary</h2>
        <Form.Group controlId="summary">
          <Form.Label className="fw-medium">Summary</Form.Label>
          <Form.Control
            as="textarea"
            value={summary}
            onChange={handleChange}
            rows={4}
            placeholder="Brief overview of your professional background, key strengths, and career goals (2-4 sentences recommended)"
          />
          <Form.Text className="text-muted">
            Tip: Tailor your summary to highlight relevant skills and experience
            for the position you're applying to. Include keywords from the job
            description for better ATS performance.
          </Form.Text>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
