'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ReactNode } from 'react';
import Image from 'next/image';
import { IoBarbell, IoNutrition, IoStatsChart, IoPeople, IoTrophy, IoLocation } from 'react-icons/io5';

interface Feature {
  title: string;
  description: string;
  gradient: string;
  icon: ReactNode;
  screenshot: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Smart Workout Tracking',
    description: 'Log every rep, every set, every PR. Your workout diary on autopilot.',
    gradient: 'linear-gradient(135deg, #FF4538 0%, #FF6B5E 50%, #FF8A80 100%)',
    icon: <IoBarbell size={28} />,
    screenshot: '/screenshots/workout-tracking.png',
  },
  {
    title: 'Egyptian Nutrition Database',
    description: "1000+ local foods. From koshari to foul medames, we've got your macros covered.",
    gradient: 'linear-gradient(135deg, #FFB800 0%, #FF6B5E 50%, #FF4538 100%)',
    icon: <IoNutrition size={28} />,
    screenshot: '/screenshots/nutrition.png',
  },
  {
    title: 'Body Progress',
    description: 'Track every measurement. Watch your transformation unfold in real numbers.',
    gradient: 'linear-gradient(135deg, #4A9EFF 0%, #00D68F 50%, #4A9EFF 100%)',
    icon: <IoStatsChart size={28} />,
    screenshot: '/screenshots/calendar-stats.png',
  },
  {
    title: 'Social & Competitive',
    description: 'Train with friends. Share victories. Build your fitness tribe.',
    gradient: 'linear-gradient(135deg, #FF6B5E 0%, #FFB800 50%, #FF9F43 100%)',
    icon: <IoPeople size={28} />,
    screenshot: '/screenshots/community-feed.png',
  },
  {
    title: 'Achievement System',
    description: 'Unlock badges. Hit milestones. Turn discipline into trophies.',
    gradient: 'linear-gradient(135deg, #00D68F 0%, #4A9EFF 50%, #6C5CE7 100%)',
    icon: <IoTrophy size={28} />,
    screenshot: '/screenshots/streak-leaderboard.png',
  },
  {
    title: 'Gym Finder',
    description: 'Discover top-rated gyms near you with reviews from real lifters.',
    gradient: 'linear-gradient(135deg, #FF4538 0%, #FFB800 50%, #FF6348 100%)',
    icon: <IoLocation size={28} />,
    screenshot: '/screenshots/nearby-gyms.png',
  },
];

const DESKTOP_RADIUS = 320;
const TABLET_RADIUS = 240;
const CARD_W = 220;
const CARD_H = 469;

