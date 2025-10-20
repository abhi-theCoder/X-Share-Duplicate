import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../api";
import { isAxiosError } from "axios"; // ✅ Import isAxiosError directly
import Template1 from "./ResumeTemplates/Template1";
import Template2 from "./ResumeTemplates/Template2";
import Template3 from "./ResumeTemplates/Template3";

type EducationItem = { degree: string; college: string; year: string; marks: string };
type ExperienceItem = { role: string; company: string; duration: string; description?: string };
type ProjectItem = { name: string; link: string; description: string };

interface ResumeForm {
  name: string;
  email: string;
  title: string;
  summary: string;
  template: number;
  profilePic?: File | null;
  profilePreview?: string | null;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: string[];
  languages: string[];
  links: { linkedin?: string; github?: string; hackerrank?: string; leetcode?: string };
  description?: string;
  address?: string;
}

const emptyEducation = (): EducationItem => ({ degree: "", college: "", year: "", marks: "" });
const emptyExperience = (): ExperienceItem => ({ role: "", company: "", duration: "", description: "" });
const emptyProject = (): ProjectItem => ({ name: "", link: "", description: "" });

const ResumeBuilder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [generatedId, setGeneratedId] = useState<string>("");
  const [showDownloadSection, setShowDownloadSection] = useState(false);
  const [downloadId, setDownloadId] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  const [formData, setFormData] = useState<ResumeForm>({
    name: "",
    email: "",
    title: "",
    summary: "",
    template: 1,
    profilePic: null,
    profilePreview: null,
    education: [emptyEducation()],
    experience: [emptyExperience()],
    projects: [emptyProject()],
    skills: [""],
    languages: [""],
    links: {},
    description: "",
    address: "",
  });

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && generatedId) {
      setShowDownloadSection(true);
    }
  }, [countdown, generatedId]);

  // Fetch resume if editing
  useEffect(() => {
    if (!resumeId) return;
    setLoading(true);
    axios
      .get(`/api/resumes/${resumeId}`)
      .then((res) => {
        const d = res.data;
        setFormData({
          name: d.name || "",
          email: d.email || "",
          title: d.title || "",
          summary: d.summary || "",
          template: d.template || 1,
          profilePic: null,
          profilePreview: d.photo_url || null,
          education: Array.isArray(d.education) ? d.education : [],
          experience: Array.isArray(d.experience) ? d.experience : [],
          projects: Array.isArray(d.projects) ? d.projects : [],
          skills: Array.isArray(d.skills) ? d.skills : (typeof d.skills === "string" ? JSON.parse(d.skills || "[]") : []),
          languages: Array.isArray(d.languages) ? d.languages : (typeof d.languages === "string" ? JSON.parse(d.languages || "[]") : []),
          links: d.links || {},
          description: d.description || "",
          address: d.address || "",
        });
        setSelectedTemplate(d.template || 1);
      })
      .catch((err) => {
        console.error("Failed to load resume:", err);
        alert("Failed to load resume for editing.");
      })
      .finally(() => setLoading(false));
  }, [resumeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("links.")) {
      const [, key] = name.split(".");
      setFormData((prev) => ({ ...prev, links: { ...prev.links, [key]: value } }));
      return;
    }
    if (name === "template") {
      const t = Number(value) || 1;
      setSelectedTemplate(t);
      setFormData((prev) => ({ ...prev, [name]: t }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, profilePic: file, profilePreview: URL.createObjectURL(file) }));
  };

  const handleEducationChange = (index: number, key: keyof EducationItem, value: string) => {
    const arr = [...formData.education];
    arr[index] = { ...arr[index], [key]: value };
    setFormData((prev) => ({ ...prev, education: arr }));
  };
  const addEducation = () => setFormData((prev) => ({ ...prev, education: [...prev.education, emptyEducation()] }));
  const removeEducation = (i: number) => setFormData((prev) => ({ ...prev, education: prev.education.filter((_, idx) => idx !== i) }));

  const handleExperienceChange = (index: number, key: keyof ExperienceItem, value: string) => {
    const arr = [...formData.experience];
    arr[index] = { ...arr[index], [key]: value };
    setFormData((prev) => ({ ...prev, experience: arr }));
  };
  const addExperience = () => setFormData((prev) => ({ ...prev, experience: [...prev.experience, emptyExperience()] }));
  const removeExperience = (i: number) => setFormData((prev) => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }));

  const handleProjectChange = (index: number, key: keyof ProjectItem, value: string) => {
    const arr = [...formData.projects];
    arr[index] = { ...arr[index], [key]: value };
    setFormData((prev) => ({ ...prev, projects: arr }));
  };
  const addProject = () => setFormData((prev) => ({ ...prev, projects: [...prev.projects, emptyProject()] }));
  const removeProject = (i: number) => setFormData((prev) => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }));

  const handleSkillChange = (index: number, value: string) => {
    const arr = [...formData.skills];
    arr[index] = value;
    setFormData((prev) => ({ ...prev, skills: arr }));
  };
  const addSkill = () => setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  const removeSkill = (i: number) => setFormData((prev) => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }));

  const handleLanguageChange = (index: number, value: string) => {
    const arr = [...formData.languages];
    arr[index] = value;
    setFormData((prev) => ({ ...prev, languages: arr }));
  };
  const addLanguage = () => setFormData((prev) => ({ ...prev, languages: [...prev.languages, ""] }));
  const removeLanguage = (i: number) => setFormData((prev) => ({ ...prev, languages: prev.languages.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.title.trim() || !formData.summary.trim()) {
      return alert("Please fill required fields: Name*, Email*, Title*, Summary*");
    }

    setSaving(true);
    try {
      const payload = new FormData();
      
      if (formData.profilePic instanceof File) {
        payload.append("file", formData.profilePic);
        console.log("📸 Profile picture attached");
      }
      
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("title", formData.title);
      payload.append("summary", formData.summary);
      payload.append("template", String(formData.template || selectedTemplate));
      
      if (formData.description) payload.append("description", formData.description);
      if (formData.address) payload.append("address", formData.address);

      payload.append("education", JSON.stringify(formData.education.filter(edu => 
        edu.degree.trim() || edu.college.trim()
      ) || []));
      
      payload.append("experience", JSON.stringify(formData.experience.filter(exp => 
        exp.role.trim() || exp.company.trim()
      ) || []));
      
      payload.append("projects", JSON.stringify(formData.projects.filter(proj => 
        proj.name.trim()
      ) || []));
      
      payload.append("skills", JSON.stringify(formData.skills.filter(s => s.trim()) || []));
      payload.append("languages", JSON.stringify(formData.languages.filter(l => l.trim()) || []));
      payload.append("links", JSON.stringify(formData.links || {}));

      console.log("📤 Saving resume data...");
      
      let response;
      if (resumeId) {
        console.log("🔄 Updating resume:", resumeId);
        response = await axios.put(`/api/resumes/${resumeId}`, payload, { 
          headers: { "Content-Type": "multipart/form-data" } 
        });
        alert("✅ Resume updated successfully.");
      } else {
        console.log("🆕 Creating new resume");
        response = await axios.post("/api/resumes", payload, { 
          headers: { "Content-Type": "multipart/form-data" } 
        });
        alert("✅ Resume created successfully.");
        
        if (response.data?.id) {
          console.log("✅ Resume saved with ID:", response.data.id);
          setGeneratedId(response.data.id);
          setCountdown(30);
        }
      }

      if (response.data?.data?.photo_url) {
        setFormData((p) => ({ ...p, profilePreview: response.data.data.photo_url }));
      }

      console.log("✅ Save successful:", response.data);

    } catch (err: any) {
      console.error("❌ Save error:", err);
      
      // ✅ FIXED: Use the imported isAxiosError function directly
      if (isAxiosError(err)) {
        console.error("Error details:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message
        });
        
        if (err.response?.status === 400) {
          alert(`Validation Error: ${err.response.data.message || "Please check your input data"}`);
          return;
        } else if (err.response?.status === 413) {
          alert("File too large: Please choose a smaller profile picture");
          return;
        } else if (err.response?.status === 500) {
          alert("Server error: Please try again in a few moments");
          return;
        }
      }
      
      const msg = err?.response?.data?.message || err?.message || "Failed to save resume";
      alert(`Save failed: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    const idToUse = downloadId || generatedId || resumeId;
    
    if (!idToUse) {
      return alert("❌ Please enter a Resume ID");
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(idToUse)) {
      return alert("❌ Invalid Resume ID format. Please check the ID and try again.");
    }

    setDownloading(true);
    try {
      console.log("📄 Requesting PDF for ID:", idToUse);
      const response = await axios.get(`/api/resumes/${idToUse}/pdf`, { 
        responseType: "blob",
        timeout: 120000
      });
      
      if (!response.data || response.data.size === 0) {
        throw new Error("Received empty PDF file");
      }
      
      console.log("✅ PDF received, size:", response.data.size, "bytes");
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement("a");
      link.href = url;
      
      const fileName = formData.name 
        ? `${formData.name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`
        : `resume_${idToUse}.pdf`;
      
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      console.log("✅ PDF downloaded successfully");
      alert("✅ PDF downloaded successfully!");
    } catch (err: any) {
      console.error("❌ PDF download error:", err);
      
      let errorMsg = "Failed to generate PDF. Please check the ID and try again.";
      if (err.code === 'ECONNABORTED') {
        errorMsg = "Request timeout - PDF generation is taking longer than expected. Please try again.";
      } else if (err.response?.status === 404) {
        errorMsg = "Resume not found. Please check the ID and ensure the resume was saved successfully.";
      } else if (err.response?.status === 400) {
        errorMsg = "Invalid Resume ID. Please check the ID format.";
      } else if (err.response?.status === 500) {
        errorMsg = "PDF generation server error. Please try again in a few moments.";
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message?.includes('Network Error')) {
        errorMsg = "Network error - please check your connection and try again.";
      } else if (err.message?.includes('empty')) {
        errorMsg = "PDF generation failed - received empty file. Please try again.";
      }
      
      alert(`❌ PDF Error: ${errorMsg}`);
      
      if (generatedId && !showDownloadSection) {
        setShowDownloadSection(true);
      }
    } finally {
      setDownloading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
      alert("✅ Resume ID copied to clipboard!");
    }
  };

  const renderTemplatePreview = () => {
    const previewData = { ...formData };
    if (selectedTemplate === 1) return <Template1 formData={previewData} />;
    if (selectedTemplate === 2) return <Template2 formData={previewData} />;
    return <Template3 formData={previewData} />;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-blue-600 font-semibold">Loading resume...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {resumeId ? "Edit Resume" : "Create New Resume"}
      </h1>
      
      <div className="flex gap-6">
        {/* LEFT: Form */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md max-h-[80vh] overflow-auto">
          {/* Template Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Template *
            </label>
            <select
              name="template"
              value={selectedTemplate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={1}>Template 1 - Modern Minimalist</option>
              <option value={2}>Template 2 - Professional Corporate</option>
              <option value={3}>Template 3 - Creative Modern</option>
            </select>
          </div>

          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Basic Information</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePic}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {formData.profilePreview && (
                <div className="mt-2">
                  <img 
                    src={formData.profilePreview} 
                    alt="Profile preview" 
                    className="w-20 h-20 object-cover rounded-full border"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Software Engineer"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="New York, NY"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Summary *
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief overview of your professional background..."
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Social Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="links.linkedin"
                  value={formData.links.linkedin || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub
                </label>
                <input
                  type="url"
                  name="links.github"
                  value={formData.links.github || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Education</h3>
              <button
                type="button"
                onClick={addEducation}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                Add Education
              </button>
            </div>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Education #{index + 1}</h4>
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Degree *</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">College/University *</label>
                    <input
                      type="text"
                      value={edu.college}
                      onChange={(e) => handleEducationChange(index, "college", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Year *</label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="2020-2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Marks/GPA *</label>
                    <input
                      type="text"
                      value={edu.marks}
                      onChange={(e) => handleEducationChange(index, "marks", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="3.8 GPA / 85%"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Work Experience</h3>
              <button
                type="button"
                onClick={addExperience}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                Add Experience
              </button>
            </div>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Experience #{index + 1}</h4>
                  {formData.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Job Role *</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Software Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Company *</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Duration *</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Jan 2022 - Present"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Description (Optional)</label>
                    <textarea
                      value={exp.description || ""}
                      onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
              <button
                type="button"
                onClick={addProject}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                Add Project
              </button>
            </div>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Project #{index + 1}</h4>
                  {formData.projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Project Name *</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="E-commerce Website"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Project Link (Optional)</label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Description *</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Describe the project, technologies used, and your role..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
              <button
                type="button"
                onClick={addSkill}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                Add Skill
              </button>
            </div>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="JavaScript, React, Node.js..."
                />
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Languages</h3>
              <button
                type="button"
                onClick={addLanguage}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                Add Language
              </button>
            </div>
            {formData.languages.map((language, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={language}
                  onChange={(e) => handleLanguageChange(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="English, Spanish, French..."
                />
                {formData.languages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : resumeId ? "Update Resume" : "Save Resume"}
            </button>
            {resumeId && (
              <button
                onClick={() => handleDownloadPDF()}
                disabled={downloading}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                {downloading ? "Generating PDF..." : "Download PDF"}
              </button>
            )}
          </div>

          {/* Generated ID Section */}
          {generatedId && !showDownloadSection && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">✅ Resume Saved Successfully!</h3>
              <p className="text-yellow-700 mb-3">
                Your Resume ID: <span className="font-mono font-bold">{generatedId}</span>
              </p>
              <p className="text-yellow-600 text-sm mb-3">
                Please wait while we prepare the PDF download. This may take a few moments...
              </p>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Copy ID
                </button>
                <div className="flex-1 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-center">
                  Download available in: {countdown}s
                </div>
              </div>
            </div>
          )}

          {/* Download Section */}
          {showDownloadSection && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-lg font-semibold text-green-800 mb-3">📥 Download Your Resume PDF</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    Resume ID
                  </label>
                  <input
                    type="text"
                    value={downloadId || generatedId}
                    onChange={(e) => setDownloadId(e.target.value)}
                    className="w-full p-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Paste your Resume ID here"
                  />
                </div>
                <button
                  onClick={handleDownloadPDF}
                  disabled={downloading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
                >
                  {downloading ? "⏳ Generating PDF..." : "🚀 Generate & Download PDF"}
                </button>
                <p className="text-sm text-green-600 text-center">
                  ⏱️ PDF generation may take up to 2 minutes. Please be patient.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Live Preview */}
        <div className="w-1/2">
          <div className="sticky top-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Live Preview (Template {selectedTemplate})
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
              <div className="scale-75 origin-top-left">
                {renderTemplatePreview()}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Note: This is a scaled preview. The actual PDF will be in A4 size.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;