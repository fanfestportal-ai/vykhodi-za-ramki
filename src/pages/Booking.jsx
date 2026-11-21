import { useState } from 'react';
import { CheckCircle, Send, Sparkles } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { directions, CATEGORIES } from '../data/directions';
import './Booking.css';

const INITIAL_FORM = { name: '', phone: '', age: '', directionId: '', format: 'group', days: [], time: '', level: 'beginner', comment: '', requestType: 'trial' };

export default function Booking() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const DAYS_OPTIONS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const LEVELS = [ { id: 'beginner', label: 'Новичок' }, { id: 'some', label: 'Есть небольшой опыт' }, { id: 'intermediate', label: 'Средний уровень' }, { id: 'advanced', label: 'Продвинутый' } ];
  const TIMES = ['Утро (до 12:00)', 'День (12:00–17:00)', 'Вечер (после 17:00)', 'Любое время'];

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const toggleDay = (day) => {
    const days = form.days.includes(day) ? form.days.filter((d) => d !== day) : [...form.days, day];
    setForm({ ...form, days });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Укажите имя';
    if (!form.phone.trim()) errs.phone = 'Укажите телефон';
    if (!form.age.trim()) errs.age = 'Укажите возраст';
    if (!form.directionId) errs.directionId = 'Выберите направление';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus('sending');
    setTimeout(() => setStatus('success'), 900);
  };

  const reset = () => { setForm(INITIAL_FORM); setStatus('idle'); setErrors({}); };

  const activeDirections = directions.filter((d) => d.status === 'active' || d.status === 'upcoming');
  const groupedByCategory = Object.values(CATEGORIES).map((cat) => ({ ...cat, items: activeDirections.filter((d) => d.categoryId === cat.id) })).filter((g) => g.items.length > 0);

  return (
    <main className="page booking-page">
      <section className="section booking-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Запись" title="Записаться на занятие" subtitle="Заполните форму — и мы свяжемся с вами, чтобы подтвердить запись и ответить на вопросы." /></AnimatedSection>
          {status === 'success' ? (
            <AnimatedSection className="booking-success">
              <div className="booking-success__inner">
                <CheckCircle size={64} className="booking-success__icon" />
                <h2>Заявка принята</h2>
                <p>Скоро мы свяжемся с тобой!</p>
                <div className="booking-success__note"><Sparkles size={18} /><span>Это демонстрационная отправка. В реальной версии заявка уйдёт администратору.</span></div>
                <button className="booking-success__btn" onClick={reset}>Оставить ещё одну заявку</button>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection delay={100}>
              <form className="booking-form" onSubmit={handleSubmit} noValidate>
                <div className="booking-form__section">
                  <h3 className="booking-form__section-title">О вас</h3>
                  <div className="booking-form__row">
                    <div className="form-field">
                      <label>Имя *</label>
                      <input type="text" value={form.name} onChange={handleChange('name')} className={errors.name ? 'is-invalid' : ''} placeholder="Как к вам обращаться" />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>
                    <div className="form-field">
                      <label>Телефон *</label>
                      <input type="tel" value={form.phone} onChange={handleChange('phone')} className={errors.phone ? 'is-invalid' : ''} placeholder="+7 (___) ___-__-__" />
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>
                    <div className="form-field">
                      <label>Возраст *</label>
                      <input type="text" value={form.age} onChange={handleChange('age')} className={errors.age ? 'is-invalid' : ''} placeholder="Например: 25" />
                      {errors.age && <span className="form-error">{errors.age}</span>}
                    </div>
                  </div>
                </div>
                <div className="booking-form__section">
                  <h3 className="booking-form__section-title">Тип заявки</h3>
                  <div className="booking-form__radio-group">
                    {[ { id: 'trial', label: 'Пробное занятие' }, { id: 'regular', label: 'Регулярные занятия' }, { id: 'consultation', label: 'Консультация по направлению' }, { id: 'upcoming', label: 'Заявка на будущее направление' } ].map((opt) => (
                      <label key={opt.id} className="radio-card">
                        <input type="radio" name="requestType" value={opt.id} checked={form.requestType === opt.id} onChange={handleChange('requestType')} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="booking-form__section">
                  <h3 className="booking-form__section-title">Направление</h3>
                  <div className="form-field">
                    <label>Интересующее направление *</label>
                    <select value={form.directionId} onChange={handleChange('directionId')} className={errors.directionId ? 'is-invalid' : ''}>
                      <option value="">Выберите направление</option>
                      {groupedByCategory.map((cat) => (
                        <optgroup key={cat.id} label={cat.label}>
                          {cat.items.map((d) => <option key={d.id} value={d.id}>{d.title} {d.status === 'upcoming' ? '(скоро)' : ''}</option>)}
                        </optgroup>
                      ))}
                    </select>
                    {errors.directionId && <span className="form-error">{errors.directionId}</span>}
                  </div>
                  <div className="booking-form__row">
                    <div className="form-field">
                      <label>Формат</label>
                      <select value={form.format} onChange={handleChange('format')}>
                        <option value="group">Группа</option>
                        <option value="individual">Индивидуально</option>
                        <option value="any">Любой</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Уровень подготовки</label>
                      <select value={form.level} onChange={handleChange('level')}>
                        {LEVELS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="booking-form__section">
                  <h3 className="booking-form__section-title">Удобное время</h3>
                  <div className="form-field">
                    <label>Предпочтительные дни</label>
                    <div className="booking-days">
                      {DAYS_OPTIONS.map((day) => (
                        <button key={day} type="button" className={`booking-day ${form.days.includes(day) ? 'is-active' : ''}`} onClick={() => toggleDay(day)}>{day}</button>
                      ))}
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Предпочтительное время</label>
                    <select value={form.time} onChange={handleChange('time')}>
                      <option value="">Любое</option>
                      {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="booking-form__section">
                  <h3 className="booking-form__section-title">Комментарий</h3>
                  <div className="form-field">
                    <textarea rows="4" value={form.comment} onChange={handleChange('comment')} placeholder="Расскажите о своих целях, особенностях или задайте вопрос..." />
                  </div>
                </div>
                <button type="submit" className="booking-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Отправляем...' : 'Отправить заявку'} <Send size={18} />
                </button>
              </form>
            </AnimatedSection>
          )}
        </div>
      </section>
    </main>
  );
}