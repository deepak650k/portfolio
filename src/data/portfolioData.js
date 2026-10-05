export const personalInfo = {
  name: "Deepak Kumawat",
  role: "B.Tech Student",
  headline: "B.Tech Student | AI & Technology Enthusiast",
  college: "JECRC University",
  location: "Jaipur, Rajasthan, India",
  email: "deepak650k@gmail.com",
  linkedin: "deepak-650k",
  linkedinUrl: "https://www.linkedin.com/in/deepak-650k",
  github: "deepak650k",
  githubUrl: "https://github.com/deepak650k",
  shortBio: "I am a B.Tech student interested in technology, artificial intelligence, web development and digital productivity. I am learning modern technologies and building practical projects.",
  extendedBio: "Driven by curiosity and a passion for engineering solutions, I focus on combining the power of artificial intelligence with modern web technologies. Whether developing responsive web applications, engineering conversational AI chatbots, exploring LLMs & Generative AI workflows, or designing digital productivity systems, I thrive on turning ideas into clean, functional, and user-centric software.",
  stats: [
    { label: "Location", value: "Jaipur, IN" },
    { label: "University", value: "JECRC" },
    { label: "Focus", value: "AI & Web Dev" },
    { label: "Status", value: "Open to Opportunities" }
  ]
};

export const educationData = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    institution: "JECRC University",
    location: "Jaipur, Rajasthan",
    period: "2026 - 2030",
    status: "Currently Pursuing",
    description: "Building strong foundations in computer science and engineering with focused coursework in cutting-edge software paradigms, algorithms, and artificial intelligence.",
    learningAreas: [
      "Artificial Intelligence & Machine Learning Fundamentals",
      "Data Structures & Algorithms (DSA)",
      "Web Technologies & Frontend Engineering",
      "Python Programming & Application Scripting",
      "Database Management Systems & System Design",
      "Digital Productivity & Workflow Automation"
    ],
    highlights: [
      "Active participant in technical workshops and coding hackathons",
      "Exploring applied AI and autonomous agent workflows",
      "Consistent academic record with focus on practical implementations"
    ]
  }
];

export const skillsData = [
  {
    name: "HTML",
    category: "Frontend",
    level: "Advanced",
    percentage: 92,
    icon: "Code2",
    description: "Semantic HTML5, accessibility standards (a11y), SEO-friendly architecture, and modern web APIs."
  },
  {
    name: "CSS",
    category: "Frontend",
    level: "Advanced",
    percentage: 88,
    icon: "Palette",
    description: "Modern CSS3, Flexbox, CSS Grid, Tailwind CSS, Responsive Design, and Fluid Layouts."
  },
  {
    name: "JavaScript",
    category: "Frontend & Logic",
    level: "Proficient",
    percentage: 85,
    icon: "FileCode",
    description: "Modern ES6+ syntax, asynchronous programming, DOM manipulation, promises, and React fundamentals."
  },
  {
    name: "Python",
    category: "Core Language",
    level: "Proficient",
    percentage: 84,
    icon: "Terminal",
    description: "Core algorithms, data analysis, automation scripts, AI/ML libraries, and backend development."
  },
  {
    name: "Artificial Intelligence",
    category: "AI & Data",
    level: "Enthusiast / Practical",
    percentage: 80,
    icon: "Brain",
    description: "Machine learning concepts, neural networks, predictive modeling, and intelligent problem solving."
  },
  {
    name: "Generative AI",
    category: "AI & Data",
    level: "Enthusiast / Practical",
    percentage: 85,
    icon: "Sparkles",
    description: "Prompt engineering, LLM integration, multimodal models, AI agent tooling, and synthetic content workflows."
  },
  {
    name: "Web Development",
    category: "Development",
    level: "Proficient",
    percentage: 88,
    icon: "Globe",
    description: "Full-stack conceptual design, component-driven UI (React/Vite), REST APIs, and Vercel/cloud deployment."
  },
  {
    name: "Digital Productivity",
    category: "Productivity & Tools",
    level: "Advanced",
    percentage: 90,
    icon: "Zap",
    description: "System design for deep work, Notion/Obsidian setups, automated workflows, Git version control, and time blocking."
  }
];

