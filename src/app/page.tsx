import React from 'react';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Jobs from '@/components/sections/jobs';
import Featured from '@/components/sections/featured';
import Projects from '@/components/sections/projects';
import Contact from '@/components/sections/contact';
import { getJobs, getFeaturedProjects, getProjects } from '@/lib/api';

export default async function HomePage() {
  const jobs = await getJobs();
  const featuredProjects = await getFeaturedProjects();
  const projects = await getProjects();

  return (
    <main className="fillHeight max-w-[1600px] mx-auto min-h-screen px-[150px] max-[1080px]:px-[100px] max-[768px]:px-[50px] max-[480px]:px-[25px]">
      <Hero />
      <About />
      <Jobs jobs={jobs} />
      <Featured projects={featuredProjects} />
      <Projects projects={projects} />
      <Contact />
    </main>
  );
}
