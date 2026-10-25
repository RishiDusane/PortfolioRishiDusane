import { ArrowUpRight, Lightbulb, Trophy } from 'lucide-react';
import { Card, Reveal, SectionHeading } from '../components/ui.jsx';

const icons = [Trophy, Lightbulb];

export default function Achievements({ achievements }) {
  return (
    <section id="achievements" className="page-section section-block">
      <SectionHeading eyebrow="05 / Milestones" title="A couple of highlights" />
      <div className="achievement-grid">
        {achievements.map((achievement, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal key={achievement.id} delay={index * 0.1}>
              <Card className="achievement-card">
                <span className="achievement-icon">
                  <Icon size={21} />
                </span>
                <span className="achievement-index">0{index + 1}</span>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <ArrowUpRight className="achievement-arrow" size={18} aria-hidden="true" />
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
