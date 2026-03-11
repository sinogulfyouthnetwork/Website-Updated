import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, Users, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2
      );

      tl.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.4
      );

      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );

      tl.fromTo(
        '.hero-stat',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        0.8
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            gsap.set('.hero-title, .hero-subtitle, .hero-cta, .hero-stat', {
              opacity: 1,
              y: 0,
            });
          },
        },
      });

      // Exit animation
      scrollTl.fromTo(
        '.hero-content',
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-8vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        '.hero-stat',
        { opacity: 1, y: 0 },
        { opacity: 0, y: '6vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToPrograms = () => {
    const element = document.querySelector('#programs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: <Globe size={24} />, value: '8+', label: 'Cities' },
    { icon: <Users size={24} />, value: '200+', label: 'Members' },
    { icon: <Handshake size={24} />, value: '15+', label: 'Partners' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-hero overflow-hidden z-10"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-sgyn-blue blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-sgyn-gold blur-3xl" />
      </div>

      {/* Mountain silhouette decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full">
          <path 
            d="M0 120L240 40L480 100L720 20L960 80L1200 50L1440 90V120H0Z" 
            fill="white"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div 
        ref={contentRef}
        className="hero-content relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24"
      >
        {/* Logo Large */}
        <div className="mb-8">
          <img 
            src="updatedLogo.jpeg" 
            alt="SGYN" 
            className="h-24 md:h-32 w-auto object-contain"
          />
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
            onClick={() => document.querySelector('#newsletter')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            Join the Network
          </button>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className="hero-stat flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-sgyn-gold mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-display font-bold text-white">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
