const DEFAULT_RESUME_PATH = '/resume.pdf';

export default function ResumeDownload({ className, children }) {
  return (
    <a
      className={className}
      href={DEFAULT_RESUME_PATH}
      download="Rishi_Dusane_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
