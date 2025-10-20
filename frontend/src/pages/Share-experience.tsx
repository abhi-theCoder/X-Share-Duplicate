// src/pages/Share-experience.tsx
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from '../api';
import { useNavigate } from 'react-router-dom';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import LoginRequired from '../LoginRequired';

// Theme colors
const TRI_COLORS = {
  orange: '#FF914D',
  green: '#3CB371',
  bg: '#FFFDF7',
  border: '#EFD9BE',
  tab: '#F7F5F0',
  headText: '#217346',
  error: '#DC2626',
  yellow: '#FFD700',
  text: '#217346',
  lightGreen: '#C8E6C9',
  lightBlue: '#C9D4F1',
};

// Rounds options
const roundOptions = [
  'Online Assessment',
  'Aptitude Test',
  'Technical Round 1',
  'Technical Round 2',
  'Technical Round 3',
  'System Design Round',
  'Behavioral Round',
  'HR Round',
  'Final Panel',
];

// Types
type RoundQ = { question: string; answer: string };
type Section = { key: string; title: string; isDraggable: boolean };

interface FormData {
  company: string;
  role: string;
  type: string;
  location: string;
  date: string;
  overall_experience: string;
  preparation_tips: string;
  selection_rounds: string[];
  rounds_data: Record<string, RoundQ[]>;
}

interface SubmitResponse {
  message: string;
}

const initialSections: Section[] = [
  { key: 'companyInfo', title: 'Company Info', isDraggable: false },
  { key: 'selectionProcess', title: 'Selection Process', isDraggable: true },
  { key: 'preparationTips', title: 'Preparation Tips', isDraggable: false },
  { key: 'finalReview', title: 'Final Review', isDraggable: false },
];

