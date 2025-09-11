import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Mail,
  Phone,
  MapPin,
  Plus,
  X
} from 'lucide-react';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const [atsScore, setAtsScore] = useState(75);

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'skills', name: 'Skills', icon: Code },
    { id: 'projects', name: 'Projects', icon: Award },
    { id: 'certifications', name: 'Certifications', icon: CheckCircle }
  ];

  const atsChecks = [
    { check: 'Contact information included', status: true },
    { check: 'Professional email address', status: true },
    { check: 'Keywords from job description', status: false },
    { check: 'Consistent formatting', status: true },
    { check: 'Standard section headings', status: true },
    { check: 'Quantified achievements', status: false },
    { check: 'No graphics or images', status: true },
    { check: 'Appropriate length (1-2 pages)', status: true }
  ];

  const PersonalInfoForm = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
            value={resumeData.personal.name}
            onChange={(e) => setResumeData({
              ...resumeData,
              personal: { ...resumeData.personal, name: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john@example.com"
            value={resumeData.personal.email}
            onChange={(e) => setResumeData({
              ...resumeData,
              personal: { ...resumeData.personal, email: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+1 (555) 123-4567"
            value={resumeData.personal.phone}
            onChange={(e) => setResumeData({
              ...resumeData,
              personal: { ...resumeData.personal, phone: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="New York, NY"
            value={resumeData.personal.location}
            onChange={(e) => setResumeData({
              ...resumeData,
              personal: { ...resumeData.personal, location: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
          <input
            type="url"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="linkedin.com/in/johndoe"
            value={resumeData.personal.linkedin}
            onChange={(e) => setResumeData({
              ...resumeData,
              personal: { ...resumeData.personal, linkedin: e.target.value }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
          <input
            type="url"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="github.com/johndoe"
            value={resumeData.personal.github}
            onChange={(e) => setResumeData({
              ...resumeData,
              personal: { ...resumeData.personal, github: e.target.value }
            })}
          />
        </div>
      </div>
    </div>
  );

  const SummaryForm = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Professional Summary</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary (2-3 sentences highlighting your key qualifications)
        </label>
        <textarea
          rows={4}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Experienced software engineer with 3+ years developing scalable web applications..."
          value={resumeData.summary}
          onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
        />
      </div>
    </div>
  );

  const SkillsForm = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technical Skills (separate with commas)
        </label>
        <textarea
          rows={3}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="JavaScript, React, Node.js, Python, SQL, AWS, Docker..."
          value={resumeData.skills.join(', ')}
          onChange={(e) => setResumeData({ 
            ...resumeData, 
            skills: e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill)
          })}
        />
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'skills':
        return <SkillsForm />;
      default:
        return (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-lg text-gray-600">Create a professional, ATS-friendly resume</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sections</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Actions */}
              <div className="mt-8 space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {renderSectionContent()}
            </div>
          </div>

          {/* ATS Score */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">ATS Score</h2>
                <div className="relative">
                  <div className="w-24 h-24 mx-auto">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-300"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-600"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${atsScore}, 100`}
                        strokeLinecap="round"
                        fill="none"
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
                <h3 className="text-sm font-semibold text-gray-900">ATS Checks</h3>
                {atsChecks.map((check, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    {check.status ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-xs ${check.status ? 'text-gray-700' : 'text-orange-700'}`}>
                      {check.check}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Pro Tips</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Use keywords from job descriptions</li>
                  <li>• Quantify your achievements</li>
                  <li>• Keep formatting simple and clean</li>
                  <li>• Use standard section headings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;