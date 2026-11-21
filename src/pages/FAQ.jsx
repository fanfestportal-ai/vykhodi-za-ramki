import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import Accordion from '../components/Accordion';
import { faqItems } from '../data/faq';

export default function FAQ() {
  return (
    <main className="page faq-page">
      <section className="section faq-hero" style={{ paddingTop: '140px' }}>
        <div className="container">
          <AnimatedSection><SectionHeading eyebrow="Вопросы" title="Часто задаваемые вопросы" subtitle="Ответы на самые популярные вопросы о пространстве и занятиях." /></AnimatedSection>
          <AnimatedSection delay={100} style={{ maxWidth: '820px' }}>
            <Accordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}