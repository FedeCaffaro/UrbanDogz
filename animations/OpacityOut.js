/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';

export const OpacityOut = ({ children, isActive = false }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        exit={{ display: 'none' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, display: 'none' }}
        transition={{
          delay: 0.1,
        }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
