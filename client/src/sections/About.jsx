import { Code2, Layers3, ShieldCheck } from 'lucide-react';
import { Card, Reveal, SectionHeading } from '../components/ui.jsx';

const strengths = [
  { icon: Code2, title: 'Full-stack craft', text: 'From clean interfaces to reliable APIs.' },
  {
    icon: ShieldCheck,
    title: 'Built with care',
    text: 'Security, testing, and maintainability matter.',
  },
  {
    icon: Layers3,
    title: 'Always learning',
    text: 'Curious about systems and better ways to build.',
  },
];

export default function About({ profile }) {
  return (
    <section id="about" className="page-section section-block">
      <SectionHeading eyebrow="01 / About" title="A little about me" />
      <div className="about-grid">
        <Reveal>
          <p className="about-copy">{profile.about}</p>
        </Reveal>
        <div className="strength-grid">
          {strengths.map(({ icon: Icon, title, text }, index) => (
            <Reveal delay={index * 0.08} key={title}>
              <Card className="strength-card">
                <span className="strength-icon">
                  <Icon size={19} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
