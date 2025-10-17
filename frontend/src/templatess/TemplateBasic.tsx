import React from 'react';

// --- Re-define Data Types for the Template ---
interface PersonalInfo { name: string; title: string; email: string; phone: string; location: string; linkedin: string; github: string; portfolio: string; }
interface ExperienceItem { id: string; title: string; company: string; startDate: string; endDate: string; description: string; }
interface EducationItem { id: string; degree: string; institution: string; city: string; startDate: string; endDate: string; description?: string; }
interface SkillItem { name: string; level: 'Beginner' | 'Intermediate' | 'Expert'; type: 'Technical' | 'Soft'; }

interface ResumeData {
    personal: PersonalInfo; summary: string; experience: ExperienceItem[]; education: EducationItem[]; skills: SkillItem[]; projects: any[]; certifications: any[]; achievements: any[]; interests: string;
}

interface TemplateProps {
    data: ResumeData;
}
// --- End Data Types ---

const TemplateBasic: React.FC<TemplateProps> = ({ data }) => {
    const { personal, summary, experience, education, skills } = data;

    const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';

    const renderHeader = () => (
        <div className="text-center pb-4 border-b border-gray-400 mb-4 font-sans">
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-1 text-gray-900">{personal.name}</h1>
            <h2 className='text-lg font-medium text-blue-600 mb-2'>{personal.title}</h2>
            <div className="flex justify-center space-x-4 text-sm text-gray-700">
                {personal.phone && <p>{personal.phone}</p>}
                {personal.email && <p className='border-l border-r px-4 border-gray-300'>{personal.email}</p>}
                {personal.linkedin && <p>{personal.linkedin.split('/').pop()}</p>}
            </div>
        </div>
    );

    const renderSection = (title: string, content: React.ReactNode) => (
        <div className="mb-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-gray-500 pb-1 mb-3">{title}</h2>
            {content}
        </div>
    );

    return (
        <div className="font-sans text-gray-800 text-sm p-4 leading-normal">
            {renderHeader()}

            {/* 1. Summary */}
            {summary && renderSection('Professional Summary', <p className="text-justify">{summary}</p>)}

            {/* 2. Experience */}
            {experience.length > 0 && renderSection('Experience', (
                <div className="space-y-4">
                    {experience.map(item => (
                        <div key={item.id}>
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-bold text-base">{item.title} at {item.company}</h3>
                                <p className="text-xs text-gray-600 font-medium whitespace-nowrap">
                                    {formatDate(item.startDate)} - {item.endDate}
                                </p>
                            </div>
                            <ul className="list-disc ml-5 text-sm">
                                {/* Simple split by period to mock bullet points */}
                                {item.description.split(/[.!?]/).map((bullet, idx) => bullet.trim() && <li key={idx}>{bullet.trim()}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}

            {/* 3. Education */}
            {education.length > 0 && renderSection('Education', (
                <div className="space-y-3">
                    {education.map(item => (
                        <div key={item.id} className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold">{item.degree}</h3>
                                <p className="text-sm text-gray-700">{item.institution}, {item.city}</p>
                            </div>
                            <p className="text-xs text-gray-600 font-medium whitespace-nowrap">
                                {formatDate(item.startDate)} - {item.endDate}
                            </p>
                        </div>
                    ))}
                </div>
            ))}

            {/* 4. Skills */}
            {skills.length > 0 && renderSection('Skills', (
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium border border-gray-300">
                            {skill.name}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TemplateBasic;