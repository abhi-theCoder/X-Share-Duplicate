const { supabase } = require('../services/supabase.js');

const POINTS_PER_EXPERIENCE = 50;

async function shareExperience(req, res) {
  const userId = req.userId; // Get user ID from the JWT payload added by the middleware
  const experienceData = req.body;
  console.log(req.body);
  try {
    // Save the new experience to a 'experiences' table
    const { data: newExperience, error: insertError } = await supabase
      .from('experiences')
      .insert([{
        ...experienceData,
        user_id: userId,
      }])
      .select();

    if (insertError) {
      throw insertError;
    }

    // Give the user 50 points
    // First, fetch the current user's points
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('points')
      .eq('id', userId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const newPoints = (userData.points || 0) + POINTS_PER_EXPERIENCE;

    // Update the user's points in the 'users' table
    const { error: updateError } = await supabase
      .from('users')
      .update({ points: newPoints })
      .eq('id', userId);

    if (updateError) {
      throw updateError;
    }

    res.status(201).json({
      message: 'Experience shared successfully!',
      experience: newExperience[0],
      pointsEarned: POINTS_PER_EXPERIENCE,
      newTotalPoints: newPoints
    });
  } catch (error) {
    console.error('Error sharing experience:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = { shareExperience };