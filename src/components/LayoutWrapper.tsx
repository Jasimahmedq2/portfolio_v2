'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Nav from './nav';
import Social from './social';
import Email from './email';
import Footer from './footer';
import Loader from './loader';
import MouseSpotlight from './MouseSpotlight';
import TerminalModal from './terminal/TerminalModal';
import ChatbotWidget from './chat/ChatbotWidget';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }
  }, [isLoading]);

  return (
    <div id="root" className="min-h-screen grid grid-rows-[1fr_auto] grid-cols-[100%] relative">
      <MouseSpotlight />
      <a className="skip-to-content" href="#content">
        Skip to Content
      </a>

      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <ChatbotWidget />

      {isLoading && isHome ? (
        <Loader finishLoading={() => setIsLoading(false)} />
      ) : (
        <div className="flex flex-col min-h-screen relative z-10">
          <Nav isHome={isHome} onOpenTerminal={() => setIsTerminalOpen(true)} />
          <Social isHome={isHome} />
          <Email isHome={isHome} />

          <div id="content" className="w-full">
            {children}
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutWrapper;
