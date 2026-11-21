import { Link } from 'react-router-dom';
import { Instagram, Send, Youtube } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo variant="light" size="md" />
            <p className="footer__tagline">Пространство, где движение становится возможностью.</p>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Навигация</h4>
            <ul className="footer__list">
              <li><Link to="/directions">Направления</Link></li>
              <li><Link to="/schedule">Расписание</Link></li>
              <li><Link to="/subscriptions">Абонементы</Link></li>
              <li><Link to="/teachers">Преподаватели</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Информация</h4>
            <ul className="footer__list">
              <li><Link to="/events">Мероприятия</Link></li>
              <li><Link to="/careers">Вакансии</Link></li>
              <li><Link to="/faq">Вопросы и ответы</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Контакты</h4>
            <ul className="footer__list">
              <li>Адрес будет указан дополнительно</li>
              <li>hello@example.com</li>
            </ul>
            <div className="footer__socials">
              <a href="#" aria-label="Instagram" className="footer__social"><Instagram size={18} /></a>
              <a href="#" aria-label="Telegram" className="footer__social"><Send size={18} /></a>
              <a href="#" aria-label="YouTube" className="footer__social"><Youtube size={18} /></a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {year} «Выходи за рамки». Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}