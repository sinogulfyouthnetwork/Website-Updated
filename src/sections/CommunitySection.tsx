import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cities = [
  { name: 'Beijing', nameCn: '北京', nameAr: 'بكين' },
  { name: 'Shanghai', nameCn: '上海', nameAr: 'شنغهاي' },
  { name: 'Jeddah', nameCn: '吉达', nameAr: 'جدة' },
  { name: 'Riyadh', nameCn: '利雅得', nameAr: 'الرياض' },
  { name: 'Abu Dhabi', nameCn: '阿布扎比', nameAr: 'أبوظبي' },
  { name: 'Dubai', nameCn: '迪拜', nameAr: 'دبي' },
  { name: 'Dammam', nameCn: '达曼', nameAr: 'الدمام' },
  { name: 'New York', nameCn: '纽约', nameAr: 'نيويورك' },
];

const CommunitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        '.community-label',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        '.community-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        '.community-image',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        '.city-tag',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.2
      );

      // Phase 3: Exit
      scrollTl.fromTo(
        '.community-content',
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        '.community-image',
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 1.05, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-sgyn-navy overflow-hidden z-40"
    >
      {/* Background Image */}
      <div className="community-image absolute inset-0">
        <img 
          src="community_bottom_wide_event.jpg"
          alt="SGYN Community"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sgyn-navy via-sgyn-navy/80 to-sgyn-navy/60" />
      </div>

      <div className="community-content relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Label */}
        <span className="community-label micro-label text-sgyn-gold mb-4">
          Presence | 活跃于 | الحضور
        </span>

        {/* Title */}
        <h2 className="community-title headline-lg text-white text-center max-w-3xl mb-8">
          Find Our Members <span className="text-sgyn-gold">Around the World</span>
        </h2>

        {/* Cities Grid */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
          {cities.map((city, index) => (
            <div 
              key={index}
              className="city-tag group relative px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-sgyn-gold/20 hover:border-sgyn-gold/50 transition-all duration-300 cursor-default"
            >
              <span className="font-display font-semibold text-white group-hover:text-sgyn-gold transition-colors">
                {city.name}
              </span>
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-sgyn-navy-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs text-white/80">{city.nameCn} | {city.nameAr}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex gap-12">
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-sgyn-gold">8+</div>
            <div className="text-sm text-white/60">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-sgyn-gold">3</div>
            <div className="text-sm text-white/60">Regions</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-sgyn-gold">200+</div>
            <div className="text-sm text-white/60">Members</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
