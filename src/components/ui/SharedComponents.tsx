'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

// ==========================================
// MOTION WRAPPER - Fade in on scroll
// ==========================================
interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function MotionDiv({ children, className, delay = 0, direction = 'up' }: MotionWrapperProps) {
  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// STAGGER CONTAINER
// ==========================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function StaggerContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ==========================================
// SECTION HEADING
// ==========================================
interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  gradient?: string;
  centered?: boolean;
}

export function SectionHeading({ badge, title, subtitle, gradient, centered = true }: SectionHeadingProps) {
  return (
    <MotionDiv className={`mb-8 md:mb-12 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/70 mb-4 uppercase tracking-wider">
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 ${
          gradient ? `bg-gradient-to-r ${gradient} bg-clip-text text-transparent` : 'text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </MotionDiv>
  );
}

// ==========================================
// GLASS CARD COMPONENT
// ==========================================
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function GlassCard({ children, className = '', hover = false, onClick, style }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`glass-card ${hover ? 'glass-card-hover cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// ICON BADGE
// ==========================================
export function IconBadge({ icon, color, size = 'md' }: { icon: string; color?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: 'w-8 h-8 text-base',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <div
      className={`${sizeMap[size]} rounded-xl flex items-center justify-center`}
      style={{ background: color ? `${color}20` : 'rgba(255,255,255,0.05)' }}
    >
      <span>{icon}</span>
    </div>
  );
}

// ==========================================
// KEYWORD BADGE
// ==========================================
export function KeywordBadge({ text }: { text: string }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60">
      {text}
    </span>
  );
}

// ==========================================
// PROGRESS BAR
// ==========================================
export function ProgressBar({ value, max, color = '#3b82f6', showLabel = true }: {
  value: number;
  max: number;
  color?: string;
  showLabel?: boolean;
}) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>Tiến trình</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
