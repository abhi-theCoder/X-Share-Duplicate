import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, MapPin, Building, Calendar, Edit3, Star, Trophy,
  BookOpen, MessageCircle, Heart, Upload, Save, X, LogOut, HeartHandshake, Users, ThumbsUp
} from 'lucide-react';
import LoginRequired from '../components/LoginRequired';
import axios from '../api';

// ✅ Icon map
const iconMap: Record<string, React.ComponentType<any>> = {
  User,
  Mail,
  MapPin,
  Building,
  Calendar,
  Edit3,
  Star,
  Trophy,
  BookOpen,
  MessageCircle,
  Heart,
  Upload,
  Save,
  X,
  LogOut,
  HeartHandshake,
  Users,
  ThumbsUp
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    location: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }

        const response = await axios.get('api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response)
        setProfileData(response.data);
        setFormData({
          name: response.data.name,
          role: response.data.role,
          company: response.data.company,
          location: response.data.location,
          bio: response.data.bio
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData((prev: any) => ({ ...prev, ...formData }));
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Failed to save profile changes.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profileData.name,
      role: profileData.role,
      company: profileData.company,
      location: profileData.location,
      bio: profileData.bio
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error === 'User not authenticated.') {
    return <LoginRequired />;
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center text-gray-500">
        <p>No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-6">{/* Logout button */}</div>
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6"
            >
              {/* Avatar + Profile Card */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={profileData.avatar || 'https://placehold.co/96x96/e5e7eb/4b5563?text=User'}
                    alt={profileData.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-orange-200"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                    <p className="text-gray-600 mt-1">{profileData.role}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Mail className="w-5 h-5" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Building className="w-5 h-5" />
                      <span>{profileData.company}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>Joined {new Date(profileData.joined_date).toUTCString()}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
                  >
                    <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    />
                  </div>
                  {/* Role */}
                  <div className="space-y-1">
                    <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    />
                  </div>
                  {/* Company */}
                  <div className="space-y-1">
                    <label htmlFor="company" className="text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    />
                  </div>
                  {/* Location */}
                  <div className="space-y-1">
                    <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    />
                  </div>
                  {/* Bio */}
                  <div className="space-y-1">
                    <label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    ></textarea>
                  </div>
                  <div className="flex space-x-4 pt-2">
                    <button
                      onClick={handleSave}
                      className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
                    >
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
                    >
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-orange-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {profileData.achievements?.map((achievement: any, index: number) => {
                  const IconComponent = iconMap[achievement.icon] || User;
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        achievement.earned
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 mb-2 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                      <h4 className={`font-medium text-sm ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                        {achievement?.title || "Untitled"}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {profileData.stats?.map((stat: any) => {
                const IconComponent = iconMap[stat.icon] || User;
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stat?.value || 0}</div>
                    <div className="text-sm text-gray-600">{stat?.label || 'Unknown'}</div>
                  </div>
                );
              })}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {profileData.recentActivity?.map((activity: any) => {
                  const IconComponent = iconMap[activity?.icon] || User;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'question'
                              ? 'bg-blue-100 text-blue-600'
                              : activity.type === 'resource'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-orange-100 text-orange-600'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.timeAgo}</p>
                        </div>
                      </div>
                      <div className="font-bold text-green-600">{activity.points}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Level Progress (✅ dynamic now) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">Level Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        {(() => {
                          const IconComponent = iconMap[profileData.level?.icon] || Star;
                          return <IconComponent className="w-4 h-4 text-white" />;
                        })()}
                      </div>
                      <span className="font-bold text-gray-800">{profileData.level?.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{profileData.level?.progressText}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                      {profileData.level?.percentage}%
                    </div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${profileData.level?.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{profileData.level?.remaining}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;