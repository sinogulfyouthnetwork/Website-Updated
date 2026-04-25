import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);
      tl.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4);
      tl.fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
      tl.fromTo('.hero-stat', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.8);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToPrograms = () => {
    document.querySelector('#our-programs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-hero overflow-hidden z-10"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <img src="GridImage4.jpeg" alt="background" className="w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-sgyn-navy/80 via-sgyn-navy/40 to-sgyn-navy/20" />
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="hero-content relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24"
      >
        {/* Logo Large */}
        <div className="mb-8" style={{ marginLeft: '-80px' }}>
          <img src="SGYNBanner.svg" alt="SGYN" className="h-24 md:h-32 w-auto object-contain" />
        </div>

        {/* Tagline */}
        <h1 className="hero-title text-center headline-lg text-white max-w-4xl mb-6">
          Building Bridges Between{' '}
          <span className="text-sgyn-gold">China</span> and the{' '}
          <span className="text-sgyn-gold">Gulf</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-center body-text-lg text-white/70 max-w-2xl mb-10">
          A youth-led network connecting young leaders across cultures, industries, and policy
          to shape a new chapter of partnership between both regions.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-16">
          <button onClick={scrollToPrograms} className="btn-primary">
            Explore Programs
            <ArrowRight size={18} className="ml-2" />
          </button>
          <button
            onClick={() => document.querySelector('#GetInvolved')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            Join the Network
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;