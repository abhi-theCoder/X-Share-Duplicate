import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Users, MessageCircle, BookOpen, Trophy, User, LogOut, Award, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../api'; // Import axios

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPoints, setUserPoints] = useState(null);
  const [isPointsDropdownOpen, setIsPointsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchUserPoints = async () => {
      if (!token) {
        setUserPoints(null);
        return;
      }

      try {
        const response = await axios.get('/api/profile', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        setUserPoints(response.data.points);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUserPoints(null);
      }
    };

    fetchUserPoints();
  }, [location]);

  // Handle clicks outside the points dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPointsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserPoints(null);
    navigate('/login');
  };

  const navigation = [
    { name: 'Experiences', href: '/experiences', icon: Users },
    { name: 'Q&A', href: '/qa', icon: MessageCircle },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Updated to Blue/Indigo scheme */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              X Share
            </span>
          </Link>

          {/* Desktop Navigation - Updated to Blue selection colors */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons (Desktop) - Updated Sign Up button and hover states */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                {/* PRIMARY CTA - Applied shared style */}
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl font-medium
                    hover:from-blue-700 hover:to-blue-500
                    transform hover:scale-105 hover:-translate-y-1
                    transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {userPoints !== null && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsPointsDropdownOpen(!isPointsDropdownOpen)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
                    >
                      <Award className="w-5 h-5" />
                      <span>{userPoints}</span>
                    </button>
                    <AnimatePresence>
                      {isPointsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                        >
                          <Link
                            to="/rewards"
                            onClick={() => setIsPointsDropdownOpen(false)}
                            className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Trophy className="w-4 h-4" />
                            <span>Rewards</span>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium
                    hover:from-red-600 hover:to-red-700
                    transform hover:scale-105 hover:-translate-y-1
                    transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Updated hover state */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Updated to Blue selection colors */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-blue-100 bg-white"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* Auth Buttons (Mobile) */}
                <div className="pt-4 space-y-2">
                  {!isLoggedIn ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-center px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                      >
                        Login
                      </Link>
                      {/* Sign Up Button (Mobile) - Applied shared style */}
                      <Link
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      {userPoints !== null && (
                        <div className="relative">
                          <button
                            onClick={() => setIsPointsDropdownOpen(!isPointsDropdownOpen)}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 rounded-lg hover:bg-blue-50"
                          >
                            <Award className="w-5 h-5" />
                            <span>{userPoints} Points</span>
                          </button>
                          <AnimatePresence>
                            {isPointsDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-2 w-full bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                              >
                                <Link
                                  to="/rewards"
                                  onClick={() => { setIsPointsDropdownOpen(false); setIsMenuOpen(false); }}
                                  className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                  <Trophy className="w-4 h-4" />
                                  <span>Rewards</span>
                                </Link>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
