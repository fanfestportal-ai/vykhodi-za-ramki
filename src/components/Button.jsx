import './Button.css';
export default function Button({ children, variant = 'primary', size = 'md', as: Tag = 'button', href, to, onClick, className = '', type = 'button', disabled, ...rest }) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ');
  if (Tag === 'a' || href) return <a href={href || to} className={classes} onClick={onClick} {...rest}>{children}</a>;
  return <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>{children}</button>;
}