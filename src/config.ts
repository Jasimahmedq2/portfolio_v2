import { SocialMediaItem, NavLink } from '@/types';

export const email = 'jasim.dev48@gmail.com';
export const phone = '+8801794274148';

export const socialMedia: SocialMediaItem[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/jasimahmedq2',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/jasim4148/',
  },
];

export const navLinks: NavLink[] = [
  {
    name: 'About',
    url: '/#about',
  },
  {
    name: 'Experience',
    url: '/#jobs',
  },
  {
    name: 'Work',
    url: '/#projects',
  },
  {
    name: 'Education',
    url: '/education',
  },
  {
    name: 'Contact',
    url: '/#contact',
  },
  {
    name: 'Terminal',
    url: '/terminal',
  },
];

export const colors = {
  green: '#64ffda',
  navy: '#0a192f',
  darkNavy: '#020c1b',
};

const config = {
  email,
  phone,
  socialMedia,
  navLinks,
  colors,
};

export default config;
