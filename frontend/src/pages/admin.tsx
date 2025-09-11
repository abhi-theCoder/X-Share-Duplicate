import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginRequired from '../components/LoginRequired';
import axios from '../api';

import {
  ThumbsUp,
  ThumbsDown,
  Edit2,
  CheckCircle,
  XCircle,
  FileText,
  Code,
  Users,
  Info,
  ChevronDown,
} from 'lucide-react';

// Define the shape of our data using a TypeScript interface
interface Submission {
  id: string;
  type: 'interview' | 'hackathon';
  status: 'pending' | 'approved' | 'rejected';
  title: string;
  company: string;
  author: string;
  submittedAt: string;
  details: string;
  // Add new optional fields to store who reviewed the submission and when
  reviewedBy?: string;
  reviewedAt?: string;
}

// Dummy data with more details and variety
const mockSubmissions: Submission[] = [
  {
    id: '1756057137289',
    type: 'interview',
    status: 'pending',
    title: 'Software Engineer, L4',
    company: 'Google',
    author: 'Amit Sharma',
    submittedAt: '2025-08-25T10:00:00Z',
    details:
      'Detailed interview experience for a Software Engineer position at Google. Covers technical rounds, behavioral questions, and tips for preparation. The candidate passed the phone screen but was ultimately rejected after the onsite rounds.',
  },
  {
    id: '1756057137290',
    type: 'hackathon',
    status: 'pending',
    title: 'CodeSphere 2025 Submission',
    company: 'N/A',
    author: 'Priya Singh',
    submittedAt: '2025-08-24T18:30:00Z',
    details:
      'Project submission for the "Future of AI" track at CodeSphere. Includes a link to the GitHub repository and a project demo video. The team built a real-time sentiment analysis tool for social media streams.',
  },
  {
    id: '1756057137291',
    type: 'interview',
    status: 'approved',
    title: 'Product Manager Intern',
    company: 'Microsoft',
    author: 'Rohan Mehta',
    submittedAt: '2025-08-23T12:45:00Z',
    details:
      'My summer internship experience as a Product Manager at Microsoft. The post covers the application process, product sense interviews, and the day-to-day responsibilities of a PM intern. This is a very helpful resource for aspiring PMs.',
    reviewedBy: 'Admin User',
    reviewedAt: '2025-08-23T13:00:00Z',
  },
  {
    id: '1756057137292',
    type: 'interview',
    status: 'rejected',
    title: 'Data Scientist, Senior',
    company: 'Amazon',
    author: 'Sneha Gupta',
    submittedAt: '2025-08-22T09:15:00Z',
    details:
      'Rejected experience for a Senior Data Scientist role. The candidate shares feedback received from the recruiter about weaknesses in their machine learning system design skills. A good case study on what to avoid.',
    reviewedBy: 'Admin User',
    reviewedAt: '2025-08-22T09:30:00Z',
  },
  {
    id: '1756057137293',
    type: 'hackathon',
    status: 'approved',
    title: 'TechTogether Hackathon',
    company: 'N/A',
    author: 'Vikram Patel',
    submittedAt: '2025-08-21T16:00:00Z',
    details:
      'A great post about participating in and winning the TechTogether Hackathon. The team developed an accessibility tool for web browsers. Includes details on their tech stack and team dynamics.',
    reviewedBy: 'Admin User',
    reviewedAt: '2025-08-21T16:20:00Z',
  },
  {
    id: '1756057137294',
    type: 'interview',
    status: 'pending',
    title: 'UX Designer',
    company: 'Figma',
    author: 'Anjali Desai',
    submittedAt: '2025-08-20T11:20:00Z',
    details:
      'Detailed breakdown of the UX design interview process at Figma. Covers portfolio review, whiteboarding challenges, and a final presentation. The candidate is awaiting final feedback.',
  },
  {
    id: '1756057137295',
    type: 'interview',
    status: 'pending',
    title: 'Front-end Developer',
    company: 'Stripe',
    author: 'Rajiv Kumar',
    submittedAt: '2025-08-19T14:50:00Z',
    details:
      'Interview experience for a front-end role at Stripe. Focuses on JavaScript fundamentals, React component design, and API integration questions. The candidate found the coding round to be particularly challenging.',
  },
  {
    id: '1756057137296',
    type: 'hackathon',
    status: 'rejected',
    title: 'GameDev Challenge 2025',
    company: 'N/A',
    author: 'Leena Roy',
    submittedAt: '2025-08-18T22:00:00Z',
    details:
      'A game submission that was rejected from the final round. The post details the reasons for rejection (performance issues and lack of originality) and serves as a learning experience for future hackathons.',
    reviewedBy: 'Admin User',
    reviewedAt: '2025-08-18T22:30:00Z',
  },
];
    
