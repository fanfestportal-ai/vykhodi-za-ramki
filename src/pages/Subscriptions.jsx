import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import SubscriptionCard from '../components/SubscriptionCard';
import { subscriptions } from '../data/subscriptions';
import './Subscriptions.css';

export default function Subscriptions() {
  const [selectedVariant, setSelectedVariant] = useState('all');
  const filteredSubscriptions = selectedVariant === 'all' ? subscriptions : subscriptions.filter((s) => s.variant === selectedVariant);

  return (
    <main className="page subscriptions-page">
      <section className="section subscriptions-hero">
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Абонементы" title="Абонементы и цены" subtitle="Выберите формат, который подходит вам. Все цены уточняются при оформлении." /></AnimatedSection>
          <AnimatedSection delay={100} className="subscriptions-variants">
            <button className={`subscriptions-variant ${selectedVariant === 'all' ? 'is-active' : ''}`} onClick={() => setSelectedVariant('all')}>Все варианты</button>
            <button className={`subscriptions-variant ${selectedVariant === 'milk' ? 'is-active' : ''}`} onClick={() => setSelectedVariant('milk')} style={{ '--variant-bg': '#F5F0EC', '--variant-fg': '#74152F' }}>Молочный</button>
            <button className={`subscriptions-variant ${selectedVariant === 'burgundy' ? 'is-active' : ''}`} onClick={() => setSelectedVariant('burgundy')} style={{ '--variant-bg': '#74152F', '--variant-fg': '#F5F0EC' }}>Бордовый</button>
            <button className={`subscriptions-variant ${selectedVariant === 'blue' ? 'is-active' : ''}`} onClick={() => setSelectedVariant('blue')} style={{ '--variant-bg': '#B9C7D2', '--variant-fg': '#343238' }}>Голубой</button>
            <button className={`subscriptions-variant ${selectedVariant === 'graphite' ? 'is-active' : ''}`} onClick={() => setSelectedVariant('graphite')} style={{ '--variant-bg': '#343238', '--variant-fg': '#F5F0EC' }}>Графит</button>
          </AnimatedSection>
          <div className="subscriptions-grid">
            {filteredSubscriptions.map((sub, i) => (
              <AnimatedSection key={sub.id} delay={i * 80}>
                <SubscriptionCard subscription={sub} highlighted={sub.highlighted} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={200} className="subscriptions-info">
            <div className="subscriptions-info__card">
              <h3 className="subscriptions-info__title">Условия использования</h3>
              <ul className="subscriptions-info__list">
                <li>Абонемент действует с момента активации</li>
                <li>Возможна заморозка на срок, указанный в условиях абонемента</li>
                <li>Перенос абонемента на другое лицо не предусмотрен</li>
                <li>Подробности уточняйте у администратора</li>
              </ul>
            </div>
            <div className="subscriptions-info__card">
              <h3 className="subscriptions-info__title">Подарочные сертификаты</h3>
              <p className="subscriptions-info__text">Подарите движение близким. Сертификат можно оформить на любую сумму или конкретное количество занятий. Срок действия — 6 месяцев.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}