export default function TornadoFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardTransforms, setCardTransforms] = useState<
    { x: number; z: number; y: number; scale: number; opacity: number; blur: number; rotateY: number }[]
  >(FEATURES.map(() => ({ x: 0, z: 0, y: 0, scale: 0.7, opacity: 0.4, blur: 3, rotateY: 0 })));
  const currentThetaRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    check();
    setMounted(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const updateCards = useCallback((theta: number) => {
    const radius = isTablet ? TABLET_RADIUS : DESKTOP_RADIUS;
    let bestZ = -Infinity;
    let bestIdx = 0;

    const newTransforms = FEATURES.map((_, i) => {
      // Subtract so features progress 0→1→2→3→4→5 as scroll increases,
      // and cards visually sweep left-to-right through the front position
      const angle = theta - i * ((2 * Math.PI) / FEATURES.length);
      const x = radius * Math.sin(angle);
      const z = radius * Math.cos(angle);
      const y = 25 * Math.sin(angle * 0.5);
      const normalizedZ = (z + radius) / (2 * radius); // 0 (back) → 1 (front)

      // Front card gets dramatically larger, back cards shrink more
      const scale = 0.5 + normalizedZ * 0.55;
      const opacity = 0.15 + normalizedZ * 0.85;
      const blur = (1 - normalizedZ) * 6;
      const rotateY = -Math.sin(angle) * 20; // slight face rotation toward viewer

      if (z > bestZ) {
        bestZ = z;
        bestIdx = i;
      }

      return { x, z, y, scale, opacity, blur, rotateY };
    });

    setCardTransforms(newTransforms);
    setActiveIndex(bestIdx);
  }, [isTablet]);

  useEffect(() => {
    if (!mounted || isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    let running = true;

    const tick = () => {
      if (!running) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
      const targetTheta = progress * Math.PI * 2;

      currentThetaRef.current += (targetTheta - currentThetaRef.current) * 0.08;
      updateCards(currentThetaRef.current);

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      running = false;
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, isMobile, updateCards]);

  // Mobile carousel — only render after mount to avoid SSR/hydration mismatch on desktop
  if (mounted && isMobile) {
    // Phone mockup inner screen: 188px wide × 400px tall matches the 9:19 screenshot ratio
    const PHONE_OUTER_W = 200;
    const PHONE_OUTER_H = 412; // 6px padding each side: inner = 188×400

    return (
      <section ref={sectionRef} className="py-20" aria-label="Features" id="features">
        <h2
          className="text-3xl font-bold text-center mb-2 px-4"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          What Makes Thryv <span style={{ color: 'var(--brand-red)' }}>Different</span>
        </h2>
        <p className="text-center text-sm mb-10 px-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
          Swipe to explore
        </p>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 px-8 scrollbar-hide">
          {FEATURES.map((feature, i) => (
            <div key={i} className="snap-center shrink-0 flex flex-col items-center gap-4" style={{ width: PHONE_OUTER_W }}>
              {/* Phone mockup frame */}
              <div
                style={{
                  width: PHONE_OUTER_W,
                  height: PHONE_OUTER_H,
                  borderRadius: '36px',
                  background: '#111111',
                  padding: '6px',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 30px rgba(255,69,56,0.1), inset 0 0 0 1px rgba(255,255,255,0.12)',
                  flexShrink: 0,
                }}
              >
                <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: '31px' }}>
                  <Image
                    src={feature.screenshot}
                    alt={feature.title}
                    fill
                    className="object-cover object-top"
                    sizes="200px"
                  />
                </div>
              </div>

              {/* Feature info */}
              <div className="text-center px-1" style={{ width: PHONE_OUTER_W }}>
                <div className="flex items-center justify-center gap-2 mb-1.5" style={{ color: 'var(--brand-red)' }}>
                  {feature.icon}
                  <h3
                    className="text-sm font-bold"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop/Tablet tornado
  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '500vh' }}
      aria-label="Features"
      id="features"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden pt-16">
        <div className="w-full max-w-7xl mx-auto px-8 flex items-center">
          {/* Feature description — left panel */}
          <div className="w-[35%] pr-8 relative min-h-[260px]">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="absolute top-0 left-0 transition-all duration-500 ease-out"
                style={{
                  opacity: activeIndex === i ? 1 : 0,
                  transform: activeIndex === i ? 'translateY(0)' : 'translateY(24px)',
                  pointerEvents: activeIndex === i ? 'auto' : 'none',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(255,69,56,0.1)',
                    color: 'var(--brand-red)',
                    border: '1px solid rgba(255,69,56,0.2)',
                    opacity: activeIndex === i ? 1 : 0,
                    transform: activeIndex === i ? 'scale(1)' : 'scale(0.8)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  {feature.icon}
                </div>
                <h2
                  className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </h2>
                <p
                  className="text-base lg:text-lg leading-relaxed max-w-sm"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {feature.description}
                </p>

                {/* Progress dots */}
                <div className="flex gap-2 mt-8">
                  {FEATURES.map((_, j) => (
                    <div
                      key={j}
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: activeIndex === j ? '2.5rem' : '0.5rem',
                        background: activeIndex === j ? 'var(--brand-red)' : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3D tornado — right side, all orbiting cards */}
          <div
            className="w-[65%] relative flex items-center justify-center"
            style={{ perspective: '1400px', height: '700px' }}
          >
            {/* Subtle center glow */}
            <div
              className="absolute w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,69,56,0.12) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* All orbiting screenshot cards */}
            {FEATURES.map((feature, i) => {
              const t = cardTransforms[i];
              const isFront = activeIndex === i;

              return (
                <div
                  key={i}
                  className="absolute shadow-2xl"
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    transform: `translate3d(${t.x}px, ${t.y}px, 0px) scale(${t.scale}) rotateY(${t.rotateY}deg)`,
                    opacity: t.opacity,
                    filter: `blur(${t.blur}px)`,
                    zIndex: Math.round(t.z + DESKTOP_RADIUS),
                    transition: 'box-shadow 0.4s ease',
                    borderRadius: '36px',
                    background: '#111111',
                    padding: '6px',
                    boxShadow: isFront
                      ? '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,69,56,0.15), inset 0 0 0 1px rgba(255,255,255,0.12)'
                      : '0 10px 30px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Screen */}
                  <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: '31px' }}>
                    <Image
                      src={feature.screenshot}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      sizes="250px"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
