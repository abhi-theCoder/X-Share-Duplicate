import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, ThumbsUp, MessageCircle, Clock, User, CheckCircle } from 'lucide-react';

const QAndA = () => {
  const [question, setQuestion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // State for new comment input
  const [newCommentText, setNewCommentText] = useState('');
  // State to manage comments for each question
  const [questionComments, setQuestionComments] = useState({});

  const questions = [
    {
      id: 1,
      question: 'How to prepare for system design interviews?',
      author: 'Amit Kumar',
      timeAgo: '2 hours ago',
      votes: 15,
      answers: 3,
      isAnswered: true,
      tags: ['System Design', 'Interview'],
      comments: [], // Initialize comments array
    },
    {
      id: 2,
      question: 'Best resources for learning React in 2025?',
      author: 'Sneha Patel',
      timeAgo: '5 hours ago',
      votes: 8,
      answers: 5,
      isAnswered: true,
      tags: ['React', 'Frontend'],
      comments: [
        { id: 'c1', author: 'Dev User', text: 'Check out the official React docs and their new beta features!' },
      ],
    },
    {
      id: 3,
      question: 'How to negotiate salary in your first job?',
      author: 'Vikram Singh',
      timeAgo: '1 day ago',
      votes: 22,
      answers: 7,
      isAnswered: true,
      tags: ['Salary', 'Career'],
      comments: [],
    },
    {
      id: 4,
      question: 'Tips for transitioning from academia to industry?',
      author: 'Kavya Reddy',
      timeAgo: '2 days ago',
      votes: 12,
      answers: 0,
      isAnswered: false,
      tags: ['Career Transition', 'Industry'],
      comments: [],
    },
  ];

  const popularTags = ['Interview Prep', 'System Design', 'React', 'Python', 'Career Advice', 'Salary', 'Remote Work'];

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Function to handle adding a comment
  const handleAddComment = (questionId) => {
    if (newCommentText.trim() === '') return; // Don't add empty comments

    const updatedComments = {
      ...questionComments,
      [questionId]: [
        ...(questionComments[questionId] || []),
        {
          id: Date.now(), // Simple unique ID
          author: 'Current User', // Replace with actual logged-in user
          text: newCommentText,
        },
      ],
    };
    setQuestionComments(updatedComments);
    setNewCommentText(''); // Clear the input after adding
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Questions & <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">Answers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your career and technical questions answered by experienced professionals and peers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Ask Question Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ask a Question</h3>
              <div className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What's your question? Be specific and detailed..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {popularTags.slice(0, 3).map(tag => (
                      <button
                        key={tag}
                        className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm hover:bg-orange-200 transition-colors duration-200"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                  <button className="flex items-center px-6 py-2 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105">
                    <Send className="w-4 h-4 mr-2" />
                    Post Question
                  </button>
                </div>
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Questions List */}
            <div className="space-y-6">
              {filteredQuestions.map((q, index) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-green-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{q.author}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{q.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    {q.isAnswered && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-5 h-5 mr-1" />
                        <span className="text-sm font-medium">Answered</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-orange-600 transition-colors duration-200">
                    {q.question}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-orange-500 transition-colors duration-200">
                        <ThumbsUp className="w-5 h-5" />
                        <span>{q.votes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                        <MessageCircle className="w-5 h-5" />
                        <span>{q.answers} Answers</span>
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      {q.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Comments Section */}
                  {q.comments.length > 0 || (questionComments[q.id] && questionComments[q.id].length > 0) ? (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-md font-bold text-gray-700 mb-3">Comments</h4>
                      {/* Display existing comments */}
                      {q.comments.map(comment => (
                        <div key={comment.id} className="mb-3 pb-3 border-b border-gray-50 last:border-b-0">
                          <p className="text-gray-800 leading-relaxed">{comment.text}</p>
                          <p className="text-xs text-gray-500 mt-1">- {comment.author}</p>
                        </div>
                      ))}
                      {/* Display added comments */}
                      {questionComments[q.id] && questionComments[q.id].map(comment => (
                        <div key={comment.id} className="mb-3 pb-3 border-b border-gray-50 last:border-b-0">
                          <p className="text-gray-800 leading-relaxed">{comment.text}</p>
                          <p className="text-xs text-gray-500 mt-1">- {comment.author}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Comment Input */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-md font-bold text-gray-700 mb-3">Add a Comment</h4>
                    <textarea
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => handleAddComment(q.id)}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-green-700 transition-all duration-200"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    className="px-3 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm hover:bg-orange-100 transition-colors duration-200"
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
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
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
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{contributor.name}</p>
                        <p className="text-sm text-gray-500">{contributor.answers} answers</p>
                      </div>
                    </div>
                    <span className="font-bold text-orange-600">{contributor.points}</span>
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