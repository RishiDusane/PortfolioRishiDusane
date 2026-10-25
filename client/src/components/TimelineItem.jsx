import { Card } from './ui.jsx';

export default function TimelineItem({ item }) {
  return (
    <div className="timeline-item">
      <span className="timeline-dot" aria-hidden="true" />
      <Card className="education-card">
        <div className="education-period">
          {item.start_label} — {item.end_label}
        </div>
        <h3>{item.degree}</h3>
        <p className="education-institution">{item.institution}</p>
        <div className="education-meta">
          <span>{item.location}</span>
          <span>{item.score}</span>
        </div>
      </Card>
    </div>
  );
}