const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false); // New state variable for access control
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [currentStatus, setCurrentStatus] = useState<Submission['status']>('pending');
  const [currentType, setCurrentType] = useState<Submission['type']>('interview');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Submission | null>(null);

  // Filter submissions based on current state
  const filteredSubmissions = submissions.filter(
    (sub) => sub.status === currentStatus && sub.type === currentType
  );


    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }

        // Fetch user profile from the API
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Check the user's first name for access control
        const { role } = response.data;
        console.log(response)
        if (role === 'admin') {
          setHasAccess(true);
        } else {
          setHasAccess(false);
          setError('Access Denied: You do not have permission to view this page.');
        }

      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-slate-500">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle different error states and restricted access
  if (error === 'User not authenticated.') {
    return <LoginRequired />;
  }

  if (error === 'Access Denied: You do not have permission to view this page.' || !hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-700 p-8 text-center rounded-lg shadow-inner">
        <div className="max-w-md mx-auto">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="text-lg">{error}</p>
          <p className="mt-4 text-sm text-red-500">Please log in with an authorized account to continue.</p>
        </div>
      </div>
    );
  }

  // Action handlers
  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? { ...sub, status: 'approved', reviewedBy: 'Abhishek', reviewedAt: new Date().toISOString() }
          : sub
      )
    );
    setSelectedSubmission(null);
  };

  const handleReject = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? { ...sub, status: 'rejected', reviewedBy: 'Abhishek', reviewedAt: new Date().toISOString() }
          : sub
      )
    );
    setSelectedSubmission(null);
  };

  const handleRevert = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? { ...sub, status: 'pending', reviewedBy: undefined, reviewedAt: undefined }
          : sub
      )
    );
    setSelectedSubmission(null);
  };

  const handleEdit = (submission: Submission) => {
    setIsEditing(true);
    setEditedData(submission);
  };

  const handleSave = () => {
    if (editedData) {
      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === editedData.id ? editedData : sub))
      );
      setSelectedSubmission(editedData); // Update the selected submission to the new data
      setIsEditing(false);
      setEditedData(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const renderDetailsPanel = () => {
    return (
      <AnimatePresence mode="wait">
        {selectedSubmission ? (
          <motion.div
            key={selectedSubmission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full text-left p-4 md:p-6"
          >
            {isEditing && editedData ? (
              // Edit Form
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Edit Submission</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editedData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={editedData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Details</label>
                  <textarea
                    name="details"
                    value={editedData.details}
                    onChange={handleChange}
                    rows={8}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-400 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Read-only Details View
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    {selectedSubmission.title}
                  </h2>
                  <div
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      selectedSubmission.status === 'approved'
                        ? 'bg-green-100 text-green-600'
                        : selectedSubmission.status === 'rejected'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {selectedSubmission.status.charAt(0).toUpperCase() +
                      selectedSubmission.status.slice(1)}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 mb-6">
                  <p>
                    <span className="font-semibold">Type:</span> {selectedSubmission.type}
                  </p>
                  <p>
                    <span className="font-semibold">Company:</span>{' '}
                    {selectedSubmission.company === 'N/A'
                      ? 'Not Applicable'
                      : selectedSubmission.company}
                  </p>
                  <p>
                    <span className="font-semibold">Submitted By:</span>{' '}
                    {selectedSubmission.author}
                  </p>
                  <p>
                    <span className="font-semibold">Submitted On:</span>{' '}
                    {new Date(selectedSubmission.submittedAt).toLocaleDateString()}
                  </p>
                  {/* Display reviewedBy and reviewedAt fields if they exist */}
                  {(selectedSubmission.status === 'approved' || selectedSubmission.status === 'rejected') && (
                    <>
                      <p>
                        <span className="font-semibold">Reviewed By:</span>{' '}
                        {selectedSubmission.reviewedBy}
                      </p>
                      <p>
                        <span className="font-semibold">Reviewed On:</span>{' '}
                        {selectedSubmission.reviewedAt ? new Date(selectedSubmission.reviewedAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </>
                  )}
                </div>
                <div className="border-t pt-4 border-gray-200">
                  <h3 className="text-lg font-bold mb-2 text-slate-700">Full Details</h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {selectedSubmission.details}
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  {selectedSubmission.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(selectedSubmission.id)}
                        className="flex-1 flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors duration-200"
                      >
                        <ThumbsUp className="w-5 h-5 mr-2" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(selectedSubmission.id)}
                        className="flex-1 flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors duration-200"
                      >
                        <ThumbsDown className="w-5 h-5 mr-2" /> Reject
                      </button>
                    </>
                  )}
                  {/* Add a Revert button for approved or rejected submissions */}
                  {(selectedSubmission.status === 'approved' || selectedSubmission.status === 'rejected') && (
                    <button
                      onClick={() => handleRevert(selectedSubmission.id)}
                      className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors duration-200"
                    >
                      <XCircle className="w-5 h-5 mr-2" /> Revert to Pending
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(selectedSubmission)}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors duration-200"
                  >
                    <Edit2 className="w-5 h-5 mr-2" /> Edit
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center text-slate-500 p-6 md:p-8"
          >
            <div className="flex justify-center mb-4">
              <Info className="w-12 h-12 text-blue-400" />
            </div>
            <p className="text-lg font-semibold">Select a submission to view details</p>
            <p className="text-sm mt-2">
              Use the filters on the left to navigate through pending and reviewed content.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-slate-600">Review and manage community submissions</p>
        </header>

        {/* Main Content Area */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl border border-gray-200"
          >
            <div className="space-y-6">
              {/* Filter by Status */}
              <div>
                <h2 className="text-xl font-bold mb-3 text-slate-800 flex items-center">
                  <ChevronDown className="w-5 h-5 mr-2 text-slate-500" /> Status
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3 text-sm md:text-base">
                  {['pending', 'approved', 'rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setCurrentStatus(status as Submission['status']);
                        setSelectedSubmission(null);
                        setIsEditing(false);
                      }}
                      className={`filter-btn px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                        currentStatus === status
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submission Type */}
              <div>
                <h2 className="text-xl font-bold mb-3 text-slate-800 flex items-center">
                  <ChevronDown className="w-5 h-5 mr-2 text-slate-500" /> Type
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {['interview', 'hackathon'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setCurrentType(type as Submission['type']);
                        setSelectedSubmission(null);
                        setIsEditing(false);
                      }}
                      className={`type-btn p-4 rounded-xl font-semibold transition-all duration-200 flex flex-col items-center justify-center ${
                        currentType === type
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-600'
                          : 'bg-gray-100 text-slate-600 hover:bg-gray-200 border-2 border-transparent'
                      }`}
                    >
                      {type === 'interview' ? (
                        <FileText className="w-6 h-6 mb-1" />
                      ) : (
                        <Code className="w-6 h-6 mb-1" />
                      )}
                      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submission List */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h2 className="text-xl font-bold text-slate-800 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-slate-500" /> Submissions
                </h2>
                <AnimatePresence>
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((sub) => (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                          setSelectedSubmission(sub);
                          setIsEditing(false);
                        }}
                        className={`submission-card bg-white p-4 rounded-xl shadow-sm border-2 transition-all duration-150 transform hover:scale-[1.02] cursor-pointer ${
                          selectedSubmission?.id === sub.id
                            ? 'border-blue-500 ring-4 ring-blue-100'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <h3 className="font-semibold text-slate-800">{sub.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">
                          By: <span className="font-medium">{sub.author}</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          Submitted on: {new Date(sub.submittedAt).toLocaleDateString()}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      key="no-submissions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center text-slate-400 py-6"
                    >
                      No submissions found for this filter.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-200 flex items-start justify-center min-h-[500px]"
          >
            {renderDetailsPanel()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Admin;