export default function ShareExperiencePage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    role: '',
    type: 'internship',
    location: '',
    date: '',
    overall_experience: '',
    preparation_tips: '',
    selection_rounds: [],
    rounds_data: {},
  });

  const [sections, setSections] = useState<Section[]>(initialSections);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedRounds, setExpandedRounds] = useState<string[]>([]);
  const [expandedPreview, setExpandedPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated.');
      return;
    }
    // Fetch user profile if needed
  }, []);

  if (error === 'User not authenticated.') return <LoginRequired />;

  // Submit handler
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    setLoading(true);
    setSubmissionStatus(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found.');

      const response = await axios.post<SubmitResponse>('/api/experiences/share', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLoading(false);
      setSubmissionStatus(response.data.message);

      if (response.status === 200 || response.status === 201) {
        setShowSuccessAnimation(true);
        setTimeout(() => {
          setShowSuccessAnimation(false);
          navigate('/profile');
        }, 5000);
      }
    } catch (err) {
      setLoading(false);
      const errorMessage =
        (err as AxiosError<{ message: string }>)?.response?.data?.message ||
        'Submission failed due to an unknown error.';
      setSubmissionStatus(`Error: ${errorMessage}`);
      console.error('Submission error:', err);
    }
  };

  // Drag & Drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.source.droppableId === 'selectedRounds-droppable') {
      const reorderedRounds = Array.from(formData.selection_rounds);
      const [removed] = reorderedRounds.splice(result.source.index, 1);
      reorderedRounds.splice(result.destination.index, 0, removed);
      setFormData(f => ({ ...f, selection_rounds: reorderedRounds }));
    }
  };

  // Round selection
  const handleRoundToggle = (round: string) => {
    const updated = formData.selection_rounds.includes(round)
      ? formData.selection_rounds.filter(r => r !== round)
      : [...formData.selection_rounds, round];

    const newRoundsData = { ...formData.rounds_data };
    if (!formData.selection_rounds.includes(round)) {
      newRoundsData[round] = newRoundsData[round] || [{ question: '', answer: '' }];
    } else {
      delete newRoundsData[round];
    }

    setFormData(f => ({ ...f, selection_rounds: updated, rounds_data: newRoundsData }));
  };

  const addQuestion = (round: string) => {
    setFormData(f => ({
      ...f,
      rounds_data: {
        ...f.rounds_data,
        [round]: [...(f.rounds_data[round] || []), { question: '', answer: '' }],
      },
    }));
  };

  const updateRoundQA = (round: string, i: number, field: keyof RoundQ, value: string) => {
    setFormData(f => {
      const updated = [...f.rounds_data[round]];
      updated[i][field] = value;
      return { ...f, rounds_data: { ...f.rounds_data, [round]: updated } };
    });
  };

  const removeRoundQA = (round: string, i: number) => {
    setFormData(f => {
      const updated = [...f.rounds_data[round]];
      updated.splice(i, 1);
      return { ...f, rounds_data: { ...f.rounds_data, [round]: updated } };
    });
  };

  const handleTabClick = (idx: number) => {
    if (idx < currentStep) {
      setCurrentStep(idx);
      return;
    }
    if (validateCurrentStep()) setCurrentStep(idx);
  };

  // Validation
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    const currentSection = sections[currentStep];

    switch (currentSection.key) {
      case 'companyInfo':
        if (!formData.company.trim()) newErrors.company = 'Company Name is required.';
        if (!formData.role.trim()) newErrors.role = 'Role is required.';
        if (!formData.location.trim()) newErrors.location = 'Location is required.';
        if (!formData.date.trim()) newErrors.date = 'Date is required.';
        break;

      case 'selectionProcess':
        if (formData.selection_rounds.length === 0)
          newErrors.selection_rounds = 'Please select at least one round.';
        formData.selection_rounds.forEach(round => {
          if (!formData.rounds_data[round] || formData.rounds_data[round].length === 0) {
            newErrors[`round_${round}`] = `Please add at least one question for this round.`;
          } else {
            formData.rounds_data[round].forEach((qa, i) => {
              if (!qa.question.trim()) newErrors[`${round}_question_${i}`] = 'Question is required.';
            });
          }
        });
        break;

      case 'preparationTips':
        if (!formData.preparation_tips.trim()) newErrors.preparation_tips = 'Preparation Summary is required.';
        break;

      case 'finalReview':
        if (!formData.overall_experience.trim()) newErrors.overall_experience = 'Overall Experience Summary is required.';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === sections.length - 1) {
      handleSubmit();
    } else if (validateCurrentStep()) {
      setCurrentStep(s => Math.min(sections.length - 1, s + 1));
    }
  };

  const toggleAccordion = (round: string) => {
    setExpandedPreview(prev => (prev.includes(round) ? prev.filter(r => r !== round) : [...prev, round]));
  };

  const toggleAccordionRound = (round: string) => {
    setExpandedRounds(prev => (prev.includes(round) ? prev.filter(r => r !== round) : [...prev, round]));
  };

  // --- Coin Animation Variants ---
  const coinVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 0, rotate: 0 },
    visible: { opacity: 1, scale: [1, 1.2, 1], y: [0, -20, 0], rotate: [0, 360], transition: { type: 'tween', duration: 0.8 } },
    burst: (i: number) => ({
      opacity: [1, 0],
      scale: [1, 2],
      y: [0, Math.random() * -150 - 50],
      x: [0, Math.random() * 100 - 50],
      rotate: [0, Math.random() * 720 - 360],
      transition: { duration: 0.8, ease: 'easeOut', delay: i * 0.05 },
    }),
  };

  const CoinAnimation = () => (
    <AnimatePresence>
      {showSuccessAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black bg-opacity-75 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative p-8 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center max-w-sm mx-auto"
          >
            <h3 className="text-3xl font-bold text-orange-600 mb-4">Experience Shared!</h3>
            <div className="text-4xl font-extrabold text-navy-900">
              <span className="text-6xl font-extrabold" style={{ color: TRI_COLORS.yellow }}>
                +50
              </span>{' '}
              Coins
            </div>
            <p className="mt-2 text-gray-600">Thank you for your valuable contribution.</p>

            {[...Array(25)].map((_, i) => (
              <motion.span
                key={i}
                variants={coinVariants}
                initial="hidden"
                animate="visible"
                exit="burst"
                custom={i}
                className="absolute text-3xl"
                style={{ top: '50%', left: '50%', filter: `drop-shadow(0 0 5px rgba(255,215,0,0.8))` }}
              >
                🪙
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main style={{ background: TRI_COLORS.bg, minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto py-7 px-2">
          {/* Section Tabs */}
          <nav className="flex gap-3 items-center mb-6">
            {sections.map((section, idx) => {
              const tabContent = (
                <div
                  className={`flex items-center rounded-lg px-4 py-2 border font-semibold select-none shadow-sm ${
                    currentStep === idx
                      ? 'bg-gradient-to-r from-[#FF914D] to-[#3CB371] text-white border-none shadow'
                      : 'bg-[#F7F5F0] text-gray-700 border border-[#EFD9BE]'
                  }`}
                  style={{ userSelect: 'none', cursor: 'pointer' }}
                  onClick={() => handleTabClick(idx)}
                >
                  {section.title}
                </div>
              );
              return section.isDraggable ? (
                <Droppable droppableId="sections-tabs" direction="horizontal" key={section.key}>
                  {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Draggable key={section.key} draggableId={section.key} index={0}>
                        {prov => <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>{tabContent}</div>}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ) : (
                <div key={section.key}>{tabContent}</div>
              );
            })}
          </nav>

          {/* Step content placeholder */}
          <section className="mb-10">{/* Render your step content here */}</section>

          {submissionStatus && (
            <div
              className={`p-4 rounded-md mb-4 font-semibold ${
                submissionStatus.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {submissionStatus}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0 || loading}
              className={`px-6 py-3 rounded-lg border font-semibold transition ${
                currentStep === 0 || loading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-[#3CB371] text-[#3CB371] hover:bg-green-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#FF914D] to-[#3CB371] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Publishing...' : currentStep === sections.length - 1 ? 'Publish Experience' : 'Next'}
            </button>
          </div>
        </div>
        <CoinAnimation />
      </main>
    </DragDropContext>
  );
}
