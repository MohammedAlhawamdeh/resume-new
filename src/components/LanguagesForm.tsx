"use client";

import { useState } from "react";
import { Language } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaPlus } from "react-icons/fa";

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

  // Common language proficiency levels
  const proficiencyLevels = [
    { value: "Native Speaker", label: "Native Speaker" },
    { value: "Fluent", label: "Fluent" },
    { value: "Advanced", label: "Advanced" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Basic", label: "Basic" },
  ];

  // Common languages
  const commonLanguages = [
    "English",
    "Spanish",
    "Mandarin Chinese",
    "Hindi",
    "Arabic",
    "French",
    "Bengali",
    "Russian",
    "Portuguese",
    "Japanese",
    "German",
    "Turkish",
    "Korean",
    "Italian",
    "Dutch",
    "Swedish",
  ];

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

  const addCommonLanguage = (language: string) => {
    if (
      !languages.some(
        (lang) => lang.name.toLowerCase() === language.toLowerCase()
      )
    ) {
      setNewLanguage(language);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Languages</h3>
      <p className="text-gray-600 mb-4">
        Add languages you speak and your proficiency level. This can set you
        apart from other candidates.
      </p>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label htmlFor="language-input" className="form-label">
              Language
            </label>
            <input
              id="language-input"
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a language (e.g., English, Spanish)"
              className="form-input"
              list="common-languages"
            />
            <datalist id="common-languages">
              {commonLanguages.map((language) => (
                <option key={language} value={language} />
              ))}
            </datalist>
          </div>
          <div className="md:col-span-4">
            <label htmlFor="proficiency-input" className="form-label">
              Proficiency
            </label>
            <select
              id="proficiency-input"
              value={newProficiency}
              onChange={(e) => setNewProficiency(e.target.value)}
              className="form-input"
            >
              <option value="">Select proficiency</option>
              {proficiencyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <button
            className="btn-primary flex items-center"
            onClick={handleAddLanguage}
            disabled={!newLanguage.trim() || !newProficiency.trim()}
          >
            <FaPlus size={12} className="mr-2" /> Add Language
          </button>
        </div>
      </div>

      {languages.length > 0 ? (
        <div className="mb-4 bg-gray-50 rounded-md p-3 border border-gray-200">
          <h4 className="text-sm font-medium mb-2">Your Languages</h4>
          {languages.map((language, index) => (
            <div key={index} className="mb-2 bg-white rounded-md p-2 shadow-sm">
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
                      className="form-input"
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
                      className="form-input"
                    >
                      <option value="">Proficiency</option>
                      {proficiencyLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="btn-primary !p-2 flex items-center justify-center"
                      onClick={saveEditedLanguage}
                      title="Save language"
                    >
                      <FaCheck size={14} />
                    </button>
                    <button
                      className="btn-ghost !p-2 flex items-center justify-center"
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
                      <span className="text-gray-500 ml-2 text-sm">
                        ({language.proficiency})
                      </span>
                    )}
                  </div>
                  <div className="flex">
                    <button
                      className="edit-btn !p-1"
                      onClick={() => startEditingLanguage(index, language)}
                      title="Edit language"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      className="delete-btn !p-1 ml-1"
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
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-4 text-center text-gray-500 mb-4">
          <p>No languages added yet</p>
        </div>
      )}

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Common Languages</h4>
        <div className="flex flex-wrap gap-2">
          {commonLanguages.slice(0, 8).map((language) => (
            <button
              key={language}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                languages.some((lang) => lang.name === language)
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 text-oxford-blue hover:bg-gray-200"
              }`}
              onClick={() => addCommonLanguage(language)}
              disabled={languages.some((lang) => lang.name === language)}
            >
              {language}
              {!languages.some((lang) => lang.name === language) && (
                <span className="ml-1">+</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
        <h4 className="font-medium mb-1 text-sm">
          Language Proficiency Guide:
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>
            <strong>Native Speaker:</strong> Your first language, with complete
            fluency
          </li>
          <li>
            <strong>Fluent:</strong> Near-native ability, comfortable in all
            situations
          </li>
          <li>
            <strong>Advanced:</strong> Comfortable with complex topics,
            occasional errors
          </li>
          <li>
            <strong>Intermediate:</strong> Can handle everyday conversations and
            situations
          </li>
          <li>
            <strong>Basic:</strong> Limited vocabulary and simple conversations
          </li>
        </ul>
      </div>
    </div>
  );
}
