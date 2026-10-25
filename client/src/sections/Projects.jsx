import ProjectCard from '../components/ProjectCard.jsx';
import { Reveal, SectionHeading } from '../components/ui.jsx';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="page-section section-block">
      <SectionHeading
        eyebrow="03 / Selected work"
        title="Projects I've built"
        description="A few things I’ve worked on, from distributed services to practical everyday tools."
      />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal delay={index * 0.08} key={project.id}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
