import { useState, useMemo } from 'react';
import { Search, X, Filter } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import TeacherCard from '../components/TeacherCard';
import { teachers } from '../data/teachers';
import { directions, CATEGORIES } from '../data/directions';
import './Teachers.css';

export default function Teachers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('all');

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchesSearch = searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDirection = selectedDirection === 'all' || t.specializations.some((s) => {
        const dir = directions.find((d) => d.title === s);
        return dir && dir.categoryId === selectedDirection;
      });
      return matchesSearch && matchesDirection;
    });
  }, [searchQuery, selectedDirection]);

  return (
    <main className="page teachers-page">
      <section className="section teachers-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Команда" title="Преподаватели" subtitle="Профессионалы, которые любят своё дело и умеют слышать ученика." /></AnimatedSection>
          <AnimatedSection delay={100} className="teachers-controls">
            <div className="teachers-search">
              <Search className="teachers-search__icon" size={20} />
              <input type="text" placeholder="Поиск по имени или специализации..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="teachers-search__input" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="teachers-search__clear" aria-label="Очистить поиск"><X size={18} /></button>}
            </div>
            <div className="teachers-filter">
              <Filter size={18} className="teachers-filter__icon" />
              <select value={selectedDirection} onChange={(e) => setSelectedDirection(e.target.value)} className="teachers-filter__select">
                <option value="all">Все направления</option>
                {Object.values(CATEGORIES).map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
              </select>
            </div>
          </AnimatedSection>
          <div className="teachers-results">
            {filteredTeachers.length === 0 ? (
              <AnimatedSection className="teachers-empty">
                <div className="teachers-empty__content">
                  <Filter size={48} className="teachers-empty__icon" />
                  <h3>Преподаватели не найдены</h3>
                  <p>Попробуйте изменить параметры поиска или сбросить фильтры.</p>
                  {(searchQuery || selectedDirection !== 'all') && (
                    <button onClick={() => { setSearchQuery(''); setSelectedDirection('all'); }} className="teachers-empty__reset">Сбросить фильтры</button>
                  )}
                </div>
              </AnimatedSection>
            ) : (
              <div className="teachers-grid">
                {filteredTeachers.map((t, i) => (
                  <AnimatedSection key={t.id} delay={i * 60}><TeacherCard teacher={t} /></AnimatedSection>
                ))}
              </div>
            )}
          </div>
          <AnimatedSection delay={200} className="teachers-cta">
            <div className="teachers-cta__card">
              <h3 className="teachers-cta__title">Хотите стать частью команды?</h3>
              <p className="teachers-cta__text">Мы всегда в поиске талантливых педагогов. Если вы профессионал своего дела — посмотрите актуальные вакансии.</p>
              <a href="#/careers" className="teachers-cta__btn">Посмотреть вакансии</a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}