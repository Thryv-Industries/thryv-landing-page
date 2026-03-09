'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ParticleCanvas from './ParticleCanvas';

const WORDS = ['TRACK.', 'MEASURE.', 'DOMINATE.'];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    setLoaded(true);

    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % WORDS.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,69,56,0.15) 0%, transparent 70%)',
          animation: 'hero-glow-pulse 6s ease-in-out infinite',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-1 h-[140%] pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--brand-red), transparent)',
          transform: 'rotate(-15deg) translateX(200px)',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0">
        <ParticleCanvas particleCount={80} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — Copy */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="h-px w-10" style={{ background: 'var(--brand-red)' }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: 'var(--brand-red)', fontFamily: 'var(--font-body)' }}
            >
              Coming Soon to Egypt
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tight transition-all duration-700 delay-100"
            style={{
              fontFamily: 'var(--font-heading)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>YOUR BODY</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>IS THE</span>
            <br />
            <span
              style={{
                color: 'var(--brand-red)',
                textShadow: '0 0 60px rgba(255,69,56,0.3)',
              }}
            >
              PROJECT
            </span>
            <span style={{ color: 'var(--brand-red)' }}>.</span>
          </h1>

          {/* Rotating words */}
          <div
            className="h-8 overflow-hidden transition-all duration-700 delay-200"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="flex items-center gap-3">
              {WORDS.map((word, i) => (
                <span
                  key={word}
                  className="text-lg font-semibold tracking-wide transition-all duration-500"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: activeWord === i ? 'var(--brand-red)' : 'var(--text-secondary)',
                    opacity: activeWord === i ? 1 : 0.35,
                    transform: activeWord === i ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg max-w-md leading-relaxed transition-all duration-700 delay-300"
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            The fitness platform Egypt has been waiting for. Workouts, nutrition, progress — all in one place.
          </p>

          {/* Waitlist Form */}
          <form
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md transition-all duration-700 delay-[400ms]"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Join the waitlist"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full text-sm outline-none transition-all focus:ring-2 focus:ring-red-500/40"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-body)',
              }}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all cursor-pointer hover:shadow-lg hover:shadow-red-500/30 hover:brightness-110 active:scale-95"
              style={{ background: 'var(--brand-red)', fontFamily: 'var(--font-body)' }}
            >
              Join the Waitlist
            </button>
          </form>

          {/* Social proof hint */}
          <div
            className="flex items-center gap-3 transition-all duration-700 delay-500"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {/* Stacked avatars */}
            <div className="flex -space-x-2">
              {['#FF4538', '#4A9EFF', '#00D68F', '#FFB800'].map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2"
                  style={{ background: color, borderColor: 'var(--bg-deep)' }}
                />
              ))}
            </div>
            <span
              className="text-xs"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              500+ already on the waitlist
            </span>
          </div>
        </div>

        {/* Right — Visual element */}
        <div
          className="relative hidden lg:flex items-center justify-center mr-[-1rem] transition-all duration-1000 delay-300"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateX(0)' : 'translateX(60px)',
          }}
        >
          {/* Decorative rings */}
          <div
            className="absolute w-80 h-80 rounded-full border opacity-10"
            style={{ borderColor: 'var(--brand-red)' }}
            aria-hidden="true"
          />
          <div
            className="absolute w-[450px] h-[450px] rounded-full border opacity-5"
            style={{ borderColor: 'var(--brand-red)' }}
            aria-hidden="true"
          />

          {/* Phone mockup */}
          <div
            className="relative w-67.5 h-143.5 rounded-3xl overflow-hidden"
            style={{
              animation: 'float 5s ease-in-out infinite',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,69,56,0.1)',
            }}
          >
            <Image
              src="/screenshots/workout-tracking.png"
              alt="Thryv workout tracking screen"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating stat cards */}
          <div
            className="absolute -left-8 top-16 glass-card px-4 py-3 hover:transform-none"
            style={{
              animation: 'float 4s ease-in-out infinite',
              animationDelay: '-1s',
            }}
          >
            <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>Today&apos;s Calories</div>
            <div className="text-lg font-bold" style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-heading)' }}>2,340 kcal</div>
          </div>
          <div
            className="absolute -right-4 bottom-28 glass-card px-4 py-3 hover:transform-none"
            style={{
              animation: 'float 4s ease-in-out infinite',
              animationDelay: '-2.5s',
            }}
          >
            <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>New PR!</div>
            <div className="text-lg font-bold" style={{ color: 'var(--brand-red)', fontFamily: 'var(--font-heading)' }}>Bench 100kg</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animation: 'bounce-down 2s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
