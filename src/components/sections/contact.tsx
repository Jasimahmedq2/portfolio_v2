'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { email, phone } from '@/config';

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="max-w-[600px] mx-auto mb-[10px] text-center max-[768px]:mb-[50px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
    >
      <h2 className="numbered-heading overline justify-center mb-5 text-green font-mono text-md font-normal before:bottom-0 before:text-sm after:hidden">
        What’s Next?
      </h2>

      <h2 className="title text-clamp-heading font-semibold text-lightest-slate mb-5">Get In Touch</h2>

      <p className="text-slate">
        Whether you have a project in mind, an AI integration requirement, backend architecture challenge, or just want to connect — my inbox and phone line are always open!
      </p>

      <div className="mt-8 flex flex-col items-center space-y-3 font-mono text-sm text-light-slate">
        <p>
          Email: <a href={`mailto:${email}`} className="text-green hover:underline">{email}</a>
        </p>
        <p>
          Phone: <a href={`tel:${phone}`} className="text-green hover:underline">{phone}</a>
        </p>
        <p>
          LinkedIn: <a href="https://www.linkedin.com/in/jasim4148/" target="_blank" rel="noreferrer" className="text-green hover:underline">linkedin.com/in/jasim4148</a>
        </p>
      </div>

      <div className="mt-[50px]">
        <a className="email-link" href={`mailto:${email}`}>
          Say Hello
        </a>
      </div>
    </motion.section>
  );
};

export default Contact;
