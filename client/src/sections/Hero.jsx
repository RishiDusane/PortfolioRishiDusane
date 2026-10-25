import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Mail } from 'lucide-react';
import { SiGithub, SiLeetcode } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/ui.jsx';
import ResumeDownload from '../components/ResumeDownload.jsx';

const roles = ['Software Engineer', 'MERN Stack Developer', 'Spring Boot Developer'];

function useTypingRole() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return reduceMotion ? roles[0] : roles[roleIndex];
}

export default function Hero({ profile }) {
  const role = useTypingRole();
  const socials = [
    { label: 'GitHub', href: profile.github_url, icon: <SiGithub /> },
    { label: 'LinkedIn', href: profile.linkedin_url, icon: <FaLinkedinIn /> },
    { label: 'LeetCode', href: profile.leetcode_url, icon: <SiLeetcode /> },
    { label: 'Email', href: `mailto:${profile.email}`, icon: <Mail size={17} /> },
  ];

  return (
    <section id="home" className="hero-section page-section">
      <div className="hero-glow" aria-hidden="true" />
      <Reveal className="hero-copy">
        <span className="eyebrow">
          <span className="status-dot" /> Available for opportunities
        </span>
        <p className="hero-intro">Hi, I&apos;m</p>
        <h1>
          {profile.full_name}
          <span>.</span>
        </h1>
        <p className="hero-role">
          <span className="role-prefix">&gt;</span> {role}
          <span className="typing-caret" aria-hidden="true" />
        </p>
        <p className="hero-tagline">{profile.tagline}</p>
        <p className="hero-description">{profile.intro}</p>
        <div className="hero-actions">
          <a className="button button-outline" href="#projects">
            View Projects <ArrowUpRight size={17} />
          </a>
          <ResumeDownload className="button button-primary">
            <Download size={16} /> Download Resume
          </ResumeDownload>
        </div>
        <div className="social-links" aria-label="Social links">
          {socials.map(({ label, href, icon }) => (
            <a
              className="icon-link"
              key={label}
              href={href}
              aria-label={label}
              target={label === 'Email' ? undefined : '_blank'}
              rel={label === 'Email' ? undefined : 'noreferrer'}
            >
              {icon}
            </a>
          ))}
        </div>
      </Reveal>
      <a className="scroll-cue" href="#about">
        <span>Scroll to explore</span> <ArrowDown size={15} />
      </a>
      <p className="hero-side-note" aria-hidden="true">
        BUILD · LEARN · REPEAT
      </p>
    </section>
  );
}
