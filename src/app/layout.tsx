import type { Metadata } from 'next';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://jasimahmedq2.github.io'),
  title: {
    default: 'Jasim Ahmed | Backend Web Developer & AI Integration Specialist',
    template: '%s | Jasim Ahmed',
  },
  description:
    'Jasim Ahmed is a backend-focused full-stack software developer with 2 years of experience specializing in Node.js, TypeScript, SQL/NoSQL databases, RAG systems, Vector DBs, AI agents, and scalable web applications.',
  openGraph: {
    title: 'Jasim Ahmed | Backend Web Developer & AI Integration Specialist',
    description:
      'Backend Web Developer specializing in Node.js, TypeScript, SQL, Docker, RAG systems, Vector Databases, LangChain, and scalable web applications.',
    siteName: 'Jasim Ahmed Portfolio',
    images: [
      {
        url: '/jasim_logo.png',
        width: 500,
        height: 500,
        alt: 'Jasim Ahmed Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasim Ahmed | Backend Web Developer',
    description:
      'Backend Web Developer specializing in Node.js, TypeScript, SQL, Docker, RAG systems, Vector Databases, and AI Agents.',
    images: ['/jasim_logo.png'],
  },
  icons: {
    icon: '/jasim_logo.png',
    shortcut: '/jasim_logo.png',
    apple: '/jasim_logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-navy text-slate font-sans antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
