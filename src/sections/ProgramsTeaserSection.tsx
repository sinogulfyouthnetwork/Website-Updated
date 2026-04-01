import { ArrowUpRight, Sparkles, Clock } from 'lucide-react';

// ─── Program Data ─────────────────────────────────────────────────────────────

const programs = [
  {
    id: 'lab',
    status: 'active',
    label: 'Active Program',
    tag: 'Language',
    title: 'Language Across Borders',
    subtitle: '无界中文 · اللغة العربية بلا حدود',
    description:
      'A global monthly roundtable connecting native and non-native speakers of Mandarin and Arabic — online and in-person, across continents. Open to all levels, all dialects, all backgrounds.',
    cta: 'Learn More',
    href: '/#/lab',
    accent: '#e4ab55',
    icon: '语',
  },
  {
    id: 'literary-salon',
    status: 'active',
    label: 'Active Program',
    tag: 'Literature',
    title: 'The Literary Salon',
    subtitle: null,
    description:
      'Our monthly book club and literary gathering, currently running in Jeddah. Each session explores a work of Chinese or Arab literature — bringing readers together for discussion, interpretation, and cross-cultural reflection.',
    cta: "Learn More",
    href: '/#/literary-salon',
    accent: '#e4ab55',
    icon: '书',
  },
  {
    id: 'sgi',
    status: 'soon',
    label: 'Launching Soon',
    tag: 'Think Tank',
    title: 'Sino-Gulf Institute',
    subtitle: null,
    description:
      'A holistic research centre stretching from weekly news updates, analysis, and policy reports to a dedicated youth publications section. SGI aims to become the leading intellectual platform for China-Gulf dialogue — with SGYN\'s youth perspective at its core.',
    cta: null,
    href: null,
    accent: '#5b9fd4',
    icon: '研',
  },
  {
    id: 'talent-track',
    status: 'soon',
    label: 'Launching Soon',
    tag: 'Professional Development',
    title: 'China-GCC Talent Track',
    subtitle: null,
    description:
      'Connecting university students and early-career youth with real-world business experiences in companies operating between China and the Gulf. Participants gain mentorship and hands-on experience across sectors.',
    cta: null,
    href: null,
    accent: '#a78bfa',
    icon: '才',
  },
  {
    id: 'dhow-art',
    status: 'soon',
    label: 'Launching Soon',
    tag: 'Art',
    title: 'The Dhow Art Exchange',
    subtitle: null,
    description:
      'Inspired by historic and contemporary parallels between China and the Arab world — from Silk Road exchanges to similar figures like Inji Aflatoun and Soong May-ling — this initiative explores the artistic threads that connect both worlds.',
    cta: null,
    href: null,
    accent: '#c084b8',
    icon: '艺',
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

const ProgramCard = ({ program }: { program: typeof programs[0] }) => {
  const isSoon = program.status === 'soon';
  const Wrapper = program.href ? 'a' : 'div';

  return (
    <Wrapper
      {...(program.href ? { href: program.href } : {})}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        textDecoration: 'none',
        cursor: program.href ? 'pointer' : 'default',
      } as React.CSSProperties}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.borderColor = `${program.accent}55`;
        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full flex-shrink-0"
        style={{ background: `linear-gradient(to right, ${program.accent}, transparent)` }} />

      <div className="flex flex-col flex-1 p-6">
        {/* Status + Icon */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              background: isSoon ? 'rgba(255,255,255,0.06)' : `${program.accent}22`,
              color: isSoon ? 'rgba(255,255,255,0.45)' : program.accent,
              border: `1px solid ${isSoon ? 'rgba(255,255,255,0.1)' : `${program.accent}44`}`,
            }}
          >
            {isSoon ? <Clock size={10} /> : <Sparkles size={10} />}
            <span className="ml-1">{program.label}</span>
          </div>
          <span style={{
            fontSize: '2.4rem',
            lineHeight: 1,
            color: `${program.accent}20`,
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
          }}>
            {program.icon}
          </span>
        </div>

        {/* Title */}
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: program.accent }}>
            {program.tag}
          </p>
          <h3 className="text-white font-bold leading-tight mb-1"
            style={{ fontSize: '1.05rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
            {program.title}
          </h3>
          {program.subtitle && (
            <p className="text-xs" style={{ color: `${program.accent}99`, fontStyle: 'italic' }}>
              {program.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="flex-1 mb-4" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.825rem', lineHeight: 1.85 }}>
          {program.description}
        </p>

        {/* CTA — only shown when defined */}
        {program.cta && (
          <div className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: program.accent }}>
            {program.cta}
            <ArrowUpRight size={13} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

const ProgramsTeaserSection = () => {
  return (
    <section
      id="our-programs"
      className="relative py-24 px-6 lg:px-12 flex flex-col items-center"
      style={{ background: '#0f2438', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="w-full max-w-7xl">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#e4ab55' }}>
            Our Programs
          </p>
          <h2 className="text-white mb-4" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.1,
          }}>
            Building Bridges,{' '}
            <em style={{ fontWeight: 400, color: '#e4ab55' }}>One Program at a Time</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.8 }}>
            SGYN runs a growing portfolio of programs connecting youth across China and the Gulf — through language, literature, research, talent, and the arts.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsTeaserSection;
