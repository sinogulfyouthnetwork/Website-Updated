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
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Gloria Tsang',
    role: 'Founder & Executive Director',
    image: 'gloria_headshot.JPG',
    initials: 'GT',
    accentColor: '#e4ab55',
    linkedin: 'https://www.linkedin.com/in/g-tsang/',
    bio: "Gloria leads SGYN with over eight years of experience in global youth advocacy, and a background spanning fintech at Morgan Stanley and industries across the UAE and Saudi Arabia. A NYC native with Hong Kong roots, she has studied and worked across London, the GCC, and Southeast Asia. She's currently a Yenching Scholar at Peking University, furthering her research on China-MENA relations and Gulf geopolitics. Her youth leadership has been recognised by organisations including WFUNA and Gulf Intelligence, which named her one of the Top 100 Sustainability Voices in the Middle East for her role in organizing the Student Energy Summit 2023 in Abu Dhabi, held adjacent to COP28.",
  },
  {
    name: 'Abdulla Alhemiri',
    role: 'Deputy Director',
    image: 'abdulla_picture.jpg',
    initials: 'AA',
    accentColor: '#1846ed',
    linkedin: 'https://www.linkedin.com/in/abdulla-alhemeiri-b46292215?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADZTFOYBC62QsRxTzOr9AwyXVP2lrNwcm_w&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3BCh9c%2FFfsTCGzNde7w1EjIg%3D%3D',
    bio: "Abdulla is one of the few Emirati professionals with deep on-the-ground experience on both sides of the China-Gulf relationship. He joined SGYN’s leadership team as a Yenching Scholar at Peking University, studying Economics and Management and was the first GCC national admitted to the programme. His research examines China's economic reach into the Gulf through the UAE as a strategic intermediary. He also previously served as a Political Analyst at the UAE Embassy in Beijing.",
  },
  {
    name: 'Huayi Shen',
    role: 'KSA Head of Programs & Partnerships',
    image: 'huayi_headshot.JPG',
    initials: 'HS',
    accentColor: '#e4ab55',
    linkedin: 'https://www.linkedin.com/in/huayishen/',
    bio: "Huayi designed and leads SGYN's LAB programme and oversees partnerships across China and Saudi Arabia. He holds a degree in Arabic with studies at UIBE, Cairo University, and AUC, and has experience in communications and media through internships at China Media Group and the UIBE Media Center. Based in Saudi Arabia, he works in logistics for a Chinese-Saudi joint venture. He also founded one of RedNote's growing communities for Chinese expats in the Gulf.",
  },
  {
    name: 'Salmeen Binmafooz',
    role: 'KSA Chief of Staff',
    image: 'salmeen_headshot_2.JPG',
    initials: 'SB',
    accentColor: '#1846ed',
    linkedin: 'https://www.linkedin.com/in/salmeen-binmahfooz-84b046219/',
    bio: "Salmeen has been at the centre of SGYN's Saudi operations since the beginning — co-organising the network's first events in the Kingdom and building its entire digital infrastructure from the ground up. He studies Management Information Systems at KFUPM. Outside of SGYN, he's a former Youth Brazilian Jiu-Jitsu World Champion and competes with the Saudi Dodgeball Federation.",
  },
  {
    name: 'Ghalia Badokhon',
    role: 'Jeddah Lead',
    image: 'ghalia_headshot.jpg',
    initials: 'GH',
    accentColor: '#e4ab55',
    linkedin: 'https://www.linkedin.com/in/galiah-badokhon-648659202?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    bio: "Ghalia leads SGYN's on-the-ground presence in Jeddah, driving outreach, event logistics, and community organising in the city. She is currently a Computer Science student at Effat University, with a background in graphic design and social media.",
  },
  {
    name: 'Cindy',
    role: 'Shanghai Lead',
    image: 'cindy_pfp_2.jpeg',
    initials: 'CI',
    accentColor: '#1846ed',
    linkedin: 'https://www.linkedin.com/in/itscindyli/',
    bio: 'Write bio here.',
  },
  {
    name: 'Bowen',
    role: 'NYC Lead',
    image: 'Bowen_pfp.jpg',
    initials: 'BW',
    accentColor: '#e4ab55',
    linkedin: 'https://www.linkedin.com/in/bowengucu/',
    bio: "Bowen handles SGYN's operations in NYC, including the annual Sino-Gulf Youth Dialogue in partnership with the UAE Mission to the United Nations. He is an investment banker based between New York and Shanghai, with prior experience at a PIF-affiliated private equity firm and as the founder of an e-commerce venture in Saudi Arabia. He holds a Master's from Columbia University and a Bachelor's from Central South University. Outside of finance, he's a musician and DJ.",
  },
];

const AvatarFallback = ({ initials, accentColor }: { initials: string; accentColor: string }) => (
  <div
    className="w-full h-full flex items-center justify-center"
    style={{ background: `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}44 100%)` }}
  >
    <span className="font-display font-bold text-4xl" style={{ color: accentColor }}>
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
      {/* Image container */}
      <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 relative bg-sgyn-navy-light">
        {/* Fallback avatar */}
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

        {/* Bio overlay — slides up on hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out"
          style={{
            background: `linear-gradient(to top, ${member.accentColor}ee 0%, ${member.accentColor}ee 80%, transparent 100%)`,
          }}
        >
          {/* Bio text */}
          <p className="text-white text-xs leading-relaxed mb-3 overflw-y-auto">
            {member.bio}
          </p>

          {/* LinkedIn */}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white transition-colors w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={14} />
              View Profile
            </a>
          )}
        </div>
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
        <p className="body-text-lg text-white/60 max-w-md md:text-left mt-4 md:mt-0">
          A team across Beijing, Jeddah, Shanghai, and New York — united by one mission.
        </p>
      </div>

      {/* Team Grid */}
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