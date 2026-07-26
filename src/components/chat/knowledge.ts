/**
 * Authoritative Knowledge Base & Vectorless RAG Engine for Jasim Ahmed's AI Assistant
 */

export interface KnowledgeChunk {
  id: string;
  category: "bio" | "skills" | "experience" | "projects" | "contact" | "terminal" | "education";
  keywords: string[];
  content: string;
  actionTag?: string;
}

export const JASIM_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: "education",
    category: "education",
    keywords: ["education", "study", "university", "wub", "world university", "bba", "mis", "school", "college", "hsc", "ssc", "reg", "registration", "roll", "batch", "degree"],
    content: "Student Information & Education: Jasim Ahmed is a BBA student at the World University of Bangladesh (WUB) pursuing a Bachelor's Degree in Management Information Systems (MIS) [2025 - Present] | Reg No: WUB01/26/87/5145 | Roll/Batch: 5145 / 87B. HSC: Rajnagar Technical School & College (2024). SSC: Zillur Rahman School and College (2022).",
    actionTag: "[NAVIGATE: View Education Page | /education]",
  },
  {
    id: "bio",
    category: "bio",
    keywords: ["who", "about", "bio", "jasim", "ahmed", "developer", "background", "summary", "dhaka", "bangladesh"],
    content: "Jasim Ahmed is a Full-Stack AI & Backend Software Developer based in Dhaka, Bangladesh. He specializes in high-throughput microservices, Retrieval-Augmented Generation (RAG) systems, vector database pipelines, and multi-agent AI automation using Node.js, Express.js, TypeScript, Python, and LangGraph.",
    actionTag: "[NAVIGATE: Explore About Section | #about]",
  },
  {
    id: "skills_ai",
    category: "skills",
    keywords: ["ai", "llm", "rag", "langchain", "langgraph", "vector", "pinecone", "qdrant", "chroma", "embeddings", "agent", "automation"],
    content: "AI & LLM Integration Skills: Retrieval-Augmented Generation (RAG) Architectures, LangChain & LangGraph Multi-Agent Workflows, Vector Databases (Pinecone, Qdrant, Chroma), OpenAI & Open-Source LLMs Integration, Vector Embeddings & Semantic Search Pipelines.",
    actionTag: "[NAVIGATE: View Featured Projects | #projects]",
  },
  {
    id: "skills_backend",
    category: "skills",
    keywords: ["backend", "node", "nodejs", "express", "typescript", "python", "rest", "api", "microservice", "docker", "socket.io", "redis", "pubsub", "architecture"],
    content: "Backend & Systems Architecture Skills: Node.js, Express.js, TypeScript, Python, RESTful API Microservices, Docker Containerization, Socket.io Realtime Websockets, Redis Caching & Pub/Sub Queues.",
    actionTag: "[NAVIGATE: View Work Experience | #jobs]",
  },
  {
    id: "skills_db",
    category: "skills",
    keywords: ["database", "db", "sql", "postgresql", "mysql", "mongodb", "prisma", "knex", "mongoose", "orm", "nosql"],
    content: "Databases & Data Modeling Skills: PostgreSQL, MySQL, MongoDB, Prisma ORM, Knex.js Query Builder, Mongoose ODM.",
  },
  {
    id: "skills_frontend",
    category: "skills",
    keywords: ["frontend", "next", "nextjs", "react", "redux", "tailwind", "css", "html", "javascript", "ui", "web"],
    content: "Frontend Web Skills: Next.js, React, Redux Toolkit, Tailwind CSS, HTML5 / CSS3 / JavaScript (ES6+).",
  },
  {
    id: "exp_m360ict",
    category: "experience",
    keywords: ["m360ict", "m360", "experience", "work", "job", "current", "present", "backend developer"],
    content: "Work Experience - Backend Developer @ M360ict (Dhaka, Bangladesh | 2024 - Present): Developed scalable backend architectures and RESTful APIs using Node.js, Express.js, and TypeScript. Optimized relational (PostgreSQL, MySQL) and NoSQL (MongoDB) schemas. Implemented end-to-end AI integration, embedding workflows, RAG systems, and AI agent automations with LangGraph.",
    actionTag: "[NAVIGATE: View Work Experience | #jobs]",
  },
  {
    id: "exp_backend",
    category: "experience",
    keywords: ["backend software developer", "systems", "fullstack", "previous job", "history"],
    content: "Work Experience - Backend Software Developer (Dhaka, Bangladesh | 2023 - 2024): Built resilient server architectures and API microservices with Node.js, TypeScript, and Docker. Optimized database query performance and indexing across PostgreSQL/MySQL clusters. Implemented real-time communication with Socket.io and Redis pub/sub queues.",
  },
  {
    id: "exp_ai",
    category: "experience",
    keywords: ["ai solutions", "automation developer", "rag developer"],
    content: "Work Experience - AI Solutions & Automation Developer (Dhaka, Bangladesh | 2022 - 2023): Developed custom RAG architectures and Vector DB pipelines (Pinecone, Qdrant, Chroma) for document processing. Built multi-agent workflows using LangChain and LangGraph. Integrated LLMs into Node.js backends with rate limiting and fallback routing.",
  },
  {
    id: "proj_rag",
    category: "projects",
    keywords: ["rag project", "agent project", "business automation", "langchain project", "langgraph project"],
    content: "Project 1: RAG & AI Agent Business Automation [Tech: Node.js, TypeScript, LangChain, LangGraph, Vector DBs, OpenAI]. Description: End-to-end AI integration platform combining Retrieval-Augmented Generation (RAG), vector embeddings, and autonomous multi-agent workflows built with LangChain & LangGraph to automate enterprise document workflows.",
    actionTag: "[NAVIGATE: View Featured Projects | #projects]",
  },
  {
    id: "proj_backend",
    category: "projects",
    keywords: ["enterprise backend", "backend project", "scalable api", "prisma project", "docker project"],
    content: "Project 2: Scalable Enterprise Backend Infrastructure [Tech: Node.js, Express.js, TypeScript, PostgreSQL, Prisma, Docker, Socket.io]. Description: High-throughput modular backend service engineered for enterprise scalability with database connection pooling, automated migrations, RBAC JWT authentication, and real-time Socket.io websockets.",
    actionTag: "[NAVIGATE: View Featured Projects | #projects]",
  },
  {
    id: "proj_fullstack",
    category: "projects",
    keywords: ["fullstack project", "ai dashboard", "react project", "nextjs project", "mongodb project"],
    content: "Project 3: Full-Stack AI Application & Dashboard [Tech: Next.js, React, Redux, Tailwind CSS, Node.js, MongoDB, Mongoose]. Description: Full-stack web application designed for intelligent document interaction and real-time task execution with React/Next.js frontend, Redux state management, and Node.js vector embedding backend.",
    actionTag: "[NAVIGATE: View Featured Projects | #projects]",
  },
  {
    id: "contact",
    category: "contact",
    keywords: ["contact", "email", "phone", "location", "hire", "reach", "github", "linkedin", "social", "address"],
    content: "Contact Details: Email: jasim.dev48@gmail.com | Phone: +8801794274148 | Location: Dhaka, Bangladesh | GitHub: https://github.com/jasimahmedq2 | LinkedIn: https://www.linkedin.com/in/jasim4148/",
    actionTag: "[NAVIGATE: Go to Contact Section | #contact]",
  },
  {
    id: "terminal",
    category: "terminal",
    keywords: ["terminal", "cmd", "cli", "command line", "bash", "zsh", "shell", "console"],
    content: "Interactive Terminal Feature: Jasim's portfolio includes an interactive terminal where visitors can execute commands like whoami, skills, projects, experience, contact, and clear.",
    actionTag: "[NAVIGATE: Open Interactive Terminal | /terminal]",
  },
];

