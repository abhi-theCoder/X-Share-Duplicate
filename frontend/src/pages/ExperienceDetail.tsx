import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Share2, Clock, Building, MapPin, Briefcase, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { verifyToken } from '../components/verifyLogin';
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
}

interface Comment {
  id: number;
  user_id: number;
  comment_text: string;
  created_at: string;
  users?: { name: string };
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Date not available';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const colors = ['#5A67D8', '#4299E1', '#667EEA', '#805AD5', '#38B2AC', '#4FD1C5', '#319795'];

const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const getInitials = (name: string | undefined): string => {
  if (!name) return 'U';
  const parts = name.split(' ');
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

const ExperienceDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);
  
  const currentUserId = localStorage.getItem('userId');

  const fetchExperienceAndComments = async () => {
    const token = localStorage.getItem('token');
    
    const checkLogin = async () => {
      if (!token) {
        setError('User not authenticated.');
        setLoading(false);
        localStorage.clear();
        navigate('/login');
        return;
      }

      const valid = await verifyToken(token);

      if(!valid){
        setError('User not authenticated.');
        setLoading(false);
        localStorage.clear();
        navigate('/login');
        return;
      }
      
    };

    checkLogin();

    try {
      setLoading(true);
      const experienceResponse = await axios.get<Experience>(`/api/experiences/${id}`);
      setExperience(experienceResponse.data);
      const commentsResponse = await axios.get<Comment[]>(`/api/experiences/${id}/comments`);
      setComments(commentsResponse.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch experience details:', err);
      setError('Failed to load experience details. Please check the URL.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperienceAndComments();
  }, [id]);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    try {
      setExperience(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          upvotes: voteType === 'upvote' ? (prev.upvotes || 0) + 1 : prev.upvotes,
          downvotes: voteType === 'downvote' ? (prev.downvotes || 0) + 1 : prev.downvotes
        };
      });

      await axios.post(`/api/experiences/${id}/vote`, {
        userId: currentUserId,
        voteType
      });

    } catch (err) {
      console.error('Failed to submit vote:', err);
      fetchExperienceAndComments(); 
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      const response = await axios.post<Comment>(`/api/experiences/${id}/comments`, {
        userId: currentUserId,
        commentText: newComment,
      });

      setComments(prev => [...prev, response.data]);
      setNewComment('');
      
      setExperience(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          comments_count: (prev.comments_count || 0) + 1
        };
      });

    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-red-600">
        <p className="text-xl mb-4">{error}</p>
        <Link to="/experiences" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200">
          Go back to experiences
        </Link>
      </div>
    );
  }

  if (!experience) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <Link to="/experiences" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Experiences
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4"
                style={{ backgroundColor: stringToColor(experience.users?.name || String(experience.id)) }}
              >
                {getInitials(experience.users?.name || `User ${experience.id}`)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {experience.users?.name || `User ${experience.id}`}
                </h1>
                <p className="text-lg text-gray-600">
                  {experience.role} at {experience.company}
                </p>
              </div>
            </div>
            <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              {experience.type}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
            <span className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              {experience.role}
            </span>
            <span className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              {experience.company}
            </span>
            <span className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {experience.location}
            </span>
            <span className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Posted on {formatDate(experience.created_at)}
            </span>
          </div>

          <div className="flex items-center space-x-6 border-t pt-4 mt-4 border-gray-100">
            <button onClick={() => handleVote('upvote')} className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
              <ThumbsUp className="w-6 h-6" />
              <span className="font-semibold">{experience.upvotes}</span>
            </button>
            <button onClick={() => handleVote('downvote')} className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors duration-200">
              <ThumbsDown className="w-6 h-6" />
              <span className="font-semibold">{experience.downvotes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500">
              <MessageCircle className="w-6 h-6" />
              <span className="font-semibold">{experience.comments_count}</span>
            </button>
            <button className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Experience Breakdown</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Overall Experience</h3>
            <p className="text-gray-600 leading-relaxed">{experience.overall_experience || 'No description provided.'}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Preparation Tips</h3>
            <p className="text-gray-600 leading-relaxed">{experience.preparation_tips || 'No preparation tips provided.'}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Work Culture</h3>
            <p className="text-gray-600 leading-relaxed">{experience.work_culture || 'No work culture details provided.'}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments ({comments.length})</h2>
          
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                rows={3}
              />
              <button
                type="submit"
                className="absolute right-3 bottom-3 p-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
                disabled={commentLoading}
              >
                {commentLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: stringToColor(comment.users?.name || 'Anonymous') }}
                  >
                    {getInitials(comment.users?.name || 'Anonymous')}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-1">
                      {comment.users?.name || 'Anonymous User'}
                      <span className="text-xs text-gray-400 ml-2 font-normal">{formatDate(comment.created_at)}</span>
                    </p>
                    <p className="text-gray-600 leading-snug">{comment.comment_text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 italic">Be the first to leave a comment!</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceDetail;