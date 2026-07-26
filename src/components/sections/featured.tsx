'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icon from '../icons/icon';
import { FeaturedProjectFrontmatter } from '@/types';

interface FeaturedProps {
  projects: {
    frontmatter: FeaturedProjectFrontmatter;
    html: string;
  }[];
}

const Featured = ({ projects }: FeaturedProps) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="max-w-[1000px] mx-auto py-[100px]">
      <motion.h2
        className="numbered-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Some Things I’ve Built
      </motion.h2>

      <ul className="p-0 m-0 list-none">
        {projects.map(({ frontmatter, html }, i) => {
          const { external, title, tech, github, cover, cta } = frontmatter;
          const isOdd = i % 2 === 1;

          return (
            <motion.li
              key={i}
              className={`relative grid grid-cols-12 gap-[10px] items-center mb-[100px] max-[768px]:mb-[70px] max-[480px]:mb-[30px] last:mb-0`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className={`project-content relative z-5 row-start-1 ${
                  isOdd
                    ? 'col-start-7 col-end-13 text-right max-[1080px]:col-start-5 max-[768px]:col-span-full max-[768px]:text-left max-[768px]:p-[40px_40px_30px]'
                    : 'col-start-1 col-end-7 max-[1080px]:col-start-1 max-[1080px]:col-end-9 max-[768px]:col-span-full max-[768px]:p-[40px_40px_30px]'
                }`}
              >
                <div>
                  <p className="project-overline my-[10px] text-green font-mono text-xs font-normal">
                    Featured Project
                  </p>

                  <h3 className="project-title text-lightest-slate text-clamp-heading mb-5 max-[768px]:text-white">
                    <a href={external || github || '#'} target="_blank" rel="noreferrer" className="hover:text-green">
                      {title}
                    </a>
                  </h3>

                  <div
                    className="project-description relative z-2 p-[25px] rounded bg-light-navy text-light-slate text-lg shadow-[0_10px_30px_-15px_var(--navy-shadow)] max-[768px]:p-0 max-[768px]:bg-transparent max-[768px]:shadow-none [&_a]:inline-link"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />

                  {tech && tech.length > 0 && (
                    <ul
                      className={`project-tech-list flex flex-wrap relative z-2 my-[25px] mx-0 p-0 list-none max-[768px]:my-2.5 ${
                        isOdd ? 'justify-end max-[768px]:justify-start' : 'justify-start'
                      }`}
                    >
                      {tech.map((t: string, idx: number) => (
                        <li
                          key={idx}
                          className={`font-mono text-xs text-light-slate whitespace-nowrap max-[768px]:text-lightest-slate ${
                            isOdd ? 'ml-5 mb-[5px] max-[768px]:ml-0 max-[768px]:mr-[10px]' : 'mr-5 mb-[5px]'
                          }`}
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div
                    className={`project-links flex items-center relative mt-[10px] text-lightest-slate ${
                      isOdd ? 'justify-end -mr-[10px] max-[768px]:justify-start max-[768px]:-ml-[10px] max-[768px]:mr-0' : '-ml-[10px]'
                    }`}
                  >
                    {cta && (
                      <a href={cta} aria-label="Course Link" className="small-button m-[10px]" target="_blank" rel="noreferrer">
                        Learn More
                      </a>
                    )}
                    {github && (
                      <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer" className="p-[10px] hover:text-green">
                        <div className="w-5 h-5">
                          <Icon name="GitHub" />
                        </div>
                      </a>
                    )}
                    {external && !cta && (
                      <a href={external} aria-label="External Link" target="_blank" rel="noreferrer" className="p-[10px] hover:text-green">
                        <div className="w-[22px] h-[22px]">
                          <Icon name="External" />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`project-image relative z-1 row-start-1 rounded shadow-[0_10px_30px_-15px_var(--navy-shadow)] max-[768px]:col-span-full max-[768px]:h-full max-[768px]:opacity-25 ${
                  isOdd ? 'col-start-1 col-end-8 max-[768px]:col-span-full' : 'col-start-6 col-end-13 max-[768px]:col-span-full'
                }`}
              >
                <a
                  href={external ? external : github ? github : '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-full block bg-green rounded group relative overflow-hidden"
                >
                  <div className="absolute inset-0 z-3 transition-all duration-250 ease-easing bg-navy mix-blend-screen group-hover:bg-transparent group-hover:opacity-0" />
                  {cover && (
                    <Image
                      src={cover}
                      alt={title}
                      width={700}
                      height={437}
                      className="w-full h-auto object-cover rounded mix-blend-multiply grayscale contrast-100 brightness-90 group-hover:filter-none group-hover:mix-blend-normal transition-all duration-250 ease-easing"
                    />
                  )}
                </a>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
};

export default Featured;
