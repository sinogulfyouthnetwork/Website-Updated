import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Mic, MessageCircle, Globe, Calendar, MapPin } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const programs = [
  {
    name: 'Chinese Without Borders',
    nameLocal: '无界中文',
    localDir: 'ltr' as const,
    language: 'Mandarin',
    description: 'Monthly roundtables where guests deliver talks exclusively in Mandarin — all dialects welcome.',
  },
  {
    name: 'Arabic Without Borders',
    nameLocal: 'اللغة العربية بلا حدود',
    localDir: 'rtl' as const,
    language: 'Arabic',
    description: 'Monthly roundtables where guests deliver talks exclusively in Arabic — all dialects welcome.',
  },
];

const sessionFormat = [
  {
    step: '01',
    icon: <Mic size={18} />,
    title: 'Guest Talk',
    description: 'A speaker from any nationality delivers a short talk entirely in Mandarin or Arabic.',
  },
  {
    step: '02',
    icon: <MessageCircle size={18} />,
    title: 'Ice-Breaker',
    description: '"How do you say ___ in Chinese / Arabic?" — a fun, interactive moment for the whole room.',
  },
  {
    step: '03',
    icon: <Globe size={18} />,
    title: 'Open Q&A',
    description: 'Free-flowing questions, discussion, and language exchange to close every session.',
  },
];

