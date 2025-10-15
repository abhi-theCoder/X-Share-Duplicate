import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Share2,
  BookOpen,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Award,
  Target,
  Zap,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Briefcase,
  Star,
  ShieldCheck,
  Package,
} from 'lucide-react';

import rocket from '../images/rocket.png';

// --- Styling Constants ---
const PRIMARY_BLUE = 'text-blue-600';
const ACCENT_BG_LIGHT = 'bg-[#F7F8FA]'; // Very light gray/blue for backgrounds/sections
const ACCENT_BG_MEDIUM = 'bg-[#EEF2F7]'; // Slightly darker background for the Rewards section
const MAIN_BG = 'bg-[#F0F9FE]'; // Main page background

// --- Content Data ---

const howItWorksSteps = [
  {
    icon: Users,
    title: 'Connect',
    description: 'Join the community of peers, mentors, and alumni.',
  },
  {
    icon: Share2,
    title: 'Share',
    description: 'Post your interview experience with structured prompts.',
  },
  {
    icon: BookOpen,
    title: 'Learn',
    description: 'Explore real stories, questions, and preparation paths.',
  },
  {
    icon: ClipboardList,
    title: 'Apply',
    description: 'Use insights to tailor resumes and interview plans.',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    description: 'Earn rewards and build your professional profile.',
  },
];

const problems = [
  'Lack of clear guidance on interview expectations',
  'Limited access to alumni and successful candidates',
  'Scattered resources, making targeted prep difficult',
  'No reliable feedback loop to improve faster',
  'Uncertainty about what actually works during interviews',
];

const solutions = [
  { icon: ShieldCheck, text: 'Verified interview stories that show what to expect' },
  { icon: ClipboardList, text: 'Actionable checklists and step-by-step guidance' },
  { icon: Target, text: 'Targeted preparation by company, role, and skill area' },
  { icon: Award, text: 'Rewards for sharing authentic experiences' },
  { icon: Users, text: 'Active peer community and alumni connections' },
];

const studentBenefits = [
  { icon: Briefcase, title: 'Learn from real experiences', description: 'Honest interview breakdowns from peers and alumni.' },
  { icon: Target, title: 'Targeted preparation', description: 'Filter by company, role, round, and topics to focus your study.' },
  { icon: Zap, title: 'Skill development', description: 'Track progress and reflect using community checklists.' },
];

const professionalBenefits = [
  { icon: Users, title: 'Give back with impact', description: 'Share experiences, mentor at scale, and earn recognition.' },
  { icon: Award, title: 'Build credibility', description: 'Badges and verified posts highlight your contributions.' },
  { icon: MessageSquare, title: 'Community feedback', description: 'Helpful votes and comments surface the most useful advice.' },
];

const transition = { type: 'spring', stiffness: 100, damping: 20 };



/**
 * Renders a single problem point.
 */
const ProblemItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start mb-4 text-gray-600">
    <AlertTriangle className="w-5 h-5 mr-3 mt-1 text-red-500 flex-shrink-0" />
    <span className="font-medium">{text}</span>
  </li>
);

/**
 * Renders a single solution point.
 */
const SolutionItem: React.FC<{ icon: React.FC<any>, text: string }> = ({ icon: Icon, text }) => (
  <li className="flex items-start mb-4 text-gray-700">
    <CheckCircle className="w-5 h-5 mr-3 mt-1 text-blue-500 flex-shrink-0 fill-blue-50 opacity-90" />
    <span className="font-medium">{text}</span>
  </li>
);

/**
 * The main application component.
 */
