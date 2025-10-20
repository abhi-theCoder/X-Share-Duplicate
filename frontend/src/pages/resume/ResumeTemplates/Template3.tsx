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

const Template3: React.FC<TemplateProps> = ({ formData }) => {
  return (
    <div className="a4-template bg-white shadow-lg flex" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Sidebar */}
      <div 
        className="w-2/5 p-6 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)'
        }}
      >
        <div className="absolute -top-8 -right-8 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        
        {/* Profile */}
        <div className="relative z-10">
          {formData.profilePreview && (
            <img
              src={formData.profilePreview}
              alt="Profile"
              className="w-36 h-36 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
            />
          )}
          <h1 className="text-2xl font-bold text-center mb-1">{formData.name}</h1>
          <h2 className="text-center opacity-90 text-sm">{formData.title}</h2>
        </div>

        {/* Contact */}
        <div className="mt-8 relative z-10">
          <h3 className="font-semibold text-lg uppercase tracking-wider mb-3 border-b border-white border-opacity-30 pb-1">
            Contact
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center bg-white bg-opacity-10 p-2 rounded-lg backdrop-blur-sm">
              <span className="mr-2">📧</span>
              <span className="truncate">{formData.email}</span>
            </div>
            {formData.address && (
              <div className="flex items-center bg-white bg-opacity-10 p-2 rounded-lg backdrop-blur-sm">
                <span className="mr-2">📍</span>
                <span>{formData.address}</span>
              </div>
            )}
            {formData.links?.linkedin && (
              <div className="flex items-center bg-white bg-opacity-10 p-2 rounded-lg backdrop-blur-sm">
                <span className="mr-2">🔗</span>
                <span className="truncate">{formData.links.linkedin}</span>
              </div>
            )}
            {formData.links?.github && (
              <div className="flex items-center bg-white bg-opacity-10 p-2 rounded-lg backdrop-blur-sm">
                <span className="mr-2">🔗</span>
                <span className="truncate">{formData.links.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {formData.skills.length > 0 && (
          <div className="mt-6 relative z-10">
            <h3 className="font-semibold text-lg uppercase tracking-wider mb-3 border-b border-white border-opacity-30 pb-1">
              Skills
            </h3>
            <div className="space-y-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="text-sm">
                  <div>{skill}</div>
                  <div className="bg-white bg-opacity-20 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {formData.languages.length > 0 && (
          <div className="mt-6 relative z-10">
            <h3 className="font-semibold text-lg uppercase tracking-wider mb-3 border-b border-white border-opacity-30 pb-1">
              Languages
            </h3>
            <div className="space-y-3">
              {formData.languages.map((language, index) => (
                <div key={index} className="text-sm">
                  <div>{language}</div>
                  <div className="bg-white bg-opacity-20 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-3/5 p-6 bg-gray-50">
        {/* Summary */}
        <div className="mb-8">
          <h3 className="text-orange-500 font-bold text-xl uppercase tracking-wide mb-4 flex items-center">
            About Me
            <div className="flex-1 h-0.5 bg-gray-300 ml-4"></div>
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">{formData.summary}</p>
        </div>

        {/* Experience */}
        {formData.experience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-orange-500 font-bold text-xl uppercase tracking-wide mb-4 flex items-center">
              Experience
              <div className="flex-1 h-0.5 bg-gray-300 ml-4"></div>
            </h3>
            <div className="space-y-4">
              {formData.experience.map((exp, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-400">
                  <div className="font-semibold text-gray-800 text-sm">{exp.role}</div>
                  <div className="text-orange-500 text-xs font-medium mb-1">{exp.company} • {exp.duration}</div>
                  {exp.description && <div className="text-gray-600 text-sm">{exp.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {formData.education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-orange-500 font-bold text-xl uppercase tracking-wide mb-4 flex items-center">
              Education
              <div className="flex-1 h-0.5 bg-gray-300 ml-4"></div>
            </h3>
            <div className="space-y-3">
              {formData.education.map((edu, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="font-semibold text-gray-800 text-sm">{edu.degree}</div>
                  <div className="text-orange-500 text-xs font-medium">{edu.college} • {edu.year}</div>
                  {edu.marks && <div className="text-gray-600 text-xs mt-1">Marks: {edu.marks}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {formData.projects.length > 0 && (
          <div className="mb-8">
            <h3 className="text-orange-500 font-bold text-xl uppercase tracking-wide mb-4 flex items-center">
              Projects
              <div className="flex-1 h-0.5 bg-gray-300 ml-4"></div>
            </h3>
            <div className="grid gap-3">
              {formData.projects.map((project, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="font-semibold text-gray-800 text-sm mb-1">{project.name}</div>
                  {project.link && <div className="text-orange-500 text-xs mb-1">Link: {project.link}</div>}
                  <div className="text-gray-600 text-sm">{project.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template3;