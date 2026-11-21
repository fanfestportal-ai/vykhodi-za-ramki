import { Link } from 'react-router-dom';
import { Heart, Target, Users, Sparkles, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import Star from '../components/Star';
import './About.css';

const PRINCIPLES = [
  { icon: Heart, title: 'Без сравнения', text: 'Каждый идёт своим путём. Мы не сравниваем учеников друг с другом.' },
  { icon: Target, title: 'Индивидуальный подход', text: 'Преподаватель замечает каждого и помогает найти свою траекторию.' },
  { icon: Users, title: 'Открытость', text: 'Пространство для людей с разным опытом, возрастом и физической подготовкой.' },
  { icon: Sparkles, title: 'Радость движения', text: 'Главное — не результат, а процесс. Удовольствие от движения важнее идеальной техники.' },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=900&q=80', alt: 'Танцевальный зал' },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&q=80', alt: 'Зал для растяжки' },
  { src: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=700&q=80', alt: 'Пилатес-студия' },
  { src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=700&q=80', alt: 'Зал для йоги' },
];

export default function About() {
  return (
    <main className="page about-page">
      <section className="section about-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="О пространстве" title="«Выходи за рамки» — это больше, чем студия" subtitle="Это место, где движение становится языком, на котором можно говорить с собой." /></AnimatedSection>
        </div>
      </section>
      <section className="section about-philosophy">
        <div className="container about-philosophy__grid">
          <AnimatedSection className="about-philosophy__left" animation="slide-left">
            <div className="about-philosophy__visual">
              <img src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1000&q=85" alt="Танцовщица в движении" className="about-philosophy__img" />
              <div className="about-philosophy__quote">
                <Star size={24} />
                <p>Не обязательно уметь. Достаточно захотеть попробовать.</p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection className="about-philosophy__right" animation="slide-right" delay={150}>
            <h2 className="about-philosophy__title">Философия</h2>
            <div className="about-philosophy__text">
              <p>Мы верим, что движение — это не просто физическая активность. Это способ познания себя, развития тела, преодоления ограничений и нахождения новых возможностей.</p>
              <p>«Выходи за рамки» объединяет танцевальные, спортивные, гимнастические и оздоровительные направления. Но главное — мы создаём пространство, в котором каждый может найти свой ритм.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <section className="section section--dark about-mission">
        <div className="container">
          <AnimatedSection className="about-mission__content">
            <h2 className="about-mission__title">Наша миссия</h2>
            <p className="about-mission__text">Создать пространство, в котором каждый человек — независимо от возраста, опыта и физической подготовки — может открыть для себя радость движения, развить тело и найти внутреннюю гармонию.</p>
            <div className="about-mission__stats">
              <div className="about-mission__stat"><span className="about-mission__stat-num">20+</span><span className="about-mission__stat-label">направлений</span></div>
              <div className="about-mission__stat"><span className="about-mission__stat-num">∞</span><span className="about-mission__stat-label">возможностей</span></div>
              <div className="about-mission__stat"><span className="about-mission__stat-num">0</span><span className="about-mission__stat-label">ограничений</span></div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <section className="section about-principles">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Принципы" title="На чём строится наша работа" subtitle="Четыре принципа, которые определяют всё, что мы делаем." align="center" /></AnimatedSection>
          <div className="about-principles__grid">
            {PRINCIPLES.map((principle, i) => (
              <AnimatedSection key={principle.title} delay={i * 100} className="about-principle">
                <principle.icon className="about-principle__icon" aria-hidden="true" />
                <h3 className="about-principle__title">{principle.title}</h3>
                <p className="about-principle__text">{principle.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="section about-gallery">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Пространство" title="Атмосфера студии" subtitle="Светлые залы, современное оборудование, уютные зоны отдыха." align="center" /></AnimatedSection>
          <div className="about-gallery__grid">
            {GALLERY.map((img, i) => (
              <AnimatedSection key={i} delay={i * 60} className={`about-gallery__item ${i === 0 || i === 3 ? 'about-gallery__item--wide' : ''}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark about-future">
        <div className="container">
          <AnimatedSection className="about-future__content">
            <h2 className="about-future__title">Планы развития</h2>
            <p className="about-future__text">Мы только начинаем свой путь. Впереди — новые направления, мастер-классы, выездные интенсивы, совместные проекты и многое другое.</p>
            <div className="about-future__actions">
              <Link to="/directions" className="about-future__btn">Посмотреть направления <ArrowRight size={18} /></Link>
              <Link to="/booking" className="about-future__btn about-future__btn--ghost">Записаться на занятие</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}