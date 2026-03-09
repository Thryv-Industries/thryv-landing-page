'use client';

import { FaApple, FaGooglePlay } from 'react-icons/fa';
import ParticleCanvas from './ParticleCanvas';

export default function FinalCTA() {
  return (
    <section
      className="relative py-32 px-4 overflow-hidden"
      aria-label="Join the waitlist"
      id="cta"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="absolute inset-0">
        <ParticleCanvas particleCount={50} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
        <h2
          className="text-4xl sm:text-6xl font-bold"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          Ready to{' '}
          <span style={{ color: 'var(--brand-red)' }}>Thryv</span>?
        </h2>

        <form
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Join the waitlist"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-full text-sm outline-none transition-all focus:ring-2"
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            aria-label="Email address"
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-full font-semibold text-sm text-white transition-all cursor-pointer hover:shadow-lg hover:shadow-red-500/30"
            style={{ background: 'var(--brand-red)', fontFamily: 'var(--font-body)' }}
          >
            Join the Waitlist
          </button>
        </form>

        {/* App store badges */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all hover:border-white/20"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <FaApple size={28} style={{ color: 'var(--text-primary)' }} />
            <div className="text-left">
              <div className="text-[10px] leading-tight" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                Coming Soon on the
              </div>
              <div className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                App Store
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all hover:border-white/20"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <FaGooglePlay size={24} style={{ color: 'var(--text-primary)' }} />
            <div className="text-left">
              <div className="text-[10px] leading-tight" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                Coming Soon on
              </div>
              <div className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                Google Play
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
