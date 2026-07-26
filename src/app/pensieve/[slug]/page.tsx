import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug } from '@/lib/api';

const kebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

interface PostParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function PostPage({ params }: PostParams) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter, html } = post;
  const { title, date, tags } = frontmatter;

  return (
    <main className="max-w-[1000px] mx-auto min-h-screen px-[150px] py-[200px] max-[1080px]:px-[100px] max-[768px]:px-[50px] max-[768px]:py-[150px] max-[480px]:px-[25px] max-[480px]:py-[125px]">
      <span className="breadcrumb flex items-center mb-[50px] text-green">
        <span className="mr-[10px] pt-1">&larr;</span>
        <Link href="/pensieve" className="inline-link font-mono text-sm font-semibold uppercase tracking-wider">
          All memories
        </Link>
      </span>

      <header className="mb-[50px]">
        <h1 className="medium-heading">{title}</h1>
        <p className="subtitle">
          <time>
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>&nbsp;&mdash;&nbsp;</span>
          {tags &&
            tags.length > 0 &&
            tags.map((tag, i) => (
              <Link key={i} href={`/pensieve/tags/${kebabCase(tag)}`} className="inline-link mr-2.5">
                #{tag}
              </Link>
            ))}
        </p>
      </header>

      <div
        className="mb-[100px] text-slate [&_h1]:mt-[2em] [&_h1]:mb-[1em] [&_h2]:mt-[2em] [&_h2]:mb-[1em] [&_h3]:mt-[2em] [&_h3]:mb-[1em] [&_p]:my-[1em] [&_p]:leading-[1.5] [&_p]:text-light-slate [&_a]:inline-link [&_code]:bg-lightest-navy [&_code]:text-lightest-slate [&_code]:rounded [&_code]:text-sm [&_code]:p-[0.2em_0.4em] [&_pre_code]:bg-transparent [&_pre_code]:p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
