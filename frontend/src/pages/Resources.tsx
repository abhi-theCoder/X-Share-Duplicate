import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Star, Calendar, User, FileText, Video } from 'lucide-react';

// Define the Resource interface for strong typing of the resource objects
interface Resource {
  id: number;
  title: string;
  description: string;
  author: string;
  company: string;
  type: string;
  format: string;
  downloads: number;
  rating: number;
  uploadedAt: string;
  icon: React.ElementType;
}

// Define the props interface for RatingStars
interface RatingStarsProps {
  rating: number;
  onRate: (rating: number) => void;
}

// Star Rating Component for the popup
const RatingStars: React.FC<RatingStarsProps> = ({ rating, onRate }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(starValue => (
        <Star
          key={starValue}
          className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
            (hoveredRating || rating) >= starValue ? 'text-yellow-500 fill-current' : 'text-gray-300'
          }`}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => onRate(starValue)}
        />
      ))}
    </div>
  );
};

// Main Resources Component
const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const resourceTypes = ['All', 'Interview Questions', 'Coding Challenges', 'Resume Templates', 'Video Tutorials'];

  const [resources, setResources] = useState<Resource[]>([
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
      uploadedAt: '1 week ago',
      icon: Video,
    },
  ]);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });
  
  const openRatingModal = (resource: Resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };
  
  const closeRatingModal = (): void => {
    setIsModalOpen(false);
    setSelectedResource(null);
  };

  const handleRate = (newRating: number): void => {
    if (selectedResource) {
      const updatedResources = resources.map(resource => 
        resource.id === selectedResource.id ? { ...resource, rating: newRating } : resource
      );
      setResources(updatedResources);
    }
    closeRatingModal();
  };
  
  // --- DEFINITIVE COLOR THEME DEFINITIONS (Bright Cyan/Blue) ---
  const primaryAccentColor = '#45B5DA'; // Primary Accent (User requested #34A19D -> #45B5DA, applying to primary)
  const secondaryAccentColor = '#0F9BC0'; // Darker Cyan for contrast (Adjusted from old Teal)
  const mainBackgroundColor = '#EEF2F7'; // Main Background (User requested #E6FFFA -> #EEF2F7)
  const cardBackgroundColor = '#FFFFFF'; // Pure white for cards
  const lightElementColor = '#D4EEF9'; // Very light cyan for secondary backgrounds (Adjusted from old light Teal)

  // The custom focus style now uses the primary accent color.
  const customFocusStyle = { 
      '--tw-ring-color': primaryAccentColor,
  } as React.CSSProperties;
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedType(e.target.value);
  };

  return (
    // Applying new background color #EEF2F7
    <div 
      className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8" 
      style={{ backgroundColor: mainBackgroundColor }}
    > 
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Interview 
            <span 
              // Header text gradient using the new blue/cyan accents
              style={{ 
                background: `linear-gradient(to right, ${primaryAccentColor}, ${secondaryAccentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Resources
            </span>
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
              // Sidebar card background is pure white
              className="rounded-2xl shadow-lg p-6 border border-gray-100" style={{ backgroundColor: cardBackgroundColor }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Filter Resources</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                  <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    // Uses customFocusStyle for the ring color
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-200"
                    style={customFocusStyle} 
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
              // Sidebar CTA background uses the new light cyan color
              className="rounded-2xl p-6 mt-6 border border-gray-200" style={{ backgroundColor: lightElementColor, borderColor: primaryAccentColor }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3">Share Your Resources</h3>
              <p className="text-gray-700 text-sm mb-4">
                Help others by sharing your interview materials and earn points!
              </p>
              {/* Button gradient uses the strong new accents */}
              <button 
                className="w-full px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-xl"
                style={{
                  background: `linear-gradient(to right, ${primaryAccentColor}, ${secondaryAccentColor})`,
                  transition: 'background-color 0.2s',
                }}
              >
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
                  // Uses customFocusStyle for the ring color
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-200 shadow-sm"
                  style={customFocusStyle}
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
                    // Card background is pure white
                    className="rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 group hover:shadow-xl" 
                    style={{ backgroundColor: cardBackgroundColor }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {/* Icon background gradient uses the new blue/cyan accents */}
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-lg"
                          style={{ background: `linear-gradient(to bottom right, ${primaryAccentColor}, ${secondaryAccentColor})` }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          {/* Type tag text and background uses the new light cyan colors */}
                          <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: lightElementColor, color: secondaryAccentColor }}>
                            {resource.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{resource.rating}</span>
                      </div>
                    </div>

                    <h3 
                      className="text-xl font-bold text-gray-800 mb-3 transition-colors duration-200" 
                      // Custom hover effect for title color using the primary accent
                      onMouseEnter={(e: React.MouseEvent<HTMLHeadingElement>) => e.currentTarget.style.color = primaryAccentColor} 
                      onMouseLeave={(e: React.MouseEvent<HTMLHeadingElement>) => e.currentTarget.style.color = '#1f2937'}
                    >
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {/* Author icon background gradient uses the new blue/cyan accents */}
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                          style={{ background: `linear-gradient(to bottom right, ${primaryAccentColor}, ${secondaryAccentColor})` }}
                        >
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
                        {/* Rate button color uses the primary accent color */}
                        <button 
                          onClick={() => openRatingModal(resource)}
                          className="flex items-center space-x-1 transition-colors duration-200 font-medium"
                          style={{ color: primaryAccentColor }} onMouseEnter={e => e.currentTarget.style.color = secondaryAccentColor} onMouseLeave={e => e.currentTarget.style.color = primaryAccentColor}
                        >
                          <Star className="w-4 h-4" />
                          <span>Rate this resource</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Format tag background uses light cyan */}
                        <span className="px-2 py-1 text-gray-700 rounded text-xs font-medium" style={{ backgroundColor: lightElementColor }}>
                          {resource.format}
                        </span>
                        {/* Download button gradient uses the strong new accents */}
                        <button 
                          className="px-4 py-2 text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200 shadow-lg"
                          style={{
                            background: `linear-gradient(to right, ${primaryAccentColor}, ${secondaryAccentColor})`,
                          }}
                        >
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

      {/* Rating Pop-up Modal */}
      <AnimatePresence> 
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closeRatingModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Rate this Resource</h2>
              <p className="text-center text-gray-600 mb-6">
                {selectedResource?.title}
              </p>
              <div className="flex justify-center mb-6">
                <RatingStars rating={selectedResource?.rating || 0} onRate={handleRate} />
              </div>
              <button
                onClick={closeRatingModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resources;
