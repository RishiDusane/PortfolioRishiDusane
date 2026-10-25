import { ArrowUpRight, Github } from 'lucide-react';
import { Badge, Card } from './ui.jsx';

export default function ProjectCard({ project }) {
  return (
    <Card className="project-card">
      <div className="project-topline">
        <Badge>{project.badge}</Badge>
        <a
          className="icon-link project-github"
          href={project.github_url}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} on GitHub`}
        >
          <Github size={19} />
        </a>
      </div>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="highlight-list">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="tech-list" aria-label="Technologies">
        {project.tech.map((technology) => (
          <span className="tech-chip" key={technology}>
            {technology}
          </span>
        ))}
      </div>
      <div className="project-actions">
        <a className="text-link" href={project.github_url} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={16} />
        </a>
        {project.live_url && (
          <a className="text-link" href={project.live_url} target="_blank" rel="noreferrer">
            Live Demo <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </Card>
  );
}
