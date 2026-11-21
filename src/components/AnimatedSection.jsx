import { useEffect, useRef } from 'react';
export default function AnimatedSection({ children, className = '', animation = 'fade-up', delay = 0, as: Tag = 'section', id }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { el.classList.add('is-visible'); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('is-visible'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  const animClass = animation === 'fade' ? 'anim-fade' : animation === 'slide-left' ? 'anim-slide-left' : animation === 'slide-right' ? 'anim-slide-right' : 'anim-fade-up';
  return <Tag ref={ref} className={`${animClass} ${className}`} id={id}>{children}</Tag>;
}