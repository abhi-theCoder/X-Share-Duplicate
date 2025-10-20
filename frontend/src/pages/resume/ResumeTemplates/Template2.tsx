import React from "react";

interface EducationItem {
  degree: string;
  college: string;
  year: string;
  marks: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description?: string;
}

interface ProjectItem {
  name: string;
  link: string;
  description: string;
}

interface ResumeForm {
  name: string;
  email: string;
  title: string;
  summary: string;
  profilePreview?: string | null;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: string[];
  languages: string[];
  links: { linkedin?: string; github?: string };
  address?: string;
}

interface TemplateProps {
  formData: ResumeForm;
}

const Template2: React.FC<TemplateProps> = ({ formData }) => {
  return (
    <div className="a4-template bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
        <div className="flex items-center gap-6">
          {formData.profilePreview && (
            <img
              src={formData.profilePreview}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white border-opacity-30 object-cover"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{formData.name}</h1>
            <h2 className="text-xl opacity-90">{formData.title}</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-blue-600 font-bold text-lg uppercase tracking-wide mb-3 border-b-2 border-gray-200 pb-1">
              Professional Summary
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-gray-700 text-sm leading-relaxed">{formData.summary}</p>
            </div>
          </div>

          {/* Experience */}
          {formData.experience.length > 0 && (
            <div>
              <h3 className="text-blue-600 font-bold text-lg uppercase tracking-wide mb-3 border-b-2 border-gray-200 pb-1">
                Work Experience
              </h3>
              <div className="space-y-4">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="relative pl-5">
                    <div className="absolute left-0 top-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="font-semibold text-gray-800 text-sm">{exp.role}</div>
                    <div className="text-gray-600 text-xs mb-1">{exp.company} | {exp.duration}</div>
                    {exp.description && <div className="text-gray-700 text-sm">{exp.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && (
            <div>
              <h3 className="text-blue-600 font-bold text-lg uppercase tracking-wide mb-3 border-b-2 border-gray-200 pb-1">
                Key Projects
              </h3>
              <div className="space-y-4">
                {formData.projects.map((project, index) => (
                  <div key={index} className="relative pl-5">
                    <div className="absolute left-0 top-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="font-semibold text-gray-800 text-sm">{project.name}</div>
                    {project.link && <div className="text-gray-600 text-xs">{project.link}</div>}
                    <div className="text-gray-700 text-sm mt-1">{project.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Contact */}
          <div>
            <h3 className="text-blue-600 font-bold text-lg uppercase tracking-wide mb-3 border-b-2 border-gray-200 pb-1">
              Contact
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>{formData.email}</span>
              </div>
              {formData.address && (
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{formData.address}</span>
                </div>
              )}
              {formData.links?.linkedin && (
                <div className="flex items-center gap-2">
                  <span>🔗</span>
                  <span className="truncate">{formData.links.linkedin}</span>
                </div>
              )}
              {formData.links?.github && (
                <div className="flex items-center gap-2">
                  <span>🔗</span>
                  <span className="truncate">{formData.links.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {formData.skills.length > 0 && (
            <div>
              <h3 className="text-blue-600 font-bold text-lg uppercase tracking-wide mb-3 border-b-2 border-gray-200 pb-1">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {formData.education.length > 0 && (
            <div>
              <h3 className="text-blue-600 font-bold text-lg uppercase tracking-wide mb-3 border-b-2 border-gray-200 pb-1">
                Education
              </h3>
              <div className="space-y-4">
                {formData.education.map((edu, index) => (
                  <div key={index} className="relative pl-5">
                    <div className="absolute left-0 top-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="font-semibold text-gray-800 text-sm">{edu.degree}</div>
                    <div className="text-gray-600 text-xs">{edu.college} • {edu.year}</div>
                    {edu.marks && <div className="text-gray-600 text-xs">Marks: {edu.marks}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {formData.languages.length > 0 && (
            <div>
              <h3 className="text-blue-600 font-bold text-lg uppercase tracking-wide mb-3 border-b-2 border-gray-200 pb-1">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template2;