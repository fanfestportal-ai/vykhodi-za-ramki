import { useState } from 'react';
import { Check, RotateCw } from 'lucide-react';
import { SUBSCRIPTION_VARIANTS } from '../data/subscriptions';
import './SubscriptionCard.css';
export default function SubscriptionCard({ subscription, highlighted = false }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const variant = SUBSCRIPTION_VARIANTS.find((v) => v.id === subscription.variant) || SUBSCRIPTION_VARIANTS[0];
  return (
    <div className={`sub-card ${highlighted ? 'sub-card--highlighted' : ''}`}>
      <div className={`sub-card__inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="sub-card__front" style={{ background: variant.bg, color: variant.fg }}>
          <div className="sub-card__content">
            <h3 className="sub-card__title">{subscription.title}</h3>
            <p className="sub-card__desc">{subscription.description}</p>
            <div className="sub-card__price"><span className="sub-card__price-label">{subscription.price}</span></div>
            <ul className="sub-card__features">
              {subscription.features.map((feature, i) => (
                <li key={i} className="sub-card__feature"><Check size={16} className="sub-card__feature-icon" /><span>{feature}</span></li>
              ))}
            </ul>
            <button className="sub-card__flip-btn" onClick={() => setIsFlipped(!isFlipped)}><RotateCw size={16} /><span>Перевернуть</span></button>
          </div>
        </div>
        <div className="sub-card__back" style={{ background: variant.bg, color: variant.fg }}>
          <div className="sub-card__back-content">
            <h4 className="sub-card__back-title">{subscription.title}</h4>
            <div className="sub-card__info-grid">
              <div className="sub-card__info-item"><span className="sub-card__info-label">Владелец</span><span className="sub-card__info-value">_________________</span></div>
              <div className="sub-card__info-item"><span className="sub-card__info-label">Срок</span><span className="sub-card__info-value">__.__.____ — __.__.____</span></div>
            </div>
            <div className="sub-card__marks">
              <span className="sub-card__marks-label">Отметки</span>
              <div className="sub-card__marks-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="sub-card__mark">
                    <svg viewBox="0 0 40 40" className="sub-card__mark-svg">
                      {i % 2 === 0 ? <ellipse cx="20" cy="20" rx="14" ry="10" fill="currentColor" opacity="0.3" /> : <rect x="8" y="12" width="24" height="16" rx="3" fill="currentColor" opacity="0.3" />}
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <button className="sub-card__flip-btn" onClick={() => setIsFlipped(!isFlipped)}><RotateCw size={16} /><span>Перевернуть</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}