const Home: React.FC = () => {
  return (
    <div className={`min-h-screen font-sans ${MAIN_BG}`}>

      {/* 1. Hero Section (Screenshot 1) */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Real interview insights to help you succeed.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
              Explore community-verified tips and preparation guides. Track your progress and earn rewards as you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="px-8 py-3 text-white bg-blue-600 shadow-lg text-white rounded-xl font-semibold text-lg
                  hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                Get started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/rewards"
                className="px-8 py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
              >
                Explore rewards
              </Link>
            </div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: 0.2 }}
            className="w-full h-80 lg:h-[450px] overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={rocket} // <-- This is where the imported 'rocket' variable is used!
              alt="An illustration of a rocket launching towards planets, symbolizing career growth and success."
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/800x600/D1E1E9/2E4057?text=Placeholder+Image";
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* 2. How X-share Works Section (Screenshot 2, top) */}
      <section id="how-it-works" className={`py-20 px-4 sm:px-6 lg:px-8 ${ACCENT_BG_LIGHT}`}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            How X Share works
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {howItWorksSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...transition, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center flex flex-col items-center group hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                >
                  <div className={`p-3 rounded-xl mb-4 border-2 border-gray-200 group-hover:border-blue-400 transition-colors duration-200`}>
                    <IconComponent className={`w-6 h-6 ${PRIMARY_BLUE}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            Community posts are lightly reviewed for clarity and usefulness.
          </p>
        </div>
      </section>

      {/* 3. Why Choose X-share (Problems vs. Solutions) (Screenshot 2, bottom) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4"
          >
            Why choose X Share
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.1 }}
            className="text-center text-lg text-gray-600 mb-16"
          >
            Real experiences, practical guidance, and a community focused on helping you succeed. 
          </motion.p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Problems Students Face */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={transition}
              className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-red-400"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-500" />
                Problems Students Face
              </h3>
              <ul className="list-none p-0">
                {problems.map((p, i) => (
                  <ProblemItem key={i} text={p} />
                ))}
              </ul>
            </motion.div>

            {/* How We Help You Succeed */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={transition}
              className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-400"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Package className="w-6 h-6 mr-3 text-blue-500" />
                How We Help You Succeed
              </h3>
              <ul className="list-none p-0">
                {solutions.map((s, i) => (
                  <SolutionItem key={i} icon={s.icon} text={s.text} />
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Rewards Section (Screenshot 3) */}
      <section id="rewards" className={`py-20 px-4 sm:px-6 lg:px-8 ${ACCENT_BG_MEDIUM}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transition}
              className="text-3xl md:text-4xl font-bold text-gray-800"
            >
              Rewards that value your real experience
            </motion.h2>
            <Link
              to="/share-and-earn"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200 hidden sm:block"
            >
              Share and earn
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[
              { title: 'Earn points', content: ['Post an experience: +50 pts', 'Add interview Q&A: +10 pts each (max +50)', 'Helpful votes from peers: +2 pts per upvote'] },
              { title: 'Quality multipliers', content: ['Verified by 3+ peers: x1.2', 'Company/role details filled: x1.1', 'Weekly streak (3 posts): +30 bonus pts'] },
              { title: 'Redeem & showcase', content: ['Gift cards & perks starting at 300 pts', 'Profile badges (Bronze, Silver, Gold)', 'Leaderboard recognition for top mentors'] },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">{card.title}</h3>
                <ul className="list-none space-y-2 text-gray-600">
                  {card.content.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Star className="w-4 h-4 mt-1 mr-2 text-yellow-500 flex-shrink-0" fill="currentColor" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transition}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-blue-500" />
                Levels
              </h3>
              <p className="text-sm text-gray-600">
                **Bronze: 300 pts** · **Silver: 800 pts** · **Gold: 1500 pts** · **Crown Mentor: invite-only** for consistently helpful contributions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transition}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
                What counts as helpful?
              </h3>
              <p className="text-sm text-gray-600">
                Specific questions asked, timeline, rounds, resources, and reflection on what you would improve. Keep it honest, concise, and actionable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Benefits for Everyone (Screenshot 4) */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Benefits for Everyone
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Students Column */}
            <div className="space-y-8">
              <h3 className="text-lg font-bold text-gray-500 border-b pb-2">Students</h3>
              {studentBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ ...transition, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-start hover:shadow-xl transition duration-300"
                  >
                    <IconComponent className={`w-7 h-7 mr-4 mt-1 ${PRIMARY_BLUE}`} />
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Professionals Column */}
            <div className="space-y-8">
              <h3 className="text-lg font-bold text-gray-500 border-b pb-2">Professionals</h3>
              {professionalBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ ...transition, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-start hover:shadow-xl transition duration-300"
                  >
                    <IconComponent className={`w-7 h-7 mr-4 mt-1 ${PRIMARY_BLUE}`} />
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-1">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
