import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, BookOpen, Users, MessageCircle, MapPin, Calendar, User } from 'lucide-react';



// ─── Types ────────────────────────────────────────────────────────────────────

type SessionFormatItem = {
  step: string;
  icon: React.ElementType;
  title: string;
  description: string;
};

type PastSession = {
  number: string;
  title: string;
  text: string | null;
  venue: string;
  location: string;
  date: string;
  tag: string | null;
  host: string;
  hostUrl: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const sessionFormat: SessionFormatItem[] = [
  {
    step: '01',
    icon: BookOpen,
    title: 'Reading Selection',
    description:
      'Each session centres on a work of Chinese or Arab literature — novels, poetry, essays, or short stories. The text is shared in advance so attendees can come prepared.',
  },
  {
    step: '02',
    icon: MessageCircle,
    title: 'Guided Discussion',
    description:
      'A host leads the group through themes, cultural context, and personal responses — making space for every voice in the room, regardless of literary background.',
  },
  {
    step: '03',
    icon: Users,
    title: 'Open Exchange',
    description:
      'The conversation opens up — connecting the text to broader questions of identity, history, and the China-Gulf relationship. No expertise required, only curiosity.',
  },
];

const pastSessions: PastSession[] = [
  {
    number: '01',
    title: 'Mid-Autumn Festival',
    host: 'Rahaf Al-Rozah',
    hostUrl: "https://www.linkedin.com/in/rahafal-rozah/",
    text: null,
    venue: 'Al Maqam Cafe',
    location: 'Jeddah, KSA',
    date: 'October 10, 2025',
    tag: 'Inaugural Session',
  },
  {
    number: '02',
    title: 'The True Story of Ah-Q',
    host: 'Rahaf Al-Rozah',
    hostUrl: "https://www.linkedin.com/in/rahafal-rozah/",
    text: 'Lu Xun',
    venue: 'Al Maqam Cafe',
    location: 'Jeddah, KSA',
    date: 'December 12, 2025',
    tag: null,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const LiterarySalonPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50);
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div style={{ minHeight: '100vh', background: '#f5f0e8', color: '#1a3a52', fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Header ── */}
       <header className="sticky top-0 z-50"
          style={{ background: 'rgba(15,36,56,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
            <button onClick={onBack}
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e4ab55')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              <ArrowLeft size={14} /> Home
            </button>
            <img src="SGYNBannerSmall.svg" alt="SGYN" className="h-10 md:h-12 w-auto object-contain" />

            <a
            href="https://forms.gle/QnSHHC7KtoHM9WzT6"
            //onClick={() => { onBack(); setTimeout(() => document.querySelector('#GetInvolved')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
            className="text-sm font-semibold px-4 py-2 rounded-full"
            style={{ background: '#e4ab55', color: '#1a3a52' }}
            >
            Suggest a Story
            </a>
          </div>
        </header>

        {/* ── Hero ── */}
        <div className="relative overflow-hidden" style={{ borderBottom: '1px solid #1a3a520c' }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-12 grid md:grid-cols-2 gap-0 items-center">

            {/* Left: text */}
            <div className="relative z-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#e4ab55' }}>
                Literary Program · Monthly · Jeddah
              </p>
              <h1
                className="mb-5"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.2rem, 6vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.02,
                  color: '#1a3a52',
                  letterSpacing: '-0.02em',
                }}
              >
                The Literary<br />
                <em style={{ fontWeight: 400, color: '#e4ab55' }}>Salon</em>
              </h1>
              <p
                className="max-w-xl leading-relaxed"
                style={{ color: '#1a3a52aa', fontSize: '0.95rem', lineHeight: 1.8 }}
              >
                A monthly gathering in Jeddah exploring works of Chinese and Arab literature —
                bringing readers together for discussion, interpretation, and cross-cultural reflection.
                No expertise required. Only curiosity.
              </p>
            </div>

            {/* Right: photo placeholder */}
            <div className="relative hidden md:block h-80 lg:h-96" style={{ background: 'transparent' }}>
              <div
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-2"
                style={{marginLeft: '60%', borderTop: '300px solid #f5f0e8',}}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: '#e4ab5530',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <BookOpen size={26} color="#e4ab55" strokeWidth={1.5} />
                </div>
                <span style={{ color: '#1a3a5260', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em' }}>
                <img src='TheTrueStoryofAhQPoster.png' style={{ width: '70%', height: 'auto' }} />                
                </span>
              </div>

              
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">

          {/* ── Mission statement ── */}
          <div className="rounded-2xl p-8 md:p-12 mb-16" style={{ background: '#fff', border: '1px solid #1a3a5210' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#e4ab55' }}>
              Our Mission
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
              color: '#1a3a52',
              lineHeight: 1.85,
              fontWeight: 400,
            }}>
              The Literary Salon believes that stories are one of the oldest bridges between cultures.
              Each session brings together people around works that connect the China-Gulf world — from
              classical poems like Su Shi's <span style={{ fontStyle: 'italic' }}>水调歌头</span> to
              the sharp social commentary of Lu Xun. Meeting monthly in Jeddah, we explore works of
              literature that open up conversations about identity, history, and what we share across cultures.
            </p>
          </div>

          {/* ── How each session works ── */}
          <div className="mb-16 rounded-2xl p-8 md:p-10" style={{ background: '#ffffff', border: '1px solid #1a3a5210' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: '#e4ab55' }}>
              How Each Session Works
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sessionFormat.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="flex gap-5">
                    <div className="flex-shrink-0">
                      <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '2.8rem', fontWeight: 700,
                        color: '#e4ab5530', lineHeight: 1, display: 'block',
                      }}>
                        {step.step}
                      </span>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-2 mb-2" style={{ color: '#e4ab55' }}>
                        <Icon size={18} />
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1rem', color: '#1a3a52' }}>
                          {step.title}
                        </h3>
                      </div>
                      <p style={{ color: '#1a3a52aa', fontSize: '0.9rem', lineHeight: 1.75 }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Past sessions ── */}
          <div className="mb-16" style={{ borderTop: '1px solid #1a3a520c', paddingTop: '4rem' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: '#1a3a5238' }}>
              Past Sessions
            </p>

            <div className="space-y-4">
              {pastSessions.map((session, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl"
                  style={{ background: '#fff', border: '1px solid #1a3a5210' }}
                >
                  <div className="flex items-start gap-5">
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '2rem', fontWeight: 700,
                      color: '#e4ab5530', lineHeight: 1, flexShrink: 0,
                    }}>
                      {session.number}
                    </span>
                    <div>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600, fontSize: '1rem', color: '#1a3a52', marginBottom: '2px',
                      }}>
                        {session.title}
                      </h3>
                      {session.text && (
                        <p className="text-xs mb-2" style={{ color: '#e4ab55', fontStyle: 'italic' }}>
                          {session.text}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-xs" style={{ color: '#1a3a5270' }}>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={11} style={{ color: '#e4ab55' }} />
                          {session.venue} · {session.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={11} style={{ color: '#e4ab55' }} />
                          {session.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <User size={11} style={{ color: '#e4ab55' }} />
                          Hosted by{' '}
                          <a
                            href={session.hostUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#e4ab55', textDecoration: 'bold', textDecorationColor: '#e4ab5560' }}
                            onMouseEnter={e => (e.currentTarget.style.textDecorationColor = '#e4ab55')}
                            onMouseLeave={e => (e.currentTarget.style.textDecorationColor = '#e4ab5560')}
                          >
                            {session.host}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  {session.tag && (
                    <span
                      className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: '#e4ab5518', color: '#e4ab55' }}
                    >
                      {session.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA block ── */}
          <div
  className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8"
  style={{ background: '#1a3a52', color: '#f5f0e8' }}
>
  {/* LEFT SIDE (existing content) */}
  <div className="max-w-[520px]">
    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#ffffff80' }}>
      Jeddah · Monthly
    </p>

    <h2
      className="mb-3"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.6rem',
        fontWeight: 700,
        lineHeight: 1.2,
      }}
    >
      Come to the next session.
    </h2>

    <p className="mb-6" style={{ color: '#ffffff99', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '480px' }}>
      The Literary Salon meets monthly in Jeddah. Sessions are open to anyone with
      an interest in literature, language, and cross-cultural exchange. Click below 
      to submit a piece you'd like the Salon to read!
    </p>

    <a
      href="https://forms.gle/QnSHHC7KtoHM9WzT6"
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm"
      style={{ background: '#e4ab55', color: '#1a3a52' }}
    >
      Suggest a Story <ArrowUpRight size={14} />
    </a>
  </div>

  {/* RIGHT SIDE (About the host) */}
  <div className="md:w-[280px] ml-20">
    <h3
      className="mb-2"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.4rem',
        fontWeight: 700,
      }}
    >
      About the host
    </h3>

    <p style={{ color: '#ffffff99', fontSize: '0.95rem', lineHeight: 1.6 }}>
    Rahaf Al-Rozah served as a Program Lead with the Sino-Gulf Youth Network, where she curated and presented Jeddah’s Literary Salon sessions that promoted cross-cultural dialogue. A published writer in both English and Arabic, Rahaf is passionate about literature, research, and fostering meaningful cultural exchange.

    </p>
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default LiterarySalonPage;
