import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, User, Signal } from 'lucide-react';
import { getCategoryById, getStatusById, LEVELS } from '../data/directions';
import './DirectionCard.css';
export default function DirectionCard({ direction }) {
  const category = getCategoryById(direction.categoryId);
  const status = getStatusById(direction.status);
  return (
    <article className="dir-card">
      <div className="dir-card__media">
        <img src={direction.image} alt={direction.title} loading="lazy" />
        <span className={`dir-card__status dir-card__status--${status.tone}`}>{status.label}</span>
        {category && <span className="dir-card__category">{category.label}</span>}
      </div>
      <div className="dir-card__body">
        <h3 className="dir-card__title">{direction.title}</h3>
        <p className="dir-card__desc">{direction.shortDescription}</p>
        <dl className="dir-card__meta">
          <div className="dir-card__meta-item"><User size={14} aria-hidden="true" /><dt className="visually-hidden">Возраст</dt><dd>{direction.age}</dd></div>
          <div className="dir-card__meta-item"><Signal size={14} aria-hidden="true" /><dt className="visually-hidden">Уровень</dt><dd>{LEVELS[direction.level]}</dd></div>
          <div className="dir-card__meta-item"><Clock size={14} aria-hidden="true" /><dt className="visually-hidden">Длительность</dt><dd>{direction.duration}</dd></div>
        </dl>
        <div className="dir-card__actions">
          <Link to="/booking" className="dir-card__cta">{direction.status === 'active' ? 'Записаться' : 'Узнать о запуске'}</Link>
        </div>
      </div>
    </article>
  );
}
