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

const Template1: React.FC<TemplateProps> = ({ formData }) => {
  return (
    <div className="a4-template bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-2/5 bg-gray-800 text-white p-6">
          {/* Profile Image */}
          {formData.profilePreview && (
            <img
              src={formData.profilePreview}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
            />
          )}
          
          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-blue-400 text-lg font-semibold mb-3 uppercase tracking-wide">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="mr-2">📧</span>
                <span>{formData.email}</span>
              </div>
              {formData.address && (
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>{formData.address}</span>
                </div>
              )}
              {formData.links?.linkedin && (
                <div className="flex items-center">
                  <span className="mr-2">🔗</span>
                  <span className="truncate">{formData.links.linkedin}</span>
                </div>
              )}
              {formData.links?.github && (
                <div className="flex items-center">
                  <span className="mr-2">🔗</span>
                  <span className="truncate">{formData.links.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {formData.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-blue-400 text-lg font-semibold mb-3 uppercase tracking-wide">Skills</h3>
              <div className="space-y-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {formData.languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-blue-400 text-lg font-semibold mb-3 uppercase tracking-wide">Languages</h3>
              <div className="space-y-2">
                {formData.languages.map((language, index) => (
                  <div key={index} className="text-sm">
                    {language}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-3/5 p-6">
          {/* Name and Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.name}</h1>
            <h2 className="text-xl text-blue-600 font-light">{formData.title}</h2>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 text-sm leading-relaxed">{formData.summary}</p>
            </div>
          </div>

          {/* Experience */}
          {formData.experience.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Experience
              </h3>
              <div className="space-y-4">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-semibold text-gray-800">{exp.role} - {exp.company}</div>
                    <div className="text-gray-600 mb-1">{exp.duration}</div>
                    {exp.description && <div className="text-gray-700">{exp.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {formData.education.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Education
              </h3>
              <div className="space-y-4">
                {formData.education.map((edu, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-semibold text-gray-800">{edu.degree}</div>
                    <div className="text-gray-600">{edu.college} • {edu.year}</div>
                    {edu.marks && <div className="text-gray-600">Marks: {edu.marks}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {formData.projects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Projects
              </h3>
              <div className="space-y-4">
                {formData.projects.map((project, index) => (
                  <div key={index} className="text-sm border-l-4 border-blue-500 pl-3">
                    <div className="font-semibold text-gray-800">{project.name}</div>
                    {project.link && <div className="text-gray-600">Link: {project.link}</div>}
                    <div className="text-gray-700 mt-1">{project.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template1;