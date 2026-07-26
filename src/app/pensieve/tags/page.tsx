import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Tags',
};

const kebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default async function TagsPage() {
  const posts = await getPosts();
  const tagCounts: { [key: string]: number } = {};

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.keys(tagCounts).sort((a, b) => a.localeCompare(b));

  return (
    <main className="max-w-[1000px] mx-auto min-h-screen px-[150px] py-[200px] max-[1080px]:px-[100px] max-[768px]:px-[50px] max-[768px]:py-[150px] max-[480px]:px-[25px] max-[480px]:py-[125px]">
      <span className="breadcrumb flex items-center mb-[50px] text-green">
        <span className="mr-[10px] pt-1">&larr;</span>
        <Link href="/pensieve" className="inline-link font-mono text-sm font-semibold uppercase tracking-wider">
          All memories
        </Link>
      </span>

      <header className="mb-[50px]">
        <h1 className="medium-heading">Tags</h1>
      </header>

      <ul className="p-0 m-0 list-none flex flex-wrap font-mono text-lg">
        {sortedTags.map((tag, i) => (
          <li key={i} className="mr-5 mb-[10px]">
            <Link href={`/pensieve/tags/${kebabCase(tag)}`} className="inline-link">
              #{tag} <span className="text-light-slate">({tagCounts[tag]})</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
