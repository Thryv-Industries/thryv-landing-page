'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Community', href: '#testimonials' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-300 ${
        scrolled ? 'header-glass py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-extrabold tracking-wider"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-red)' }}
        >
          THRYV
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-100"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-500/25"
            style={{
              background: 'var(--brand-red)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
            }}
          >
            Join Waitlist
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              background: 'var(--text-primary)',
              transform: mobileOpen ? 'rotate(45deg) translate(2.5px, 2.5px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--text-primary)',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              background: 'var(--text-primary)',
              transform: mobileOpen ? 'rotate(-45deg) translate(2.5px, -2.5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="md:hidden header-glass mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-4"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium py-2"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="px-5 py-3 rounded-full text-sm font-semibold text-center mt-2"
            style={{ background: 'var(--brand-red)', color: '#fff', fontFamily: 'var(--font-body)' }}
            onClick={() => setMobileOpen(false)}
          >
            Join Waitlist
          </a>
        </nav>
      )}
    </header>
  );
}
