/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';

export const SlideIn = ({
  children,
  isActive = false,
  slide = 15,
  key = 'auniquestring',
  orientation = 'horizontal'
}) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        key={key}
        exit={{ opacity: 0, [orientation === 'horizontal' ? 'x' : 'y']: slide }}
        initial={{ opacity: 0, [orientation === 'horizontal' ? 'x' : 'y']: slide }}
        animate={{ opacity: 1, [orientation === 'horizontal' ? 'x' : 'y']: 0 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
