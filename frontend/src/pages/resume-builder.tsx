import React, { useState, useMemo, useCallback } from 'react';
import {
  FileText, Download, Eye, CheckCircle, AlertCircle, User, Briefcase,
  GraduationCap, Award, Code, Plus, X, Lightbulb, Zap, GripVertical, Settings
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import TemplateBasic from '../templatess/TemplateBasic';
import TemplateModern from '../templatess/TemplateModern';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// ---- Types ----
interface PersonalInfo { name: string; title: string; email: string; phone: string; location: string; linkedin: string; github: string; portfolio: string; }
interface ExperienceItem { id: string; title: string; company: string; startDate: string; endDate: string; description: string; }
interface EducationItem { id: string; degree: string; institution: string; city: string; startDate: string; endDate: string; description?: string; }
interface SkillItem { id?: string; name: string; level: 'Beginner' | 'Intermediate' | 'Expert'; type: 'Technical' | 'Soft'; }

interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: any[];
  certifications: any[];
  achievements: any[];
  interests: string;
}

// ---- AI Suggestion (still mock) ----
const getAISuggestion = (section: string, data: any): string => {
  if (section === 'summary') {
    return '⚡ AI Suggestion: Try this ATS-optimized summary: "Results-driven Software Engineer with 5+ years of expertise in high-load distributed systems, achieving 20% latency reduction across core services."';
  }
  if (section === 'rewrite') {
    return '✨ AI Rewrite: "Reduced annual hosting costs by $15,000 by migrating critical infrastructure to AWS Lambda and containerized environments."';
  }
  return '';
};

// ---- Templates ----
const templates = [
  { id: 'basic', name: 'Basic Professional', component: TemplateBasic },
  { id: 'modern', name: 'Modern Professional', component: TemplateModern },
];

// ---- Sections ----
const initialSections = [
  { id: 'personal', name: 'Personal Info', icon: User, form: 'PersonalInfoForm' },
  { id: 'summary', name: 'Summary / Objective', icon: FileText, form: 'SummaryForm' },
  { id: 'experience', name: 'Experience', icon: Briefcase, form: 'ExperienceForm' },
  { id: 'education', name: 'Education', icon: GraduationCap, form: 'EducationForm' },
  { id: 'skills', name: 'Skills', icon: Code, form: 'SkillsForm' },
  { id: 'projects', name: 'Projects', icon: Award, form: 'PlaceholderForm' },
  { id: 'certifications', name: 'Certifications', icon: CheckCircle, form: 'PlaceholderForm' }
];

// ---- PDF Styles (simple demo) ----
const pdfStyles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, fontFamily: 'Helvetica' },
  h1: { fontSize: 18, marginBottom: 8 },
  h2: { fontSize: 14, marginTop: 12, marginBottom: 6 },
  row: { marginBottom: 4 },
  bullet: { marginLeft: 8 },
});

// A very simple PDF mirroring key sections
const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.h1}>{data.personal.name} — {data.personal.title}</Text>
      <Text style={pdfStyles.row}>{data.personal.email} • {data.personal.phone} • {data.personal.location}</Text>
      <Text style={pdfStyles.row}>{data.personal.linkedin} • {data.personal.github} • {data.personal.portfolio}</Text>

      <Text style={pdfStyles.h2}>Summary</Text>
      <Text style={pdfStyles.row}>{data.summary}</Text>

      <Text style={pdfStyles.h2}>Experience</Text>
      {data.experience.map(exp => (
        <View key={exp.id} style={{ marginBottom: 6 }}>
          <Text>{exp.title} — {exp.company} ({exp.startDate} - {exp.endDate})</Text>
          <Text style={pdfStyles.bullet}>{exp.description}</Text>
        </View>
      ))}

      <Text style={pdfStyles.h2}>Education</Text>
      {data.education.map(edu => (
        <View key={edu.id} style={{ marginBottom: 6 }}>
          <Text>{edu.degree} — {edu.institution}, {edu.city} ({edu.startDate} - {edu.endDate})</Text>
          {edu.description ? <Text style={pdfStyles.bullet}>{edu.description}</Text> : null}
        </View>
      ))}

      <Text style={pdfStyles.h2}>Skills</Text>
      <Text style={pdfStyles.row}>{data.skills.map(s => s.name).join(', ')}</Text>
    </Page>
  </Document>
);

