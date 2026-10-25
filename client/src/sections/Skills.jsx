import { Card, Reveal, SectionHeading } from '../components/ui.jsx';

export default function Skills({ categories }) {
  return (
    <section id="skills" className="page-section section-block">
      <SectionHeading
        eyebrow="02 / Toolkit"
        title="Skills & technologies"
        description="Tools I use to turn ideas into reliable software."
      />
      <div className="skills-grid">
        {categories.map((category, index) => (
          <Reveal delay={(index % 3) * 0.06} key={category.category}>
            <Card className="skill-card">
              <h3>{category.category}</h3>
              <div className="skill-pills">
                {category.skills.map((skill) => (
                  <span className="skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
