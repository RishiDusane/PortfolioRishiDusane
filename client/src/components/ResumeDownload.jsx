const DEFAULT_RESUME_PATH = '/Rishi_Dusane_Resume.pdf';

export default function ResumeDownload({ resumePath, className, children }) {
  return (
    <a
      className={className}
      href={resumePath || DEFAULT_RESUME_PATH}
      download="Rishi_Dusane_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
