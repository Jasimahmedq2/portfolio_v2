export interface SocialMediaItem {
  name: string;
  url: string;
}

export interface NavLink {
  name: string;
  url: string;
}

export interface JobFrontmatter {
  date: string;
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
}

export interface Job {
  frontmatter: JobFrontmatter;
  html: string;
}

export interface ProjectFrontmatter {
  date: string;
  title: string;
  cover?: string;
  github?: string;
  external?: string;
  tech: string[];
  showInProjects?: boolean;
  cta?: string;
  ios?: string;
  android?: string;
  company?: string;
}

export interface FeaturedProjectFrontmatter {
  date: string;
  title: string;
  cover?: string;
  github?: string;
  external?: string;
  tech: string[];
  cta?: string;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  html: string;
  slug?: string;
}

export interface PostFrontmatter {
  title: string;
  description?: string;
  date: string;
  slug: string;
  tags?: string[];
  draft?: boolean;
}

export interface Post {
  frontmatter: PostFrontmatter;
  html: string;
  slug: string;
}

export interface IconProps {
  className?: string;
}
