import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function PageWrapper({ children, prevPage, nextPage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col min-h-[calc(100vh-160px)]"
    >
      <div className="flex-1">
        {children}
      </div>

      {(prevPage || nextPage) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 pb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
            {prevPage ? (
              <Link
                to={prevPage.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>{prevPage.label}</span>
              </Link>
            ) : <div />}

            {nextPage ? (
              <Link
                to={nextPage.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/20 transition-all hover:translate-x-0.5"
              >
                <span>{nextPage.label}</span>
                <ArrowRight size={16} />
              </Link>
            ) : <div />}
          </div>
        </div>
      )}
    </motion.div>
  );
}
