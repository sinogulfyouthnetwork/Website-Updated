import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, GraduationCap, Landmark, Utensils, BookOpen, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Partner {
  name: string;
  type: string;
  icon: React.ReactNode;
}

const partners: Partner[] = [
  { name: 'Yenching Academy', type: 'Academic', icon: <GraduationCap size={28} /> },
  { name: 'NYU Abu Dhabi', type: 'Academic', icon: <GraduationCap size={28} /> },
  { name: 'NYU Shanghai', type: 'Academic', icon: <GraduationCap size={28} /> },
  { name: 'Columbia University', type: 'Academic', icon: <GraduationCap size={28} /> },
  { name: 'UAE Permanent Mission', type: 'Diplomatic', icon: <Landmark size={28} /> },
  { name: 'UAE Youth Delegates', type: 'Diplomatic', icon: <Globe size={28} /> },
  { name: 'UAE Society NYC', type: 'Community', icon: <Building2 size={28} /> },
  { name: 'Qanateer', type: 'Cultural', icon: <BookOpen size={28} /> },
  { name: 'House of Wisdom', type: 'Cultural', icon: <BookOpen size={28} /> },
  { name: 'Al Khaleej Mandi', type: 'Cultural', icon: <Utensils size={28} /> },
];

const PartnersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Logos animation
      logosRef.current.forEach((logo, index) => {
        if (!logo) return;
        gsap.fromTo(
          logo,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: logo,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-sgyn-navy py-20 px-6 lg:px-12 z-70"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 max-w-6xl mx-auto"
      >
        <div>
          <span className="micro-label text-sgyn-gold mb-3 block">
            Partners | 合作伙伴 | الشركاء
          </span>
          <h2 className="headline-lg text-white">Our Partners</h2>
        </div>
        <p className="body-text-lg text-white/60 max-w-md md:text-right mt-4 md:mt-0">
          Organizations that help us open doors and create opportunities.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {partners.map((partner, index) => (
          <div
            key={partner.name}
            ref={(el) => { logosRef.current[index] = el; }}
            className="group flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-sgyn-gold/10 hover:border-sgyn-gold/30 transition-all duration-300"
          >
            <div className="text-sgyn-gold mb-3 group-hover:scale-110 transition-transform duration-300">
              {partner.icon}
            </div>
            <span className="text-sm font-medium text-white text-center leading-tight">
              {partner.name}
            </span>
            <span className="text-xs text-white/40 mt-1">
              {partner.type}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
