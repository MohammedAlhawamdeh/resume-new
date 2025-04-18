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
    <div className="bg-white rounded-xl shadow-sm mb-4 p-6">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={personalInfo.location}
              onChange={handleChange}
              required
              placeholder="City, State/Province"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="linkedIn"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedIn"
              name="linkedIn"
              value={personalInfo.linkedIn || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Website/Portfolio
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={personalInfo.website || ""}
              onChange={handleChange}
              placeholder="https://your-website.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="github"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Github
            </label>
            <input
              type="url"
              id="github"
              name="github"
              value={personalInfo.github || ""}
              onChange={handleChange}
              placeholder="https://github.com/your-username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
