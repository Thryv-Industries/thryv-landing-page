export default function Footer() {
  return (
    <footer className="py-8 px-4" aria-label="Footer">
      {/* Gradient separator */}
      <div
        className="h-px max-w-5xl mx-auto mb-8"
        style={{
          background: 'linear-gradient(to right, transparent, var(--brand-red), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          &copy; 2026 Thryv Industries
        </p>

        <nav className="flex gap-6" aria-label="Social links">
          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="transition-colors hover:opacity-80"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {/* X / Twitter */}
          <a
            href="#"
            aria-label="X"
            className="transition-colors hover:opacity-80"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* TikTok */}
          <a
            href="#"
            aria-label="TikTok"
            className="transition-colors hover:opacity-80"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.88a8.26 8.26 0 004.76 1.5V6.94a4.85 4.85 0 01-1-.25z" />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
}
