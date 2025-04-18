"use client";

import { useState } from "react";
import { Certification } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

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

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 p-6">
      <h2 className="text-xl font-bold mb-4">Professional Certifications</h2>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label
              htmlFor="certification-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Certification Name
            </label>
            <input
              id="certification-input"
              type="text"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Advanced React and Redux"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="issuer-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Issuer
            </label>
            <input
              id="issuer-input"
              type="text"
              value={newIssuer}
              onChange={(e) => setNewIssuer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Udemy, Microsoft"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label
              htmlFor="date-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date (Year)
            </label>
            <input
              id="date-input"
              type="text"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., 2023"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-3">
          <button
            className="bg-vivid-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-md"
            onClick={handleAddCertification}
          >
            Add Certification
          </button>
        </div>
      </div>

      <div className="mb-3">
        {certifications.map((cert, index) => (
          <div key={index} className="mb-3 border-b pb-2">
            {editingCert.index === index ? (
              <div className="mb-3">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate Name *
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization *
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="month"
                    value={editingCert.date}
                    onChange={(e) =>
                      setEditingCert({
                        ...editingCert,
                        date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-vivid-orange hover:bg-opacity-90 text-white text-sm px-3 py-1.5 rounded flex items-center"
                    onClick={saveEditedCertification}
                  >
                    <FaCheck size={12} className="mr-1" /> Save
                  </button>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded flex items-center"
                    onClick={cancelEditingCertification}
                  >
                    <FaTimes size={12} className="mr-1" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-gray-500">
                      {cert.issuer}
                      {cert.date && ` • ${cert.date}`}
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      className="p-1 text-vivid-orange bg-white flex items-center justify-center min-w-8 h-8"
                      onClick={() => startEditingCertification(index, cert)}
                      title="Edit certification"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      className="p-1 text-red-500 bg-white flex items-center justify-center min-w-8 h-8"
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

      <div className="mt-3 text-sm text-gray-500">
        <p>
          Tip: Include relevant professional certifications that show your
          expertise and commitment to ongoing learning.
        </p>
      </div>
    </div>
  );
}