/**
 * Vectorless RAG Engine: Retrieves top relevant knowledge chunks based on query term frequency and keyword match
 */
export function retrieveRelevantChunks(query: string, topK: number = 4): KnowledgeChunk[] {
  const queryTokens = query.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);

  if (queryTokens.length === 0) {
    return JASIM_KNOWLEDGE_CHUNKS.slice(0, topK);
  }

  const scored = JASIM_KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;

    // Check keyword matches
    chunk.keywords.forEach((kw) => {
      queryTokens.forEach((token) => {
        if (kw === token) score += 3;
        else if (kw.includes(token) || token.includes(kw)) score += 1.5;
      });
    });

    // Check content matches
    const contentLower = chunk.content.toLowerCase();
    queryTokens.forEach((token) => {
      if (token.length > 2 && contentLower.includes(token)) {
        score += 1;
      }
    });

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Filter chunks with score > 0, fallback to default topK if no strong match
  const filtered = scored.filter((item) => item.score > 0).map((item) => item.chunk);

  if (filtered.length === 0) {
    return [JASIM_KNOWLEDGE_CHUNKS[0], JASIM_KNOWLEDGE_CHUNKS[1], JASIM_KNOWLEDGE_CHUNKS[5], JASIM_KNOWLEDGE_CHUNKS[11]];
  }

  return filtered.slice(0, topK);
}

