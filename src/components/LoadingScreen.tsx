'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: 'var(--bg-deep)',
        animation: 'fade-out 0.5s ease forwards 1s',
      }}
      aria-hidden="true"
    >
      <h1
        className="text-5xl font-bold tracking-widest"
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--brand-red)',
          animation: 'pulse-glow 1.5s ease-in-out infinite',
        }}
      >
        THRYV
      </h1>
    </div>
  );
}
