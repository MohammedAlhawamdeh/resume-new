"use client";

import { useState } from "react";
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

  const startEditingLanguage = (index: number, lang: Language) => {
    setEditingLanguage({
      index,
      language: lang.name,
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
        id: languages[editingLanguage.index].id,
        name: editingLanguage.language.trim(),
        proficiency: editingLanguage.proficiency,
      };
      updateLanguages(updatedLanguages);
      cancelEditingLanguage();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 p-6">
      <h2 className="text-xl font-bold mb-4">Languages</h2>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label
              htmlFor="language-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Language
            </label>
            <input
              id="language-input"
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a language (e.g., English, Spanish)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>
          <div className="md:col-span-4">
            <label
              htmlFor="proficiency-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Proficiency
            </label>
            <input
              id="proficiency-input"
              type="text"
              value={newProficiency}
              onChange={(e) => setNewProficiency(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Fluent, Native"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-3">
          <button
            className="bg-vivid-orange hover:bg-opacity-90 text-white px-4 py-2 rounded-md"
            onClick={handleAddLanguage}
          >
            Add Language
          </button>
        </div>
      </div>

      <div className="mb-3">
        {languages.map((language, index) => (
          <div key={index} className="mb-2">
            {editingLanguage.index === index ? (
              <div className="flex gap-2">
                <div className="flex-grow mr-2">
                  <input
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
                  />
                </div>
                <div className="w-36 mr-2">
                  <select
                    value={editingLanguage.proficiency}
                    onChange={(e) =>
                      setEditingLanguage({
                        ...editingLanguage,
                        proficiency: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vivid-orange focus:border-transparent"
                  >
                    <option value="">Proficiency (optional)</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Limited Working">Limited Working</option>
                    <option value="Professional Working">
                      Professional Working
                    </option>
                    <option value="Full Professional">Full Professional</option>
                    <option value="Native/Bilingual">Native/Bilingual</option>
                  </select>
                </div>
                <div className="flex gap-1">
                  <button
                    className="bg-vivid-orange hover:bg-opacity-90 text-white w-10 h-10 rounded-md flex items-center justify-center"
                    onClick={saveEditedLanguage}
                    title="Save language"
                  >
                    <FaCheck size={14} />
                  </button>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-10 h-10 rounded-md flex items-center justify-center"
                    onClick={cancelEditingLanguage}
                    title="Cancel edit"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{language.name}</span>{" "}
                  {language.proficiency && (
                    <small className="text-gray-500 ml-2">
                      ({language.proficiency})
                    </small>
                  )}
                </div>
                <div className="flex">
                  <button
                    className="p-1 text-vivid-orange bg-white flex items-center justify-center min-w-8 h-8"
                    onClick={() => startEditingLanguage(index, language)}
                    title="Edit language"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    className="p-1 text-red-500 bg-white flex items-center justify-center min-w-8 h-8"
                    onClick={() => handleRemoveLanguage(language.id)}
                    title="Remove language"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 text-sm text-gray-500">
        <p>
          Tip: Include language proficiency levels like "Native", "Fluent",
          "Intermediate", or "Basic".
        </p>
      </div>
    </div>
  );
}
