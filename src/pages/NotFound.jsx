import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

export default function NotFound() {
  return (
    <main className="page" style={{ paddingTop: '140px', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <AnimatedSection>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '6rem', color: 'var(--color-burgundy)', lineHeight: 1 }}>404</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1rem' }}>Страница вышла за рамки</h1>
          <p style={{ opacity: 0.75, marginBottom: '2rem' }}>Такой страницы не существует. Возможно, она ещё появится.</p>
          <Link to="/" style={{ padding: '0.9rem 1.8rem', background: 'var(--color-burgundy)', color: 'var(--color-milk)', borderRadius: '999px', display: 'inline-block' }}>На главную</Link>
        </AnimatedSection>
      </div>
    </main>
  );
}