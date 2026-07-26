import React from 'react';
import { socialMedia } from '@/config';
import Side from './side';
import Icon from './icons/icon';

interface SocialProps {
  isHome?: boolean;
}

const Social = ({ isHome }: SocialProps) => (
  <Side isHome={isHome} orientation="left">
    <ul className="flex flex-col items-center m-0 p-0 list-none after:content-[''] after:block after:w-[1px] after:h-[90px] after:mx-auto after:bg-light-slate">
      {socialMedia &&
        socialMedia.map(({ url, name }, i) => (
          <li key={i} className="last:mb-5">
            <a
              href={url}
              aria-label={name}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 inline-block hover:-translate-y-1 focus:-translate-y-1 transition-all duration-250 ease-easing hover:text-green focus:text-green"
            >
              <div className="w-5 h-5">
                <Icon name={name} />
              </div>
            </a>
          </li>
        ))}
    </ul>
  </Side>
);

export default Social;
