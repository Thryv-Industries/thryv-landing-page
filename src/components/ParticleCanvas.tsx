'use client';

import { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
  fadeDirection: number;
}

export default function ParticleCanvas({
  particleCount = 60,
  colors = ['#FF4538', '#FF6B5E', '#FFB800', '#FF9187'],
  className = '',
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.8 + 0.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.1,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.fadeDirection * 0.005;

        if (p.opacity <= 0.1 || p.opacity >= 0.7) {
          p.fadeDirection *= -1;
        }

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [particleCount, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas absolute inset-0 pointer-events-none ${className}`}
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
}
