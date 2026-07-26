/**
 * Terminal constants - ASCII art, social links, skills, jobs, and project data for Jasim Ahmed
 */

export const ASCII_ART = `   ██████╗  █████╗  ███████╗██╗███╗   ███╗
   ╚══██╔╝ ██╔══██╗ ██╔════╝██║████╗ ████║
      ██║  ███████║ ███████╗██║██╔████╔██║
 ██   ██║  ██╔══██║ ╚════██║██║██║╚██╔╝██║
 ╚█████╔╝  ██║  ██║ ███████║██║██║ ╚═╝ ██║
  ╚════╝   ╚═╝  ╚═╝ ╚══════╝╚═╝╚═╝     ╚═╝`;

export const QUICK_COMMANDS = ["help", "whoami", "skills", "projects", "experience", "contact"] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/jasimahmedq2",
  linkedin: "https://www.linkedin.com/in/jasim4148/",
  email: "mailto:jasim.dev48@gmail.com",
} as const;

export const CONTACT_INFO = {
  name: "Jasim Ahmed",
  title: "Full-Stack AI & Backend Software Developer",
  location: "Dhaka, Bangladesh",
  email: "jasim.dev48@gmail.com",
  phone: "+8801794274148",
  github: "https://github.com/jasimahmedq2",
  linkedin: "https://www.linkedin.com/in/jasim4148/",
} as const;

export const SOUNDS = {
  keyPress: "/keyPress.mp3",
  textPrint: "/textPrint.mp3",
  error: "/error.mp3",
  clear: "/clear.mp3",
} as const;

export const SKILLS_DATA = {
  "AI & Automation": ["RAG Systems", "LangChain & LangGraph", "Vector Databases (Pinecone, Qdrant)", "OpenAI / LLMs", "Embedding Pipelines"],
  "Backend & Systems": ["Node.js", "Express.js", "TypeScript", "Python", "REST APIs", "Microservices", "Docker", "Socket.io", "Redis"],
  "Databases & ORMs": ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Knex.js", "Mongoose"],
  "Frontend Web": ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "HTML5/CSS3"],
};

export const EXPERIENCES_DATA = [
  {
    role: "Backend Developer",
    company: "M360ict",
    location: "Dhaka, Bangladesh",
    range: "2024 - Present",
    highlights: [
      "Developed scalable backend architectures and RESTful APIs using Node.js, Express.js, and TypeScript.",
      "Designed & optimized relational (PostgreSQL, MySQL) and NoSQL (MongoDB) schemas.",
      "Implemented end-to-end AI integrations, RAG workflows, and LangGraph agent automations.",
    ],
  },
  {
    role: "Backend Software Developer",
    company: "Full-Stack & Systems",
    location: "Dhaka, Bangladesh",
    range: "2023 - 2024",
    highlights: [
      "Built resilient server architectures and API microservices with Node.js, TypeScript, and Docker.",
      "Optimized query performance and database indexing across PostgreSQL/MySQL database clusters.",
      "Implemented real-time websockets with Socket.io and Redis pub/sub queues.",
    ],
  },
  {
    role: "AI Solutions & Automation Developer",
    company: "AI & Automation Solutions",
    location: "Dhaka, Bangladesh",
    range: "2022 - 2023",
    highlights: [
      "Developed custom RAG architectures and Vector DB pipelines (Pinecone, Qdrant, Chroma).",
      "Built multi-agent automation workflows using LangChain and LangGraph.",
      "Integrated LLM APIs into existing Node.js backends with rate limiting and fallback routing.",
    ],
  },
];

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "RAG & AI Agent Business Automation",
    tech: ["Node.js", "TypeScript", "LangChain", "LangGraph", "Vector Databases", "OpenAI"],
    github: "https://github.com/jasimahmedq2",
    description:
      "End-to-end AI platform combining Retrieval-Augmented Generation (RAG), vector embeddings, and autonomous multi-agent workflows built with LangChain & LangGraph.",
  },
  {
    id: 2,
    title: "Scalable Enterprise Backend Infrastructure",
    tech: ["Node.js", "Express.js", "TypeScript", "PostgreSQL", "Prisma", "Knex.js", "Docker"],
    github: "https://github.com/jasimahmedq2",
    description:
      "High-throughput modular backend service with database query optimization, connection pooling, Prisma/Knex migrations, RBAC JWT auth, and Socket.io websockets.",
  },
  {
    id: 3,
    title: "Full-Stack AI Application & Dashboard",
    tech: ["Next.js", "React", "Redux", "Tailwind CSS", "Node.js", "MongoDB", "Mongoose"],
    github: "https://github.com/jasimahmedq2",
    description:
      "Intelligent document interaction dashboard featuring React/Next.js frontend, Redux state management, and Node.js/MongoDB vector embedding processing backend.",
  },
];
