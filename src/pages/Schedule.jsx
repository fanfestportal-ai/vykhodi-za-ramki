import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { DEMO_SCHEDULE, DAYS, getScheduleByDay } from '../data/schedule';
import { directions } from '../data/directions';
import { teachers } from '../data/teachers';
import './Schedule.css';

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedDirection, setSelectedDirection] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(0);

  const daySchedule = useMemo(() => {
    let schedule = getScheduleByDay(selectedDay);
    if (selectedDirection !== 'all') schedule = schedule.filter((s) => s.directionId === selectedDirection);
    if (selectedTeacher !== 'all') schedule = schedule.filter((s) => s.teacherId === selectedTeacher);
    return schedule;
  }, [selectedDay, selectedDirection, selectedTeacher]);

  const getDirectionById = (id) => directions.find((d) => d.id === id);
  const getTeacherById = (id) => teachers.find((t) => t.id === id);

  const weekLabel = useMemo(() => {
    if (currentWeek === 0) return 'Текущая неделя';
    if (currentWeek === 1) return 'Следующая неделя';
    if (currentWeek === -1) return 'Прошлая неделя';
    return currentWeek > 0 ? `Через ${currentWeek} недель` : `${Math.abs(currentWeek)} недель назад`;
  }, [currentWeek]);

  return (
    <main className="page schedule-page">
      <section className="section schedule-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Расписание" title="Расписание занятий" subtitle="Интерактивное расписание с фильтрами. Выберите день, направление или преподавателя." /></AnimatedSection>
          <AnimatedSection delay={100} className="schedule-demo-notice">
            <AlertCircle size={20} />
            <p>Это демонстрационное расписание. Реальные данные будут добавлены после открытия студии.</p>
          </AnimatedSection>
          <AnimatedSection delay={150} className="schedule-week-nav">
            <button onClick={() => setCurrentWeek(currentWeek - 1)} className="schedule-week-nav__btn" aria-label="Предыдущая неделя"><ChevronLeft size={20} /></button>
            <span className="schedule-week-nav__label">{weekLabel}</span>
            <button onClick={() => setCurrentWeek(currentWeek + 1)} className="schedule-week-nav__btn" aria-label="Следующая неделя"><ChevronRight size={20} /></button>
          </AnimatedSection>
          <AnimatedSection delay={200} className="schedule-days">
            {DAYS.map((day) => (
              <button key={day.id} className={`schedule-day ${selectedDay === day.id ? 'is-active' : ''}`} onClick={() => setSelectedDay(day.id)}>
                <span className="schedule-day__short">{day.short}</span>
                <span className="schedule-day__full">{day.full}</span>
              </button>
            ))}
          </AnimatedSection>
          <AnimatedSection delay={250} className="schedule-filters">
            <div className="schedule-filter">
              <label className="schedule-filter__label">Направление</label>
              <select value={selectedDirection} onChange={(e) => setSelectedDirection(e.target.value)} className="schedule-filter__select">
                <option value="all">Все направления</option>
                {directions.map((d) => <option key={d.id} value={d.id}>{d.title}</option>)}
              </select>
            </div>
            <div className="schedule-filter">
              <label className="schedule-filter__label">Преподаватель</label>
              <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)} className="schedule-filter__select">
                <option value="all">Все преподаватели</option>
                {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={300} className="schedule-list">
            {daySchedule.length === 0 ? (
              <div className="schedule-empty">
                <Calendar size={48} className="schedule-empty__icon" />
                <h3>Нет занятий</h3>
                <p>На выбранный день с указанными фильтрами занятий не найдено.</p>
              </div>
            ) : (
              <div className="schedule-items">
                {daySchedule.map((item, i) => {
                  const direction = getDirectionById(item.directionId);
                  const teacher = getTeacherById(item.teacherId);
                  return (
                    <AnimatedSection key={item.id} delay={i * 60} className="schedule-item">
                      <div className="schedule-item__time"><Clock size={18} /><span>{item.time}</span></div>
                      <div className="schedule-item__content">
                        <div className="schedule-item__header">
                          <h3 className="schedule-item__title">{direction?.title || 'Направление'}</h3>
                          <span className={`schedule-item__status schedule-item__status--${item.status}`}>
                            {item.status === 'open' && 'Открыто для записи'}
                            {item.status === 'full' && 'Мест нет'}
                            {item.status === 'upcoming' && 'Скоро открытие'}
                          </span>
                        </div>
                        <div className="schedule-item__meta">
                          <div className="schedule-item__meta-item"><Users size={14} /><span>{teacher?.name || 'Преподаватель'}</span></div>
                          <div className="schedule-item__meta-item"><Clock size={14} /><span>{item.duration} мин</span></div>
                          {item.status === 'open' && <div className="schedule-item__meta-item"><span>Свободно мест: {item.spots}</span></div>}
                        </div>
                        <div className="schedule-item__actions">
                          {item.status === 'open' && <button className="schedule-item__book">Записаться</button>}
                          {item.status === 'full' && <button className="schedule-item__waitlist">В список ожидания</button>}
                          {item.status === 'upcoming' && <button className="schedule-item__notify">Уведомить о запуске</button>}
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}