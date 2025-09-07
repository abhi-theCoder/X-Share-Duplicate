import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, MessageCircle, Share2, Clock, Building, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react';
import axios from '../api';

interface Experience {
  id: number;
  upvotes: number;
  downvotes: number;
  comments_count: number;
  users?: { name: string };
  role: string;
  company: string;
  location: string;
  created_at: string;
  type: string;
  overall_experience?: string;
  preparation_tips?: string;
  work_culture?: string;
  // Assumed new field from backend to indicate current user's vote
  userVote?: 'upvote' | 'downvote' | null;
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Date not available';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Colors for dynamic avatars
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F0A500', '#25B7D9', '#E63946', '#2A9D8F'];

// Function to generate a consistent color from a string
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const Experiences: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use a placeholder ID from localStorage. In a real app, this should come from a secure authentication system.
  const [currentUserId] = useState<string>(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('userId', userId);
    }
    return userId;
  });

  // State to manage user's votes based on backend data
  const [userVotes, setUserVotes] = useState<Record<number, 'upvote' | 'downvote' | null>>({});

  const categories = ['All', 'internship', 'job', 'hackathon', 'other'];

  const fetchExperiences = async () => {
    try {
      // We assume the backend now includes a userVote field in the response
      const response = await axios.get<Experience[]>('/api/experiences');
      const experiencesData = response.data;

      // Initialize the userVotes state based on the fetched data
      const initialVotes = experiencesData.reduce((acc, exp) => {
        if (exp.userVote) {
          acc[exp.id] = exp.userVote;
        }
        return acc;
      }, {} as Record<number, 'upvote' | 'downvote' | null>);
      
      setUserVotes(initialVotes);
      setExperiences(experiencesData);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch experiences:', err);
      setError('Failed to load experiences. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleVote = async (e: React.MouseEvent<HTMLButtonElement>, experienceId: number, voteType: 'upvote' | 'downvote') => {
    e.preventDefault();
    e.stopPropagation();

    const currentVote = userVotes[experienceId];
    let newVoteType: 'upvote' | 'downvote' | null = voteType;

    // Check if the user is un-voting or changing their vote
    if (currentVote === voteType) {
      newVoteType = null; // Un-vote
    } else {
      newVoteType = voteType; // New vote or changing vote
    }

    // Optimistically update the UI
    setExperiences(prevExperiences => prevExperiences.map(exp => {
      if (exp.id === experienceId) {
        const upvotes = exp.upvotes || 0;
        const downvotes = exp.downvotes || 0;

        // Adjust counts based on the new vote action
        if (newVoteType === 'upvote') {
          return {
            ...exp,
            upvotes: upvotes + (currentVote !== 'upvote' ? 1 : 0),
            downvotes: currentVote === 'downvote' ? downvotes - 1 : downvotes,
            userVote: newVoteType
          };
        } else if (newVoteType === 'downvote') {
          return {
            ...exp,
            upvotes: currentVote === 'upvote' ? upvotes - 1 : upvotes,
            downvotes: downvotes + (currentVote !== 'downvote' ? 1 : 0),
            userVote: newVoteType
          };
        } else { // Un-vote
          return {
            ...exp,
            upvotes: currentVote === 'upvote' ? upvotes - 1 : upvotes,
            downvotes: currentVote === 'downvote' ? downvotes - 1 : downvotes,
            userVote: newVoteType
          };
        }
      }
      return exp;
    }));

    // Update local user votes state
    setUserVotes(prevVotes => ({
      ...prevVotes,
      [experienceId]: newVoteType,
    }));
    
    // Send the vote to the backend
    try {
      await axios.post(`/api/experiences/${experienceId}/vote`, {
        userId: currentUserId,
        voteType: newVoteType
      });
    } catch (err) {
      console.error('Failed to submit vote:', err);
      // Revert the state changes on failure by refetching data
      fetchExperiences();
    }
  };

  const filteredExperiences = experiences.filter(exp => {
    const syntheticTitle = `${exp.role || ''} at ${exp.company || ''}`;
    const syntheticContent = `${exp.overall_experience || ''} ${exp.preparation_tips || ''} ${exp.work_culture || ''}`;
    const authorName = exp.users?.name || '';

    const matchesSearch = syntheticTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         syntheticContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exp.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  const getInitials = (name: string | undefined): string => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

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
            Career <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">Experiences</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from the journeys of successful professionals who've walked the path before you.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Experiences Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((experience, index) => (
              <motion.article
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group"
              >
                <Link to={`/experiences/${experience.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4"
                        style={{ backgroundColor: stringToColor(experience.users?.name || String(experience.id)) }}
                      >
                        {getInitials(experience.users?.name || `User ${experience.id}`)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{experience.users?.name || `User ${experience.id}`}</h3>
                        <p className="text-sm text-gray-500">{experience.role}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Building className="w-4 h-4 mr-1" />
                          <span className="mr-3">{experience.company}</span>
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-200">
                      {experience.role || 'Career Experience'} at {experience.company || 'A Company'}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {experience.overall_experience || experience.preparation_tips || 'No experience summary provided.'}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{formatDate(experience.created_at)}</span>
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                        {experience.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={(e) => handleVote(e, experience.id, 'upvote')}
                          className={`flex items-center space-x-2 transition-all duration-200 p-2 rounded-full ${userVotes[experience.id] === 'upvote' ? 'bg-green-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          <ThumbsUp className={`w-5 h-5 ${userVotes[experience.id] === 'upvote' ? 'fill-current' : ''}`} />
                          <span>{experience.upvotes}</span>
                        </button>
                        <button
                          onClick={(e) => handleVote(e, experience.id, 'downvote')}
                          className={`flex items-center space-x-2 transition-all duration-200 p-2 rounded-full ${userVotes[experience.id] === 'downvote' ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          <ThumbsDown className={`w-5 h-5 ${userVotes[experience.id] === 'downvote' ? 'fill-current' : ''}`} />
                          <span>{experience.downvotes}</span>
                        </button>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <MessageCircle className="w-5 h-5" />
                          <span>{experience.comments_count}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <div className="lg:col-span-3 text-center py-12 text-gray-500">
              <p>No experiences found. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* Share Experience CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl p-8 border border-orange-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Have an Experience to Share?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Help the next generation by sharing your career journey, challenges, and insights.
            </p>
            <Link to="/share-experience">
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Share Your Story
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experiences;
