import About from './sections/About.jsx';
import Achievements from './sections/Achievements.jsx';
import Education from './sections/Education.jsx';
import Footer from './sections/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';
import { ErrorState, LoadingPortfolio } from './components/ui.jsx';
import { useFetch } from './hooks/useFetch.js';

export default function App() {
  const { data, loading, error, refetch } = useFetch('/portfolio');

  if (loading) return <LoadingPortfolio />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!data?.profile) {
    return (
      <ErrorState
        message="The portfolio response was incomplete. Please try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <Skills categories={data.skills} />
        <Projects projects={data.projects} />
        <Education education={data.education} />
        <Achievements achievements={data.achievements} />
      </main>
      <Footer profile={data.profile} />
    </>
  );
}
