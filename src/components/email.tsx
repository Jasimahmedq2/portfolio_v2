import React from 'react';
import { email } from '@/config';
import Side from './side';

interface EmailProps {
  isHome?: boolean;
}

const Email = ({ isHome }: EmailProps) => (
  <Side isHome={isHome} orientation="right">
    <div className="flex flex-col items-center relative after:content-[''] after:block after:w-[1px] after:h-[90px] after:mx-auto after:bg-light-slate">
      <a
        href={`mailto:${email}`}
        className="my-5 p-2.5 font-mono text-xxs leading-lg tracking-widest [writing-mode:vertical-rl] hover:-translate-y-1 focus:-translate-y-1 transition-all duration-250 ease-easing hover:text-green focus:text-green"
      >
        {email}
      </a>
    </div>
  </Side>
);

export default Email;
