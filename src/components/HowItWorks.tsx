'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    icon: '📱',
    title: 'Sign Up',
    description: 'Create your profile in 30 seconds',
  },
  {
    icon: '🎯',
    title: 'Set Your Goals',
    description: 'Cut, bulk, or maintain — we calculate your macros',
  },
  {
    icon: '🚀',
    title: 'Start Thriving',
    description: 'Track workouts, food, and progress all in one place',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4"
      aria-label="How it works"
      id="how-it-works"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl sm:text-5xl font-bold text-center mb-16"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          How It Works
        </h2>

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-4">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-16 left-[15%] right-[15%] h-0.5"
            style={{ background: 'linear-gradient(to right, var(--brand-red), var(--molten))' }}
            aria-hidden="true"
          />
          {/* Vertical line on mobile */}
          <div
            className="md:hidden absolute top-16 bottom-16 left-1/2 w-0.5 -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, var(--brand-red), var(--molten))' }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <div
              key={i}
              className="relative z-10 flex-1 flex flex-col items-center text-center transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${i * 200}ms`,
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6"
                style={{ background: 'var(--bg-card)', border: '2px solid var(--brand-red)' }}
              >
                {step.icon}
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
              >
                {step.title}
              </h3>
              <p
                className="max-w-xs"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
