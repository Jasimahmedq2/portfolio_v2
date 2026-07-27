# Portfolio V2 Project Submission Report

## Project Links
- **Live Demo:** https://www.jasimdev.me/
- **GitHub Repository:** https://github.com/Jasimahmedq2/portfolio_v2

> **Note for Evaluation:**  
> I have submitted this project for my HTML assignment and added the public GitHub repository link above so that ma'am can easily inspect all the source code. Because this is a large, production-level project, all the code cannot be shared through simple screenshots. Each feature spans across multiple modular files to maintain a professional code structure and pattern. Since Next.js uses JSX to render standard HTML elements, all source code and semantic markup are fully visible in the GitHub repository and live domain link.

---

## Technologies and Tools Used

### Core Markup & UI Structure
- **HTML5 (via JSX in Next.js):** Standard semantic HTML markup written inside React JSX (`.tsx`) files. JSX compiles down to native HTML elements (`<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<a>`, `<button>`, `<input>`) in the browser.
- **Next.js 14 (App Router):** Renders HTML on the server and client while routing pages dynamically.
- **React 18:** Manages interactive component UI and state inside JSX templates.
- **TypeScript:** Adds type safety to HTML component props, API data, and state objects.
- **Node.js:** Runs the build tools and backend API handling.

### Styling & Animation
- **Tailwind CSS:** Handles layout, spacing, typography, and responsive styling directly on HTML tags.
- **Custom CSS:** Used for global styles, CSS custom variables, custom scrollbars, and background glows.
- **Framer Motion:** Adds smooth entrance animations and visual transitions to HTML elements.

### AI & Data Processing
- **DeepSeek-V3 via DeepInfra / OpenAI SDK:** Powers the interactive AI chatbot assistant.
- **Custom RAG Engine:** Searches local data files to answer visitor questions accurately.
- **Gray-Matter & Remark:** Converts Markdown text into structured HTML content for project showcase pages and blog posts.

### Development Tools
- **Git & GitHub:** Code repository management and version control.
- **ESLint & Prettier:** Ensures clean, standard code formatting.
- **Vercel / Custom Domain:** Hosts the live web application on `jasimdev.me`.

---

## Detailed Breakdown of Features

### 1. HTML5 Semantic Layout and Component Architecture
- **What it does:** Forms the structural foundation of the entire portfolio using clean, accessible HTML tags inside Next.js components.
- **How I built it:** Instead of using plain `<div>` containers everywhere, I used semantic HTML tags like `<main>` for the core container, `<header>` and `<nav>` for navigation, `<section>` for page sections (About, Experience, Projects, Contact), and `<footer>` for footer details. Using JSX allowed me to combine standard HTML tags with React state while keeping the rendered page readable for browsers and screen readers.

### 2. Interactive AI Chatbot Assistant
- **What it does:** An embedded chat widget at the bottom corner of the site where visitors can ask questions about my background, skills, and projects.
- **How I built it:** Created an API route at `/api/chat` using Next.js and the OpenAI SDK linked to DeepSeek-V3. When a user enters a question into an HTML `<input>` field, a custom RAG helper searches local knowledge chunks in `knowledge.ts` and passes relevant text to the AI model so the response stays accurate.
- **Fallback handling:** If the AI service is offline, the widget catches the error and returns a local fallback answer without crashing the UI.

### 3. Command-Line Interactive Terminal
- **What it does:** An interactive developer terminal where users can type commands to explore my portfolio. Available as a pop-up modal and a full page at `/terminal`.
- **How I built it:** Built using a React state manager in `src/components/terminal/index.tsx`. It captures user keystrokes in an HTML `<input>` element and outputs terminal text inside HTML `<pre>` and `<code>` elements. It supports commands like `help`, `about`, `skills`, `projects`, `contact`, `clear`, and `project <id>`.
- **Interactive features:** Supports Up/Down arrow command history, quick command buttons, audio feedback, and closing with the `ESC` key.

### 4. Dynamic Markdown to HTML Content Engine
- **What it does:** Renders job experiences, featured projects, general project cards, and blog posts directly on the site.
- **How I built it:** Stored content in Markdown files (`.md`) inside the `content/` folder. I wrote functions in `src/lib/api.ts` using `gray-matter` to extract metadata and `remark` to transform raw Markdown into clean HTML markup rendered directly on the page.

### 5. Canvas Mouse Glow and Visual Effects
- **What it does:** Adds a subtle lighting effect that follows mouse movement across the page layout.
- **How I built it:** Created a `MouseSpotlight` component that updates CSS positioning based on mouse coordinates. It applies radial CSS gradients onto the HTML wrapper element without slowing down DOM performance.

### 6. Experience Section with Interactive Tabs
- **What it does:** Displays my work history with interactive tab buttons to switch between past roles and responsibilities.
- **How I built it:** Built in `jobs.tsx` using HTML `<button>` tabs and Framer Motion. Clicking a tab updates component state and smoothly slides the active indicator to show the selected role details.

### 7. Featured Projects and Archive Showcase
- **What it does:** Highlights main projects with visual cards, links, and tags, alongside an `/archive` page listing all projects in a clean table view.
- **How I built it:** Server components fetch project data during load. Main sections (`featured.tsx` and `projects.tsx`) use semantic HTML `<article>` cards with link tags (`<a>`), while `/archive` uses an HTML `<table>` layout with sortable rows.

### 8. Dedicated Education and Article Pages
- **What it does:** `/education` presents degree information, academic focus, and coursework. `/pensieve` lists technical articles and blog posts.
- **How I built it:** Created using Next.js App Router subdirectories (`/education` and `/pensieve`), rendering structured JSX templates with semantic HTML headings (`<h1>`, `<h2>`) and paragraph elements.

### 9. Responsive Navigation and Accessibility Layout
- **What it does:** Provides a sticky navigation bar, slide-out mobile menu, social link sidebars, an email sidebar, and an animated loader screen.
- **How I built it:** Managed inside `LayoutWrapper.tsx`. It includes accessible HTML attributes, a "Skip to content" link for keyboard navigation, and focus management across popup modals.

