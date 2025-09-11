import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

// India theme colors and styles
const TRI_COLORS = {
  orange: '#FF914D',
  green: '#3CB371',
  text: '#217346',
  yellow: '#FFD700',
  lightGreen: '#C8E6C9', // For the badge background
  lightBlue: '#C9D4F1',
};

interface AnimationProps {
  isVisible: boolean;
  onClose: () => void;
}

const SuccessAnimation: React.FC<AnimationProps> = ({ isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(234,244,232,0.7) 0%, rgba(240,245,245,0.7) 100%)' }}
        >
          {/* Main card container */}
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-2xl relative w-full max-w-lg mx-4 text-center"
          >
            {/* Main checkmark icon animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
              className="mb-6 p-4 rounded-full"
              style={{ backgroundColor: TRI_COLORS.green }}
            >
              <CheckCircle size={64} color="white" />
            </motion.div>

            {/* Main message */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-extrabold text-gray-800"
            >
              Experience Shared! 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-2 text-md text-gray-600"
            >
              Thank you for contributing to the community
            </motion.p>
            
            {/* +50 Points badge animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 150 }}
              className="mt-6 px-6 py-2 rounded-full font-semibold border-2"
              style={{ backgroundColor: TRI_COLORS.lightGreen, borderColor: TRI_COLORS.green, color: TRI_COLORS.text }}
            >
              +50 Points Earned! ✨
            </motion.div>

            {/* Floating background particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 0.3, 0.5, 0],
                  scale: [0.5, 1, 1.2, 1.5],
                  x: (i % 2 === 0 ? 1 : -1) * (50 + Math.random() * 50),
                  y: (i % 2 === 0 ? -1 : 1) * (20 + Math.random() * 50),
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="absolute rounded-full"
                style={{
                  width: `${30 + Math.random() * 20}px`,
                  height: `${30 + Math.random() * 20}px`,
                  backgroundColor: i % 3 === 0 ? TRI_COLORS.orange : i % 3 === 1 ? TRI_COLORS.lightGreen : TRI_COLORS.lightBlue,
                  filter: `blur(8px) opacity(${0.5 + Math.random() * 0.5})`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation;