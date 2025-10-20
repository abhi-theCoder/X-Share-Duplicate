import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User, Mail, MapPin, Building, Calendar, Edit3, Star, Trophy, Clock,
  BookOpen, MessageCircle, Heart, Upload, Save, X, LogOut, HeartHandshake, Users, ThumbsUp, Bookmark, FileText,
} from 'lucide-react';
import LoginRequired from '../LoginRequired';
import ActivityHeatmap from '../components/ActivityHeatmap';
import axios from '../api';

// Icon map
const iconMap = {
  User, Mail, MapPin, Building, Calendar, Edit3, Star, Trophy,
  BookOpen, MessageCircle, Heart, Upload, Save, X, LogOut,
  HeartHandshake, Users, ThumbsUp, Bookmark, FileText
};

// Experience interface
interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  upvotes: number;
  comments_count: number;
  overall_experience: string;
  created_at: string;
  users: { name: string };
  type: string;
}

// Form data type
interface FormData {
  name: string;
  role: string;
  company: string;
  location: string;
  bio: string;
}

// Helper functions
const formatDate = (dateString?: string) => {
  if (!dateString) return 'Date not available';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F0A500', '#25B7D9', '#E63946', '#2A9D8F'];
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
const getInitials = (name: string) => {
  if (!name) return 'U';
  const parts = name.split(' ');
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
};

// Level calculation
const calculateLevelAndProgress = (points: number) => {
  const levels = [
    { name: 'Beginner', icon: 'User', minPoints: 0, maxPoints: 199 },
    { name: 'Intermediate', icon: 'Edit3', minPoints: 200, maxPoints: 499 },
    { name: 'Wood', icon: 'BookOpen', minPoints: 500, maxPoints: 799 },
    { name: 'Stone', icon: 'MessageCircle', minPoints: 800, maxPoints: 1499 },
    { name: 'Bronze', icon: 'Trophy', minPoints: 1500, maxPoints: 1999 },
    { name: 'Silver', icon: 'Trophy', minPoints: 2000, maxPoints: 2499 },
    { name: 'Gold', icon: 'Trophy', minPoints: 2500, maxPoints: 3499 },
    { name: 'Platinum', icon: 'Trophy', minPoints: 3500, maxPoints: 4499 },
    { name: 'Diamond', icon: 'Star', minPoints: 4500, maxPoints: 5999 },
    { name: 'Elite', icon: 'ThumbsUp', minPoints: 6000, maxPoints: 7999 },
    { name: 'Legendary', icon: 'HeartHandshake', minPoints: 8000, maxPoints: 9999 },
    { name: 'Mythic', icon: 'Users', minPoints: 10000, maxPoints: 14999 },
    { name: 'Ultimate', icon: 'Star', minPoints: 15000, maxPoints: Infinity }
  ];

  let currentLevel = levels[0];
  let nextLevel: any = null;
  let progress = 0;

  for (let i = 0; i < levels.length; i++) {
    if (points >= levels[i].minPoints && points <= levels[i].maxPoints) {
      currentLevel = levels[i];
      if (levels[i].maxPoints !== Infinity) {
        progress = ((points - levels[i].minPoints) / (levels[i].maxPoints - levels[i].minPoints)) * 100;
        nextLevel = levels[i + 1];
      } else progress = 100;
      break;
    }
  }

  const progressText = nextLevel
    ? `You need ${nextLevel.minPoints - points} more points to reach ${nextLevel.name}!`
    : "You've reached the highest level! 🏆";

  return {
    name: currentLevel.name,
    icon: currentLevel.icon,
    percentage: Math.min(100, Math.max(0, Math.floor(progress))),
    progressText,
    remaining: nextLevel ? `${points} / ${nextLevel.minPoints}` : `${points} / ∞`
  };
};

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    company: '',
    location: '',
    bio: ''
  });

  // Fetch profile & bookmarks
  useEffect(() => {
    const fetchProfileAndBookmarks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }

        const profileRes = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userId = profileRes.data.id;
        const totalPoints = profileRes.data.stats?.find((stat: any) => stat.label === 'Total Points')?.value || 0;
        const levelData = calculateLevelAndProgress(totalPoints);

        setProfileData({ ...profileRes.data, level: levelData });
        setFormData({
          name: profileRes.data.name,
          role: profileRes.data.role,
          company: profileRes.data.company,
          location: profileRes.data.location,
          bio: profileRes.data.bio
        });

        const bookmarksRes = await axios.get(`/api/bookmarks/${userId}/experiences`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookmarks(bookmarksRes.data);

      } catch (err) {
        console.error('Failed to fetch profile/bookmarks:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndBookmarks();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/profile', formData, {
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
    if (!profileData) return;
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

  const handleRemoveBookmark = async (experienceId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (!profileData?.id) {
      setError('User not authenticated.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.delete('/api/bookmarks', {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId: profileData.id, experienceId }
      });
      setBookmarks(prev => prev.filter(b => b.id !== experienceId));
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
      setError('Failed to remove bookmark.');
    }
  };

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error === 'User not authenticated.') return <LoginRequired />;

  if (error) return (
    <div className="min-h-screen pt-20 flex items-center justify-center text-red-600">
      <p>{error}</p>
    </div>
  );

  if (!profileData) return (
    <div className="min-h-screen pt-20 flex items-center justify-center text-gray-500">
      <p>No profile data available.</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* --- Keep your existing layout --- */}
    </div>
  );
};

export default Profile;
