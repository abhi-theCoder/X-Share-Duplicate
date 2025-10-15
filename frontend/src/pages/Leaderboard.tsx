import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Users, Gift, Crown, Zap, LucideIcon } from 'lucide-react';

// --- COLOR CONSTANTS (Ensuring your exact hex codes are used) ---
const COLOR_BACKGROUND_PRIMARY = '#EEF2F7'; 
const COLOR_CARD_BACKGROUND = '#FCFCFC';
const COLOR_BORDER_LIGHT = '#D1E1E9';
const COLOR_ACCENT_BLUE = '#41B3D9'; 
const COLOR_ACCENT_GRADIENT_START = '#5BC0DE';
const COLOR_ACCENT_GRADIENT_END = '#41B3D9'; 
const COLOR_INFO_BG = '#F1F9FF'; // Specific background for the "Earn Points By" box

// --- Interfaces (No changes needed) ---
interface LeaderboardUser {
  id: number;
  name: string;
  points: number;
  contributions: number;
  level: 'Platinum' | 'Gold' | 'Silver' | 'Bronze' | 'Novice';
  avatar: string;
  company?: string;
}

interface RewardItem {
  points: number;
  reward: string;
  icon: LucideIcon;
  available: boolean;
}

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'Working Professional'>('students');

  // --- Data (No changes needed) ---
  const students: LeaderboardUser[] = [
    { id: 1, name: 'Arjun Sharma', points: 2450, contributions: 45, level: 'Gold', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 2, name: 'Priya Patel', points: 2200, contributions: 38, level: 'Gold', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 3, name: 'Vikram Singh', points: 1980, contributions: 32, level: 'Silver', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 4, name: 'Anita Kumar', points: 1750, contributions: 28, level: 'Silver', avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { id: 5, name: 'Rohit Mehta', points: 1520, contributions: 24, level: 'Bronze', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' },
  ];

  const WorkingProfessional: LeaderboardUser[] = [
    { id: 1, name: 'Dr. Rajesh Kumar', points: 3800, contributions: 89, level: 'Platinum', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', company: 'Google' },
    { id: 2, name: 'Sunita Agarwal', points: 3650, contributions: 76, level: 'Platinum', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', company: 'Microsoft' },
    { id: 3, name: 'Karan Malhotra', points: 3200, contributions: 62, level: 'Gold', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150', company: 'Amazon' },
    { id: 4, name: 'Neha Kapoor', points: 2900, contributions: 55, level: 'Gold', avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150', company: 'Meta' },
    { id: 5, name: 'Amit Jain', points: 2700, contributions: 48, level: 'Gold', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', company: 'Netflix' },
  ];

  const rewards: RewardItem[] = [
    { points: 1000, reward: 'Amazon Gift Card ₹500', icon: Gift, available: true },
    { points: 2000, reward: 'Premium Course Access', icon: Star, available: true },
    { points: 3000, reward: 'One-on-One Mentoring Session', icon: Users, available: true },
    { points: 5000, reward: 'Tech Conference Ticket', icon: Trophy, available: false },
  ];

  const getLevelColor = (level: LeaderboardUser['level']) => {
    // Using standard Tailwind gradients for bronze/silver/gold/platinum levels
    switch (level) {
      case 'Platinum': return 'from-indigo-400 to-purple-600';
      case 'Gold': return 'from-yellow-400 to-amber-600';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Bronze': return 'from-amber-600 to-orange-800'; 
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRankIcon = (index: number): LucideIcon => {
    switch (index) {
      case 0: return Crown;
      case 1: return Trophy;
      case 2: return Medal;
      default: return Award;
    }
  };

  const currentData = activeTab === 'students' ? students : WorkingProfessional;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: COLOR_BACKGROUND_PRIMARY }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {/* TITLE COLOR: Applied via inline style */}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${COLOR_ACCENT_GRADIENT_START}, ${COLOR_ACCENT_GRADIENT_END})` }}>
              Leaderboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrate achievements, track progress, and discover what rewards await top contributors.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex rounded-2xl shadow-lg p-2 mb-6 border border-gray-100"
              style={{ backgroundColor: COLOR_CARD_BACKGROUND }}
            >
              {['students', 'Working Professional'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'students' | 'Working Professional')}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 relative ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeLeaderboardTab"
                      className="absolute inset-0 text-white shadow-lg hover:shadow-xl disabled:opacity-50 rounded-xl"
                      // ACTIVE TAB BG: Primary Accent Gradient - Line 128 fixed
                      style={{ backgroundImage: `linear-gradient(to right, ${COLOR_ACCENT_GRADIENT_START}, ${COLOR_ACCENT_GRADIENT_END})` }}
                    />
                  )}
                  <span className="relative capitalize">{tab}</span>
                </button>
              ))}
            </motion.div>

            {/* Leaderboard List */}
            <div className="space-y-4">
              {currentData.map((user, index) => {
                const RankIcon = getRankIcon(index); 
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`rounded-2xl shadow-lg p-6 border transition-all duration-300 ${
                      index < 3 ? 'ring-2' : ''
                    }`}
                    style={{ 
                      backgroundColor: COLOR_CARD_BACKGROUND, 
                      borderColor: COLOR_BORDER_LIGHT, 
                      // Apply ring color using CSS variable for Tailwind utility
                      ...(index < 3 ? { '--tw-ring-color': COLOR_ACCENT_BLUE } as React.CSSProperties : {})
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`relative w-16 h-16 rounded-full overflow-hidden ${index < 3 ? 'ring-4' : ''}`} style={{ '--tw-ring-color': COLOR_ACCENT_BLUE } as React.CSSProperties}>
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                          {index < 3 && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                              <RankIcon className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                            <div className={`px-3 py-1 bg-gradient-to-r ${getLevelColor(user.level)} text-white rounded-full text-xs font-bold`}>
                              {user.level}
                            </div>
                          </div>
                          {activeTab === 'Working Professional' && (
                            <p className="text-sm text-gray-500 mt-1">{user.company}</p>
                          )}
                          <p className="text-sm text-gray-500">{user.contributions} contributions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {/* POINTS COLOR: Applied via inline style */}
                        <div className="text-2xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${COLOR_ACCENT_GRADIENT_START}, ${COLOR_ACCENT_GRADIENT_END})` }}>
                          {user.points}
                        </div>
                        <div className="text-sm text-gray-500">points</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Rewards Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl shadow-lg p-6 mb-6 border"
              style={{ backgroundColor: COLOR_CARD_BACKGROUND, borderColor: COLOR_BORDER_LIGHT }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                {/* REWARD ICON COLOR: Accent Blue */}
                <Gift className="w-6 h-6 mr-2" style={{ color: COLOR_ACCENT_BLUE }} />
                Rewards
              </h3>
              <div className="space-y-4">
                {rewards.map((reward, index) => {
                  const IconComponent = reward.icon; 
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-2 transition-all duration-200`}
                      style={{
                        // AVAILABLE REWARD BG: Light Blue Accent
                        backgroundColor: reward.available ? COLOR_INFO_BG : COLOR_BACKGROUND_PRIMARY, 
                        borderColor: reward.available ? COLOR_ACCENT_BLUE : COLOR_BORDER_LIGHT 
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        {/* REWARD ICON & POINTS COLOR: Accent Blue */}
                        <IconComponent className={`w-5 h-5`} style={{ color: reward.available ? COLOR_ACCENT_BLUE : '#A0AEC0' }} />
                        <span className="font-bold" style={{ color: COLOR_ACCENT_BLUE }}>{reward.points}</span>
                      </div>
                      <p className={`text-sm font-medium ${reward.available ? 'text-gray-800' : 'text-gray-500'}`}>
                        {reward.reward}
                      </p>
                      {!reward.available && (
                        <p className="text-xs text-gray-400 mt-1">Coming Soon</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Points Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: COLOR_INFO_BG, borderColor: COLOR_ACCENT_BLUE }} 
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                {/* ZAP ICON COLOR: Accent Blue */}
                <Zap className="w-5 h-5 mr-2" style={{ color: COLOR_ACCENT_BLUE }} />
                Earn Points By
              </h3>
              <div className="space-y-3 text-sm">
                {/* POINTS TEXT COLOR: Accent Blue */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Sharing Experience</span>
                  <span className="font-bold" style={{ color: COLOR_ACCENT_BLUE }}>+50 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Answering Questions</span>
                  <span className="font-bold" style={{ color: COLOR_ACCENT_BLUE }}>+25 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uploading Resources</span>
                  <span className="font-bold" style={{ color: COLOR_ACCENT_BLUE }}>+30 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Getting Liked</span>
                  <span className="font-bold" style={{ color: COLOR_ACCENT_BLUE }}>+5 pts</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;