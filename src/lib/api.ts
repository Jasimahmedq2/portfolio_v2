import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Job, FeaturedProjectFrontmatter, ProjectFrontmatter, Project, Post, PostFrontmatter } from '@/types';

const contentDir = path.join(process.cwd(), 'content');

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  return result.toString();
}

export async function getJobs(): Promise<Job[]> {
  const jobsDir = path.join(contentDir, 'jobs');
  if (!fs.existsSync(jobsDir)) return [];

  const folders = fs.readdirSync(jobsDir);
  const jobs: Job[] = [];

  for (const folder of folders) {
    const filePath = path.join(jobsDir, folder, 'index.md');
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const parsedHtml = await markdownToHtml(content);

      jobs.push({
        frontmatter: {
          date: String(data.date || ''),
          title: String(data.title || ''),
          company: String(data.company || ''),
          location: String(data.location || ''),
          range: String(data.range || ''),
          url: String(data.url || ''),
        },
        html: parsedHtml,
      });
    }
  }

  // Sort jobs by date descending
  return jobs.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getFeaturedProjects(): Promise<{ frontmatter: FeaturedProjectFrontmatter; html: string }[]> {
  const featuredDir = path.join(contentDir, 'featured');
  if (!fs.existsSync(featuredDir)) return [];

  const folders = fs.readdirSync(featuredDir);
  const projects: { frontmatter: FeaturedProjectFrontmatter; html: string }[] = [];

  for (const folder of folders) {
    const filePath = path.join(featuredDir, folder, 'index.md');
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const parsedHtml = await markdownToHtml(content);

      let cover = data.cover;
      if (cover && cover.startsWith('./')) {
        cover = `/content/featured/${folder}/${cover.replace('./', '')}`;
      }

      projects.push({
        frontmatter: {
          date: String(data.date || ''),
          title: String(data.title || ''),
          cover,
          github: data.github ? String(data.github) : undefined,
          external: data.external ? String(data.external) : undefined,
          tech: Array.isArray(data.tech) ? data.tech : [],
          cta: data.cta ? String(data.cta) : undefined,
        },
        html: parsedHtml,
      });
    }
  }

  // Sort by date ascending (1, 2, 3...)
  return projects.sort((a, b) => Number(a.frontmatter.date) - Number(b.frontmatter.date));
}

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(contentDir, 'projects');
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir);
  const projects: Project[] = [];

  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(projectsDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const parsedHtml = await markdownToHtml(content);

      projects.push({
        frontmatter: {
          date: String(data.date || ''),
          title: String(data.title || ''),
          github: data.github ? String(data.github) : undefined,
          external: data.external ? String(data.external) : undefined,
          tech: Array.isArray(data.tech) ? data.tech : [],
          showInProjects: data.showInProjects !== false,
          cta: data.cta ? String(data.cta) : undefined,
        },
        html: parsedHtml,
        slug: file.replace('.md', ''),
      });
    }
  }

  // Sort by date descending
  return projects.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getPosts(): Promise<Post[]> {
  const postsDir = path.join(contentDir, 'posts');
  if (!fs.existsSync(postsDir)) return [];

  const folders = fs.readdirSync(postsDir);
  const posts: Post[] = [];

  for (const folder of folders) {
    const filePath = path.join(postsDir, folder, 'index.md');
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      if (data.draft) continue;

      const parsedHtml = await markdownToHtml(content);

      // Clean up slug if needed
      let slug = data.slug || `/pensieve/${folder}`;
      if (!slug.startsWith('/pensieve/')) {
        slug = `/pensieve/${slug.replace(/^\//, '')}`;
      }

      posts.push({
        frontmatter: {
          title: String(data.title || ''),
          description: data.description ? String(data.description) : undefined,
          date: String(data.date || ''),
          slug,
          tags: Array.isArray(data.tags) ? data.tags : [],
          draft: Boolean(data.draft),
        },
        html: parsedHtml,
        slug: folder,
      });
    }
  }

  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug || p.frontmatter.slug.endsWith(slug)) || null;
}
