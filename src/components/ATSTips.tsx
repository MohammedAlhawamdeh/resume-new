"use client";

export default function ATSTips() {
  return (
    <div className="bg-info bg-opacity-10 border-start border-4 border-info text-primary p-4 mb-4 rounded">
      <h2 className="fs-5 fw-bold mb-2">ATS Compatibility Tips</h2>
      <ul className="ps-4">
        <li>Use standard section headings (Experience, Education, Skills)</li>
        <li>Stick with common fonts like Arial, Calibri, or Times New Roman</li>
        <li>Use simple formatting - avoid tables, text boxes, and columns</li>
        <li>
          Include keywords from the job description throughout your resume
        </li>
        <li>Use standard bullet points rather than custom symbols</li>
        <li>Save your final resume as a PDF to maintain formatting</li>
        <li>
          Keep your file name professional (FirstName_LastName_Resume.pdf)
        </li>
        <li>
          Include both hard skills (technical) and soft skills (communication)
        </li>
        <li>Use reverse chronological order for work history (newest first)</li>
      </ul>
    </div>
  );
}
