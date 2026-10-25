import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function Card({ children, className = '' }) {
  return <article className={`glass-card ${className}`}>{children}</article>;
}

export function Badge({ children, className = '' }) {
  return <span className={`badge ${className}`}>{children}</span>;
}

export function Skeleton({ className = '' }) {
  return <div aria-hidden="true" className={`skeleton ${className}`} />;
}

export function LoadingPortfolio() {
  return (
    <main className="loading-screen" aria-label="Loading portfolio">
      <span className="eyebrow">Loading portfolio</span>
      <Skeleton className="skeleton-title" />
      <div className="skeleton-grid">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </main>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <main className="error-screen">
      <span className="eyebrow">A little connection issue</span>
      <h1>Portfolio unavailable</h1>
      <p>{message}</p>
      <button className="button button-primary" type="button" onClick={onRetry}>
        Try again
      </button>
    </main>
  );
}
