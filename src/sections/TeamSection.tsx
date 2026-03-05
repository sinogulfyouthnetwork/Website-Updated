import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Leen Al-Rashid', role: 'Co-Founder & President', image: '/team_portrait_01.jpg' },
  { name: 'Chen Wei', role: 'Co-Founder & Programs Lead', image: '/team_portrait_02.jpg' },
  { name: 'Omar Al-Hashimi', role: 'Partnerships Director', image: '/team_portrait_03.jpg' },
  { name: 'Noor Al-Farsi', role: 'Community Lead', image: '/team_portrait_04.jpg' },
  { name: 'Zhang Yue', role: 'Communications Lead', image: '/team_portrait_05.jpg' },
  { name: 'Saud Al-Qahtani', role: 'Events Producer', image: '/team_portrait_06.jpg' },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      id="team"
      className="relative w-full bg-sgyn-navy py-20 px-6 lg:px-12 z-60"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 max-w-6xl mx-auto"
      >
        <div>
          <span className="micro-label text-sgyn-gold mb-3 block">
            Team | 团队 | الفريق
          </span>
          <h2 className="headline-lg text-white">Leadership</h2>
        </div>
        <p className="body-text-lg text-white/60 max-w-md md:text-right mt-4 md:mt-0">
          Built by a team across cities, disciplines, and cultures.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={member.name}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group"
          >
            {/* Image */}
            <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-4 relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sgyn-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* LinkedIn */}
              <a 
                href="#"
                className="absolute bottom-4 right-4 p-3 bg-sgyn-gold rounded-full text-sgyn-navy opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
            {/* Info */}
            <h3 className="font-display font-semibold text-xl text-white group-hover:text-sgyn-gold transition-colors">
              {member.name}
            </h3>
            <p className="text-white/50">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