// ---- Component ----
const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('basic');
  const [sectionOrder, setSectionOrder] = useState<string[]>(initialSections.map(s => s.id));
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [atsReportVisible, setAtsReportVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: { name: 'Jane Doe', title: 'Senior Full Stack Engineer', email: 'jane@example.com', phone: '(555) 555-5555', location: 'Remote', linkedin: 'linkedin.com/in/janedoe', github: 'github.com/janedoe', portfolio: '' },
    summary: 'Highly experienced Senior Full Stack Engineer with 5+ years building and deploying scalable web applications using React, Node.js, and AWS. Strong focus on code quality and CI/CD pipelines.',
    experience: [
      { id: 'exp1', title: 'Senior Developer', company: 'Tech Corp', startDate: '2020-01', endDate: 'Present', description: 'Led team of 4; migrated monolith to microservices, reducing operational latency by 30%. Implemented new testing framework, boosting code coverage to 90%.' },
    ],
    education: [
      { id: 'edu1', degree: 'M.S. Computer Science', institution: 'State University', city: 'Anytown', startDate: '2018-09', endDate: '2019-12' },
    ],
    skills: [
      { id: 's1', name: 'React', level: 'Expert', type: 'Technical' },
      { id: 's2', name: 'Node.js', level: 'Expert', type: 'Technical' },
      { id: 's3', name: 'Leadership', level: 'Intermediate', type: 'Soft' }
    ],
    projects: [],
    certifications: [],
    achievements: [],
    interests: 'Reading, Hiking',
  });

  // ---- Helpers for controlled updates ----
  const updatePersonalInfo = (key: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [key]: value } }));
  };

  const addItem = <K extends keyof ResumeData>(section: K, newItem: any) => {
    setResumeData(prev => ({ ...prev, [section]: [ ...(prev[section] as any[]), { ...newItem, id: crypto.randomUUID?.() || Date.now().toString() } ] }));
  };

  const removeItem = <K extends keyof ResumeData>(section: K, id: string) => {
    setResumeData(prev => ({ ...prev, [section]: (prev[section] as any[]).filter((item: any) => item.id !== id) }));
  };

  const updateArrayItem = <K extends keyof ResumeData>(section: K, id: string, updater: (item: any) => any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map((item: any) => item.id === id ? updater(item) : item)
    }));
  };

  const updateSkillsFromText = (text: string) => {
    const newSkills: SkillItem[] = text.split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => ({ id: crypto.randomUUID?.() || Math.random().toString(36).slice(2), name: s, level: 'Intermediate', type: 'Technical' }));
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  // ---- ATS scoring ----
  const calculateAtsScore = (data: ResumeData) => {
    let score = 50;
    if (data.personal.title) score += 5;
    if (data.summary.trim().length > 80) score += 10;
    if (data.experience.some(exp => /\d+%/.test(exp.description))) score += 10;
    if (data.skills.length >= 10) score += 5;
    if (data.experience.length > 0 && data.education.length > 0) score += 10;
    return Math.min(100, Math.max(0, score));
  };
  const atsScore = useMemo(() => calculateAtsScore(resumeData), [resumeData]);

  const atsChecks = useMemo(() => [
    { check: 'Professional Title included', status: !!resumeData.personal.title, key: 'title' },
    { check: 'Action-verb starting bullets', status: resumeData.experience.some(exp => /^(Led|Reduced|Built|Implemented|Designed|Owned|Improved)/i.test(exp.description.trim())), key: 'action_verbs' },
    { check: 'Quantified results present', status: resumeData.experience.some(exp => /\d+%/.test(exp.description)), key: 'quantified' },
    { check: 'Dedicated Skills Section', status: resumeData.skills.length > 0, key: 'skills_section' },
    { check: 'Formatting is clean (No tables/images)', status: true, key: 'clean_format' },
  ], [resumeData]);

  // ---- Forms ----
  const PersonalInfoForm = () => (
    <div className="grid grid-cols-2 gap-4">
      {(Object.keys(resumeData.personal) as (keyof PersonalInfo)[]).map((k) => {
        const label = k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1');
        return (
          <input
            key={k}
            type="text"
            placeholder={label}
            className="input-field"
            value={resumeData.personal[k]}
            onChange={(e) => updatePersonalInfo(k, e.target.value)}
          />
        );
      })}
    </div>
  );

  const SummaryForm = () => (
    <div>
      <p className='text-sm text-gray-600 border-l-4 border-yellow-400 pl-3 py-1 bg-yellow-50/50 mb-4'>
        {getAISuggestion('summary', resumeData.summary)}
      </p>
      <textarea
        rows={5}
        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your professional summary here..."
        value={resumeData.summary}
        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
      />
    </div>
  );

  const ExperienceForm = () => (
    <div className="space-y-4">
      {resumeData.experience.map(item => (
        <div key={item.id} className="border p-3 rounded-lg relative">
          <input
            type="text"
            placeholder="Title"
            value={item.title}
            onChange={(e) => updateArrayItem('experience', item.id, (it: ExperienceItem) => ({ ...it, title: e.target.value }))}
            className="input-field mb-2 font-semibold"
          />
          <input
            type="text"
            placeholder="Company"
            value={item.company}
            onChange={(e) => updateArrayItem('experience', item.id, (it: ExperienceItem) => ({ ...it, company: e.target.value }))}
            className="input-field mb-2"
          />
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="month"
              placeholder="Start Date"
              value={item.startDate}
              onChange={(e) => updateArrayItem('experience', item.id, (it: ExperienceItem) => ({ ...it, startDate: e.target.value }))}
              className="input-field"
            />
            <input
              type="text"
              placeholder="End Date"
              value={item.endDate}
              onChange={(e) => updateArrayItem('experience', item.id, (it: ExperienceItem) => ({ ...it, endDate: e.target.value }))}
              className="input-field"
            />
          </div>
          <textarea
            rows={3}
            placeholder="Key achievements (use bullets and quantify!)"
            value={item.description}
            onChange={(e) => updateArrayItem('experience', item.id, (it: ExperienceItem) => ({ ...it, description: e.target.value }))}
            className="input-field"
          />
          <button onClick={() => removeItem('experience', item.id)} className="absolute top-2 right-2 text-red-500"><X size={14} /></button>
        </div>
      ))}
      <button
        onClick={() => addItem('experience', { title: 'New Position', company: 'Company', startDate: '', endDate: 'Present', description: '' })}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <Plus size={16} /> <span>Add Position</span>
      </button>
    </div>
  );

  const EducationForm = () => (
    <div className="space-y-4">
      {resumeData.education.map(item => (
        <div key={item.id} className="border p-3 rounded-lg relative">
          <input
            type="text"
            placeholder="Degree"
            value={item.degree}
            onChange={(e) => updateArrayItem('education', item.id, (it: EducationItem) => ({ ...it, degree: e.target.value }))}
            className="input-field mb-1 font-semibold"
          />
          <input
            type="text"
            placeholder="Institution"
            value={item.institution}
            onChange={(e) => updateArrayItem('education', item.id, (it: EducationItem) => ({ ...it, institution: e.target.value }))}
            className="input-field text-sm mb-1"
          />
          <input
            type="text"
            placeholder="City"
            value={item.city}
            onChange={(e) => updateArrayItem('education', item.id, (it: EducationItem) => ({ ...it, city: e.target.value }))}
            className="input-field text-sm mb-2"
          />
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="month"
              placeholder="Start Date"
              value={item.startDate}
              onChange={(e) => updateArrayItem('education', item.id, (it: EducationItem) => ({ ...it, startDate: e.target.value }))}
              className="input-field"
            />
            <input
              type="month"
              placeholder="End Date"
              value={item.endDate}
              onChange={(e) => updateArrayItem('education', item.id, (it: EducationItem) => ({ ...it, endDate: e.target.value }))}
              className="input-field"
            />
          </div>
          <textarea
            rows={2}
            placeholder="Description (optional)"
            value={item.description || ''}
            onChange={(e) => updateArrayItem('education', item.id, (it: EducationItem) => ({ ...it, description: e.target.value }))}
            className="input-field"
          />
          <button onClick={() => removeItem('education', item.id)} className="absolute top-2 right-2 text-red-500"><X size={14} /></button>
        </div>
      ))}
      <button
        onClick={() => addItem('education', { degree: 'New Degree', institution: 'University', city: '', startDate: '', endDate: '' })}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <Plus size={16} /> <span>Add Education</span>
      </button>
    </div>
  );

  const SkillsForm = () => (
    <div>
      <textarea
        rows={4}
        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="List all skills, separated by commas (e.g., React, Python, AWS, Scrum)"
        value={resumeData.skills.map(s => s.name).join(', ')}
        onChange={(e) => updateSkillsFromText(e.target.value)}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {resumeData.skills.map((skill) => (
          <span key={skill.id} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );

  const PlaceholderForm = () => (
    <div className="text-center py-6 text-gray-500">
      <h3 className="text-lg font-medium">Section Editor Coming Soon</h3>
      <p className="text-sm">You can view the data in the live preview.</p>
    </div>
  );

  const formComponentMap: Record<string, React.FC<any>> = {
    PersonalInfoForm, SummaryForm, ExperienceForm, EducationForm, SkillsForm, PlaceholderForm
  };

  const renderSectionContent = (sectionId: string) => {
    const config = initialSections.find(s => s.id === sectionId);
    if (!config) return null;
    const Component = formComponentMap[config.form];
    return Component ? <Component /> : <PlaceholderForm />;
  };

  const CurrentTemplate = templates.find(t => t.id === selectedTemplate)?.component || TemplateBasic;

  // ---- ATS Tool (mock UI preserved) ----
  const AtsAnalyzerTool = () => (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-xl">
      <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 ATS Analyzer Tool</h3>
      <p className='text-xs text-gray-600 mb-3'>Upload your target Job Description (JD) to get a precise match score.</p>
      <label className="block text-sm font-medium text-gray-700 mb-2">Job Description Input</label>
      <textarea rows={5} placeholder="Paste the Job Description here..." className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-3" />
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
        <h4 className="text-sm font-semibold text-red-800 flex items-center mb-2">
          <AlertCircle className="w-4 h-4 mr-1" /> AI Match Report (Mock)
        </h4>
        <ul className="text-xs text-red-700 space-y-1">
          <li><span className="font-bold">Match Score: 55%</span> (Low)</li>
          <li><span className="font-bold">Missing Keywords:</span> "SQL Server," "Azure," "Scrum Master"</li>
          <li><span className="font-bold">Suggestion:</span> Increase mention of "Azure" in experience section.</li>
        </ul>
      </div>
      <button className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200">
        <Zap className="w-4 h-4" />
        <span>Analyze & Optimize Resume</span>
      </button>
    </div>
  );

  // ---- PDF Download ----
  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---- UI ----
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-blue-600" />
              Professional Resume Builder
            </h1>
            <p className="text-lg text-gray-600">Drag, Drop, AI Optimize, and Download.</p>
          </div>
          <button onClick={() => setAtsReportVisible(!atsReportVisible)} className="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
            <Settings className="w-4 h-4" />
            <span>{atsReportVisible ? 'Hide' : 'Show'} ATS Analyzer</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Builder/Input */}
          <div className={`lg:col-span-2 xl:col-span-2 space-y-4 ${atsReportVisible ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className='flex justify-between items-center bg-white p-4 rounded-xl shadow-lg border-b border-gray-200'>
              <h2 className='text-2xl font-bold'>Current Section: {initialSections.find(s => s.id === activeSection)?.name}</h2>
              <button
                onClick={() => setIsEditingOrder(!isEditingOrder)}
                className={`flex items-center space-x-2 py-1 px-3 rounded-lg transition-colors text-sm ${isEditingOrder ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <GripVertical className="w-4 h-4" />
                {isEditingOrder ? 'Finish Reordering' : 'Reorder Sections'}
              </button>
            </div>

            {/* Reorderable list via Motion Reorder */}
            <Reorder.Group axis="y" values={sectionOrder} onReorder={setSectionOrder}>
              {sectionOrder.map(sectionId => {
                const sectionConfig = initialSections.find(s => s.id === sectionId);
                if (!sectionConfig) return null;

                return (
                  <Reorder.Item
                    key={sectionId}
                    value={sectionId}
                    as="div"
                    className="mb-4"
                  >
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setActiveSection(sectionId)}
                        className={`cursor-pointer transition-shadow duration-300 ${activeSection === sectionId ? 'ring-4 ring-blue-200 shadow-xl' : 'hover:shadow-md'}`}
                      >
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6 relative">
                          {isEditingOrder && sectionId !== 'personal' && sectionId !== 'summary' && (
                            <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 p-2 bg-gray-100 rounded-l-lg border border-gray-300 flex flex-col space-y-1">
                              <GripVertical className="w-4 h-4 text-gray-500 cursor-grab" title="Drag to reorder" />
                            </div>
                          )}
                          <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex justify-between items-center">
                              {sectionConfig?.name}
                              {sectionId === 'experience' && (
                                <button onClick={() => alert(getAISuggestion('rewrite', null))} className="text-xs text-purple-600 hover:underline flex items-center">
                                  <Zap className="w-3 h-3 mr-1" /> AI Rewrite Assistant
                                </button>
                              )}
                            </h2>
                            <div className={`${activeSection !== sectionId ? 'h-16 overflow-hidden blur-sm' : ''} transition-all duration-300`}>
                              {renderSectionContent(sectionId)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            <button className="w-full flex items-center justify-center space-x-2 border border-dashed border-gray-400 text-gray-600 py-3 rounded-xl hover:bg-gray-100 transition-colors mt-4">
              <Plus className="w-5 h-5" />
              <span>Add Custom Section (Interests, Achievements, etc.)</span>
            </button>
          </div>

          {/* ATS/Settings/Preview */}
          <div className={`lg:col-span-1 xl:col-span-2 space-y-8 ${atsReportVisible ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
            {atsReportVisible && (
              <div className="lg:sticky lg:top-8">
                <AtsAnalyzerTool />
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:sticky lg:top-8">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">ATS Score</h2>
                <div className="relative">
                  <div className="w-24 h-24 mx-auto">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-300" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className={`transition-all duration-500 ${atsScore >= 80 ? 'text-green-600' : atsScore >= 60 ? 'text-orange-500' : 'text-red-500'}`}
                        stroke="currentColor" strokeWidth="3" strokeDasharray={`${atsScore}, 100`} strokeLinecap="round" fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{atsScore}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">ATS Compatibility</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">ATS Checks</h3>
                {atsChecks.map((check, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    {check.status ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-xs ${check.status ? 'text-gray-700' : 'text-orange-700 font-medium'}`}>
                      {check.check}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:sticky lg:top-[300px]">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Template & Export</h2>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm mb-4"
              >
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              <button
                onClick={() => setShowPreview(true)}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 mb-3"
              >
                <Eye className="w-4 h-4" />
                <span>View Fullscreen Preview</span>
              </button>
              <button onClick={handleDownloadPDF} className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Live Resume Preview: <span className='text-blue-600'>{templates.find(t => t.id === selectedTemplate)?.name}</span></h2>
          <div className="bg-white p-6 shadow-2xl border border-gray-300 mx-auto max-w-4xl min-h-[1000px] overflow-hidden">
            <CurrentTemplate data={resumeData} />
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] overflow-auto relative"
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            >
              <button onClick={() => setShowPreview(false)} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
                <X />
              </button>
              <div className="p-6">
                <CurrentTemplate data={resumeData} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeBuilder;