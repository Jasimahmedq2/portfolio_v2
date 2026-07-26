'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../icons/icon';
import { Project } from '@/types';

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const [showMore, setShowMore] = useState(false);

  const GRID_LIMIT = 6;
  const filteredProjects = projects.filter((p) => p.frontmatter.showInProjects !== false);
  const firstSix = filteredProjects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? filteredProjects : firstSix;

  return (
    <section className="flex flex-col items-center py-[100px] max-w-[1000px] mx-auto">
      <h2 className="text-clamp-heading font-semibold text-lightest-slate">Other Noteworthy Projects</h2>

      <Link href="/archive" className="inline-link font-mono text-sm mt-2 mb-[50px]">
        view the archive
      </Link>

      <ul className="projects-grid p-0 m-0 list-none grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[15px] relative w-full max-[1080px]:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        <AnimatePresence>
          {projectsToShow &&
            projectsToShow.map(({ frontmatter, html }, i) => {
              const { github, external, title, tech } = frontmatter;

              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i >= GRID_LIMIT ? (i - GRID_LIMIT) * 0.1 : 0 }}
                  className="relative cursor-default transition-all duration-250 ease-easing group"
                >
                  <div className="project-inner flex flex-col justify-between items-start relative h-full p-8 rounded bg-light-navy shadow-[0_10px_30px_-15px_var(--navy-shadow)] transition-all duration-250 ease-easing group-hover:-translate-y-[7px]">
                    <header className="w-full">
                      <div className="project-top flex justify-between items-center mb-[35px]">
                        <div className="folder text-green w-10 h-10">
                          <Icon name="Folder" />
                        </div>
                        <div className="project-links flex items-center -mr-2.5 text-light-slate">
                          {github && (
                            <a
                              href={github}
                              aria-label="GitHub Link"
                              target="_blank"
                              rel="noreferrer"
                              className="p-[5px_7px] hover:text-green"
                            >
                              <div className="w-5 h-5">
                                <Icon name="GitHub" />
                              </div>
                            </a>
                          )}
                          {external && (
                            <a
                              href={external}
                              aria-label="External Link"
                              target="_blank"
                              rel="noreferrer"
                              className="p-[5px_7px] hover:text-green"
                            >
                              <div className="w-[22px] h-[22px]">
                                <Icon name="External" />
                              </div>
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="project-title m-0 mb-2.5 text-lightest-slate text-xxl font-semibold">
                        <a href={external || github || '#'} target="_blank" rel="noreferrer" className="hover:text-green">
                          {title}
                        </a>
                      </h3>

                      <div
                        className="project-description text-light-slate text-[17px] [&_a]:inline-link"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </header>

                    <footer className="w-full">
                      {tech && (
                        <ul className="project-tech-list flex flex-wrap items-end flex-grow p-0 mt-5 mb-0 list-none">
                          {tech.map((t, idx) => (
                            <li key={idx} className="font-mono text-xxs leading-[1.75] mr-[15px] text-slate">
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </footer>
                  </div>
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>

      {filteredProjects.length > GRID_LIMIT && (
        <button className="small-button mt-[80px] mx-auto px-7 py-5" onClick={() => setShowMore(!showMore)}>
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}
    </section>
  );
};

export default Projects;