/**
 * Constructs the system prompt dynamically with retrieved vectorless RAG context chunks
 */
export function getRAGSystemPrompt(retrievedChunks: KnowledgeChunk[]): string {
  const contextText = retrievedChunks.map((c) => `- ${c.content}`).join("\n\n");

  return `You are Jasim Ahmed's official AI Portfolio Assistant embedded in Jasim's portfolio website.

STRICT GUARDRAIL & SCOPE RULES:
1. You MUST ONLY answer questions related to Jasim Ahmed, his portfolio, background, technical skills, work experience, projects, and contact info.
2. IF THE USER ASKS ANYTHING UNRELATED TO JASIM AHMED OR HIS PORTFOLIO (such as general math, weather, sports, politics, or general coding homework unrelated to Jasim's work), YOU MUST POLITELY DECLINE BY SAYING:
   "I am Jasim Ahmed's AI Assistant, designed to answer questions about Jasim's professional background, skills, and projects. How can I help you regarding Jasim's work?"

RELEVANT KNOWLEDGE CONTEXT (RETRIEVED FOR THIS QUERY):
${contextText}

JASIM AHMED AT A GLANCE:
- Title: Full-Stack AI & Backend Software Developer (Dhaka, Bangladesh)
- Email: jasim.dev48@gmail.com | Phone: +8801794274148
- GitHub: https://github.com/jasimahmedq2 | LinkedIn: https://www.linkedin.com/in/jasim4148/

RESPONSE INSTRUCTIONS:
- Maintain a polite, professional, and technical tone aligned with Jasim's portfolio theme.
- Format responses using clean markdown formatting (bolding, bullet points) where appropriate.
- Communicate naturally and fluidly. DO NOT include repetitive links or forced buttons.
- ONLY IF the user explicitly asks how to view or navigate to a section on the website, append ONE of the following action tags at the very end of your response:
  - For About: [NAVIGATE: Explore About Section | #about]
  - For Experience: [NAVIGATE: View Work Experience | #jobs]
  - For Projects: [NAVIGATE: View Featured Projects | #projects]
  - For Education: [NAVIGATE: View Education Page | /education]
  - For Contact: [NAVIGATE: Go to Contact Section | #contact]
  - For Terminal: [NAVIGATE: Open Interactive Terminal | /terminal]`;
}

/**
 * Intelligent local fallback answer engine when no API token is configured
 */
export function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  // Guardrail check for local fallback
  const isOffTopic =
    !q.includes("jasim") &&
    !q.includes("who") &&
    !q.includes("about") &&
    !q.includes("skill") &&
    !q.includes("tech") &&
    !q.includes("stack") &&
    !q.includes("rag") &&
    !q.includes("ai") &&
    !q.includes("backend") &&
    !q.includes("exp") &&
    !q.includes("job") &&
    !q.includes("work") &&
    !q.includes("m360") &&
    !q.includes("project") &&
    !q.includes("contact") &&
    !q.includes("email") &&
    !q.includes("hire") &&
    !q.includes("phone") &&
    !q.includes("hello") &&
    !q.includes("hi") &&
    !q.includes("terminal");

  if (isOffTopic && q.length > 8) {
    return "I am Jasim Ahmed's AI Assistant, designed to answer questions about Jasim's professional background, skills, and projects. How can I help you regarding Jasim's work?";
  }

  const chunks = retrieveRelevantChunks(query, 2);
  const mainChunk = chunks[0];

  let reply = mainChunk.content;
  if (mainChunk.actionTag && (q.includes("where") || q.includes("navigate") || q.includes("see") || q.includes("show") || q.includes("go"))) {
    reply += `\n\n${mainChunk.actionTag}`;
  }

  return reply;
}
