import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ResumeDownload from './ResumeDownload.jsx';

const links = [
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Education', 'education'],
  ['Achievements', 'achievements'],
];

export default function Navbar({ resumePath }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#home" aria-label="Rishi Dusane home">
          RD<span>.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div className={`nav-content${menuOpen ? ' is-open' : ''}`}>
          <div className="nav-links">
            {links.map(([label, target]) => (
              <a key={target} href={`#${target}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>
          <ResumeDownload className="button button-small button-outline" resumePath={resumePath}>
            Download Resume <span aria-hidden="true">↗</span>
          </ResumeDownload>
        </div>
      </nav>
    </header>
  );
}
