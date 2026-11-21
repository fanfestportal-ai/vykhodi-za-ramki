import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Instagram, Youtube } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { contacts } from '../data/contacts';
import './Contacts.css';

export default function Contacts() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Укажите имя';
    if (!form.contact.trim()) errs.contact = 'Укажите телефон или email';
    if (!form.message.trim()) errs.message = 'Напишите сообщение';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus('sending');
    setTimeout(() => setStatus('success'), 800);
  };

  return (
    <main className="page contacts-page">
      <section className="section contacts-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Контакты" title="Связаться с нами" subtitle="Мы всегда на связи. Выберите удобный способ или оставьте сообщение." /></AnimatedSection>
          <div className="contacts-grid">
            <AnimatedSection delay={100} className="contacts-info">
              <div className="contacts-info__item"><MapPin size={22} /><div><h4>Адрес</h4><p>{contacts.address}</p></div></div>
              <div className="contacts-info__item"><Phone size={22} /><div><h4>Телефон</h4><p>{contacts.phone}</p></div></div>
              <div className="contacts-info__item"><Mail size={22} /><div><h4>Email</h4><p>{contacts.email}</p></div></div>
              <div className="contacts-info__item"><Clock size={22} /><div><h4>Часы работы</h4><p>{contacts.workHours}</p></div></div>
              <div className="contacts-socials">
                <h4>Мы в соцсетях</h4>
                <div className="contacts-socials__list">
                  <a href="#" className="contacts-social" aria-label="Instagram"><Instagram size={18} /> <span>Instagram</span></a>
                  <a href="#" className="contacts-social" aria-label="Telegram"><Send size={18} /> <span>Telegram</span></a>
                  <a href="#" className="contacts-social" aria-label="YouTube"><Youtube size={18} /> <span>YouTube</span></a>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200} className="contacts-form-wrap">
              {status === 'success' ? (
                <div className="contacts-form__success">
                  <CheckCircle size={48} className="contacts-form__success-icon" />
                  <h3>Сообщение отправлено</h3>
                  <p>Мы ответим вам в ближайшее время.</p>
                  <button onClick={() => { setStatus('idle'); setForm({ name: '', contact: '', message: '' }); }}>Отправить ещё</button>
                </div>
              ) : (
                <form className="contacts-form" onSubmit={handleSubmit} noValidate>
                  <h3 className="contacts-form__title">Оставить сообщение</h3>
                  <div className="form-field">
                    <label>Имя *</label>
                    <input type="text" value={form.name} onChange={handleChange('name')} className={errors.name ? 'is-invalid' : ''} />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-field">
                    <label>Телефон или email *</label>
                    <input type="text" value={form.contact} onChange={handleChange('contact')} className={errors.contact ? 'is-invalid' : ''} placeholder="+7... или email@..." />
                    {errors.contact && <span className="form-error">{errors.contact}</span>}
                  </div>
                  <div className="form-field">
                    <label>Сообщение *</label>
                    <textarea rows="5" value={form.message} onChange={handleChange('message')} className={errors.message ? 'is-invalid' : ''} />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>
                  <button type="submit" className="contacts-form__submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Отправка...' : 'Отправить сообщение'} <Send size={16} />
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>
          <AnimatedSection delay={300} className="contacts-map">
            <div className="contacts-map__placeholder">
              <MapPin size={48} />
              <h3>Карта расположения</h3>
              <p>Здесь будет интерактивная карта после публикации реального адреса.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}