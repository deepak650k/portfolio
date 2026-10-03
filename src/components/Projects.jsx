import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  Github, 
  ArrowUpRight, 
  Laptop, 
  Bot, 
  CheckCircle, 
  Eye, 
  Crown, 
  Sparkles 
} from 'lucide-react';
import { projectsData, personalInfo } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Gradient visuals for project cards
  const projectThumbnails = {
    "portfolio-website": {
      gradient: "from-brand-600 via-indigo-600 to-cyan-500",
      icon: Laptop,
      accentText: "Portfolio v1.0",
      tag: "Live Project"
    },
    "ai-website-project": {
      gradient: "from-purple-600 via-pink-600 to-indigo-600",
      icon: Bot,
      accentText: "GenAI Web App",
      tag: "AI Solution"
    },
    "student-productivity-project": {
      gradient: "from-amber-500 via-orange-600 to-emerald-600",
      icon: CheckCircle,
      accentText: "Productivity OS",
      tag: "Workflow Tool"
    },
    "ai-chess-engine": {
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      icon: Crown,
      accentText: "Minimax Engine",
      tag: "Game AI"
    }
  };

  const categories = ['All', 'Web Development', 'Artificial Intelligence', 'Productivity & Tools', 'Game AI & Algorithms'];

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--card-mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--card-mouse-y', `${y}px`);
  };

  const handleOpenProject = (project) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 mb-3">
            <FolderGit2 size={14} />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Engineering Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-indigo-600 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Selected software solutions built with modern web frameworks, AI integration, and game logic.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat === 'All' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const thumb = projectThumbnails[project.id] || {
                gradient: "from-brand-600 to-indigo-600",
                icon: Laptop,
                accentText: "Project",
                tag: "Engineering"
              };
              const Icon = thumb.icon;

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onMouseMove={handleCardMouseMove}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-brand-500/50 hover:shadow-brand-500/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Dynamic Spotlight Radial Sheen */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    style={{
                      background: 'radial-gradient(420px circle at var(--card-mouse-x, 200px) var(--card-mouse-y, 200px), rgba(14, 165, 233, 0.12), transparent 45%)'
                    }}
                  />

                  <div>
                    {/* Card Visual Header / Mockup Banner with smooth zoom */}
                    <div className="relative h-52 w-full overflow-hidden p-6 flex flex-col justify-between">
                      {/* Gradient background with smooth zoom on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${thumb.gradient} transition-transform duration-500 ease-out group-hover:scale-105`}></div>
                      
                      {/* Background noise and radial overlay */}
                      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]"></div>
                      <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>

                      {/* Top Row in Banner */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                          {thumb.tag}
                        </span>
                        <motion.div 
                          whileHover={{ rotate: 15, scale: 1.15 }}
                          className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-md"
                        >
                          <Icon size={20} />
                        </motion.div>
                      </div>

                      {/* Banner Headline */}
                      <div className="relative z-10">
                        <span className="text-xs font-mono tracking-wider text-white/80 uppercase">
                          {thumb.accentText}
                        </span>
                        <h4 className="text-2xl font-bold font-heading text-white line-clamp-1 drop-shadow-sm">
                          {project.title}
                        </h4>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-7 space-y-4">
                      
                      {/* Category and Metrics */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                          {project.category}
                        </span>
                        {project.metrics && (
                          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            {project.metrics}
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {project.shortDescription}
                      </p>

                      {/* Technologies Used (Pills) */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                          Technologies Used:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 group-hover:border-brand-500/30 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-6 sm:p-7 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80 mt-4">
                    {/* View Project Button */}
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleOpenProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-md shadow-brand-600/20 hover:shadow-brand-600/35 transition-all duration-200 cursor-pointer"
                    >
                      <Eye size={16} />
                      <span>View Project Details</span>
                    </motion.button>

                    {/* GitHub Repo Button */}
                    <motion.a
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      href={project.github || personalInfo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                      title="View GitHub Repository"
                      aria-label={`GitHub Repository for ${project.title}`}
                    >
                      <Github size={18} />
                    </motion.a>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* GitHub Callout Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Want to see how these projects were architected?
          </p>
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors underline decoration-brand-500/50 underline-offset-4"
          >
            <Github size={16} />
            <span>Explore all repositories on GitHub (@{personalInfo.github})</span>
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

      </div>

      {/* Project Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
