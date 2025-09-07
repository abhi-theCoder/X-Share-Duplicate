'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

export default function ShareExperiencePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    type: 'internship',
    location: '',
    date: '',
    selection_rounds: [],
    technical_questions: [''],
    hr_questions: [''],
    preparation_tips: '',
    work_culture: '',
    overall_experience: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: 'Company Info' },
    { number: 2, title: 'Selection Process' },
    { number: 3, title: 'Interview Questions' },
    { number: 4, title: 'Tips & Culture' },
    { number: 5, title: 'Final Review' }
  ];

  const roundOptions = [
    'Online Assessment',
    'Aptitude Test',
    'Technical Round 1',
    'Technical Round 2',
    'Technical Round 3',
    'System Design Round',
    'Behavioral Round',
    'HR Round',
    'Final Panel'
  ];

  const handleRoundToggle = (round) => {
    const updated = formData.selection_rounds.includes(round)
      ? formData.selection_rounds.filter(r => r !== round)
      : [...formData.selection_rounds, round];
    setFormData({...formData, selection_rounds: updated});
  };

  const addQuestion = (type) => {
    if (type === 'technical') {
      setFormData({...formData, technical_questions: [...formData.technical_questions, '']});
    } else {
      setFormData({...formData, hr_questions: [...formData.hr_questions, '']});
    }
  };

  const updateQuestion = (type, index, value) => {
    if (type === 'technical') {
      const updated = [...formData.technical_questions];
      updated[index] = value;
      setFormData({...formData, technical_questions: updated});
    } else {
      const updated = [...formData.hr_questions];
      updated[index] = value;
      setFormData({...formData, hr_questions: updated});
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setSubmitError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setSubmitError('You must be logged in to share an experience.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/experiences/share', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Experience shared successfully:', response.data);
      
      setShowCoinAnimation(true);
      setTimeout(() => {
        setShowCoinAnimation(false);
        navigate('/profile');
      }, 4000); // Wait 4 seconds for animation to complete
    } catch (error) {
      console.error('Error sharing experience:', error.response?.data?.message || error.message);
      setSubmitError(error.response?.data?.message || 'Failed to share experience. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    setSubmitError('');
    if (currentStep === 1) {
      if (!formData.company.trim() || !formData.role.trim() || !formData.location.trim() || !formData.date.trim()) {
        setSubmitError('Please fill in all compulsory fields in this section.');
        return;
      }
    } else if (currentStep === 2) {
      if (formData.selection_rounds.length === 0) {
        setSubmitError('Please select at least one selection round.');
        return;
      }
    } else if (currentStep === 3) {
      const hasTechnicalQuestion = formData.technical_questions.some(q => q.trim() !== '');
      const hasHrQuestion = formData.hr_questions.some(q => q.trim() !== '');
      if (!hasTechnicalQuestion && !hasHrQuestion) {
        setSubmitError('Please provide at least one technical or HR question.');
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.preparation_tips.trim() || !formData.work_culture.trim()) {
        setSubmitError('Please fill in both Preparation Tips and Work Culture & Environment.');
        return;
      }
    } else if (currentStep === 5) {
      if (!formData.overall_experience.trim()) {
        setSubmitError('Overall experience summary is required.');
        return;
      }
      await handleSubmit();
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setSubmitError('');
      setCurrentStep(currentStep - 1);
    }
  };
  
  const coinVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: [0, -100, -200],
      x: () => Math.random() * 200 - 100,
      rotate: () => Math.random() * 360,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -200, 
      scale: 0.5,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 relative overflow-hidden">
      <AnimatePresence>
        {showCoinAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative p-8 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center max-w-sm mx-auto"
            >
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">You Earned Coins!</h3>
              <div className="text-4xl font-extrabold text-navy-900">
                <span className="text-6xl font-extrabold text-green-600">50</span> Coins
              </div>
              <p className="mt-2 text-gray-600">
                Thank you for sharing your experience!
              </p>
              
              {/* Coin Particles Animation */}
              {[...Array(25)].map((_, i) => (
                <motion.span
                  key={i}
                  variants={coinVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={i}
                  className="absolute text-2xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    filter: `drop-shadow(0 0 5px rgba(255,215,0,0.5))`,
                  }}
                  transition={{
                    delay: 0.5 + i * 0.05,
                    duration: 1.5,
                    ease: "easeOut"
                  }}
                >
                  💰
                </motion.span>
              ))}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto p-4 pb-20 lg:pb-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.number < currentStep 
                    ? 'bg-green-600 text-white' 
                    : step.number === currentStep
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number < currentStep ? <Check className="h-5 w-5" /> : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step.number < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-lg font-medium text-navy-900">{steps[currentStep - 1].title}</h2>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border-l-4 border-red-500">
            <p>{submitError}</p>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Google, Microsoft, Amazon..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Role *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Software Engineer, Data Scientist, Product Manager..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Experience Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="internship">Internship</option>
                  <option value="job">Full-time Job</option>
                  <option value="hackathon">Hackathon</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Bangalore, India"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Selection Process */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-navy-900 mb-4">Selection Rounds *</h3>
                <p className="text-gray-600 mb-4">Select all the rounds you went through:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {roundOptions.map((round) => (
                    <button
                      key={round}
                      type="button"
                      onClick={() => handleRoundToggle(round)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        formData.selection_rounds.includes(round)
                          ? 'bg-orange-50 border-orange-500 text-orange-700'
                          : 'bg-white border-gray-200 hover:border-orange-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          formData.selection_rounds.includes(round)
                            ? 'bg-orange-500 border-orange-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.selection_rounds.includes(round) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="font-medium">{round}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Interview Questions */}
          {currentStep === 3 && (
            <div className="space-y-8">
              {/* Technical Questions */}
              <div>
                <h3 className="text-lg font-medium text-navy-900 mb-4">Technical Questions</h3>
                <div className="space-y-3">
                  {formData.technical_questions.map((question, index) => (
                    <input
                      key={index}
                      type="text"
                      value={question}
                      onChange={(e) => updateQuestion('technical', index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder={`Technical question ${index + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addQuestion('technical')}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    + Add Another Question
                  </button>
                </div>
              </div>

              {/* HR Questions */}
              <div>
                <h3 className="text-lg font-medium text-navy-900 mb-4">HR/Behavioral Questions</h3>
                <div className="space-y-3">
                  {formData.hr_questions.map((question, index) => (
                    <input
                      key={index}
                      type="text"
                      value={question}
                      onChange={(e) => updateQuestion('hr', index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder={`HR question ${index + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addQuestion('hr')}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    + Add Another Question
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Tips & Culture */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Preparation Tips *</label>
                <textarea
                  value={formData.preparation_tips}
                  onChange={(e) => setFormData({...formData, preparation_tips: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-32"
                  placeholder="Share your preparation strategies, resources, and tips..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Work Culture & Environment *</label>
                <textarea
                  value={formData.work_culture}
                  onChange={(e) => setFormData({...formData, work_culture: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-32"
                  placeholder="Describe the work environment, team dynamics, benefits..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Final Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Overall Experience Summary *</label>
                <textarea
                  value={formData.overall_experience}
                  onChange={(e) => setFormData({...formData, overall_experience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-40"
                  placeholder="Write a comprehensive summary of your experience that will be helpful for others..."
                />
              </div>
              
              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-navy-900 mb-3">Preview:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Company:</strong> {formData.company}</p>
                  <p><strong>Role:</strong> {formData.role}</p>
                  <p><strong>Type:</strong> {formData.type}</p>
                  <p><strong>Location:</strong> {formData.location}</p>
                  <p><strong>Rounds:</strong> {formData.selection_rounds.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1 || isLoading}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={handleNext}
              disabled={isLoading || (currentStep === 5 && !formData.overall_experience.trim())}
              className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{currentStep === 5 ? 'Publish Experience' : 'Next'}</span>
                  {currentStep < 5 && <ArrowRight className="h-4 w-4" />}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}