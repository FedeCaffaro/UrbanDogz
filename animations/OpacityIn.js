/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';

export const OpacityIn = ({ children, isActive = false, delayCounter }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: delayCounter === 0 ? 0.4 : (delayCounter * 0.4 + 0.4),
        }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