const recentSessions = [
  {
    title: 'Language Across Borders: Jeddah',
    venue: 'Al Maqam Cafe',
    location: 'Jeddah, KSA',
    date: 'January 31, 2026',
    theme: 'Arabic–Mandarin Exchange',
  },
  {
    title: 'Language Across Borders: Khobar',
    venue: 'KoYee Korean Cafe & Cuisine',
    location: 'Dammam / Khobar, KSA',
    date: 'January 31, 2026',
    theme: 'Arabic–Mandarin Exchange',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const LABPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return (
  <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

    <div style={{ minHeight: '100vh', background: '#f5f0e8', color: '#1a3a52', fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50"
        style={{ background: '#1a3a52', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a3a520e' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: '##e4ab55' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e4ab55')}
            onMouseLeave={e => (e.currentTarget.style.color = '#e4ab55')}>
            <ArrowLeft size={14} />
            Back to SGYN
          </button>

          <div className="flex items-center gap-2.5">
            <img src="SGYNBannerSmall.svg" alt="SGYN" className="h-8 md:h-10 w-auto" style={{ filter: 'brightness(0) sepia(1) hue-rotate(170deg) saturate(3)' }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '0.95rem', color: '#1a3a52' }}>
            </span>
          </div>

          <a href="mailto:huayi.f.shen@gmail.com"
            className="inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: '#e4ab55' }}>
            Apply to Speak <ArrowUpRight size={13} />
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ borderBottom: '1px solid #1a3a520c' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-12 grid md:grid-cols-2 gap-0 items-center">
          {/* Left: text */}
          <div className="relative z-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#e4ab55' }}>
              Language Program · Monthly · Global
            </p>
            <h1 className="mb-5" style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              fontWeight: 700, lineHeight: 1.02, color: '#1a3a52', letterSpacing: '-0.02em',
            }}>
              Language<br />
              <em style={{ fontWeight: 400, color: '#e4ab55' }}>Across Borders</em>
            </h1>
            <p className="max-w-xl leading-relaxed" style={{ color: '#1a3a52', fontSize: '0.95rem', lineHeight: 1.8 }}>
              A global monthly roundtable connecting native and non-native speakers of Mandarin 
              and Arabic — online and in-person, across continents. Open to all levels, 
              all dialects, all backgrounds.
            </p>
          </div>

          {/* Right: photo with left-to-right fade */}
          <div className="relative hidden md:block h-80 lg:h-96">
            {/* Placeholder — replace src with your LAB session photo: lab_session_hero.jpg in public/ */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(135deg, #1a3a5215 0%, #e4ab5525 50%, #1a3a5210 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: '#e4ab5530',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e4ab55" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <span style={{ color: '#1a3a52', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em' }}>
                Add lab_session_hero.jpg
              </span>
            </div>
            {/* Fade from background color on the left, transparent on the right */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, #f5f0e8 0%, #f5f0e8 10%, transparent 55%)',
              }}
            />
            {/* Soft fade at top and bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, #f5f0e8 0%, transparent 15%, transparent 85%, #f5f0e8 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Two programs ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
        <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: '#1a3a5238' }}>
          Two Parallel Programs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {programs.map((prog) => (
            <div key={prog.name} className="rounded-2xl p-8"
              style={{ background: '#fff', border: '1px solid #1a3a5210' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#e4ab55' }}>
                {prog.language}
              </p>
              <h2 className="mb-1 leading-tight" style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem', fontWeight: 700, color: '#1a3a52',
              }}>
                {prog.name}
              </h2>
              <p className="mb-5 text-base" dir={prog.localDir}
                style={{ fontFamily: prog.localDir === 'rtl' ? "'Noto Naskh Arabic', serif" : 'inherit',
                  color: prog.localDir === 'ltr' ? '#1a3a52' : '#e4ab55', fontSize: '1.05rem' }}>
                {prog.nameLocal}
              </p>
              <p style={{ color: '#1a3a52', fontSize: '0.95rem', lineHeight: 1.75 }}>
                {prog.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Session format ── */}
        <div className="mb-16 rounded-2xl p-8 md:p-10" style={{ background: '#ffffff', border: '1px solid #1a3a5210' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: '#e4ab55' }}>
            How Each Session Works
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sessionFormat.map((step) => (
              <div key={step.step} className="flex gap-5">
                {/* Step number */}
                <div className="flex-shrink-0">
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2.8rem', fontWeight: 700,
                    color: '#e4ab5530', lineHeight: 1,
                    display: 'block',
                  }}>
                    {step.step}
                  </span>
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-2" style={{ color: '#e4ab55' }}>
                    {step.icon}
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1rem', color: '#1a3a52' }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ color: '#1a3a52', fontSize: '0.95rem', lineHeight: 1.75 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent sessions ── */}
        <div className="mb-16" style={{ borderTop: '1px solid #1a3a520c', paddingTop: '4rem' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: '#1a3a5238' }}>
            Recent Sessions
          </p>

          <div className="space-y-4">
            {recentSessions.map((session, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl"
                style={{ background: '#fff', border: '1px solid #1a3a5210' }}>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1rem', color: '#1a3a52', marginBottom: '6px' }}>
                    {session.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs" style={{ color: '#1a3a52' }}>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={11} style={{ color: '#e4ab55' }} />
                      {session.venue} · {session.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={11} style={{ color: '#e4ab55' }} />
                      {session.date}
                    </span>
                  </div>
                </div>
                <span className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: '#e4ab5518', color: '#e4ab55' }}>
                  {session.theme}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Who can speak ── */}
        <div className="rounded-2xl p-8 md:p-10 mb-16 grid md:grid-cols-2 gap-8 items-center"
          style={{ background: '#fff', border: '1px solid #1a3a5210' }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#e4ab55' }}>
              Who Can Speak?
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#1a3a52', lineHeight: 1.2, marginBottom: '1rem' }}>
              Anyone with a story to tell.
            </h2>
            <p style={{ color: '#1a3a52', fontSize: '0.95rem', lineHeight: 1.8 }}>
              Our guests come from all nationalities and backgrounds — academics, professionals,
              artists, students, and community leaders. The only requirement is that you speak 
              exclusively in Mandarin or Arabic during your session. All dialects are welcome.
            </p>
          </div>
          <div className="space-y-3">
            {['Academics & researchers', 'Students studying abroad', 'Cultural practitioners & artists', 'Professionals in China–Gulf industries', 'Community leaders & advocates'].map((who) => (
              <div key={who} className="flex items-center gap-3 py-3 px-4 rounded-xl"
                style={{ background: '#f5f0e8', border: '1px solid #1a3a5208' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#e4ab55' }} />
                <span style={{ color: '#1a3a52', fontSize: '0.95rem' }}>{who}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA block ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Speak */}
          <div className="rounded-2xl p-8" style={{ background: '#1a3a52', color: '#f5f0e8' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#ffffff' }}>
              Open Call · 2026
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#f5f0e8', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              Apply to Speak
            </h2>
            <p style={{ color: '#ffffff', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Speaker applications for 2026 are now open. Select a date, leave your 
              contact info, and our team will be in touch.
            </p>
            <a href="mailto:huayi.f.shen@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm"
              style={{ background: '#e4ab55', color: '#1a3a52' }}>
              Apply Now <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Partner */}
          <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid #1a3a5210' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#e4ab55' }}>
              Organisations
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#1a3a52', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              Partner with LAB
            </h2>
            <p style={{ color: '#1a3a52', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              We partner with venues, universities, cultural organisations, and technology 
              platforms. Reach out to explore how we can collaborate.
            </p>
            <a href="mailto:huayi.f.shen@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm"
              style={{ background: '#1a3a52', color: '#f5f0e8' }}>
              Get in Touch <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default LABPage;
