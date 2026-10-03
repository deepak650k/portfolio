import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Code2, 
  Bot, 
  MapPin, 
  Sparkles, 
  Cpu, 
  Send, 
  Play, 
  CheckCircle2, 
  CornerDownLeft,
  GraduationCap
} from 'lucide-react';
import { personalInfo, skillsData } from '../data/portfolioData';

export default function InteractiveTerminalCard() {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'terminal' | 'ai'
  const [cliHistory, setCliHistory] = useState([
    { type: 'system', text: 'Welcome to Deepak\'s Interactive Dev Terminal v2.5' },
    { type: 'system', text: 'Type "help" or click quick chips below to explore.' }
  ]);
  const [cliInput, setCliInput] = useState('');
  const terminalBottomRef = useRef(null);

  // AI chat states
  const [aiChat, setAiChat] = useState([
    { sender: 'ai', text: `Hi! I'm Deepak's AI agent. Ask me anything about his B.Tech at JECRC University, his skills in AI & Web Dev, or his projects!` }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollTop = terminalBottomRef.current.scrollHeight;
    }
  }, [cliHistory, aiChat, isTyping]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...cliHistory, { type: 'user', text: `$ ${cmd}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({ 
          type: 'output', 
          text: 'Available commands:\n• whoami    - Learn who Deepak is\n• skills    - Display core technical capabilities\n• projects  - View featured software engineering work\n• college   - Information about JECRC University\n• contact   - Get direct contact channels\n• ai.run()  - Run simulated AI inference model\n• clear     - Clear terminal screen' 
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${personalInfo.name} — ${personalInfo.headline}\nBased in ${personalInfo.location}.\nStudying at ${personalInfo.college}.`
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Tech Matrix:\n' + skillsData.map(s => `  ▸ ${s.name.padEnd(24, ' ')} [${'#'.repeat(Math.round(s.percentage / 10))}${'·'.repeat(10 - Math.round(s.percentage / 10))}] ${s.percentage}%`).join('\n')
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: 'Featured Projects:\n1. Personal Portfolio Website (React + Tailwind + Framer)\n2. AI Website Project (GenAI + Python + REST)\n3. Student Productivity Project (Workflow & Study OS)\n4. AI Chess Game & Engine (Minimax AI + Audio Engine)'
        });
        break;
      case 'college':
        newHistory.push({
          type: 'output',
          text: `Institution: ${personalInfo.college}, Jaipur, Rajasthan\nDegree: Bachelor of Technology (B.Tech)\nFocus: Artificial Intelligence, Algorithms & Web Development.`
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email:    ${personalInfo.email}\nGitHub:   ${personalInfo.githubUrl}\nLinkedIn: ${personalInfo.linkedinUrl}`
        });
        break;
      case 'ai.run()':
      case 'ai.run':
        newHistory.push({
          type: 'output',
          text: '⚡ Initializing Neural Tensor Weights...\n✓ Context Loaded: Deepak Kumawat\n✓ Inference Complete: "High curiosity, fast learner, production-ready frontend & AI developer!"'
        });
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`
        });
    }

    setCliHistory(newHistory);
    setCliInput('');
  };

  const handleAiSend = (query) => {
    const q = (query || aiInput).trim();
    if (!q) return;

    const newChat = [...aiChat, { sender: 'user', text: q }];
    setAiChat(newChat);
    setAiInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('project') || lower.includes('build')) {
        reply = `Deepak has built high-impact projects including this Modern Portfolio, an AI Website Project, a Student Productivity Suite, and an algorithmic AI Chess Game with Minimax heuristics!`;
      } else if (lower.includes('college') || lower.includes('jecrc') || lower.includes('study') || lower.includes('education')) {
        reply = `Deepak is a B.Tech student at JECRC University, Jaipur (2023-2027), focusing on Computer Science, AI, and Software Engineering.`;
      } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
        reply = `His tech stack spans React, Vite, Tailwind CSS, JavaScript (ES6+), Python, Generative AI APIs, and Digital Productivity systems!`;
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
        reply = `You can email Deepak directly at ${personalInfo.email} or connect on LinkedIn at ${personalInfo.linkedin}! He is open to internship and collaborative tech projects.`;
      } else {
        reply = `Deepak Kumawat is a passionate B.Tech student at JECRC University exploring Artificial Intelligence, modern web engineering, and productivity workflows. Feel free to explore his projects below!`;
      }

      setAiChat([...newChat, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="relative mx-auto max-w-lg w-full">
      {/* Outer ambient glow backlight */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-400 opacity-35 blur-xl"></div>

      {/* Main Container Card */}
      <div className="relative rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300">
        
        {/* Top Window Navigation Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800/80">
          {/* Mac window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity"></span>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300/60 dark:border-slate-800 text-[11px] font-medium">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 size={13} />
              <span>Profile.json</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'terminal'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal size={13} />
              <span>CLI</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'ai'
                  ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bot size={13} />
              <span>AI Agent</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE
          </span>
        </div>

        {/* Tab 1: Profile JSON View */}
        {activeTab === 'profile' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30"
              >
                DK
              </motion.div>
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-medium flex items-center gap-1">
                  <GraduationCap size={13} />
                  <span>{personalInfo.college}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="text-rose-500" />
                  Jaipur, India
                </p>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800 shadow-inner overflow-x-auto">
              <p><span className="text-purple-400">const</span> <span className="text-blue-400">engineer</span> = &#123;</p>
              <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-400">"{personalInfo.name}"</span>,</p>
              <p className="pl-4"><span className="text-slate-400">role:</span> <span className="text-emerald-400">"B.Tech Student"</span>,</p>
              <p className="pl-4"><span className="text-slate-400">university:</span> <span className="text-amber-400">"JECRC University"</span>,</p>
              <p className="pl-4"><span className="text-slate-400">focus:</span> [<span className="text-cyan-400">"Artificial Intelligence"</span>, <span className="text-cyan-400">"Web Dev"</span>],</p>
              <p className="pl-4"><span className="text-slate-400">status:</span> <span className="text-emerald-400">"Open to Opportunities"</span></p>
              <p>&#125;;</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
                  <Cpu size={18} />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Core Domain</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">AI & Tech</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Specialization</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Modern Web</div>
                </div>
              </div>
            </div>

            {/* Hint to try terminal */}
            <div className="pt-2 text-center">
              <button
                onClick={() => setActiveTab('terminal')}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <span>Try interactive CLI terminal</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Terminal (CLI) */}
        {activeTab === 'terminal' && (
          <div className="p-5 flex flex-col h-[340px]">
            {/* Terminal Screen */}
            <div 
              ref={terminalBottomRef}
              className="flex-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-1.5 scrollbar-thin"
            >
              {cliHistory.map((item, index) => (
                <div key={index} className="leading-relaxed">
                  {item.type === 'user' && (
                    <span className="text-brand-400 font-bold">{item.text}</span>
                  )}
                  {item.type === 'system' && (
                    <span className="text-slate-500 italic">{item.text}</span>
                  )}
                  {item.type === 'output' && (
                    <pre className="text-slate-200 whitespace-pre-wrap font-mono mt-0.5">{item.text}</pre>
                  )}
                  {item.type === 'error' && (
                    <span className="text-rose-400">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Command Chips */}
            <div className="flex flex-wrap gap-1.5 py-2.5">
              {['whoami', 'skills', 'projects', 'ai.run()', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-500 hover:text-white transition-colors font-mono text-[10px]"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Command Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (cliInput) handleCommand(cliInput);
              }}
              className="flex items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-800"
            >
              <span className="font-mono text-brand-500 text-xs font-bold">$</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="type 'skills', 'projects', 'whoami'..."
                className="flex-1 bg-transparent text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none placeholder-slate-400"
              />
              <button
                type="submit"
                className="p-1 rounded bg-brand-600 text-white hover:bg-brand-500 transition-colors"
              >
                <CornerDownLeft size={12} />
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: AI Assistant Chat */}
        {activeTab === 'ai' && (
          <div className="p-5 flex flex-col h-[340px]">
            {/* Chat Messages */}
            <div 
              ref={terminalBottomRef}
              className="flex-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800 overflow-y-auto space-y-2.5 text-xs"
            >
              {aiChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-brand-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-400 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="flex gap-1.5 py-2 overflow-x-auto text-[10px]">
              {['What are your projects?', 'Tell me about JECRC', 'How can I contact you?'].map((p) => (
                <button
                  key={p}
                  onClick={() => handleAiSend(p)}
                  className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 whitespace-nowrap hover:bg-purple-500 hover:text-white transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAiSend();
              }}
              className="flex items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-800"
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask about Deepak's experience..."
                className="flex-1 bg-transparent text-xs text-slate-800 dark:text-slate-100 focus:outline-none placeholder-slate-400 px-1"
              />
              <button
                type="submit"
                disabled={!aiInput.trim()}
                className="p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-40 transition-opacity"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
