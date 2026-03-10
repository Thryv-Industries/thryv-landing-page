'use client';

import { useEffect, useRef, useState } from 'react';

const COMMUNITY_STATS = [
  { number: '500+', label: 'Waitlist Members', icon: '🔥' },
  { number: '50+', label: 'Beta Testers', icon: '💪' },
  { number: '3K+', label: 'Instagram Followers', icon: '📸' },
];

const COMMUNITY_VOICES = [
  {
    quote: 'This app changed my gym routine completely. Nothing else comes close.',
    name: 'Ahmed K.',
    role: 'Beta Tester',
    avatar: '#FF4538',
  },
  {
    quote: "Finally, an app that knows what koshari is. My macros have never been more accurate.",
    name: 'Mariam S.',
    role: 'Nutrition Enthusiast',
    avatar: '#4A9EFF',
  },
  {
    quote: 'The collab workouts keep me accountable with my training partner. We compete daily.',
    name: 'Omar T.',
    role: 'Competitive Lifter',
    avatar: '#00D68F',
  },
  {
    quote: "I've tried every fitness app. Thryv is the first one that actually gets the Egyptian market.",
    name: 'Nour A.',
    role: 'Fitness Coach',
    avatar: '#FFB800',
  },
];

export default function Testimonials() {
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
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
      aria-label="Community"
      id="testimonials"
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,69,56,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--brand-red)' }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: 'var(--brand-red)', fontFamily: 'var(--font-body)' }}
            >
              Join the Movement
            </span>
            <div className="h-px w-10" style={{ background: 'var(--brand-red)' }} />
          </div>
          <h2
            className="text-3xl sm:text-5xl font-extrabold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            The Community is Already{' '}
            <span style={{ color: 'var(--brand-red)' }}>Thriving</span>
          </h2>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-16">
          {COMMUNITY_STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="text-3xl sm:text-4xl font-extrabold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
              >
                {stat.number}
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial cards — carousel on mobile, grid on desktop */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {COMMUNITY_VOICES.map((voice, i) => (
            <div
              key={i}
              className="glass-card snap-center shrink-0 p-6 flex flex-col justify-between transition-all duration-700"
              style={{
                width: 'calc(85vw)',
                minHeight: '200px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${300 + i * 150}ms`,
              }}
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FFB800">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-base leading-relaxed mb-5"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
                >
                  &ldquo;{voice.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: voice.avatar }}
                >
                  {voice.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                    {voice.name}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                    {voice.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-5">
          {COMMUNITY_VOICES.map((voice, i) => (
            <div
              key={i}
              className="glass-card p-7 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${300 + i * 150}ms`,
              }}
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FFB800">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                  </svg>
                ))}
              </div>
              <p
                className="text-base leading-relaxed mb-5"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
              >
                &ldquo;{voice.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: voice.avatar }}
                >
                  {voice.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                    {voice.name}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                    {voice.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
