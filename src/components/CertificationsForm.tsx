"use client";

import { useState } from "react";
import { Certification } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaPlus } from "react-icons/fa";

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

  // Popular certification examples
  const popularCertifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
    },
    { name: "Microsoft Azure Fundamentals", issuer: "Microsoft" },
    { name: "CompTIA Security+", issuer: "CompTIA" },
    { name: "Google Professional Cloud Architect", issuer: "Google Cloud" },
    { name: "Professional Scrum Master", issuer: "Scrum.org" },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
    },
    {
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute",
    },
    {
      name: "Certified Information Systems Security Professional",
      issuer: "ISC²",
    },
  ];

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
    if (editingCert.index !== null && editingCert.name.trim()) {
      // Only require name to be non-empty, issuer can be empty
      const updatedCertifications = [...certifications];

      updatedCertifications[editingCert.index] = {
        id: certifications[editingCert.index].id,
        name: editingCert.name.trim(),
        issuer: editingCert.issuer.trim(), // Even if empty, trim it
        date: editingCert.date.trim(),
      };

      // Update the state with the new array
      updateCertifications(updatedCertifications);

      // Reset the editing state
      cancelEditingCertification();
    }
  };

  const selectPopularCertification = (cert: {
    name: string;
    issuer: string;
  }) => {
    setNewCertification(cert.name);
    setNewIssuer(cert.issuer);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Certifications</h3>
      <p className="text-gray-600 mb-4">
        Add relevant professional certifications to demonstrate your expertise
        and ongoing professional development.
      </p>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label htmlFor="certification-input" className="form-label">
              Certification Name <span className="text-red-500">*</span>
            </label>
            <input
              id="certification-input"
              type="text"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., AWS Certified Solutions Architect"
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="issuer-input" className="form-label">
              Issuing Organization <span className="text-red-500">*</span>
            </label>
            <input
              id="issuer-input"
              type="text"
              value={newIssuer}
              onChange={(e) => setNewIssuer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Amazon Web Services"
              className="form-input"
            />
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="date-input" className="form-label">
            Date Obtained
          </label>
          <input
            id="date-input"
            type="text"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 2023 or March 2023"
            className="form-input"
          />
          <small className="text-gray-500 mt-1 block">
            Year or month/year is sufficient. You can also enter "In Progress"
            for certifications you're currently working on.
          </small>
        </div>
        <div className="mt-3">
          <button
            className="btn-primary flex items-center"
            onClick={handleAddCertification}
            disabled={!newCertification.trim() || !newIssuer.trim()}
          >
            <FaPlus size={12} className="mr-2" /> Add Certification
          </button>
        </div>
      </div>

      {/* List of added certifications */}
      {certifications.length > 0 ? (
        <div className="mb-4 bg-gray-50 rounded-md p-3 border border-gray-200">
          <h4 className="text-sm font-medium mb-2">Your Certifications</h4>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-3 bg-white rounded-md p-3 shadow-sm">
              {editingCert.index === index ? (
                <div>
                  <div className="mb-2">
                    <label className="form-label">
                      Certificate Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingCert.name}
                      onChange={(e) =>
                        setEditingCert({ ...editingCert, name: e.target.value })
                      }
                      placeholder="e.g., AWS Certified Solutions Architect"
                      required
                      autoFocus
                      className="form-input"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">
                      Issuing Organization{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
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
                      className="form-input"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Issue Date</label>
                    <input
                      type="text"
                      value={editingCert.date}
                      onChange={(e) =>
                        setEditingCert({
                          ...editingCert,
                          date: e.target.value,
                        })
                      }
                      placeholder="e.g., 2023"
                      className="form-input"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn-primary !py-1.5 !text-sm flex items-center"
                      onClick={saveEditedCertification}
                    >
                      <FaCheck size={12} className="mr-1" /> Save
                    </button>
                    <button
                      className="btn-ghost !py-1.5 !text-sm flex items-center"
                      onClick={cancelEditingCertification}
                    >
                      <FaTimes size={12} className="mr-1" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-500">
                        {cert.issuer}
                        {cert.date && ` • ${cert.date}`}
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        className="edit-btn !p-1"
                        onClick={() => startEditingCertification(index, cert)}
                        title="Edit certification"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        className="delete-btn !p-1 ml-1"
                        onClick={() => handleRemoveCertification(cert.id)}
                        title="Remove certification"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-4 text-center text-gray-500 mb-4">
          <p>No certifications added yet</p>
        </div>
      )}

      {/* Popular certification suggestions */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Popular Certifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {popularCertifications.slice(0, 6).map((cert, index) => (
            <button
              key={index}
              type="button"
              onClick={() => selectPopularCertification(cert)}
              className="text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm transition-colors"
            >
              <div className="font-medium">{cert.name}</div>
              <div className="text-xs text-gray-500">{cert.issuer}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
        <h4 className="font-medium text-blue-700 mb-1">Certification Tips:</h4>
        <ul className="list-disc pl-4 text-sm text-blue-800 space-y-1">
          <li>
            Include certifications that are relevant to your target position
          </li>
          <li>List your most prestigious or relevant certifications first</li>
          <li>
            Include certifications that are in progress, but label them as such
          </li>
          <li>
            Consider adding an expiration date for certifications that have them
          </li>
          <li>
            Technical roles benefit from technical certifications, while
            management roles benefit from project management certifications
          </li>
        </ul>
      </div>
    </div>
  );
}
