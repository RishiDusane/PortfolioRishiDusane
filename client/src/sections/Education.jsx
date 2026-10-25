import TimelineItem from '../components/TimelineItem.jsx';
import { Reveal, SectionHeading } from '../components/ui.jsx';

export default function Education({ education }) {
  return (
    <section id="education" className="page-section section-block">
      <SectionHeading eyebrow="04 / Education" title="Learning, always" />
      <div className="timeline">
        {education.map((item, index) => (
          <Reveal delay={index * 0.08} key={item.id}>
            <TimelineItem item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
