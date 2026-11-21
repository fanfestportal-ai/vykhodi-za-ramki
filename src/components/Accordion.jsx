import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';
export default function Accordion({ items = [] }) {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(openId === id ? null : id);
  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <button className="accordion__trigger" onClick={() => toggle(item.id)} aria-expanded={isOpen}>
              <span className="accordion__title">{item.question}</span>
              <ChevronDown className="accordion__chevron" aria-hidden="true" />
            </button>
            <div className="accordion__content" role="region" aria-hidden={!isOpen}>
              <div className="accordion__body"><p>{item.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}