export const projectsData = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    category: "Web Development",
    shortDescription: "A modern, highly-responsive personal portfolio designed with sleek typography, subtle micro-interactions, dark/light theme switching, and seamless mobile UX.",
    fullDescription: "Built from the ground up to showcase my educational background, engineering projects, tech stack, and achievements. Highlights high-fidelity glassmorphism, responsive navigation, and performance-tuned asset delivery.",
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript"],
    featured: true,
    github: "https://github.com/deepak650k/Portfolio",
    demo: "https://deepak-builds-26.vercel.app",
    metrics: "100% Responsive • 12 Curated Themes • 60 FPS Smooth Scroll",
    features: [
      "Interactive 12-theme dynamic switcher with persistent state",
      "Dynamic project modal previews and animated skill cards",
      "Fully responsive mobile drawer menu and accessible navigation",
      "Modern contact hub with instant email copy and direct messaging"
    ]
  },
  {
    id: "ai-chatbot-assistant",
    title: "Conversational AI Chatbot Assistant",
    category: "AI & Automation",
    shortDescription: "An intelligent conversational AI chatbot agent engineered with natural language processing, dynamic knowledge retrieval, and custom webhook workflows for real-time interaction.",
    fullDescription: "An end-to-end conversational AI assistant built to handle user inquiries, portfolio interactions, and academic query resolutions in real time. Features multi-turn intent classification, contextual memory retention, dynamic script injection, and responsive fallback mechanisms integrated directly into web interfaces.",
    technologies: ["Botpress", "React", "JavaScript", "Generative AI", "Webhooks", "REST APIs"],
    featured: true,
    github: "https://github.com/deepak650k/AI-Chatbot",
    demo: "https://deepak-builds-26.vercel.app",
    metrics: "Sub-Second Latency • Multi-Turn Dialogue • 98% Intent Accuracy",
    features: [
      "Engineered context-aware multi-turn dialog flows and intent-driven response routing",
      "Integrated custom knowledge base search delivering rapid, accurate informational answers",
      "Implemented asynchronous webhooks and REST endpoints for external data communication",
      "Designed responsive frontend widget integration with real-time feedback states"
    ]
  },
  {
    id: "ai-website-project",
    title: "AI Website Project",
    category: "Artificial Intelligence",
    shortDescription: "An intelligent web application leveraging Generative AI capabilities to deliver smart context-aware assistance, automated text generation, and interactive intelligence.",
    fullDescription: "Explores the intersection of modern frontend UI and AI model interfaces. Designed to help users brainstorm ideas, summarize content, and interact with smart AI responses in a polished chat/dashboard interface.",
    technologies: ["Python", "React", "Generative AI", "Tailwind CSS", "REST APIs"],
    featured: true,
    github: "https://github.com/deepak650k/AI-Website",
    demo: "https://deepak-builds-26.vercel.app/#projects",
    metrics: "Real-time AI Responses • Prompt Optimization • Clean UI",
    features: [
      "Custom prompt engineering and context handling",
      "Clean conversation history with markdown formatting",
      "Fast API integration with error resilient fallbacks",
      "Tailwind-styled modern cards with visual feedback states"
    ]
  },
  {
    id: "student-productivity-project",
    title: "Student Productivity Project",
    category: "Productivity & Tools",
    shortDescription: "A specialized digital productivity platform built for college students to organize course deadlines, track assignment milestones, and optimize study sessions.",
    fullDescription: "Developed to address the challenges of juggling academic tasks, exams, and personal projects. Incorporates customizable study timers, priority task boards, and academic progress visualization.",
    technologies: ["JavaScript", "React", "Tailwind CSS", "Local Storage", "CSS Grid"],
    featured: true,
    github: "https://github.com/deepak650k/student-productivity",
    demo: "https://deepak-builds-26.vercel.app/#projects",
    metrics: "Zero Friction • Offline First • High Efficiency",
    features: [
      "Interactive Eisenhower matrix / priority task boards",
      "Integrated Pomodoro study timer with sound alerts and session logging",
      "Progress analytics showing completion rates and weekly streaks",
      "Zero account setup required - instant offline local persistence"
    ]
  }
];

export const achievementsData = [
  {
    id: 1,
    title: "AI & Machine Learning Foundations",
    type: "Certifications",
    issuer: "DeepLearning.AI & Coursera",
    year: "2026",
    description: "Completed comprehensive training on machine learning fundamentals, predictive modeling, and Python for data science.",
    icon: "Award",
    badge: "Certified"
  },
  {
    id: 2,
    title: "Full-Stack Web Development Track",
    type: "Courses",
    issuer: "freeCodeCamp & Meta",
    year: "2026",
    description: "Mastered modern frontend engineering, asynchronous JavaScript, React components, and responsive design principles.",
    icon: "BookOpen",
    badge: "Completed"
  },
  {
    id: 3,
    title: "Campus Tech & Innovation Hackathon",
    type: "Hackathons",
    issuer: "JECRC University Hackathon",
    year: "2026",
    description: "Collaborated in an intensive hackathon environment, ideating and prototyping technical solutions for everyday student workflow challenges.",
    icon: "Trophy",
    badge: "Participant / Showcase"
  },
  {
    id: 4,
    title: "Generative AI Prompt Engineering",
    type: "Certifications",
    issuer: "Google Cloud & DeepLearning.AI",
    year: "2026",
    description: "Focused training in LLM prompting techniques, few-shot prompting, and integrating generative capabilities into real-world software.",
    icon: "Sparkles",
    badge: "Specialization"
  },
  {
    id: 5,
    title: "Academic Excellence & Continuous Learning",
    type: "Awards",
    issuer: "JECRC Department of CSE",
    year: "2026 - Present",
    description: "Demonstrated dedication to engineering coursework, practical project submissions, and peer knowledge sharing.",
    icon: "Medal",
    badge: "Honor"
  },
  {
    id: 6,
    title: "Open Source & Developer Community",
    type: "Other achievements",
    issuer: "GitHub Campus & Technical Clubs",
    year: "Ongoing",
    description: "Active contributor to open-source student repositories and participant in campus technical clubs and community coding meetups.",
    icon: "Users",
    badge: "Community"
  }
];

export const codingProfiles = [
  {
    name: "LeetCode",
    username: "deepak650k",
    role: "DSA & Algorithms",
    url: "https://leetcode.com/u/deepak650k",
    badge: "Problem Solving",
    color: "#f59e0b"
  },
  {
    name: "GitHub",
    username: "deepak650k",
    role: "Open Source & Code Repos",
    url: "https://github.com/deepak650k",
    badge: "Developer",
    color: "#2563eb"
  },
  {
    name: "HackerRank",
    username: "deepak650k",
    role: "Python & Logic Certified",
    url: "https://www.hackerrank.com/profile/deepak650k",
    badge: "Verified Skill",
    color: "#059669"
  },
  {
    name: "GeeksforGeeks",
    username: "deepak650k",
    role: "CS Fundamentals & Practice",
    url: "https://www.geeksforgeeks.org/user/deepak650k/",
    badge: "Active Learner",
    color: "#10b981"
  }
];

export const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" }
];
