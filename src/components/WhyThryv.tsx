'use client';

import { useEffect, useRef, useState } from 'react';

const FEATURES = [
  {
    title: 'Smart Workout Logging',
    description: 'Every rep, set, and PR — tracked automatically so you never lose progress.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 17.5h11M3 12h2m14 0h2M4.5 6.5a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2zM15.5 6.5a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    title: '1000+ Egyptian Foods',
    description: 'Koshari, foul, ta\'meya — accurate macros for the food you actually eat.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6 2 10c0 2.5 1.5 4.7 3.8 6L4 22l3.5-2.5C8.8 19.8 10.3 20 12 20c5.52 0 10-4 10-8s-4.48-8-10-8z" />
      </svg>
    ),
  },
  {
    title: 'Body Measurements',
    description: 'Track every metric. See your transformation backed by real data.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 16l4-8 4 5 5-9" />
      </svg>
    ),
  },
  {
    title: 'Collab Workouts',
    description: 'Train with friends in real-time. Compete, motivate, dominate together.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Achievement System',
    description: 'Badges, milestones, streaks. Discipline turned into trophies.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    title: 'Gym Finder',
    description: 'Discover top gyms near you with ratings from real lifters.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function WhyThryv() {
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
      className="py-24 px-4"
      aria-label="Everything you need"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — heading + description */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: 'var(--brand-red)' }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: 'var(--brand-red)', fontFamily: 'var(--font-body)' }}
            >
              All-in-One
            </span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            Everything You Need.
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>Nothing You Don&apos;t.</span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-md mb-8"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            No bloat. No fluff. Just the tools that actually move the needle — designed for how Egyptians train and eat.
          </p>

          {/* Pill badges */}
          <div className="flex flex-wrap gap-2">
            {['Free During Beta', 'No Ads', 'Offline Mode'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(255,69,56,0.1)',
                  color: 'var(--brand-red)',
                  border: '1px solid rgba(255,69,56,0.2)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — feature checklist */}
        <div className="flex flex-col gap-1">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-500 hover:bg-white/[0.03]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transitionDelay: `${200 + i * 100}ms`,
              }}
            >
              {/* Icon */}
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                style={{
                  background: 'rgba(255,69,56,0.08)',
                  color: 'var(--brand-red)',
                  border: '1px solid rgba(255,69,56,0.15)',
                }}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <div>
                <h3
                  className="text-base font-bold mb-0.5"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Checkmark */}
              <div
                className="shrink-0 ml-auto mt-1"
                style={{ color: 'var(--accent-green)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
