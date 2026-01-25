import { motion } from 'framer-motion';

const ShimmerButton = ({ title }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-2 bg-red-900 text-white text-sm font-bold rounded-sm overflow-hidden border border-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
    >
      <span className="relative z-10 uppercase tracking-wider">{title}</span>
      {/* The Gold Shimmer Effect */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        style={{ skewX: '-20deg' }}
      />
    </motion.button>
  );
};

export default ShimmerButton;