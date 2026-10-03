import React, { useState, useEffect } from 'react';

/**
 * Motion Design Tokens & Shared Framer Motion Variants
 * Centralized configuration for all portfolio animations.
 * Tuned for 60fps performance (transforms & opacity only).
 */

export const MOTION_TOKENS = {
  // Spring configurations (soft, organic, no bouncy gimmicks)
  spring: {
    soft: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      mass: 1
    },
    snappy: {
      type: 'spring',
      stiffness: 280,
      damping: 24,
      mass: 0.8
    },
    gentle: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      mass: 1.2
    }
  },

  // Easing curves
  ease: {
    outCubic: [0.16, 1, 0.3, 1],
    inOutCubic: [0.65, 0, 0.35, 1],
    subtle: [0.25, 0.1, 0.25, 1]
  },

  // Durations (seconds)
  duration: {
    instant: 0.15,
    fast: 0.25,
    ui: 0.4,
    section: 0.55,
    hero: 0.75
  },

  // Stagger offsets
  stagger: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.12
  }
};

/**
 * 1. Staggered Container Variants
 */
export const staggerContainer = (staggerChildren = MOTION_TOKENS.stagger.normal, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

/**
 * 2. Fade & Slide Up Variants (Used for section headers, cards, text)
 */
export const fadeInUp = (distance = 24, duration = MOTION_TOKENS.duration.section, delay = 0) => ({
  hidden: {
    opacity: 0,
    y: distance
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: MOTION_TOKENS.ease.outCubic
    }
  }
});

/**
 * 3. Fade-In Scale Variants (Used for badges, avatars, chips)
 */
export const fadeInScale = (scaleFrom = 0.94, duration = MOTION_TOKENS.duration.ui) => ({
  hidden: {
    opacity: 0,
    scale: scaleFrom
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      ease: MOTION_TOKENS.ease.outCubic
    }
  }
});

/**
 * 4. Micro-Interaction Preset Props
 */
export const microInteractions = {
  // Button hover & tap
  button: {
    whileHover: { scale: 1.03, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: MOTION_TOKENS.ease.outCubic }
  },

  // Project card hover
  card: {
    whileHover: { 
      y: -6,
      transition: { duration: 0.3, ease: MOTION_TOKENS.ease.outCubic }
    }
  },

  // Social icon hover
  socialIcon: {
    whileHover: { scale: 1.12, y: -2 },
    whileTap: { scale: 0.94 },
    transition: { duration: 0.2, ease: MOTION_TOKENS.ease.outCubic }
  },

  // Arrow nudge transition for CTA buttons
  arrowShift: {
    initial: { x: 0 },
    whileHover: { x: 4 },
    transition: { duration: 0.2, ease: MOTION_TOKENS.ease.outCubic }
  }
};

/**
 * 5. Viewport Trigger Settings
 */
export const defaultViewport = {
  once: true,
  amount: 0.2 // Triggers at ~20% element visibility
};

/**
 * 6. Modal Curtain & Content Transitions
 */
export const modalVariants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: MOTION_TOKENS.ease.outCubic }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: MOTION_TOKENS.ease.outCubic }
    }
  },
  content: {
    hidden: { opacity: 0, scale: 0.94, y: 16 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: MOTION_TOKENS.spring.snappy
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 12,
      transition: { duration: 0.2, ease: MOTION_TOKENS.ease.outCubic }
    }
  }
};

/**
 * 7. Animated Counter Component
 * Counts up smoothly from 0 to target value on scroll into view.
 */
export function AnimatedCounter({ end, duration = 1.4, suffix = '', inView = true }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    const endValue = typeof end === 'string' ? parseInt(end.replace(/\D/g, ''), 10) : end;
    if (isNaN(endValue)) return;

    let frameId;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, inView]);

  return React.createElement('span', null, `${count}${suffix}`);
}
