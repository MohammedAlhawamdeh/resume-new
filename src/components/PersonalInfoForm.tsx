"use client";

import { ResumeData } from "../types/resume";

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
    <div>
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <p className="text-gray-600 mb-4">
        Start by adding your personal details. This information will appear in
        the header of your resume.
      </p>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={personalInfo.title || ""}
              onChange={handleChange}
              required
              placeholder="e.g. Full Stack Developer"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="form-label">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 123-4567"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="form-label">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={personalInfo.location}
              onChange={handleChange}
              required
              placeholder="City, State/Province"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="linkedIn" className="form-label">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedIn"
              name="linkedIn"
              value={personalInfo.linkedIn || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="website" className="form-label">
              Website/Portfolio
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={personalInfo.website || ""}
              onChange={handleChange}
              placeholder="https://your-website.com"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="github" className="form-label">
              GitHub
            </label>
            <input
              type="url"
              id="github"
              name="github"
              value={personalInfo.github || ""}
              onChange={handleChange}
              placeholder="https://github.com/your-username"
              className="form-input"
            />
            <small className="text-gray-500 mt-1 block">
              Adding social links helps employers verify your work and connect
              with you.
            </small>
          </div>
        </div>
      </form>
    </div>
  );
}
