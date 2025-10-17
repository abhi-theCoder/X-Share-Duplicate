import React from 'react';
// Assuming same type definitions as TemplateBasic for brevity
import { ResumeData } from '../ResumeBuilder'; // Path should be adjusted in a real app
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
}

const TemplateModern: React.FC<TemplateProps> = ({ data }) => {
    const { personal, summary, experience, education, skills } = data;

    const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';

    const renderContactItem = (Icon: React.FC<any>, content: string | undefined) => (
        content ? (
            <div className="flex items-center space-x-2 text-xs text-gray-600">
                <Icon className="w-3 h-3 text-blue-500" />
                <span>{content}</span>
            </div>
        ) : null
    );

    const renderSectionTitle = (title: string) => (
        <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-4 bg-blue-500"></div>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-800">{title}</h2>
        </div>
    );

    return (
        <div className="font-sans text-gray-700 text-sm p-6 leading-relaxed">
            
            {/* Header / Name */}
            <div className="flex justify-between items-center mb-6 pb-2 border-b-4 border-blue-500">
                <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900">{personal.name.toUpperCase()}</h1>
                <div className="flex flex-col space-y-1 items-end">
                    {renderContactItem(Mail, personal.email)}
                    {renderContactItem(Phone, personal.phone)}
                    {renderContactItem(MapPin, personal.location)}
                    {personal.linkedin && renderContactItem(Linkedin, personal.linkedin.split('/').pop())}
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-5 gap-6">

                {/* Left Column (Main) - 4/5 width */}
                <div className="col-span-4 space-y-6">
                    
                    {/* Summary */}
                    {summary && (
                        <div>
                            {renderSectionTitle('Profile')}
                            <p className="text-justify">{summary}</p>
                        </div>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <div>
                            {renderSectionTitle('Experience')}
                            <div className="space-y-4 ml-2 border-l border-gray-300 pl-4">
                                {experience.map(item => (
                                    <div key={item.id} className="relative">
                                        <div className="absolute -left-[22px] top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <h3 className="font-extrabold text-base">{item.title}</h3>
                                        <p className="text-sm italic text-gray-600">{item.company}</p>
                                        <p className="text-xs text-gray-500 mb-1">{formatDate(item.startDate)} - {item.endDate === 'Present' ? 'Present' : formatDate(item.endDate)}</p>
                                        <ul className="list-disc ml-5 text-sm">
                                            {item.description.split('. ').map((bullet, idx) => bullet.trim() && <li key={idx}>{bullet.trim()}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Right Column (Sidebar) - 1/5 width */}
                <div className="col-span-1 space-y-6">

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div>
                            {renderSectionTitle('Skills')}
                            <div className="space-y-1">
                                {skills.map((skill, index) => (
                                    <p key={index} className="text-xs font-medium text-gray-700 border-l-2 border-blue-300 pl-2">{skill}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <div>
                            {renderSectionTitle('Education')}
                            <div className="space-y-3">
                                {education.map(item => (
                                    <div key={item.id}>
                                        <p className="font-semibold text-xs">{item.degree}</p>
                                        <p className="text-xs text-gray-600">{item.institution}</p>
                                        <p className="text-xs text-gray-500">{formatDate(item.startDate)} - {item.endDate === 'Present' ? 'Present' : formatDate(item.endDate)}</p>
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

export default TemplateModern;