import React from 'react';
// Assuming same type definitions as TemplateBasic for brevity
import { ResumeData } from '../ResumeBuilder'; // Path should be adjusted in a real app

interface TemplateProps {
    data: ResumeData;
}

const TemplateProfessional: React.FC<TemplateProps> = ({ data }) => {
    const { personal, summary, experience, education, skills } = data;

    const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';

    const renderHeader = () => (
        <div className="pb-3 border-b-2 border-blue-600 mb-4">
            <h1 className="text-4xl font-light text-gray-900 mb-1">{personal.name.toUpperCase()}</h1>
            <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4">
                <p className="flex items-center space-x-1"><span className="text-blue-600">📧</span><span>{personal.email}</span></p>
                {personal.phone && <p className="flex items-center space-x-1"><span className="text-blue-600">📞</span><span>{personal.phone}</span></p>}
                {personal.location && <p className="flex items-center space-x-1"><span className="text-blue-600">📍</span><span>{personal.location}</span></p>}
            </div>
            <div className="flex flex-wrap items-center text-sm text-blue-600 space-x-4 mt-1">
                {personal.linkedin && <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className='hover:underline'>{personal.linkedin.split('/').pop()}</a>}
                {personal.github && <a href={`https://${personal.github}`} target="_blank" rel="noopener noreferrer" className='hover:underline'>{personal.github.split('/').pop()}</a>}
            </div>
        </div>
    );

    const renderSectionTitle = (title: string) => (
        <h2 className="text-lg font-bold text-blue-600 uppercase border-b border-gray-300 pb-1 mb-3 mt-4">{title}</h2>
    );

    return (
        <div className="font-serif text-gray-800 text-sm p-4 leading-relaxed">
            {renderHeader()}

            {/* Summary */}
            {summary && (
                <div className="mb-4">
                    {renderSectionTitle('Summary')}
                    <p className="text-justify">{summary}</p>
                </div>
            )}

            <div className="grid grid-cols-4 gap-6">
                {/* Main Content (3/4 width) */}
                <div className="col-span-3">
                    
                    {/* Experience */}
                    {experience.length > 0 && (
                        <div className="mb-4">
                            {renderSectionTitle('Work Experience')}
                            <div className="space-y-4">
                                {experience.map(item => (
                                    <div key={item.id}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-extrabold text-base">{item.title}</h3>
                                            <p className="text-xs text-gray-500 font-medium whitespace-nowrap">{item.company}, {formatDate(item.startDate)} - {item.endDate === 'Present' ? 'Present' : formatDate(item.endDate)}</p>
                                        </div>
                                        <ul className="list-disc ml-5 text-sm mt-1">
                                            {item.description.split('. ').map((bullet, idx) => bullet.trim() && <li key={idx}>{bullet.trim()}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Projects/Certifications would go here */}

                </div>

                {/* Sidebar (1/4 width) */}
                <div className="col-span-1 border-l pl-4 border-gray-200">
                    
                    {/* Education */}
                    {education.length > 0 && (
                        <div className="mb-4">
                            {renderSectionTitle('Education')}
                            <div className="space-y-3">
                                {education.map(item => (
                                    <div key={item.id}>
                                        <p className="font-semibold text-xs">{item.degree}</p>
                                        <p className="text-xs text-gray-700 italic">{item.institution}</p>
                                        <p className="text-xs text-gray-500">{item.city}</p>
                                        <p className="text-xs text-gray-500">{formatDate(item.startDate)} - {item.endDate === 'Present' ? 'Present' : formatDate(item.endDate)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                    <div className="mb-4">
                        {renderSectionTitle('Skills')}
                        <ul className="flex flex-wrap">
                        {skills.map((skill, index) => (
                            <li
                            key={index}
                            className="text-xs font-medium bg-gray-100 rounded-full px-2 py-0.5 inline-block mr-1 mb-1"
                            >
                            {skill.name}
                            {skill.level && (
                                <span className="text-gray-500 text-[10px] ml-1">
                                ({skill.level})
                                </span>
                            )}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default TemplateProfessional;