import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/api';

const kebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

interface TagParams {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tags.add(kebabCase(tag)));
  });

  return Array.from(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagParams): Promise<Metadata> {
  return {
    title: `#${params.tag}`,
  };
}

export default async function TagPage({ params }: TagParams) {
  const posts = await getPosts();
  const tagPosts = posts.filter((post) =>
    post.frontmatter.tags?.some((t) => kebabCase(t) === params.tag)
  );

  return (
    <main className="max-w-[1000px] mx-auto min-h-screen px-[150px] py-[200px] max-[1080px]:px-[100px] max-[768px]:px-[50px] max-[768px]:py-[150px] max-[480px]:px-[25px] max-[480px]:py-[125px]">
      <span className="breadcrumb flex items-center mb-[50px] text-green">
        <span className="mr-[10px] pt-1">&larr;</span>
        <Link href="/pensieve/tags" className="inline-link font-mono text-sm font-semibold uppercase tracking-wider">
          View all tags
        </Link>
      </span>

      <header className="mb-[50px]">
        <h1 className="medium-heading">#{params.tag}</h1>
        <p className="subtitle">
          <Link href="/pensieve" className="inline-link">
            All memories
          </Link>
        </p>
      </header>

      <ul className="p-0 m-0 list-none">
        {tagPosts.map(({ frontmatter, slug }, i) => {
          const { title, date } = frontmatter;
          return (
            <li key={i} className="mb-5">
              <h2>
                <Link href={`/pensieve/${slug}`} className="hover:text-green text-lightest-slate text-xl font-semibold">
                  {title}
                </Link>
              </h2>
              <span className="text-light-slate font-mono text-xs">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
