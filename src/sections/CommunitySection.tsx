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
      // Background image
      gsap.fromTo(
        '.community-image',
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.community-image',
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Label
      gsap.fromTo(
        '.community-label',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.community-label',
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Title
      gsap.fromTo(
        '.community-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.community-title',
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // City tags staggered
      gsap.fromTo(
        '.city-tag',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.city-tag',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Stats
      gsap.fromTo(
        '.community-stats',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.community-stats',
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-sgyn-navy z-40 py-24"
    >
      {/* Background Image */}
      <div className="community-image absolute inset-0">
        <img
          src="Members-Image.JPG"
          alt="SGYN Community"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sgyn-navy via-sgyn-navy/80 to-sgyn-navy/60" />
      </div>

      <div className="community-content relative z-10 min-h-screen flex flex-col items-center justify-start px-6 pt-40">
        <span className="community-label micro-label text-sgyn-gold mb-4">
          Presence | 活跃于 | الحضور
        </span>

        <h2 className="community-title headline-lg text-white text-center max-w-3xl mb-8">
          Find Our Members <span className="text-sgyn-gold">Around the World</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
          {cities.map((city, index) => (
            <div
              key={index}
              className="city-tag group relative px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-sgyn-gold/20 hover:border-sgyn-gold/50 transition-all duration-300 cursor-default"
            >
              <span className="font-display font-semibold text-white group-hover:text-sgyn-gold transition-colors">
                {city.name}
              </span>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-sgyn-navy-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs text-white/80">{city.nameCn} | {city.nameAr}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="community-stats mt-12 flex gap-12">
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-sgyn-gold">8+</div>
            <div className="text-sm text-white/60">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-sgyn-gold">3</div>
            <div className="text-sm text-white/60">Regions</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-sgyn-gold">100+</div>
            <div className="text-sm text-white/60">Members</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;