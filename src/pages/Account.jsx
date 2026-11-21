import { Lock, Sparkles, Calendar, CreditCard, User } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import Star from '../components/Star';
import './Account.css';

const FUTURE_FEATURES = [
  { icon: User, title: 'Личные данные', text: 'Управление профилем и контактами' },
  { icon: CreditCard, title: 'Абонементы', text: 'Текущие абонементы и остаток занятий' },
  { icon: Calendar, title: 'История посещений', text: 'Все ваши занятия в одном месте' },
];

export default function Account() {
  return (
    <main className="page account-page">
      <section className="section account-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Кабинет" title="Личный кабинет" subtitle="Здесь будут абонементы, история посещений, запись на занятия и уведомления." /></AnimatedSection>
          <AnimatedSection delay={100} className="account-placeholder">
            <div className="account-placeholder__inner">
              <div className="account-placeholder__deco" aria-hidden="true"><Star size={48} /></div>
              <div className="account-placeholder__icon-wrap"><Lock size={48} /></div>
              <h2 className="account-placeholder__title">Личный кабинет готовится к запуску</h2>
              <p className="account-placeholder__text">Скоро здесь появится полноценный личный кабинет с записью на занятия, управлением абонементами и историей посещений.</p>
              <div className="account-placeholder__features">
                {FUTURE_FEATURES.map((f) => (
                  <div key={f.title} className="account-feature">
                    <f.icon size={22} />
                    <div><h4>{f.title}</h4><p>{f.text}</p></div>
                  </div>
                ))}
              </div>
              <div className="account-placeholder__note">
                <Sparkles size={18} />
                <span>Это демонстрационная страница. Реальная авторизация будет реализована на серверной стороне после подключения базы данных.</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}