import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Star, Eye, Calendar, User, FileText, Video, Link } from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const resourceTypes = ['All', 'Interview Questions', 'Coding Challenges', 'Resume Templates', 'Video Tutorials'];

  const resources = [
    {
      id: 1,
      title: 'System Design Interview Questions - FAANG Companies',
      description: 'Comprehensive collection of system design questions asked in Google, Amazon, Facebook, Apple, and Netflix interviews.',
      author: 'Ravi Gupta',
      company: 'Ex-Google',
      type: 'Interview Questions',
      format: 'PDF',
      downloads: 1240,
      rating: 4.8,
      views: 3200,
      uploadedAt: '1 week ago',
      icon: FileText,
    },
    {
      id: 2,
      title: 'DSA Problem Set - Top 100 Coding Questions',
      description: 'Curated list of the most important data structures and algorithms problems for technical interviews.',
      author: 'Pooja Sharma',
      company: 'Ex-Microsoft',
      type: 'Coding Challenges',
      format: 'Document',
      downloads: 890,
      rating: 4.9,
      views: 2100,
      uploadedAt: '3 days ago',
      icon: FileText,
    },
    {
      id: 3,
      title: 'Software Engineer Resume Template 2025',
      description: 'Professional ATS-friendly resume template specifically designed for software engineering roles.',
      author: 'Arjun Patel',
      company: 'Ex-Amazon',
      type: 'Resume Templates',
      format: 'DOCX',
      downloads: 2100,
      rating: 4.7,
      views: 5400,
      uploadedAt: '5 days ago',
      icon: FileText,
    },
    {
      id: 4,
      title: 'Mock Interview Series - Backend Engineering',
      description: 'Complete video series covering backend engineering interview scenarios with real-time feedback.',
      author: 'Deepak Kumar',
      company: 'Ex-Uber',
      type: 'Video Tutorials',
      format: 'Video',
      downloads: 650,
      rating: 4.9,
      views: 1800,
      uploadedAt: '1 week ago',
      icon: Video,
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Interview <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">Resources</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access curated resources shared by industry experts to ace your interviews and advance your career.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Filter Resources</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    {resourceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Upload Resource CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl p-6 mt-6 border border-orange-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3">Share Your Resources</h3>
              <p className="text-gray-600 text-sm mb-4">
                Help others by sharing your interview materials and earn points!
              </p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-green-700 transition-all duration-200">
                Upload Resource
              </button>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Resources Grid */}
            <div className="space-y-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                            {resource.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{resource.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-200">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-green-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{resource.author}</p>
                          <p className="text-sm text-gray-500">{resource.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{resource.uploadedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{resource.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{resource.views}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {resource.format}
                        </span>
                        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200">
                          Download
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;