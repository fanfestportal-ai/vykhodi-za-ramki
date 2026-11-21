import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Users, Heart, Award, Sparkles, Target } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import DirectionCard from '../components/DirectionCard';
import TeacherCard from '../components/TeacherCard';
import Star from '../components/Star';
import { getFeaturedDirections } from '../data/directions';
import { teachers } from '../data/teachers';
import './Home.css';

const GOALS = [
  { id: 'flex', label: 'Хочу стать гибче', icon: '🌿', directionIds: ['stretching', 'yoga'] },
  { id: 'strength', label: 'Хочу развить силу', icon: '✦', directionIds: ['pole-dance', 'pilates'] },
  { id: 'dance', label: 'Хочу научиться танцевать', icon: '✺', directionIds: ['contemporary', 'jazz-dance', 'high-heels'] },
  { id: 'child', label: 'Хочу заниматься с ребёнком', icon: '♡', directionIds: ['kids-gymnastics'] },
];

const ADVANTAGES = [
  { icon: Compass, title: 'Разнообразие направлений', text: 'Танцы, гимнастика, воздушные практики, йога.' },
  { icon: Users, title: 'Занятия для разных возрастов', text: 'От детских групп до взрослых практик.' },
  { icon: Heart, title: 'Комфортная атмосфера', text: 'Пространство, где можно быть собой.' },
  { icon: Award, title: 'Профессиональные преподаватели', text: 'Педагоги, которые любят своё дело.' },
  { icon: Sparkles, title: 'Можно начать с нуля', text: 'Не нужно ничего уметь заранее.' },
  { icon: Target, title: 'Индивидуальный подход', text: 'Преподаватель замечает каждого.' },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=900&q=80', alt: 'Танцовщица', wide: true },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&q=80', alt: 'Растяжка' },
  { src: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=700&q=80', alt: 'Пилатес', wide: true },
  { src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=700&q=80', alt: 'Йога' },
];

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [framePhase, setFramePhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setFramePhase(1), 150);
    const t2 = setTimeout(() => setFramePhase(2), 900);
    const t3 = setTimeout(() => setFramePhase(3), 1600);
    const t4 = setTimeout(() => setHeroReady(true), 2200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  const featured = getFeaturedDirections();
  const goalDirections = selectedGoal ? GOALS.find((g) => g.id === selectedGoal).directionIds.map((id) => featured.find((d) => d.id === id)).filter(Boolean) : [];

  return (
    <main className="home">
      <section className="hero" aria-label="Главный экран">
        <div className="hero__deco hero__deco--blob-1" aria-hidden="true" />
        <div className="hero__deco hero__deco--blob-2" aria-hidden="true" />
        <div className={`hero__frame hero__frame--top ${framePhase >= 2 ? 'is-broken' : ''}`} aria-hidden="true" />
        <div className={`hero__frame hero__frame--bottom ${framePhase >= 2 ? 'is-broken' : ''}`} aria-hidden="true" />
        <div className={`hero__frame hero__frame--left ${framePhase >= 2 ? 'is-broken' : ''}`} aria-hidden="true" />
        <div className={`hero__frame hero__frame--right ${framePhase >= 2 ? 'is-broken' : ''}`} aria-hidden="true" />

        <div className="hero__inner container">
          <div className="hero__content">
            <div className={`hero__eyebrow ${framePhase >= 3 ? 'is-visible' : ''}`}><Star size={14} /><span>танцевальное пространство</span></div>
            <h1 className={`hero__title ${framePhase >= 3 ? 'is-visible' : ''}`}>
              <span className="hero__title-line">Выходи</span>
              <span className="hero__title-line hero__title-line--accent">за рамки</span>
            </h1>
            <p className={`hero__subtitle ${heroReady ? 'is-visible' : ''}`}>Пространство, где движение становится возможностью.</p>
            <div className={`hero__actions ${heroReady ? 'is-visible' : ''}`}>
              <Link to="/directions" className="hero__cta hero__cta--primary">Выбрать направление <ArrowRight size={18} /></Link>
              <Link to="/booking" className="hero__cta hero__cta--ghost">Записаться на занятие</Link>
            </div>
            <div className={`hero__meta ${heroReady ? 'is-visible' : ''}`}>
              <div className="hero__meta-item"><span className="hero__meta-num">20+</span><span className="hero__meta-label">направлений</span></div>
              <div className="hero__meta-divider" />
              <div className="hero__meta-item"><span className="hero__meta-num">0</span><span className="hero__meta-label">рамок</span></div>
            </div>
          </div>
          <div className={`hero__visual ${framePhase >= 2 ? 'is-visible' : ''}`}>
            <div className="hero__visual-frame">
              <img src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&q=85" alt="Танцовщица в пластичной позе" className="hero__visual-img" />
              <div className="hero__visual-caption"><span className="hero__visual-caption-label">Движение</span><span className="hero__visual-caption-text">как язык</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section philosophy">
        <div className="container philosophy__grid">
          <AnimatedSection className="philosophy__left" animation="slide-left">
            <span className="eyebrow">Философия</span>
            <h2 className="philosophy__title">Движение — это возможность <em>познавать себя</em>.</h2>
          </AnimatedSection>
          <AnimatedSection className="philosophy__right" animation="slide-right" delay={150}>
            <p className="philosophy__text">«Выходи за рамки» — это пространство, в котором танец, гимнастика и спокойные практики встречаются. Здесь нет единственно правильного пути. Есть ваш ритм, ваше тело, ваше желание двигаться.</p>
            <div className="philosophy__sign"><Star size={20} /><span>Найди своё движение</span></div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section section--powder directions-home">
        <div className="container">
          <AnimatedSection>
            <SectionHeading eyebrow="Направления" title="Найди то, что отзывается" subtitle="Танец, сила, гибкость, воздух, тишина — у каждого направления свой характер." action={<Link to="/directions" className="link-arrow">Все направления <ArrowRight size={18} /></Link>} />
          </AnimatedSection>
          <div className="directions-home__grid">
            {featured.slice(0, 6).map((d, i) => (
              <AnimatedSection key={d.id} delay={i * 80}><DirectionCard direction={d} /></AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section goal-finder">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Подбор" title="Что вам ближе сейчас?" subtitle="Выберите цель — и мы покажем подходящие направления." align="center" /></AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="goal-finder__grid">
              {GOALS.map((goal) => (
                <button key={goal.id} className={`goal-finder__card ${selectedGoal === goal.id ? 'is-active' : ''}`} onClick={() => setSelectedGoal(goal.id)} aria-pressed={selectedGoal === goal.id}>
                  <span className="goal-finder__icon" aria-hidden="true">{goal.icon}</span>
                  <span className="goal-finder__label">{goal.label}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>
          {selectedGoal && (
            <AnimatedSection className="goal-finder__results" animation="fade" delay={150}>
              <div className="goal-finder__results-head">
                <h3>Подходящие направления</h3>
                <button className="goal-finder__reset" onClick={() => setSelectedGoal(null)}>Сбросить</button>
              </div>
              <div className="goal-finder__results-grid">
                {goalDirections.map((d) => d && <DirectionCard key={d.id} direction={d} />)}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <section className="section section--dark advantages">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Почему мы" title="Пространство, которое работает на вас" subtitle="Шесть принципов, на которых строится всё, что мы делаем." light /></AnimatedSection>
          <div className="advantages__grid">
            {ADVANTAGES.map((adv, i) => (
              <AnimatedSection key={adv.title} delay={i * 70} className="advantage-card">
                <adv.icon className="advantage-card__icon" aria-hidden="true" />
                <h3 className="advantage-card__title">{adv.title}</h3>
                <p className="advantage-card__text">{adv.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--powder teachers-home">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Команда" title="Преподаватели, которые слышат" subtitle="Каждый из них — профессионал своего направления." action={<Link to="/teachers" className="link-arrow">Вся команда <ArrowRight size={18} /></Link>} /></AnimatedSection>
          <div className="teachers-home__grid">
            {teachers.slice(0, 4).map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 80}><TeacherCard teacher={t} /></AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallery">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Атмосфера" title="Пространство, в которое хочется возвращаться" align="center" /></AnimatedSection>
          <div className="gallery__grid">
            {GALLERY.map((img, i) => (
              <AnimatedSection key={i} delay={i * 60} className={`gallery__item ${img.wide ? 'gallery__item--wide' : ''}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-final">
        <div className="container cta-final__inner">
          <AnimatedSection className="cta-final__content" animation="fade-up">
            <Star size={32} className="cta-final__star" />
            <h2 className="cta-final__title">Твоё движение <em>начинается здесь</em>.</h2>
            <p className="cta-final__text">Не обязательно уметь. Достаточно захотеть попробовать.</p>
            <div className="cta-final__actions">
              <Link to="/booking" className="hero__cta hero__cta--primary">Попробовать первое занятие <ArrowRight size={18} /></Link>
              <Link to="/directions" className="hero__cta hero__cta--ghost">Посмотреть направления</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}