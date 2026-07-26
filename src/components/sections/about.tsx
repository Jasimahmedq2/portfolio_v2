'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    'Node.js & Express.js',
    'TypeScript & JavaScript',
    'PostgreSQL & MySQL',
    'MongoDB & Prisma / Knex.js',
    'RAG Systems & Vector DBs',
    'LangChain & LangGraph',
    'AI Agents & Automation',
    'Next.js & React.js',
    'Docker & Socket.io',
    'Redux & Tailwind CSS',
  ];

  return (
    <motion.section
      id="about"
      className="max-w-[900px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
    >
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner grid grid-cols-[3fr_2fr] gap-[50px] max-[768px]:block">
        <div className="text-slate">
          <div>
            <p>
              Hello! My name is Jasim Ahmed and I am a backend web developer with 2 years of professional
              experience, specializing in building robust, scalable server-side applications and AI-driven business solutions.
            </p>

            <p>
              My expertise centers around the modern JavaScript/TypeScript ecosystem, with a strong focus on{' '}
              <span className="text-green">Node.js</span> as my primary runtime. I design efficient server
              architectures, optimized data models, and secure RESTful APIs using tools like Express.js, SQL
              (PostgreSQL, MySQL with Prisma &amp; Knex.js), and NoSQL (MongoDB with Mongoose).
            </p>

            <p>
              Recently, I have been deeply engaged in <span className="text-green">end-to-end AI integration</span> —
              building Retrieval-Augmented Generation (RAG) systems, Vector Databases, LangChain, LangGraph, AI agents,
              and LLM-powered workflows to automate business processes and connect AI capabilities with real-world applications.
            </p>

            <p>
              On the frontend, I work with Next.js, React, Redux, and Tailwind CSS to craft clean, responsive interfaces.
              Currently, I am applying my skills as a backend developer at <span className="text-green">M360ict</span>.
            </p>

            <p>Here are a few key technologies and frameworks I work with regularly:</p>
          </div>

          <ul className="skills-list grid grid-cols-[repeat(2,minmax(140px,220px))] gap-x-2.5 p-0 mt-5 mb-0 overflow-hidden list-none">
            {skills &&
              skills.map((skill, i) => (
                <li
                  key={i}
                  className="relative mb-2.5 pl-5 font-mono text-xs before:content-['▹'] before:absolute before:left-0 before:text-green before:text-sm before:leading-[12px]"
                >
                  {skill}
                </li>
              ))}
          </ul>
        </div>

        <div className="relative max-w-[300px] max-[768px]:mt-[50px] max-[768px]:mx-auto max-[768px]:mb-0 max-[768px]:w-[70%] group">
          <div className="relative block w-full rounded bg-green shadow-[0_10px_30px_-15px_var(--navy-shadow)] transition-all duration-250 ease-easing group-hover:-translate-x-1 group-hover:-translate-y-1 before:content-[''] before:block before:absolute before:w-full before:h-full before:rounded before:top-0 before:left-0 before:bg-navy before:mix-blend-screen after:content-[''] after:block after:absolute after:w-full after:h-full after:rounded after:border-2 after:border-green after:top-3.5 after:left-3.5 after:-z-1 after:transition-all after:duration-250 after:ease-easing group-hover:after:translate-x-2 group-hover:after:translate-y-2">
            <div className="relative rounded mix-blend-multiply grayscale contrast-100 transition-all duration-250 ease-easing group-hover:filter-none group-hover:mix-blend-normal overflow-hidden">
              <Image
                src="/jasim_about_image.png"
                alt="Jasim Ahmed"
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
