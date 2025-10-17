const { supabase } = require('../services/supabase.js'); // your supabase client

// Controller to get leaderboard
async function leaderboard(req, res) {
  try {
    const { role } = req.query; // "students" or "working professional"

    const { data, error } = await supabase
      .from('users')
      .select('id, name, avatar_url, points, total_contributions, role, company')
      .eq('role', role)
      .order('points', { ascending: false })
      .limit(20);

    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }

    const users = data.map(user => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar_url,
      points: user.points,
      contributions: user.total_contributions,
      role: user.role,
      company: user.company,
      level: getLevel(user.points) // optional level logic
    }));

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Optional helper for level
function getLevel(points) {
  if(points >= 3000) return 'Platinum';
  if(points >= 2000) return 'Gold';
  if(points >= 1000) return 'Silver';
  if(points >= 500) return 'Bronze';
  return 'Novice';
}

module.exports = { leaderboard };