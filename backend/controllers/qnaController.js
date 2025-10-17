const { supabase } = require('../services/supabase.js');

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        users:user_id (id, name, avatar_url),
        question_comments(
          *,
          users:user_id (id, name, avatar_url)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching questions:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Post a new question
const postQuestion = async (req, res) => {
  try {
    const {question, tags } = req.body;
    // console.log(req)
    user_id = req.userId;
    console.log(user_id)
    const { data, error } = await supabase
      .from('questions')
      .insert([{ user_id, question, tags }])
       .select('*, users:user_id(id,name,avatar_url)')
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error posting question:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Add a comment
const addComment = async (req, res) => {
  try {
    const { question_id, comment } = req.body;
    user_id = req.userId;
    const { data, error } = await supabase
      .from('question_comments')
      .insert([{ question_id, user_id, comment }])
      .select('*, users:user_id(id,name,avatar_url)')
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error adding comment:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getQuestions, postQuestion, addComment };