import { Calendar, Sparkles } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import Star from '../components/Star';
import { events } from '../data/events';
import './Events.css';

export default function Events() {
  const hasEvents = events.length > 0;
  return (
    <main className="page events-page">
      <section className="section events-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="События" title="Мероприятия пространства" subtitle="Мастер-классы, открытые занятия, интенсивы, выступления и особые события." /></AnimatedSection>
          {hasEvents ? (
            <div className="events-grid">
              {events.map((event, i) => (
                <AnimatedSection key={event.id} delay={i * 80} className="event-card">
                  <div className="event-card__media">
                    <img src={event.image} alt={event.title} loading="lazy" />
                    <div className="event-card__date">
                      <span className="event-card__date-day">{event.date.split('.')[0]}</span>
                      <span className="event-card__date-month">{event.date.split('.')[1]}</span>
                    </div>
                  </div>
                  <div className="event-card__body">
                    <span className="event-card__tag">{event.tag}</span>
                    <h3 className="event-card__title">{event.title}</h3>
                    <p className="event-card__desc">{event.description}</p>
                    <div className="event-card__footer">
                      <span className="event-card__price">{event.price}</span>
                      <button className="event-card__btn">Участвовать</button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection delay={100} className="events-placeholder">
              <div className="events-placeholder__inner">
                <div className="events-placeholder__deco" aria-hidden="true"><Star size={40} /></div>
                <Calendar size={56} className="events-placeholder__icon" />
                <h2 className="events-placeholder__title">Скоро здесь появятся наши события</h2>
                <p className="events-placeholder__text">Мы готовим мастер-классы, открытые занятия, интенсивы и особенные встречи. Следите за обновлениями.</p>
                <div className="events-placeholder__teaser"><Sparkles size={18} /><span>Первые анонсы — совсем скоро</span></div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </main>
  );
}