export const profile = {
  name: "Ananya Desai",
  initials: "AD",
  title: "Computer Science Enthusiast",
  roles: [
    "Computer Science Enthusiast",
    "AI / ML Explorer",
    "Cybersecurity Learner",
    "Full-Stack Builder",
  ],
  location: "Dharwad, Karnataka, India",
  email: "ananyadesai726@gmail.com",
  phone: "+91 9380303005",
  linkedin: "https://linkedin.com/in/ananya-desai-584488303",
  portfolio: "https://ananya-dudihalli-portfolio.netlify.app",
  summary:
    "Computer Science enthusiast with hands-on experience in web development, data analysis and software testing. I like turning ideas into dependable software, with a growing focus on AI/ML and Cybersecurity.",
  domains: ["AI / ML", "Cybersecurity"],
};

export const stats = [
  { label: "CGPA", value: 7.3, decimals: 2, suffix: "" },
  { label: "Flagship projects", value: 2, decimals: 0, suffix: "" },
  { label: "Certifications", value: 5, decimals: 0, suffix: "" },
  { label: "Skill areas", value: 9, decimals: 0, suffix: "" },
];

export type SkillGroup = { id: string; label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { id: "prog", label: "Programming", items: ["C", "Python", "JavaScript"] },
  {
    id: "web",
    label: "Web & APIs",
    items: ["HTML", "CSS", "Node.js", "Express.js", "RESTful APIs", "WebSockets"],
  },
  { id: "data", label: "Data & Databases", items: ["MySQL", "Data Analysis"] },
  {
    id: "qa",
    label: "Testing & Quality",
    items: ["Manual Testing", "Test Case Design", "Defect Reporting", "STLC", "SDLC", "Agile"],
  },
  { id: "tools", label: "Tools", items: ["Git", "Jira"] },
  {
    id: "sec",
    label: "Networking & Security",
    items: ["Junos (HPE)", "Network Security Fundamentals"],
  },
  {
    id: "ai",
    label: "AI / ML",
    items: ["PyTorch", "Reinforcement Learning (DQN)", "Markov Decision Processes"],
  },
  {
    id: "cs",
    label: "Core CS",
    items: ["Data Structures & Algorithms", "OOP", "Problem-Solving"],
  },
  {
    id: "pro",
    label: "Professional",
    items: ["Technical Documentation", "Research & Analysis", "Presentation", "Project Management"],
  },
];

export type Project = {
  id: "safety" | "dqn";
  title: string;
  kind: string;
  blurb: string;
  bullets: string[];
  tech: string[];
  badge?: string;
};

export const projects: Project[] = [
  {
    id: "safety",
    title: "Women's Real-Time Safety & Alert Network",
    kind: "Full-Stack Web Application",
    blurb:
      "Real-time safety alerts and emergency response with live location sharing and one-tap SOS.",
    bullets: [
      "Built a full-stack web app for real-time safety alerts and emergency response, with live location sharing and SOS triggers.",
      "Developed a Node.js/Express back end with RESTful APIs, WebSocket communication and MySQL storage for user and alert data.",
      "Integrated geolocation APIs to instantly broadcast alerts to registered emergency contacts.",
      "Created a responsive front end (HTML, CSS, JavaScript) with a dashboard to manage trusted contacts and monitor active alerts.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL", "WebSockets", "Geolocation API"],
  },
  {
    id: "dqn",
    title: "Resource Allocation in 5G MEC using DQN Reinforcement Learning",
    kind: "AI / ML Research",
    badge: "Published Springer Paper",
    blurb:
      "A Deep Q-Network agent that allocates edge-computing resources to cut latency and energy use.",
    bullets: [
      "Researched dynamic resource allocation in 5G Multi-access Edge Computing (MEC) and designed a Deep Q-Network (DQN) system to optimise it.",
      "Modelled task offloading and scheduling as a Markov Decision Process, training the agent to reduce both latency and energy consumption.",
      "Selected for an international conference in Ahmedabad, published as a Springer paper and presented to an international audience.",
    ],
    tech: ["Python", "PyTorch", "5G MEC simulation", "Reinforcement Learning (DQN)"],
  },
];

export const education = [
  {
    school: "KLE Technological University, Hubballi",
    degree: "B.E., Computer Science & Engineering",
    years: "2023 – 2027 (Expected)",
    score: "CGPA 7.30",
    current: true,
  },
  {
    school: "Prism P U College, Dharwad",
    degree: "PUC (PCMB)",
    years: "2021 – 2023",
    score: "84%",
    current: false,
  },
  {
    school: "K E Board CBSE School, Dharwad",
    degree: "S.S.L.C.",
    years: "2021",
    score: "83%",
    current: false,
  },
];

export const certifications = [
  { title: "Data Analyst Certification", issuer: "Data & Analytics", tag: "Data" },
  { title: "HPE Junos Associate, Networking", issuer: "Hewlett Packard Enterprise", tag: "Networking" },
  { title: "Cyber Job Simulation, Cyber Security", issuer: "Deloitte", tag: "Security" },
  { title: "Introduction to Software Testing", issuer: "Certificate Code 10926383", tag: "QA" },
  { title: "Project Management", issuer: "Professional", tag: "Management" },
];

export const strengths = [
  "Analytical & Critical Thinking",
  "Attention to Detail",
  "Effective Communication",
  "Teamwork",
  "Leadership",
  "Time Management",
  "Punctual and Reliable",
];

export const interests = ["Software Testing & QA", "Data Analytics", "AI / ML", "Cybersecurity", "Technology Consulting"];
export const hobbies = ["Reading", "Playing Guitar", "Singing"];

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
