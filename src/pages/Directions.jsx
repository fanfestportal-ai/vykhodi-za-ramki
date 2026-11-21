import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import DirectionCard from '../components/DirectionCard';
import { directions, CATEGORIES, STATUS, LEVELS } from '../data/directions';
import './Directions.css';

export default function Directions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDirections = useMemo(() => {
    return directions.filter((d) => {
      const matchesSearch = searchQuery === '' || d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || d.categoryId === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || d.status === selectedStatus;
      const matchesLevel = selectedLevel === 'all' || d.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesStatus && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedStatus, selectedLevel]);

  const groupedDirections = useMemo(() => {
    const groups = { active: [], upcoming: [], planned: [] };
    filteredDirections.forEach((d) => groups[d.status].push(d));
    return groups;
  }, [filteredDirections]);

  const resetFilters = () => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStatus('all'); setSelectedLevel('all'); };
  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedLevel !== 'all';

  return (
    <main className="page directions-page">
      <section className="section directions-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Каталог" title="Все направления" subtitle="Выберите то, что откликается. Фильтруйте по категориям, уровню подготовки и статусу запуска." /></AnimatedSection>
          <AnimatedSection delay={100} className="directions-controls">
            <div className="directions-search">
              <Search className="directions-search__icon" size={20} />
              <input type="text" placeholder="Поиск по направлениям..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="directions-search__input" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="directions-search__clear" aria-label="Очистить поиск"><X size={18} /></button>}
            </div>
            <button className="directions-filters-toggle" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}>
              <Filter size={18} /><span>Фильтры</span>
              {hasActiveFilters && <span className="directions-filters-toggle__badge" />}
            </button>
          </AnimatedSection>
          <AnimatedSection delay={150} className={`directions-filters ${showFilters ? 'is-open' : ''}`}>
            <div className="directions-filters__grid">
              <div className="directions-filter">
                <label className="directions-filter__label">Категория</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="directions-filter__select">
                  <option value="all">Все категории</option>
                  {Object.values(CATEGORIES).map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                </select>
              </div>
              <div className="directions-filter">
                <label className="directions-filter__label">Статус</label>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="directions-filter__select">
                  <option value="all">Все статусы</option>
                  {Object.values(STATUS).map((st) => <option key={st.id} value={st.id}>{st.label}</option>)}
                </select>
              </div>
              <div className="directions-filter">
                <label className="directions-filter__label">Уровень</label>
                <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="directions-filter__select">
                  <option value="all">Любой уровень</option>
                  {Object.entries(LEVELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </div>
              {hasActiveFilters && <button onClick={resetFilters} className="directions-filters__reset">Сбросить фильтры</button>}
            </div>
          </AnimatedSection>
          <div className="directions-results">
            {filteredDirections.length === 0 ? (
              <AnimatedSection className="directions-empty">
                <div className="directions-empty__content">
                  <Filter size={48} className="directions-empty__icon" />
                  <h3>Ничего не найдено</h3>
                  <p>Попробуйте изменить параметры поиска или сбросить фильтры.</p>
                  {hasActiveFilters && <button onClick={resetFilters} className="directions-empty__reset">Сбросить фильтры</button>}
                </div>
              </AnimatedSection>
            ) : (
              <>
                {groupedDirections.active.length > 0 && (
                  <AnimatedSection className="directions-group">
                    <div className="directions-group__header"><h2 className="directions-group__title">Действующие направления</h2><span className="directions-group__count">{groupedDirections.active.length}</span></div>
                    <div className="directions-grid">{groupedDirections.active.map((d, i) => <AnimatedSection key={d.id} delay={i * 60}><DirectionCard direction={d} /></AnimatedSection>)}</div>
                  </AnimatedSection>
                )}
                {groupedDirections.upcoming.length > 0 && (
                  <AnimatedSection className="directions-group">
                    <div className="directions-group__header"><h2 className="directions-group__title">Скоро открытие</h2><span className="directions-group__count">{groupedDirections.upcoming.length}</span></div>
                    <div className="directions-grid">{groupedDirections.upcoming.map((d, i) => <AnimatedSection key={d.id} delay={i * 60}><DirectionCard direction={d} /></AnimatedSection>)}</div>
                  </AnimatedSection>
                )}
                {groupedDirections.planned.length > 0 && (
                  <AnimatedSection className="directions-group">
                    <div className="directions-group__header"><h2 className="directions-group__title">Планируются</h2><span className="directions-group__count">{groupedDirections.planned.length}</span></div>
                    <div className="directions-grid">{groupedDirections.planned.map((d, i) => <AnimatedSection key={d.id} delay={i * 60}><DirectionCard direction={d} /></AnimatedSection>)}</div>
                  </AnimatedSection>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}