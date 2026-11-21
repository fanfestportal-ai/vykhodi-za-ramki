import { useState } from 'react';
import { Briefcase, Send, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { vacancies } from '../data/vacancies';
import './Careers.css';

export default function Careers() {
  const [expandedId, setExpandedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', position: '', experience: '', directions: '', portfolio: '', comment: '', consent: false });
  const [errors, setErrors] = useState({});

  const toggleVacancy = (id) => setExpandedId(expandedId === id ? null : id);

  const openVacancyForm = (title) => {
    setFormData({ ...formData, position: title });
    setShowForm(true);
    setTimeout(() => document.getElementById('career-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Укажите имя';
    if (!formData.phone.trim()) errs.phone = 'Укажите телефон';
    if (!formData.email.trim()) errs.email = 'Укажите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Некорректный email';
    if (!formData.consent) errs.consent = 'Необходимо согласие';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', phone: '', email: '', position: '', experience: '', directions: '', portfolio: '', comment: '', consent: false });
    }, 900);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  return (
    <main className="page careers-page">
      <section className="section careers-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Команда" title="Хочешь стать частью пространства?" subtitle="Мы в поиске людей, которые любят своё дело. Ниже — предварительные направления поиска." /></AnimatedSection>
          <div className="careers-list">
            {vacancies.map((v, i) => (
              <AnimatedSection key={v.id} delay={i * 50} className="career-card">
                <button className="career-card__header" onClick={() => toggleVacancy(v.id)} aria-expanded={expandedId === v.id}>
                  <div className="career-card__title-block">
                    <Briefcase size={20} className="career-card__icon" />
                    <div>
                      <h3 className="career-card__title">{v.title}</h3>
                      <p className="career-card__meta">{v.department} · {v.type}</p>
                    </div>
                  </div>
                  <ArrowRight className={`career-card__chevron ${expandedId === v.id ? 'is-open' : ''}`} />
                </button>
                {expandedId === v.id && (
                  <div className="career-card__body">
                    <p className="career-card__desc">{v.description}</p>
                    <div className="career-card__blocks">
                      <div className="career-card__block"><h4>Обязанности</h4><ul>{v.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul></div>
                      <div className="career-card__block"><h4>Требования</h4><ul>{v.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul></div>
                      <div className="career-card__block"><h4>Условия</h4><ul>{v.conditions.map((c, i) => <li key={i}>{c}</li>)}</ul></div>
                    </div>
                    <div className="career-card__footer">
                      <div className="career-card__format"><Clock size={16} /><span>{v.format}</span></div>
                      <button className="career-card__apply" onClick={() => openVacancyForm(v.title)}>Откликнуться <Send size={16} /></button>
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={100} className="careers-spontaneous">
            <div className="careers-spontaneous__inner">
              <div>
                <h3 className="careers-spontaneous__title">Не нашёл подходящую вакансию?</h3>
                <p className="careers-spontaneous__text">Расскажи о себе — возможно, мы создадим роль специально под тебя.</p>
              </div>
              <button className="careers-spontaneous__btn" onClick={() => openVacancyForm('Свободная заявка')}>Рассказать о себе <ArrowRight size={18} /></button>
            </div>
          </AnimatedSection>
          {showForm && (
            <AnimatedSection delay={100} id="career-form" className="career-form-section">
              <div className="career-form">
                {formStatus === 'success' ? (
                  <div className="career-form__success">
                    <CheckCircle size={48} className="career-form__success-icon" />
                    <h3>Отклик принят</h3>
                    <p>Мы свяжемся с тобой в ближайшее время.</p>
                    <button className="career-form__close" onClick={() => { setShowForm(false); setFormStatus('idle'); }}>Закрыть</button>
                  </div>
                ) : (
                  <>
                    <h3 className="career-form__title">Отклик на вакансию</h3>
                    <p className="career-form__subtitle">{formData.position || 'Выберите вакансию выше'}</p>
                    <form onSubmit={handleSubmit} className="career-form__fields" noValidate>
                      <div className="form-row">
                        <div className="form-field">
                          <label>Имя *</label>
                          <input type="text" value={formData.name} onChange={handleChange('name')} className={errors.name ? 'is-invalid' : ''} />
                          {errors.name && <span className="form-error">{errors.name}</span>}
                        </div>
                        <div className="form-field">
                          <label>Телефон *</label>
                          <input type="tel" value={formData.phone} onChange={handleChange('phone')} className={errors.phone ? 'is-invalid' : ''} />
                          {errors.phone && <span className="form-error">{errors.phone}</span>}
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-field">
                          <label>Email *</label>
                          <input type="email" value={formData.email} onChange={handleChange('email')} className={errors.email ? 'is-invalid' : ''} />
                          {errors.email && <span className="form-error">{errors.email}</span>}
                        </div>
                        <div className="form-field">
                          <label>Опыт работы</label>
                          <input type="text" value={formData.experience} onChange={handleChange('experience')} placeholder="Например: 3 года" />
                        </div>
                      </div>
                      <div className="form-field">
                        <label>Направления подготовки</label>
                        <input type="text" value={formData.directions} onChange={handleChange('directions')} placeholder="Танцы, растяжка, пилатес..." />
                      </div>
                      <div className="form-field">
                        <label>Ссылка на портфолио или соцсети</label>
                        <input type="url" value={formData.portfolio} onChange={handleChange('portfolio')} placeholder="https://..." />
                      </div>
                      <div className="form-field">
                        <label>Комментарий</label>
                        <textarea rows="4" value={formData.comment} onChange={handleChange('comment')} placeholder="Расскажите о себе..." />
                      </div>
                      <label className="form-checkbox">
                        <input type="checkbox" checked={formData.consent} onChange={handleChange('consent')} />
                        <span>Согласен на обработку персональных данных {errors.consent && <span className="form-error">{errors.consent}</span>}</span>
                      </label>
                      <button type="submit" className="career-form__submit" disabled={formStatus === 'sending'}>
                        {formStatus === 'sending' ? 'Отправка...' : 'Отправить отклик'} <Send size={16} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </main>
  );
}