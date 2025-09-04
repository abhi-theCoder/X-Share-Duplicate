import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, MessageCircle, Share2, Clock, Building, MapPin } from 'lucide-react';

const Experiences = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Consultant'];

  const experiences = [
    {
      id: 1,
      author: 'Priya Sharma',
      role: 'Senior Software Engineer',
      company: 'Google',
      location: 'Bangalore',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'From Tier-3 College to Google: My Journey',
      content: 'I want to share how I transitioned from a tier-3 engineering college to landing a job at Google. The key was consistent practice, open source contributions, and never giving up on my dreams...',
      likes: 234,
      comments: 45,
      timeAgo: '2 days ago',
      category: 'Software Engineer',
    },
    {
      id: 2,
      author: 'Rahul Mehta',
      role: 'Product Manager',
      company: 'Microsoft',
      location: 'Hyderabad',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Breaking into Product Management without an MBA',
      content: 'Many believe you need an MBA to become a Product Manager, but I proved them wrong. Here\'s how I built the right skills and network to land my dream role...',
      likes: 189,
      comments: 32,
      timeAgo: '5 days ago',
      category: 'Product Manager',
    },
    {
      id: 3,
      author: 'Anita Patel',
      role: 'Data Scientist',
      company: 'Amazon',
      location: 'Mumbai',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      title: 'Transitioning from Finance to Data Science',
      content: 'After 5 years in finance, I decided to pivot to data science. The journey wasn\'t easy, but with the right strategy and persistence, I made it work...',
      likes: 156,
      comments: 28,
      timeAgo: '1 week ago',
      category: 'Data Scientist',
    },
  ];

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
          {filteredExperiences.map((experience, index) => (
            <motion.article
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 group"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={experience.avatar}
                    alt={experience.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{experience.author}</h3>
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
                  {experience.title}
                </h4>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {experience.content}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{experience.timeAgo}</span>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                    {experience.category}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200">
                      <Heart className="w-5 h-5" />
                      <span>{experience.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                      <MessageCircle className="w-5 h-5" />
                      <span>{experience.comments}</span>
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-green-500 transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
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