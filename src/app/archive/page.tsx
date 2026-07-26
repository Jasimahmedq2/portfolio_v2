import React from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/api';
import Icon from '@/components/icons/icon';

export const metadata: Metadata = {
  title: 'Archive',
};

export default async function ArchivePage() {
  const projects = await getProjects();

  return (
    <main className="max-w-[1600px] mx-auto min-h-screen px-[150px] py-[200px] max-[1080px]:px-[100px] max-[768px]:px-[50px] max-[768px]:py-[150px] max-[480px]:px-[25px] max-[480px]:py-[125px]">
      <header>
        <h1 className="big-heading">Archive</h1>
        <p className="subtitle">A big list of things I’ve worked on</p>
      </header>

      <div className="my-[100px] -mx-[20px] max-[768px]:my-[50px] max-[768px]:-mx-[10px] overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-light-slate font-mono text-sm">
              <th className="p-[10px] pl-[20px] max-[768px]:pl-[10px]">Year</th>
              <th className="p-[10px]">Title</th>
              <th className="p-[10px] max-[768px]:hidden">Made at</th>
              <th className="p-[10px] max-[768px]:hidden">Built with</th>
              <th className="p-[10px] pr-[20px] max-[768px]:pr-[10px]">Link</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 &&
              projects.map(({ frontmatter }, i) => {
                const { date, github, external, ios, android, title, tech, company } = frontmatter as any;
                const year = date ? new Date(date).getFullYear() : '—';

                return (
                  <tr key={i} className="hover:bg-light-navy focus:bg-light-navy transition-all duration-250 ease-easing">
                    <td className="overline text-green font-mono text-md p-[10px] pl-[20px] pr-[20px] max-[768px]:pl-[10px] max-[768px]:pr-[10px] max-[768px]:text-sm rounded-l">
                      {year}
                    </td>

                    <td className="pt-[15px] p-[10px] pr-[20px] text-lightest-slate text-xl font-semibold leading-snug">
                      {title}
                    </td>

                    <td className="p-[10px] text-lg whitespace-nowrap max-[768px]:hidden">
                      {company ? <span className="text-light-slate">{company}</span> : <span className="text-slate">—</span>}
                    </td>

                    <td className="p-[10px] text-xxs font-mono leading-normal max-[768px]:hidden">
                      {tech && tech.length > 0
                        ? tech.map((item: string, idx: number) => (
                            <span key={idx} className="inline-block text-slate">
                              {item}
                              {idx !== tech.length - 1 && <span className="mx-[5px] text-slate">&middot;</span>}
                            </span>
                          ))
                        : '—'}
                    </td>

                    <td className="p-[10px] pr-[20px] max-[768px]:pr-[10px] min-w-[100px] rounded-r">
                      <div className="flex items-center space-x-2.5">
                        {external && (
                          <a href={external} aria-label="External Link" target="_blank" rel="noreferrer" className="hover:text-green">
                            <div className="w-5 h-5">
                              <Icon name="External" />
                            </div>
                          </a>
                        )}
                        {github && (
                          <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer" className="hover:text-green">
                            <div className="w-5 h-5">
                              <Icon name="GitHub" />
                            </div>
                          </a>
                        )}
                        {ios && (
                          <a href={ios} aria-label="Apple App Store Link" target="_blank" rel="noreferrer" className="hover:text-green">
                            <div className="w-5 h-5">
                              <Icon name="AppStore" />
                            </div>
                          </a>
                        )}
                        {android && (
                          <a href={android} aria-label="Google Play Store Link" target="_blank" rel="noreferrer" className="hover:text-green">
                            <div className="w-5 h-5">
                              <Icon name="PlayStore" />
                            </div>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
