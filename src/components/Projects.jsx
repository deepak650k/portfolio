import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Laptop, 
  Bot, 
  CheckCircle, 
  Eye
} from 'lucide-react';
import { projectsData, personalInfo } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Gradient visuals for the project cards
  const projectThumbnails = {
    "portfolio-website": {
      gradient: "from-brand-600 via-teal-600 to-cyan-500",
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
    }
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
            Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-brand-secondary mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Selected engineering and software projects demonstrating real-world problem solving.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => {
            const thumb = projectThumbnails[project.id] || {
              gradient: "from-brand-600 to-brand-secondary",
              icon: Laptop,
              accentText: "Project",
              tag: "Engineering"
            };
            const Icon = thumb.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Card Visual Header / Mockup Banner */}
                  <div className={`relative h-48 w-full bg-gradient-to-br ${thumb.gradient} p-6 flex flex-col justify-between overflow-hidden`}>
                    
                    {/* Background noise and radial overlay */}
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

                    {/* Top Row in Banner */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                        {thumb.tag}
                      </span>
                      <motion.div 
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/20"
                      >
                        <Icon size={18} />
                      </motion.div>
                    </div>

                    {/* Banner Headline */}
                    <div className="relative z-10">
                      <span className="text-xs font-mono tracking-wider text-white/80 uppercase">
                        {thumb.accentText}
                      </span>
                      <h4 className="text-xl font-bold font-heading text-white line-clamp-1 drop-shadow-sm">
                        {project.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    
                    {/* Category pill */}
                    <div className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                      {project.category}
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
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
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
                  {/* View Project Button (Required by prompt) */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 hover:shadow-brand-600/35 transition-all duration-200 cursor-pointer"
                  >
                    <Eye size={16} />
                    <span>View Project</span>
                  </motion.button>

                  {/* GitHub Repo Button */}
                  <motion.a
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    href={personalInfo.githubUrl}
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
            Interested in reviewing the source code or contributing?
          </p>
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors underline decoration-brand-500/50 underline-offset-4"
          >
            <Github size={16} />
            <span>Explore more repositories on GitHub (@{personalInfo.github})</span>
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
