import React, { useState, useEffect } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { GripVertical, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginRequired from '../components/LoginRequired';

// India theme colors and styles
const TRI_COLORS = {
  orange: '#FF914D',
  green: '#3CB371',
  bg: '#FFFDF7',
  border: '#EFD9BE',
  tab: '#F7F5F0',
  headText: '#217346',
  error: '#DC2626',
  yellow: '#FFD700', // Gold color for coins
  text: '#217346',
  lightGreen: '#C8E6C9', // For the badge background
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
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }

      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (error === 'User not authenticated.') {
    return <LoginRequired />;
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }
    setLoading(true);
    setSubmissionStatus(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found.');
      }

      const response = await axios.post(
        '/api/experiences/share',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      setSubmissionStatus(response.data.message);
      
      if (response.status === 200 || response.status === 201) {
        setShowSuccessAnimation(true);
        // Start a 5-second timer to redirect
        setTimeout(() => {
          setShowSuccessAnimation(false);
          navigate('/profile'); // Redirect to the user's profile page
        }, 5000); // 5000 milliseconds = 5 seconds
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Submission failed due to an unknown error.';
      setSubmissionStatus(`Error: ${errorMessage}`);
      console.error('Submission error:', error);
    }
  };

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (result.source.droppableId === 'selectedRounds-droppable') {
      const reorderedRounds = Array.from(formData.selection_rounds);
      const [removed] = reorderedRounds.splice(result.source.index, 1);
      reorderedRounds.splice(result.destination.index, 0, removed);
      setFormData((f) => ({
        ...f,
        selection_rounds: reorderedRounds,
      }));
    }
  }

  function handleRoundToggle(round: string) {
    let updated = formData.selection_rounds.includes(round)
      ? formData.selection_rounds.filter((r) => r !== round)
      : [...formData.selection_rounds, round];
    let newRoundsData = { ...formData.rounds_data };
    if (!formData.selection_rounds.includes(round)) {
      newRoundsData[round] = newRoundsData[round] || [{ question: '', answer: '' }];
    } else {
      delete newRoundsData[round];
    }
    setFormData(f => ({
      ...f,
      selection_rounds: updated,
      rounds_data: newRoundsData,
    }));
  }

  function addQuestion(round: string) {
    setFormData(f => ({
      ...f,
      rounds_data: {
        ...f.rounds_data,
        [round]: [...(f.rounds_data[round] || []), { question: '', answer: '' }],
      }
    }));
  }

  function updateRoundQA(round: string, i: number, field: keyof RoundQ, value: string) {
    setFormData(f => {
      const updated = [...f.rounds_data[round]];
      updated[i][field] = value;
      return {
        ...f,
        rounds_data: {
          ...f.rounds_data,
          [round]: updated,
        }
      };
    });
  }

  function removeRoundQA(round: string, i: number) {
    setFormData(f => {
      const updated = [...f.rounds_data[round]];
      updated.splice(i, 1);
      return {
        ...f,
        rounds_data: {
          ...f.rounds_data,
          [round]: updated,
        },
      };
    });
  }
  const handleTabClick = (idx: number) => {
    // Always allow navigation to previous steps
    if (idx < currentStep) {
        setCurrentStep(idx);
        return;
    }

    // Validate the current step before moving forward
    if (validateCurrentStep()) {
        setCurrentStep(idx);
    }
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    const currentSection = sections[currentStep];

    switch (currentSection.key) {
      case 'companyInfo':
        if (!formData.company.trim()) newErrors.company = "Company Name is required.";
        if (!formData.role.trim()) newErrors.role = "Role is required.";
        if (!formData.location.trim()) newErrors.location = "Location is required.";
        if (!formData.date.trim()) newErrors.date = "Date is required.";
        break;
      case 'selectionProcess':
        if (formData.selection_rounds.length === 0) {
          newErrors.selection_rounds = "Please select at least one round.";
        }
        formData.selection_rounds.forEach(round => {
          if (!formData.rounds_data[round] || formData.rounds_data[round].length === 0) {
            newErrors[`round_${round}`] = `Please add at least one question for this round.`;
          } else {
            formData.rounds_data[round].forEach((qa, i) => {
              if (!qa.question.trim()) {
                newErrors[`${round}_question_${i}`] = "Question is required.";
              }
            });
          }
        });
        break;
      case 'preparationTips':
        if (!formData.preparation_tips.trim()) newErrors.preparation_tips = "Preparation Summary is required.";
        break;
      case 'finalReview':
        if (!formData.overall_experience.trim()) newErrors.overall_experience = "Overall Experience Summary is required.";
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === sections.length - 1) {
      handleSubmit();
    } else {
      if (validateCurrentStep()) {
        setCurrentStep(s => Math.min(sections.length - 1, s + 1));
      }
    }
  };

  const toggleAccordion = (round: string) => {
    setExpandedPreview(prev =>
      prev.includes(round) ? prev.filter(r => r !== round) : [...prev, round]
    );
  };
  
  const toggleAccordionRound = (round: string) => {
    setExpandedRounds(prev =>
      prev.includes(round) ? prev.filter(r => r !== round) : [...prev, round]
    );
  };

  function renderSection(section: Section) {
    switch (section.key) {
      case 'companyInfo':
        return (
          <div className="space-y-6">
            <GlassInput label="Company Name *" value={formData.company}
              onChange={v => setFormData(f => ({ ...f, company: v }))}
              error={errors.company} />
            <GlassInput label="Role *" value={formData.role}
              onChange={v => setFormData(f => ({ ...f, role: v }))}
              error={errors.role} />
            <GlassSelect label="Experience Type *" value={formData.type}
              options={[
                { value: 'internship', label: 'Internship' },
                { value: 'job', label: 'Full-time Job' },
                { value: 'hackathon', label: 'Hackathon' },
              ]}
              onChange={v => setFormData(f => ({ ...f, type: v }))} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassInput label="Location *" value={formData.location}
                onChange={v => setFormData(f => ({ ...f, location: v }))}
                error={errors.location} />
              <GlassInput label="Date *" value={formData.date} type="date"
                onChange={v => setFormData(f => ({ ...f, date: v }))}
                error={errors.date} />
            </div>
          </div>
        );
      case 'selectionProcess':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: TRI_COLORS.headText }}>Selection Rounds *</h3>
            <p className="text-gray-700 mb-4">Select the process rounds you want, then reorder as desired and add questions/answers:</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {roundOptions.map((round) => (
                <button
                  key={round}
                  type="button"
                  onClick={() => handleRoundToggle(round)}
                  className={`rounded-full border font-semibold px-4 py-2 select-none transition ${
                    formData.selection_rounds.includes(round)
                      ? 'bg-gradient-to-r from-[#FF914D] to-[#3CB371] text-white border-none shadow'
                      : `bg-white border-2 border-[${TRI_COLORS.border}] text-[#444]`
                  }`}
                >
                  {round}
                </button>
              ))}
            </div>
            {errors.selection_rounds && <p className="text-sm mt-1 mb-4" style={{ color: TRI_COLORS.error }}>{errors.selection_rounds}</p>}
            <Droppable droppableId="selectedRounds-droppable" direction="vertical">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-6 min-h-[100px]">
                  {(formData.selection_rounds.length === 0) ? (
                    <div className="text-gray-400 italic select-none py-4">No rounds selected</div>
                  ) : (
                    formData.selection_rounds.map((round, idx) => (
                      <Draggable key={round} draggableId={round} index={idx}>
                        {(prov) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            className="bg-white/80 border rounded-xl shadow p-5 mb-2"
                            style={{ borderColor: TRI_COLORS.border, ...prov.draggableProps.style }}
                          >
                            <div className="flex items-start gap-2">
                              <span
                                {...prov.dragHandleProps}
                                aria-label="Drag to reorder round"
                                className="mt-1 mr-2 cursor-grab active:cursor-grabbing text-[rgba(255,145,77,0.85)]"
                                style={{ padding: 3 }}
                              >
                                <GripVertical size={22} />
                              </span>
                              <div className="flex-1">
                                <button type="button" onClick={() => toggleAccordionRound(round)} className="flex justify-between items-center w-full text-left font-semibold mb-1">
                                  <span style={{ color: TRI_COLORS.orange }}>
                                    <span className="text-sm font-bold mr-2 text-gray-500">{idx + 1}.</span> {round}
                                  </span>
                                  {expandedRounds.includes(round) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {errors[`round_${round}`] && <p className="text-sm mt-1" style={{ color: TRI_COLORS.error }}>{errors[`round_${round}`]}</p>}
                                {expandedRounds.includes(round) && (
                                  <div className="mt-4 space-y-4">
                                    {(formData.rounds_data[round] || []).map((qa, i) => (
                                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm" key={i}>
                                        <div className="flex justify-between items-center mb-2">
                                          <label className="font-medium text-gray-700">Question {i + 1}</label>
                                          <button type="button"
                                            onClick={() => removeRoundQA(round, i)}
                                            className="text-red-500 font-bold px-1 hover:bg-red-50 rounded"
                                          >✕</button>
                                        </div>
                                        <textarea
                                          placeholder="Question *"
                                          value={qa.question}
                                          rows={3}
                                          className={`w-full border rounded px-2 py-1 ${errors[`${round}_question_${i}`] ? 'border-red-500' : 'border-gray-300'}`}
                                          onChange={e => updateRoundQA(round, i, 'question', e.target.value)}
                                        />
                                        {errors[`${round}_question_${i}`] && <p className="text-sm mt-1" style={{ color: TRI_COLORS.error }}>{errors[`${round}_question_${i}`]}</p>}
                                        <div className="mt-4">
                                          <label className="font-medium text-gray-700">Answer (optional)</label>
                                          <textarea
                                            placeholder="Answer"
                                            value={qa.answer}
                                            rows={3}
                                            className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                                            onChange={e => updateRoundQA(round, i, 'answer', e.target.value)}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                    <button
                                      type="button"
                                      className="mt-1 text-sm rounded px-3 py-1 font-medium border border-[#FF914D] text-[#FF914D] hover:bg-orange-100"
                                      onClick={() => addQuestion(round)}
                                    >+ Add Question</button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        );
      case 'preparationTips':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-2" style={{ color: TRI_COLORS.headText }}>Preparation Tips *</h3>
            <p className="text-gray-700 mb-4">
              Share a summary of how you prepared for this interview. What resources did you use? What was most helpful?
            </p>
            <GlassInput label="Preparation Summary *" value={formData.preparation_tips} type="textarea"
              onChange={v => setFormData(f => ({ ...f, preparation_tips: v }))}
              error={errors.preparation_tips} />
          </div>
        );
      case 'finalReview':
        return (
          <div className="bg-white/80 border rounded-xl shadow p-6" style={{ borderColor: TRI_COLORS.border }}>
            <h3 className="font-bold text-xl mb-2" style={{ color: TRI_COLORS.headText }}>Preview</h3>
            <div className="text-gray-700 space-y-1 mb-4">
              <p><strong>Company:</strong> {formData.company}</p>
              <p><strong>Role:</strong> {formData.role}</p>
              <p><strong>Type:</strong> {formData.type}</p>
              <p><strong>Location:</strong> {formData.location}</p>
              <p><strong>Date:</strong> {formData.date}</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg" style={{ color: TRI_COLORS.headText }}>Rounds Data</h4>
              {formData.selection_rounds.length > 0 ? (
                formData.selection_rounds.map((round, idx) => (
                  <div key={round} className="border-b pb-2">
                    <button
                      onClick={() => toggleAccordion(round)}
                      className="flex justify-between items-center w-full text-left font-medium"
                    >
                      <span>
                        <span className="text-sm font-bold mr-2 text-gray-500">{idx + 1}.</span> {round}
                      </span>
                      {expandedPreview.includes(round) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedPreview.includes(round) && (
                      <div className="mt-2 pl-6">
                        {formData.rounds_data[round]?.length > 0 ? (
                          formData.rounds_data[round].map((qa, i) => (
                            <div key={i} className="mb-2 p-2 rounded-md" style={{ backgroundColor: TRI_COLORS.tab }}>
                              <p className="font-semibold text-gray-800">Q: {qa.question}</p>
                              {qa.answer && <p className="text-gray-600">A: {qa.answer}</p>}
                            </div>
                          ))
                        ) : (
                          <p className="italic text-gray-500">No questions added for this round.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="italic text-gray-500">No rounds selected.</p>
              )}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-2" style={{ color: TRI_COLORS.headText }}>Preparation Tips</h4>
              <p className="bg-white/80 p-4 rounded-xl border" style={{ borderColor: TRI_COLORS.border, whiteSpace: 'pre-wrap' }}>
                {formData.preparation_tips || <span className="italic text-gray-500">Not provided.</span>}
              </p>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-2" style={{ color: TRI_COLORS.headText }}>Overall Experience Summary</h4>
              {/* <p className="bg-white/80 p-4 rounded-xl border" style={{ borderColor: TRI_COLORS.border, whiteSpace: 'pre-wrap' }}>
                {formData.overall_experience || <span className="italic text-gray-500">Not provided.</span>}
              </p> */}
              <GlassInput label="" value={formData.overall_experience} type="textarea"
              onChange={v => setFormData(f => ({ ...f, overall_experience: v }))}
              error={errors.overall_experience} />
            </div>
            
          </div>
        );
      default:
        return null;
    }
  }

  // Coin Animation Component
  const CoinAnimation = () => {
    const coinVariants = {
      hidden: { opacity: 0, scale: 0.5, y: 0, rotate: 0 },
      visible: {
        opacity: 1,
        scale: [1, 1.2, 1],
        y: [0, -20, 0],
        rotate: [0, 360],
        transition: {
          type: 'tween',
          duration: 0.8,
          ease: 'easeInOut',
        },
      },
      burst: (i: number) => ({
        opacity: [1, 0],
        scale: [1, 2],
        y: [0, Math.random() * -150 - 50],
        x: [0, Math.random() * 100 - 50],
        rotate: [0, Math.random() * 720 - 360],
        transition: {
          duration: 0.8,
          ease: 'easeOut',
          delay: i * 0.05,
        },
      }),
    };

    return (
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
                <span className="text-6xl font-extrabold" style={{ color: TRI_COLORS.yellow }}>+50</span> Coins
              </div>
              <p className="mt-2 text-gray-600">
                Thank you for your valuable contribution.
              </p>
              
              {/* Coin Particles Animation */}
              {[...Array(25)].map((_, i) => (
                <motion.span
                  key={i}
                  variants={coinVariants}
                  initial="hidden"
                  animate="visible"
                  exit="burst"
                  custom={i}
                  className="absolute text-3xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    filter: `drop-shadow(0 0 5px rgba(255,215,0,0.8))`,
                  }}
                >
                  🪙
                </motion.span>
              ))}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main style={{ background: TRI_COLORS.bg, minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto py-7 px-2">
          {/* Section Tabs */}
          <nav className="flex gap-3 items-center mb-6">
            {sections.map((section, idx) => {
              const tabContent = (
                <div
                  className={`flex items-center rounded-lg px-4 py-2 border font-semibold select-none shadow-sm
                    ${
                      currentStep === idx
                        ? 'bg-gradient-to-r from-[#FF914D] to-[#3CB371] text-white border-none shadow'
                        : 'bg-[#F7F5F0] text-gray-700 border border-[#EFD9BE]'
                    }
                  `}
                  style={{ userSelect: 'none', cursor: 'pointer' }}
                  // onClick={() => setCurrentStep(idx)}
                  onClick={() => handleTabClick(idx)}
                >
                  {section.isDraggable && (
                    <span className="mr-2 cursor-grab active:cursor-grabbing">
                      {/* <GripVertical size={18} /> */}
                    </span>
                  )}
                  {section.title}
                </div>
              );
              return section.isDraggable ? (
                <Droppable droppableId="sections-tabs" direction="horizontal" key={section.key}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Draggable key={section.key} draggableId={section.key} index={0}>
                        {(prov) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            style={{ ...prov.draggableProps.style }}
                          >
                            {tabContent}
                          </div>
                        )}
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

          {/* Progress Bar */}
          <TricolorProgressBar current={currentStep} total={sections.length} />

          {/* Step content */}
          <section className="mb-10">{renderSection(sections[currentStep])}</section>
          
          {/* Submission Status Message */}
          {submissionStatus && (
            <div className={`p-4 rounded-md mb-4 font-semibold ${submissionStatus.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {submissionStatus}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
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
        
        {/* Render the coin animation component */}
        <CoinAnimation />

      </main>
    </DragDropContext>
  );
}

// --- Utility components ---
function GlassInput(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-800">{props.label}</label>
      {props.type === 'textarea' ? (
        <textarea
          className={`w-full px-4 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2
            ${props.error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-[#3CB371] focus:border-[#3CB371]'}`}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ) : (
        <input
          type={props.type || 'text'}
          className={`w-full px-4 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2
            ${props.error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-[#3CB371] focus:border-[#3CB371]'}`}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )}
      {props.error && <p className="text-sm mt-1" style={{ color: TRI_COLORS.error }}>{props.error}</p>}
    </div>
  );
}

function GlassSelect(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-800">{props.label}</label>
      <select
        className="w-full px-4 py-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF914D] focus:border-[#FF914D]"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      >
        {props.options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

const TricolorProgressBar: React.FC<{ current: number; total: number }> = ({
  current,
  total,
}) => {
  const percent = ((current + 1) / total) * 100;
  return (
    <div className="w-full py-3 mb-2 select-none">
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-gray-700">{`Step ${current + 1} of ${total}`}</span>
        <span className="font-semibold text-gray-700">{`${Math.round(percent)}% Complete`}</span>
      </div>
      <div className="w-full h-3 bg-[#eeeeee] rounded-2xl overflow-hidden">
        <div
          className="h-3 rounded-2xl"
          style={{
            width: `${percent}%`,
            background:
              'linear-gradient(90deg, #FF914D 0%, #FFFFFC 50%, #3CB371 100%)',
            transition:
              'width 0.3s cubic-bezier(.65,.05,.36,1), background 0.3s',
          }}
        />
      </div>
    </div>
  );
};