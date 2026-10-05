import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Linkedin, 
  Github, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageSquare, 
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSentDetails, setLastSentDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Hi Deepak,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`
    )}`;

    setLastSentDetails({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      mailtoUrl: mailtoUrl
    });

    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      window.open(mailtoUrl, '_blank');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 500);
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

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
            <MessageSquare size={14} />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-brand-secondary mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Have a question, collaboration idea, or project opportunity? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Cards (Email, LinkedIn, GitHub, Location) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            
            <div className="mb-2">
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Contact Information
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Reach out directly via email, professional profiles, or the message form.
              </p>
            </div>

            {/* Email Card (Required) */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Email Address
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white break-all mt-0.5">
                      {personalInfo.email}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Fastest response for inquiries & collaborations
                    </p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl text-slate-400 hover:text-brand-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </motion.button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                {copied ? (
                  <span className="text-emerald-500 font-medium">✓ Copied to clipboard!</span>
                ) : (
                  <span className="text-slate-400">Click to copy or compose</span>
                )}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors"
                >
                  <span>Send Email</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>

            {/* LinkedIn Card (Required) */}
            <motion.a
              whileHover={{ y: -3 }}
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Linkedin size={22} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    LinkedIn Profile
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {personalInfo.linkedin}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Connect professionally & view network
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-xl text-slate-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                <ExternalLink size={18} />
              </div>
            </motion.a>

            {/* GitHub Card (Required) */}
            <motion.a
              whileHover={{ y: -3 }}
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-500/50 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shrink-0 group-hover:scale-105 transition-transform">
                  <Github size={22} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    GitHub Profile
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {personalInfo.github}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Explore code repositories & commits
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-xl text-slate-400 group-hover:text-brand-600 dark:group-hover:text-white transition-colors">
                <ExternalLink size={18} />
              </div>
            </motion.a>

            {/* Location & Status Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Location & Campus
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {personalInfo.college}, Jaipur, India
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Open to internships & projects</span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Send Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 relative overflow-hidden">
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Send a Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Fill in the details below and I'll get back to you as soon as possible.
                </p>
              </div>

              {formSubmitted && lastSentDetails ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
                    <Check size={28} />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-emerald-800 dark:text-emerald-300 mb-1">
                    Message Prepared & Ready!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 max-w-sm mx-auto mb-5">
                    Your email app was triggered with your pre-filled inquiry addressed directly to Deepak Kumawat.
                  </p>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-800/80 text-left text-xs space-y-1.5 mb-6 max-w-md mx-auto shadow-sm">
                    <div className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white">To:</strong> {personalInfo.email}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white">Subject:</strong> [Portfolio Inquiry] {lastSentDetails.subject}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white">Sender:</strong> {lastSentDetails.name} ({lastSentDetails.email})
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={lastSentDetails.mailtoUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Click to Send via Email App</span>
                    </a>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setLastSentDetails(null);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                      Send Another Note
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Discussion / Internship / Question"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-brand-600 to-brand-secondary hover:from-brand-500 hover:to-brand-secondary-light text-white shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 transition-all duration-200 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
