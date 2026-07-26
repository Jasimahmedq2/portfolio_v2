import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/api';
import IconBookmark from '@/components/icons/bookmark';

export const metadata: Metadata = {
  title: 'Pensieve',
};

const kebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default async function PensievePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-[1600px] mx-auto min-h-screen px-[150px] py-[200px] max-[1080px]:px-[100px] max-[768px]:px-[50px] max-[768px]:py-[150px] max-[480px]:px-[25px] max-[480px]:py-[125px]">
      <header className="mb-[100px] text-center">
        <h1 className="big-heading">Pensieve</h1>
        <p className="subtitle">
          <a
            href="https://www.wizardingworld.com/writing-by-jk-rowling/pensieve"
            target="_blank"
            rel="noreferrer"
            className="inline-link"
          >
            a collection of memories
          </a>
        </p>
      </header>

      <ul className="p-0 m-0 list-none grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[15px] relative mt-[50px] max-[1080px]:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {posts.length > 0 &&
          posts.map(({ frontmatter, slug }, i) => {
            const { title, description, date, tags } = frontmatter;
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <li key={i} className="transition-all duration-250 ease-easing cursor-default group">
                <div className="flex flex-col justify-between items-start relative h-full p-8 rounded bg-light-navy shadow-[0_10px_30px_-15px_var(--navy-shadow)] transition-all duration-250 ease-easing group-hover:-translate-y-[7px]">
                  <header className="w-full">
                    <div className="flex justify-between items-center text-green mb-[30px] -ml-[5px]">
                      <div className="w-10 h-10">
                        <IconBookmark />
                      </div>
                    </div>
                    <h5 className="m-0 mb-2.5 text-lightest-slate text-xxl font-semibold">
                      <Link href={`/pensieve/${slug}`} className="hover:text-green">
                        {title}
                      </Link>
                    </h5>
                    <p className="text-light-slate text-[17px]">{description}</p>
                  </header>

                  <footer className="flex justify-between items-center w-full mt-5">
                    <span className="text-light-slate font-mono text-xxs uppercase">{formattedDate}</span>
                    <ul className="flex items-center flex-wrap p-0 m-0 list-none">
                      {tags &&
                        tags.map((tag, idx) => (
                          <li key={idx} className="text-green font-mono text-xxs leading-[1.75] mr-[15px] last:mr-0">
                            <Link href={`/pensieve/tags/${kebabCase(tag)}`} className="inline-link">
                              #{tag}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </footer>
                </div>
              </li>
            );
          })}
      </ul>
    </main>
  );
}
