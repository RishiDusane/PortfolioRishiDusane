import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';

export default function Footer({ profile }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <span className="eyebrow">Have something in mind?</span>
          <h2>
            Let&apos;s build something
            <br />
            thoughtful.
          </h2>
        </div>
        <a className="button button-primary" href={`mailto:${profile.email}`}>
          Get in touch <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="footer-bottom">
        <div className="footer-contact">
          <a href={`mailto:${profile.email}`}>
            <Mail size={15} /> {profile.email}
          </a>
          {profile.phone && (
            <a href={`tel:${profile.phone}`}>
              <Phone size={15} /> {profile.phone}
            </a>
          )}
        </div>
        <div className="footer-socials">
          <a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="GitHub">
            <SiGithub />
          </a>
          <a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
        <p>
          Built with React, Express and MySQL <span>© {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
}
