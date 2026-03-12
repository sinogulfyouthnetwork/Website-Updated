import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  image: string;
  initials: string;
  accentColor: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Gloria Tsang',
    role: 'Founder & Executive Director',
    image: 'gloria_headshot.JPG',
    initials: 'GT',
    accentColor: '#e4ab55',
    linkedin: 'https://www.linkedin.com/in/gloria-tsang/',
  },
  {
    name: 'Abdulla Alhemiri',
    role: 'Deputy Director',
    image: 'abdulla_picture.jpg',
    initials: 'AA',
    accentColor: '#1846ed',
    linkedin: 'https://www.linkedin.com/in/abdulla-alhemeiri-b46292215?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADZTFOYBC62QsRxTzOr9AwyXVP2lrNwcm_w&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3BCh9c%2FFfsTCGzNde7w1EjIg%3D%3D',
  },
  {
    name: 'Huayi Shen',
    role: 'KSA Head of Programs & Partnerships',
    image: 'huayi_headshot.JPG',
    initials: 'HS',
    accentColor: '#e4ab55',
    linkedin: 'https://www.linkedin.com/in/huayishen/',
  },
  {
    name: 'Salmeen Binmafooz',
    role: 'KSA Chief of Staff',
    image: 'salmeen_headshot.jpg',
    initials: 'SB',
    accentColor: '#1846ed',
    linkedin: 'https://www.linkedin.com/in/salmeen-binmahfooz-84b046219/',
  },
  {
    name: 'Ghalia',
    role: 'Jeddah Lead',
    image: 'ghalia_headshot.jpg',
    initials: 'GH',
    accentColor: '#e4ab55',
    linkedin: 'https://www.linkedin.com/in/galiah-badokhon-648659202?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    name: 'Cindy',
    role: 'Shanghai Lead',
    image: 'cindy_pfp.jpg',
    initials: 'CI',
    accentColor: '#1846ed',
    linkedin: 'https://www.linkedin.com/in/itscindyli/',
  },
  {
    name: 'Bowen',
    role: 'NYC Lead',
    image: 'Bowen_pfp.jpg',
    initials: 'BW',
    accentColor: '#e4ab55',
    linkedin: 'https://www.linkedin.com/in/bowengucu/',
  },
];

// Fallback avatar component when image fails to load
const AvatarFallback = ({ initials, accentColor }: { initials: string; accentColor: string }) => (
  <div
    className="w-full h-full flex items-center justify-center"
    style={{ background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}44 100%)` }}
  >
    <span
      className="font-display font-bold text-4xl"
      style={{ color: accentColor }}
    >
      {initials}
    </span>
  </div>
);

const TeamMemberCard = ({
  member,
  cardRef,
}: {
  member: TeamMember;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const handleImgError = () => {
    if (imgRef.current) imgRef.current.style.display = 'none';
    if (fallbackRef.current) fallbackRef.current.style.display = 'flex';
  };

  return (
    <div ref={cardRef} className="group">
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 relative bg-sgyn-navy-light">
        {/* Fallback avatar (hidden by default) */}
        <div ref={fallbackRef} className="absolute inset-0" style={{ display: 'none' }}>
          <AvatarFallback initials={member.initials} accentColor={member.accentColor} />
        </div>

        {/* Photo */}
        <img
          ref={imgRef}
          src={member.image}
          alt={member.name}
          onError={handleImgError}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sgyn-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* LinkedIn icon */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 p-2.5 bg-sgyn-gold rounded-full text-sgyn-navy opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <Linkedin size={18} />
          </a>
        )}
      </div>

      {/* Info */}
      <h3 className="font-display font-semibold text-lg text-white group-hover:text-sgyn-gold transition-colors leading-tight">
        {member.name}
      </h3>
      <p className="text-white/50 text-sm mt-1 leading-snug">{member.role}</p>
    </div>
  );
};

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.07,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
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
          <h2 className="headline-lg text-white">Our Team</h2>
        </div>
        <p className="body-text-lg text-white/60 max-w-md md:text-right mt-4 md:mt-0">
          A team across Beijing, Jeddah, Shanghai, and New York — united by one mission.
        </p>
      </div>

      {/* Team Grid — 4 cols on large, 2 on medium, 1 on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={member.name}
            member={member}
            index={index}
            cardRef={(el) => { cardsRef.current[index] = el; }}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
