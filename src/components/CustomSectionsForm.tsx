"use client";

import { useState } from "react";
import { CustomSection } from "@/types/resume";
import { v4 as uuidv4 } from "uuid";
import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaPlus,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { useToast } from "./ToastContext";
import dynamic from "next/dynamic";

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface CustomSectionsFormProps {
  customSections: CustomSection[];
  updateCustomSections: (customSections: CustomSection[]) => void;
}

export default function CustomSectionsForm({
  customSections,
  updateCustomSections,
}: CustomSectionsFormProps) {
  // Form state
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  
  // Editing state - separate state variables for title and content editing
  const [editingSectionTitleId, setEditingSectionTitleId] = useState<string | null>(null);
  const [editingSectionContentId, setEditingSectionContentId] = useState<string | null>(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");
  
  // Form validation
  const [titleError, setTitleError] = useState("");
  
  // Constants
  const MAX_SECTION_TITLE_LENGTH = 100;
  
  // Use the toast context
  const { addToast } = useToast();

  // Common section templates
  const sectionTemplates = [
    { title: "Projects", icon: "🚀" },
    { title: "Certifications", icon: "🏆" },
    { title: "Publications", icon: "📝" },
    { title: "Volunteering", icon: "🤝" },
    { title: "Awards", icon: "🎖️" },
  ];

  // Quill editor modules and formats configuration
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean']
    ],
  };
  
  const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet', 
    'link'
  ];

  // Add a new custom section with an empty content
  const addCustomSection = () => {
    if (!newSectionTitle.trim()) {
      setTitleError("Section title is required");
      return;
    }
    
    if (newSectionTitle.length > MAX_SECTION_TITLE_LENGTH) {
      setTitleError(`Section title must be ${MAX_SECTION_TITLE_LENGTH} characters or less`);
      return;
    }
    
    setTitleError("");
    const newSectionId = uuidv4();
    
    // Create a new section with empty content
    const newSection: CustomSection = {
      id: newSectionId,
      title: newSectionTitle.trim(),
      items: [{
        id: uuidv4(),
        fields: {
          content: "" // Single rich text content field
        }
      }]
    };
    
    updateCustomSections([...customSections, newSection]);
    setNewSectionTitle("");
    setExpandedSectionId(newSectionId); // Auto-expand the new section
    addToast("New section added", "success");
  };
  
  // Create a section from template
  const createSectionFromTemplate = (templateTitle: string) => {
    const newSectionId = uuidv4();
    
    // Create a new section with the template title and empty content
    const newSection: CustomSection = {
      id: newSectionId,
      title: templateTitle,
      items: [{
        id: uuidv4(),
        fields: {
          content: "" // Single rich text content field
        }
      }]
    };
    
    updateCustomSections([...customSections, newSection]);
    setExpandedSectionId(newSectionId); // Auto-expand the new section
    addToast(`${templateTitle} section added`, "success");
  };

  // Remove a custom section
  const removeCustomSection = (id: string) => {
    updateCustomSections(customSections.filter((section) => section.id !== id));
    addToast("Section removed", "info");
  };

  // Toggle section expansion
  const toggleSection = (id: string) => {
    setExpandedSectionId(expandedSectionId === id ? null : id);
  };

  // Start editing a section title
  const startEditingSection = (id: string, title: string) => {
    setEditingSectionTitleId(id);
    setEditingSectionTitle(title);
  };

  // Cancel editing a section title
  const cancelEditingSection = () => {
    setEditingSectionTitleId(null);
    setEditingSectionTitle("");
  };

  // Save edited section title
  const saveEditedSection = () => {
    if (!editingSectionTitle.trim()) {
      addToast("Section title cannot be empty", "error");
      return;
    }
    
    if (editingSectionTitle.length > MAX_SECTION_TITLE_LENGTH) {
      addToast(`Section title must be ${MAX_SECTION_TITLE_LENGTH} characters or less`, "error");
      return;
    }
    
    if (editingSectionTitleId) {
      const updatedSections = customSections.map((section) =>
        section.id === editingSectionTitleId
          ? { ...section, title: editingSectionTitle.trim() }
          : section
      );
      updateCustomSections(updatedSections);
      cancelEditingSection();
      addToast("Section title updated", "success");
    }
  };

  // Start editing content for a section
  const startEditingContent = (sectionId: string) => {
    const section = customSections.find(s => s.id === sectionId);
    if (!section || section.items.length === 0) return;
    
    // Get the content from the first item (we only use one item per section in this simplified model)
    const content = section.items[0].fields.content || "";
    setEditingContent(content);
    setEditingSectionContentId(sectionId);
  };
  
  // Save edited content
  const saveEditedContent = (sectionId: string) => {
    const section = customSections.find(s => s.id === sectionId);
    if (!section || section.items.length === 0) return;
    
    const itemId = section.items[0].id;
    
    const updatedSections = customSections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: [{
            id: itemId,
            fields: {
              content: editingContent
            }
          }]
        };
      }
      return section;
    });
    
    updateCustomSections(updatedSections);
    setEditingSectionContentId(null);
    setEditingContent("");
    addToast("Section content updated", "success");
  };
  
  // Cancel editing content
  const cancelEditingContent = () => {
    setEditingSectionContentId(null);
    setEditingContent("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Custom Sections</h3>
      <p className="text-gray-600 mb-4">
        Add custom sections to highlight skills, projects, or achievements that don't fit in the standard categories.
      </p>

      {/* Quick templates for common section types */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Quick Add</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {sectionTemplates.map((template) => (
            <button
              key={template.title}
              onClick={() => createSectionFromTemplate(template.title)}
              className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
            >
              <span className="text-2xl mb-1">{template.icon}</span>
              <span className="text-sm font-medium">{template.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom section title input */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Create Custom Section</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSectionTitle}
            onChange={(e) => {
              setNewSectionTitle(e.target.value);
              if (titleError) setTitleError("");
            }}
            placeholder="Enter section title (e.g., Leadership, Patents)"
            className={`form-input flex-grow ${titleError ? 'border-red-500' : ''}`}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomSection();
              }
            }}
          />
          <button
            className="btn-primary flex items-center whitespace-nowrap"
            onClick={addCustomSection}
            disabled={!newSectionTitle.trim()}
          >
            <FaPlus size={12} className="mr-2" /> Add Section
          </button>
        </div>
        {titleError && <p className="text-red-500 text-xs mt-1">{titleError}</p>}
      </div>

      {/* List of existing custom sections */}
      {customSections.length > 0 ? (
        <div>
          <h4 className="text-sm font-medium mb-3">Your Custom Sections</h4>
          {customSections.map((section) => (
            <div
              key={section.id}
              className="mb-4 border border-gray-200 rounded-md overflow-hidden"
            >
              {/* Section header */}
              <div 
                className={`flex justify-between items-center p-3 cursor-pointer ${
                  expandedSectionId === section.id ? 'bg-gray-100' : 'bg-gray-50'
                }`}
                onClick={() => toggleSection(section.id)}
              >
                {editingSectionTitleId === section.id ? (
                  <div className="flex flex-grow gap-2">
                    <input
                      type="text"
                      value={editingSectionTitle}
                      onChange={(e) => setEditingSectionTitle(e.target.value)}
                      className="form-input flex-grow"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      className="btn-primary !py-1.5 !text-sm flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveEditedSection();
                      }}
                    >
                      <FaCheck size={12} className="mr-1" /> Save
                    </button>
                    <button
                      className="btn-ghost !py-1.5 !text-sm flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelEditingSection();
                      }}
                    >
                      <FaTimes size={12} className="mr-1" /> Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      <h5 className="font-semibold">{section.title}</h5>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="p-1 text-gray-500 hover:text-oxford-blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditingSection(section.id, section.title);
                        }}
                        title="Rename section"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCustomSection(section.id);
                        }}
                        title="Remove section"
                      >
                        <FaTrash size={14} />
                      </button>
                      {expandedSectionId === section.id ? (
                        <FaChevronUp size={14} className="text-gray-500" />
                      ) : (
                        <FaChevronDown size={14} className="text-gray-500" />
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Section content - only shown when expanded */}
              {expandedSectionId === section.id && (
                <div className="p-3 bg-white">
                  {/* Section content editor */}
                  {editingSectionContentId === section.id ? (
                    <div className="space-y-3">
                      <div className="quill-container">
                        <ReactQuill
                          value={editingContent}
                          onChange={setEditingContent}
                          modules={modules}
                          formats={formats}
                          placeholder="Enter content here... You can add formatting, lists, and links using the toolbar above."
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="btn-primary !py-1.5 !text-sm flex items-center"
                          onClick={() => saveEditedContent(section.id)}
                        >
                          <FaCheck size={12} className="mr-1" /> Save
                        </button>
                        <button
                          className="btn-ghost !py-1.5 !text-sm flex items-center"
                          onClick={cancelEditingContent}
                        >
                          <FaTimes size={12} className="mr-1" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium w-full">
                          {section.items[0].fields.content ? (
                            <div
                              dangerouslySetInnerHTML={{ __html: section.items[0].fields.content }}
                              className="prose max-w-none"
                            />
                          ) : (
                            <span className="text-gray-400">No content added</span>
                          )}
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          <button
                            className="p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full flex items-center justify-center"
                            onClick={() => startEditingContent(section.id)}
                            title="Edit content"
                          >
                            <FaEdit size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500 mb-4">
          <p className="mb-2">No custom sections added yet</p>
          <p className="text-sm">Use the Quick Add buttons above or create your own custom section</p>
        </div>
      )}

      <div className="mt-5 p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
        <h4 className="font-medium text-blue-700 mb-1">
          Custom Sections Tips:
        </h4>
        <ul className="list-disc pl-4 text-sm text-blue-800 space-y-1">
          <li>
            Use custom sections for projects, publications, patents, or volunteer work
          </li>
          <li>Each entry should have a clear title that stands out</li>
          <li>Include dates to show timeline and relevance</li>
          <li>
            Keep descriptions concise and highlight your contributions
          </li>
          <li>
            Order sections by relevance to the position you're applying for
          </li>
        </ul>
      </div>
    </div>
  );
}
