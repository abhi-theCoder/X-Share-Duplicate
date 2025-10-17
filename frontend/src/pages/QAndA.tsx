import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, ThumbsUp, MessageCircle, Clock, User, CheckCircle } from 'lucide-react';
import axios from '../api'; // Axios instance with baseURL pointing to your backend

const QAndA = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newCommentText, setNewCommentText] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const popularTags = ['Interview Prep', 'System Design', 'React', 'Python', 'Career Advice', 'Salary', 'Remote Work'];

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get('/api/qna');
        console.log(data)
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

  // Post a new question
  const handlePostQuestion = async () => {
    if (!question.trim()) return;

    try {
      const { data } = await axios.post('/api/qna/question', {
        question,
        tags: selectedTags,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setQuestions(prev => [data, ...prev]);
      setQuestion('');
      setSelectedTags([]);
    } catch (err) {
      console.error(err);
    }
  };

  // Post a new comment
  const handleAddComment = async (questionId) => {
    const commentText = newCommentText[questionId];
    if (!commentText?.trim()) return;

    try {
      const { data } = await axios.post('/api/qna/comment', {
        question_id: questionId,
        comment: commentText,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setQuestions(prev =>
        prev.map(q =>
          q.id === questionId
            ? { ...q, comments: [...(q.question_comments || []), data] }
            : q
        )
      );

      // Clear only the comment of this question
      setNewCommentText(prev => ({ ...prev, [questionId]: '' }));
    } catch (err) {
      console.error(err);
    }
  };


  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(q.tags) ? q.tags : []).some(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F4FAFE]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Questions & <span className="text-[#4CAED8]">Answers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your career and technical questions answered by experienced professionals and peers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Ask Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#D1E0E8]"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ask a Question</h3>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What's your question? Be specific and detailed..."
                className="w-full h-32 p-4 border border-[#D1E0E8] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#4CAED8] focus:border-transparent transition-all duration-200 mb-4"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {popularTags.slice(0, 3).map(tag => (
                    <button
                      key={tag}
                      className="px-3 py-1 bg-[#EEF2F7] text-[#4CAED8] rounded-full text-sm hover:bg-[#D1E0E8] transition-colors duration-200"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handlePostQuestion}
                  className="flex items-center px-6 py-2 bg-[#4CAED8] text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Question
                </button>
              </div>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#D1E0E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAED8] focus:border-transparent transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Questions List */}
            <div className="space-y-6">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-[#D1E0E8] hover:border-[#4CAED8] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#4CAED8] rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{q.users?.name || 'Anonymous'}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{new Date(q.created_at).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      {q.is_answered && (
                        <div className="flex items-center text-[#4CAED8]">
                          <CheckCircle className="w-5 h-5 mr-1" />
                          <span className="text-sm font-medium">Answered</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-[#4CAED8]">{q.question}</h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-[#4CAED8] transition-colors duration-200">
                          <ThumbsUp className="w-5 h-5" />
                          <span>{q.votes || 0}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-[#4CAED8] transition-colors duration-200">
                          <MessageCircle className="w-5 h-5" />
                          <span>{(q.question_comments || []).length} Answers</span>
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        {(Array.isArray(q.tags) ? q.tags : []).map(tag => (
                          <span key={tag} className="px-3 py-1 bg-[#EEF2F7] text-gray-600 rounded-full text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Comments Section */}
                    {(Array.isArray(q.question_comments) && q.question_comments.length > 0) && (
                      <div className="mt-4 pt-4 border-t border-[#D1E0E8]">
                        <h4 className="text-md font-bold text-gray-700 mb-3">Comments</h4>
                        {q.question_comments.map(comment => (
                          <div key={comment.id} className="mb-3 pb-3 border-b border-gray-50 last:border-b-0">
                            <p className="text-gray-800 leading-relaxed">{comment.comment}</p>
                            <p className="text-xs text-gray-500 mt-1">- {comment.users?.name || 'Anonymous'}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comment Input */}
                    <div className="mt-4 pt-4 border-t border-[#D1E0E8]">
                      <h4 className="text-md font-bold text-gray-700 mb-3">Add a Comment</h4>
                      <textarea
                        value={newCommentText[q.id] || ''}
                        onChange={(e) =>
                          setNewCommentText(prev => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder="Share your thoughts..."
                        className="w-full h-24 p-3 border border-[#D1E0E8] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#4CAED8] focus:border-transparent transition-all duration-200"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleAddComment(q.id)}
                          className="px-4 py-2 bg-[#4CAED8] text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-10">
                  <p className="text-lg font-medium">No questions found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#D1E0E8]"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev =>
                        prev.includes(tag)
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                      selectedTags.includes(tag) ? 'bg-[#4CAED8] text-white' : 'bg-[#EEF2F7] text-[#4CAED8]'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-[#D1E0E8]"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Top Contributors</h3>
              <div className="space-y-4">
                {[
                  { name: 'Dr. Rajesh Kumar', answers: 45, points: 890 },
                  { name: 'Priya Sharma', answers: 32, points: 720 },
                  { name: 'Arjun Patel', answers: 28, points: 650 },
                ].map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-[#4CAED8]'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{contributor.name}</p>
                        <p className="text-sm text-gray-500">{contributor.answers} answers</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#4CAED8]">{contributor.points}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAndA;