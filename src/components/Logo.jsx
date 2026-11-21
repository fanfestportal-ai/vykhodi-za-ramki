import './Logo.css';
export default function Logo({ variant = 'dark', size = 'md' }) {
  return (
    <div className={`logo logo--${variant} logo--${size}`}>
      <svg className="logo__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M4 20 L20 4 L36 20 L20 36 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
      <div className="logo__text">
        <span className="logo__title">Выходи за рамки</span>
        <span className="logo__subtitle">танцевальное пространство</span>
      </div>
    </div>
  );
}