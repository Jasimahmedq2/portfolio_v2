'use client';

import React from 'react';
import Icon from './icons/icon';
import { socialMedia } from '@/config';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center min-h-[70px] p-[15px] text-center">
      <div className="hidden max-[768px]:block w-full max-w-[270px] mx-auto mb-[10px] text-light-slate">
        <ul className="flex items-center justify-between p-0 m-0 list-none">
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name} target="_blank" rel="noreferrer" className="p-2.5 inline-block hover:text-green focus:text-green">
                  <div className="w-5 h-5">
                    <Icon name={name} />
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>

      <div className="text-light-slate font-mono text-xxs leading-none" tabIndex={-1}>
        <a
          href="https://github.com/jasimahmedq2"
          target="_blank"
          rel="noreferrer"
          className="p-2.5 inline-block hover:text-green focus:text-green"
        >
          <div>Designed &amp; Built by Jasim Ahmed</div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
