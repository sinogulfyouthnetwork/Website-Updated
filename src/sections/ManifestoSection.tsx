import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, MessageCircle, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: <Target size={32} />,
    title: 'Cultural Bridges',
    description: 'Bridging Chinese and Khaleeji cultures through community events, language study, and creative programming.',
  },
  {
    icon: <MessageCircle size={32} />,
    title: 'Interregional Dialogue',
    description: 'Hosting shared academic and informal spaces for youth diplomacy and cross-regional discussion.',
  },
  {
    icon: <Briefcase size={32} />,
    title: 'Professional Development',
    description: 'Building pathways for youth in China-GCC industries through mentorship, training, and collaboration.',
  },
];

const ManifestoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
        },
      });

      // Phase 1: Entrance
      scrollTl.fromTo(
        '.manifesto-label',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        '.manifesto-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        '.manifesto-desc',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        '.pillar-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.15
      );

      // Phase 3: Exit
      scrollTl.fromTo(
        '.manifesto-content',
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        '.pillar-card',
        { opacity: 1, y: 0 },
        { opacity: 0, y: '8vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative w-full h-screen bg-sgyn-navy overflow-hidden z-20"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-sgyn-gold blur-3xl" />
      </div>

      <div 
        ref={contentRef}
        className="manifesto-content relative z-10 h-full flex flex-col items-center justify-center px-6"
      >
        {/* Label */}
        <span className="manifesto-label micro-label text-sgyn-gold mb-4">
          About Us | 关于我们 | نبذة عنا
        </span>

        {/* Title */}
        <h2 className="manifesto-title headline-lg text-white text-center max-w-4xl mb-6">
          We Connect and Empower Young Leaders Across{' '}
          <span className="text-sgyn-gold">China</span> and the{' '}
          <span className="text-sgyn-gold">Gulf</span>
        </h2>

        {/* Description */}
        <p className="manifesto-desc text-center body-text-lg text-white/70 max-w-3xl mb-12">
          Formed in December 2024 in Shanghai, SGYN has expanded to 8+ cities, 
          leading initiatives that foster cultural understanding, professional exchange, 
          and creative collaboration.
        </p>

        {/* Pillars */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
        >
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="pillar-card card-glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-sgyn-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                {pillar.icon}
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
