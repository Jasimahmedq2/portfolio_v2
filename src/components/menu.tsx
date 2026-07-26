'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { navLinks } from '@/config';
import { KEY_CODES } from '@/utils';
import { useOnClickOutside } from '@/hooks';

interface MenuProps {
  onOpenTerminal?: () => void;
}

const Menu = ({ onOpenTerminal }: MenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.classList.add('blur');
    } else {
      document.body.classList.remove('blur');
    }
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef as React.RefObject<HTMLElement>, () => {
    if (menuOpen) {
      setMenuOpen(false);
      document.body.classList.remove('blur');
    }
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === KEY_CODES.ESCAPE || e.key === KEY_CODES.ESCAPE_IE11) {
      setMenuOpen(false);
      document.body.classList.remove('blur');
    }
  };

  const onResize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(false);
      document.body.classList.remove('blur');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="hidden max-[768px]:block">
      <div ref={wrapperRef}>
        <button
          onClick={toggleMenu}
          ref={buttonRef}
          aria-label="Menu"
          className="relative z-[10] -mr-[15px] p-[15px] border-0 bg-transparent text-inherit flex items-center justify-center cursor-pointer"
        >
          <div className="inline-block relative w-[30px] h-[24px]">
            <div
              className={`absolute top-1/2 right-0 w-[30px] h-[2px] rounded bg-green transition-transform duration-220 ${
                menuOpen ? 'rotate-[225deg] delay-120' : 'rotate-0 delay-0'
              } before:content-[''] before:block before:absolute before:right-0 before:h-[2px] before:rounded before:bg-green before:transition-all ${
                menuOpen
                  ? 'before:w-full before:top-0 before:opacity-0'
                  : 'before:w-[120%] before:-top-[10px] before:opacity-100'
              } after:content-[''] after:block after:absolute after:right-0 after:h-[2px] after:rounded after:bg-green after:transition-all ${
                menuOpen
                  ? 'after:w-full after:bottom-0 after:-rotate-90'
                  : 'after:w-[80%] after:-bottom-[10px] after:rotate-0'
              }`}
            />
          </div>
        </button>

        <aside
          aria-hidden={!menuOpen}
          tabIndex={menuOpen ? 1 : -1}
          className={`fixed top-0 bottom-0 right-0 py-[50px] px-[10px] w-[min(75vw,400px)] h-screen outline-0 bg-light-navy shadow-[-10px_0px_30px_-15px_var(--navy-shadow)] z-[9] flex items-center justify-center transition-all duration-250 ease-easing ${
            menuOpen ? 'translate-x-0 visible' : 'translate-x-full invisible'
          }`}
        >
          <nav ref={navRef} className="flex flex-col items-center justify-between w-full text-lightest-slate font-mono text-center">
            {navLinks && (
              <ol className="p-0 m-0 list-none w-full [counter-reset:item_0]">
                {navLinks.map(({ url, name }, i) => (
                  <li key={i} className="relative my-0 mx-auto mb-5 max-[600px]:mb-2.5 [counter-increment:item_1] text-clamp-sm">
                    <span className="block mb-[5px] text-green text-xs before:content-['▸']" />
                    <Link
                      href={url}
                      onClick={(e) => {
                        setMenuOpen(false);
                        document.body.classList.remove('blur');
                        if (name === 'Terminal' && onOpenTerminal) {
                          e.preventDefault();
                          onOpenTerminal();
                        }
                      }}
                      className="p-3 inline-block hover:text-green focus:text-green"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ol>
            )}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="email-link mt-[10%] px-[50px] py-[18px] w-max text-sm"
            >
              Resume
            </a>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Menu;
