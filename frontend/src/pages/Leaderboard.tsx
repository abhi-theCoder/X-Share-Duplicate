import React, { useEffect, useState } from 'react';
import axios from '../api';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Users, Gift, Crown, Zap, LucideIcon } from 'lucide-react';

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

const colors = [
  '#1abc9c', '#2ecc71', '#3498db', '#9b59b6',
  '#e67e22', '#e74c3c', '#f39c12', '#16a085',
  '#2980b9', '#8e44ad', '#c0392b'
];

// Generate a consistent random color per user (based on their id)
function getUserColor(userId) {
  return colors[userId % colors.length]; // ensures same color for same user
}

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'Working Professional'>('students');
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(false);

  const rewards: RewardItem[] = [
    { points: 1000, reward: 'Amazon Gift Card ₹500', icon: Gift, available: true },
    { points: 2000, reward: 'Premium Course Access', icon: Star, available: true },
    { points: 3000, reward: 'One-on-One Mentoring Session', icon: Users, available: true },
    { points: 5000, reward: 'Tech Conference Ticket', icon: Trophy, available: false },
  ];

  const fetchLeaderboard = async (role: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/leaderboard?role=${role}`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = activeTab === 'students' ? 'student' : 'working professional';
    fetchLeaderboard(role);
  }, [activeTab]);

  const getLevelColor = (level: LeaderboardUser['level']) => {
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

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-500">
              Leaderboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrate achievements, track progress, and discover what rewards await top contributors.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard Section */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex rounded-2xl shadow-lg p-2 mb-6 border border-gray-100">
              {['students', 'Working Professional'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'students' | 'Working Professional')}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium relative transition-all duration-200 ${
                    activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {activeTab === tab && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-teal-500 z-0"></div>
                  )}
                  <span className="relative z-10 capitalize">{tab}</span>
                </button>
              ))}
            </div>

            {/* Leaderboard List */}
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-4">
                {users.map((user, index) => {
                  const RankIcon = getRankIcon(index);
                  return (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="rounded-2xl shadow-lg p-6 border bg-white border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
<div
  className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-lg"
  style={{ backgroundColor: getUserColor(user.id) }}
>
  {user.avatar ? (
    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
  ) : (
    <span>{user.name.charAt(0).toUpperCase()}</span>
  )}
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
                            {activeTab === 'Working Professional' && user.company && (
                              <p className="text-sm text-gray-500 mt-1">{user.company}</p>
                            )}
                            <p className="text-sm text-gray-500">{user.contributions} contributions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-500">
                            {user.points}
                          </div>
                          <div className="text-sm text-gray-500">points</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Rewards Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Rewards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl shadow-lg p-6 border bg-white border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Gift className="w-6 h-6 mr-2 text-blue-400" />
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
                        backgroundColor: reward.available ? '#F1F9FF' : '#FCFCFC',
                        borderColor: reward.available ? '#41B3D9' : '#D1E1E9',
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <IconComponent className="w-5 h-5" style={{ color: reward.available ? '#41B3D9' : '#A0AEC0' }} />
                        <span className="font-bold" style={{ color: '#41B3D9' }}>{reward.points}</span>
                      </div>
                      <p className={`text-sm font-medium ${reward.available ? 'text-gray-800' : 'text-gray-500'}`}>
                        {reward.reward}
                      </p>
                      {!reward.available && <p className="text-xs text-gray-400 mt-1">Coming Soon</p>}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Earn Points By */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl p-6 border bg-blue-50 border-blue-400"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-400" />
                Earn Points By
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sharing Experience</span>
                  <span className="font-bold text-blue-400">+50 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Answering Questions</span>
                  <span className="font-bold text-blue-400">+25 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uploading Resources</span>
                  <span className="font-bold text-blue-400">+30 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Getting Liked</span>
                  <span className="font-bold text-blue-400">+5 pts</span>
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
