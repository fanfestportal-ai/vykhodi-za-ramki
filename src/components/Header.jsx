import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import './Header.css';

const NAV = [
  { to: '/', label: 'Главная' }, { to: '/directions', label: 'Направления' }, { to: '/schedule', label: 'Расписание' },
  { to: '/subscriptions', label: 'Абонементы' }, { to: '/teachers', label: 'Преподаватели' }, { to: '/about', label: 'О студии' }, { to: '/contacts', label: 'Контакты' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [isOpen]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__logo"><Logo variant="dark" size="sm" /></Link>
        <nav className="header__nav" aria-label="Основная навигация">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `header__nav-link ${isActive ? 'is-active' : ''}`}>{item.label}</NavLink>
          ))}
        </nav>
        <Link to="/booking" className="header__cta">Записаться <ArrowRight size={16} /></Link>
        <button className="header__burger" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={isOpen}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <div className={`header__mobile ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <nav className="header__mobile-nav">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `header__mobile-link ${isActive ? 'is-active' : ''}`}>{item.label}</NavLink>
          ))}
          <Link to="/booking" className="header__mobile-cta">Записаться на занятие</Link>
        </nav>
      </div>
    </header>
  );
}