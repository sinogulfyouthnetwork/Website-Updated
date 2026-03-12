import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, X, Star, ChevronLeft, ChevronRight, Image } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type EventTheme = 'Cultural Exchange' | 'Youth Diplomacy' | 'Language Exchange' | 'Literary Salon' | 'Networking' | 'Academic' | 'Diplomatic';

interface SGYNEvent {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  location: string;
  venue: string;
  date: string;
  theme: EventTheme;
  description: string;
  partners: string[];
  participants?: number;
  tag?: string;
  cover: string;       // static card cover photo
  photos: string[];    // slideshow photos inside modal
}

// ─── Event Data ───────────────────────────────────────────────────────────────
// To add real photos: replace filenames in the photos[] array for each event.
// All files go in public/events/<event-id>/photo-1.jpg etc.

const events: SGYNEvent[] = [
  {
    id: 'chinese-emirati-shanghai-2024',
    number: 1,
    title: 'Chinese-Emirati Cultural Connections Evening',
    location: 'Shanghai, China',
    venue: 'NYU Shanghai',
    date: 'December 2024',
    theme: 'Cultural Exchange',
    description: 'The inaugural SGYN event — a cultural evening co-hosted with NYU Shanghai and NYU Abu Dhabi Global Outreach, bringing together Chinese and Emirati students for an evening of exchange and connection.',
    partners: ['NYU Shanghai', 'NYU Abu Dhabi Global Outreach'],
    cover: 'events/chinese-emirati-shanghai-2024/cover.jpg',
    photos: [
      'events/chinese-emirati-shanghai-2024/photo-1.jpg',
      'events/chinese-emirati-shanghai-2024/photo-2.jpg',
      'events/chinese-emirati-shanghai-2024/photo-3.jpg',
    ],
  },
  {
    id: 'chinese-saudi-jeddah-2025',
    number: 2,
    title: 'Chinese-Saudi Cultural Exchange Evening',
    subtitle: '中沙之夜',
    location: 'Jeddah, KSA',
    venue: 'Qanateer, House of Wisdom',
    date: 'August 16, 2025',
    theme: 'Cultural Exchange',
    description: 'The first youth-led Chinese-Saudi cultural exchange evening, hosted at the Saudi Ministry of Culture\'s House of Wisdom venue. An evening of performance, dialogue, and cross-cultural celebration.',
    partners: ['Qanateer', 'House of Wisdom'],
    cover: 'events/chinese-saudi-jeddah-2025/cover.jpg',
    photos: [
      'events/chinese-saudi-jeddah-2025/photo-1.jpg',
      'events/chinese-saudi-jeddah-2025/photo-2.jpg',
      'events/chinese-saudi-jeddah-2025/photo-3.jpg',
    ],
  },
  {
    id: 'literary-salon-1-jeddah-2025',
    number: 3,
    title: 'Literary Salon (Session 1): Mid-Autumn Festival',
    location: 'Jeddah, KSA',
    venue: 'Al Maqam Cafe',
    date: 'October 10, 2025',
    theme: 'Literary Salon',
    description: 'The first of our Jeddah Literary Salon series, celebrating Mid-Autumn Festival through Chinese literature and cross-cultural discussion. An intimate gathering exploring poetry, storytelling, and the art of translation.',
    partners: ['Al Maqam Cafe'],
    cover: 'events/literary-salon-1-jeddah-2025/cover.jpg',
    photos: [
      'events/literary-salon-1-jeddah-2025/photo-1.jpg',
      'events/literary-salon-1-jeddah-2025/photo-2.jpg',
      'events/literary-salon-1-jeddah-2025/photo-3.jpg',
    ],
  },
  {
    id: 'sgyn-launch-beijing-2025',
    number: 4,
    title: 'SGYN Launch Event',
    location: 'Beijing, China',
    venue: 'UAE Embassy Beijing',
    date: 'November 8, 2025',
    theme: 'Networking',
    description: 'The official SGYN launch in Beijing — 62 guests from across the China-Gulf community gathered at the UAE Embassy for an evening of networking and celebration, marking the beginning of a new chapter in youth-led bilateral engagement.',
    partners: ['UAE Embassy Beijing'],
    participants: 62,
    tag: 'Launch',
    cover: 'events/sgyn-launch-beijing-2025/cover.jpg',
    photos: [
      'events/sgyn-launch-beijing-2025/photo-1.jpg',
      'events/sgyn-launch-beijing-2025/photo-2.jpg',
      'events/sgyn-launch-beijing-2025/photo-3.jpg',
    ],
  },
  {
    id: 'uae-national-day-yenching-2025',
    number: 5,
    title: 'UAE National Day Celebration at Yenching Academy',
    location: 'Beijing, China',
    venue: 'Yenching Academy, Peking University',
    date: 'November 2025',
    theme: 'Diplomatic',
    description: '34 scholars and guests joined the UAE Embassy to celebrate UAE National Day at one of China\'s most prestigious international academic institutions, celebrating bilateral heritage and cultural identity.',
    partners: ['UAE Embassy Beijing', 'Yenching Academy (Peking University)'],
    participants: 34,
    cover: 'events/uae-national-day-yenching-2025/cover.jpg',
    photos: [
      'events/uae-national-day-yenching-2025/photo-1.jpg',
      'events/uae-national-day-yenching-2025/photo-2.jpg',
      'events/uae-national-day-yenching-2025/photo-3.jpg',
    ],
  },
  {
    id: 'sino-gulf-dialogue-nyc-2025',
    number: 6,
    title: 'Sino-Gulf Youth Dialogue: Uniting Youth Voices for a Shared Future',
    location: 'New York City, USA',
    venue: 'UAE Permanent Mission to the United Nations',
    date: 'November 19, 2025',
    theme: 'Youth Diplomacy',
    description: 'A landmark gathering at the United Nations, convening 100+ youth leaders, scholars, and diplomats from China and the Gulf to shape the next chapter of bilateral cooperation. The flagship SGYN event of 2025.',
    partners: ['UAE Permanent Mission to the UN', 'UAE Youth Society', 'Columbia University SIPA', 'Greater China Initiative'],
    participants: 100,
    tag: 'Flagship',
    cover: 'events/sino-gulf-dialogue-nyc-2025/cover.jpg',
    photos: [
      'events/sino-gulf-dialogue-nyc-2025/photo-1.jpg',
      'events/sino-gulf-dialogue-nyc-2025/photo-2.jpg',
      'events/sino-gulf-dialogue-nyc-2025/photo-3.jpg',
      'events/sino-gulf-dialogue-nyc-2025/photo-4.jpg',
    ],
  },
  {
    id: 'ecust-national-day-shanghai-2025',
    number: 7,
    title: 'ECUST National Day Celebration',
    location: 'Shanghai, China',
    venue: 'East China University of Science and Technology',
    date: 'November 30, 2025',
    theme: 'Academic',
    description: 'SGYN represented at ECUST\'s National Day Celebration, co-attended with the UAE Consulate in Shanghai — strengthening ties between the university community and Gulf diplomatic presence in China.',
    partners: ['ECUST', 'UAE Consulate Shanghai'],
    cover: 'events/ecust-national-day-shanghai-2025/cover.jpg',
    photos: [
      'events/ecust-national-day-shanghai-2025/photo-1.jpg',
      'events/ecust-national-day-shanghai-2025/photo-2.jpg',
      'events/ecust-national-day-shanghai-2025/photo-3.jpg',
    ],
  },
  {
    id: 'literary-salon-2-jeddah-2025',
    number: 8,
    title: 'Literary Salon (Session 2): The True Story of Ah-Q',
    location: 'Jeddah, KSA',
    venue: 'Al Maqam Cafe',
    date: 'December 12, 2025',
    theme: 'Literary Salon',
    description: 'The second Literary Salon session exploring Lu Xun\'s landmark work — bridging Chinese modernist literature with Gulf audiences through discussion, interpretation, and cultural reflection.',
    partners: ['Al Maqam Cafe'],
    cover: 'events/literary-salon-2-jeddah-2025/cover.jpg',
    photos: [
      'events/literary-salon-2-jeddah-2025/photo-1.jpg',
      'events/literary-salon-2-jeddah-2025/photo-2.jpg',
      'events/literary-salon-2-jeddah-2025/photo-3.jpg',
    ],
  },
  {
    id: 'lab-jeddah-2026',
    number: 9,
    title: 'Language Across Borders: Jeddah',
    location: 'Jeddah, KSA',
    venue: 'Al Maqam Cafe',
    date: 'January 31, 2026',
    theme: 'Language Exchange',
    description: 'The first in-person LAB roundtable in Jeddah — bringing together Arabic and Mandarin speakers for talks, ice-breakers, and open language exchange. Part of the LAB 2026 in-person expansion across Saudi Arabia.',
    partners: ['Al Maqam Cafe'],
    participants: 25,
    cover: 'events/lab-jeddah-2026/cover.jpg',
    photos: [
      'events/lab-jeddah-2026/photo-1.jpg',
      'events/lab-jeddah-2026/photo-2.jpg',
      'events/lab-jeddah-2026/photo-3.jpg',
    ],
  },
  {
    id: 'lab-khobar-2026',
    number: 10,
    title: 'Language Across Borders: Khobar',
    location: 'Dammam / Khobar, KSA',
    venue: 'KoYee Korean Cafe & Cuisine',
    date: 'January 31, 2026',
    theme: 'Language Exchange',
    description: 'The first in-person LAB roundtable in Khobar — connecting local Arabic and Chinese speakers through language, conversation, and community. A companion event to the Jeddah LAB session.',
    partners: ['KoYee Korean Cafe & Cuisine'],
    participants: 25,
    cover: 'events/lab-khobar-2026/cover.jpg',
    photos: [
      'events/lab-khobar-2026/photo-1.jpg',
      'events/lab-khobar-2026/photo-2.jpg',
      'events/lab-khobar-2026/photo-3.jpg',
    ],
  },
];

// ─── Theme colors ─────────────────────────────────────────────────────────────

const themeColors: Record<EventTheme, string> = {
  'Cultural Exchange': '#e4ab55',
  'Youth Diplomacy':  '#e4ab55',
  'Language Exchange':'#1a3a52',
  'Literary Salon':   '#e4ab55',
  'Networking':       '#1a3a52',
  'Academic':         '#1a3a52',
  'Diplomatic':       '#e4ab55',
};

// ─── Events Hero Photo ────────────────────────────────────────────────────────
// Replace src with your photo: add events_hero.jpg to public/

const EventsHeroPhoto = () => {
  const [error, setError] = useState(false);
  return (
    <div className="absolute inset-0 w-full h-full">
      {error ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3"
          style={{ background: 'linear-gradient(135deg, #162d42 0%, #1a3a52 100%)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(228,171,85,0.15)', border: '1px solid rgba(228,171,85,0.3)' }}>
            <Image size={22} style={{ color: '#e4ab55' }} />
          </div>
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Add events_hero.jpg to public/
          </p>
        </div>
      ) : (
        <img src="events_hero.jpg" alt="SGYN Events"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setError(true)} />
      )}
      {/* Left fade into navy background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0f2438 0%, #0f2438 8%, transparent 50%)' }} />
      {/* Top and bottom fade */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0f2438 0%, transparent 15%, transparent 85%, #0f2438 100%)' }} />
    </div>
  );
};

// ─── Photo placeholder ────────────────────────────────────────────────────────

const PhotoPlaceholder = ({ label, accent }: { label: string; accent: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3"
    style={{ background: `linear-gradient(135deg, #162d42 0%, #1a3a52 100%)` }}>
    <div className="w-14 h-14 rounded-full flex items-center justify-center"
      style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}>
      <Image size={22} style={{ color: accent }} />
    </div>
    <p className="text-xs text-center px-4" style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '160px' }}>
      {label}
    </p>
  </div>
);

// ─── Slideshow ────────────────────────────────────────────────────────────────

const Slideshow = ({ photos, eventId, accent }: { photos: string[]; eventId: string; accent: string }) => {
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const prev = useCallback(() => setCurrent(c => (c - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % photos.length), [photos.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  // Arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  return (
    <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden bg-black group">
      {/* Photos */}
      {photos.map((src, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}>
          {imgErrors[i] ? (
            <PhotoPlaceholder label={`${eventId} · photo ${i + 1}\nAdd to public/events/${eventId}/`} accent={accent} />
          ) : (
            <img src={src} alt={`Photo ${i + 1}`}
              className="w-full h-full object-cover"
              style={{ opacity: 0.85 }}
              onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
            />
          )}
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #162d42 0%, transparent 55%)' }} />

      {/* Arrow controls — visible on hover */}
      <button onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <ChevronLeft size={16} className="text-white" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <ChevronRight size={16} className="text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {photos.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '18px' : '6px',
              height: '6px',
              background: i === current ? accent : 'rgba(255,255,255,0.35)',
            }} />
        ))}
      </div>

      {/* Photo count */}
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs z-10"
        style={{ background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.6)' }}>
        {current + 1} / {photos.length}
      </div>
    </div>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────

const EventModal = ({ event, onClose }: { event: SGYNEvent; onClose: () => void }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handler);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler); };
  }, [onClose]);

  const color = themeColors[event.theme];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
      style={{ background: 'rgba(10,20,30,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: '#162d42', border: '1px solid rgba(255,255,255,0.1)' }}>

        {/* Close button */}
        <button onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <X size={15} className="text-white" />
        </button>

        {/* Slideshow */}
        <Slideshow photos={event.photos} eventId={event.id} accent={color} />

        {/* Tag + number */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          {event.tag && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: `${color}33`, color, border: `1px solid ${color}55` }}>
              <Star size={11} />{event.tag}
            </div>
          )}
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            #{String(event.number).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="p-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: `${color}22`, color }}>
            {event.theme}
          </div>

          <h2 className="font-display font-bold text-white mb-1 leading-tight"
            style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)' }}>
            {event.title}
          </h2>
          {event.subtitle && (
            <p className="mb-3" style={{ color: '#e4ab55', fontStyle: 'italic', fontSize: '1rem' }}>{event.subtitle}</p>
          )}

          <div className="flex flex-wrap gap-4 mb-5 mt-3">
            <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <MapPin size={14} style={{ color: '#e4ab55' }} />
              {event.venue} · {event.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <Calendar size={14} style={{ color: '#e4ab55' }} />
              {event.date}
            </span>
            {event.participants && (
              <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <Users size={14} style={{ color: '#e4ab55' }} />
                {event.participants}+ attendees
              </span>
            )}
          </div>

          <p className="leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            {event.description}
          </p>

          {event.partners.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                Partners
              </p>
              <div className="flex flex-wrap gap-2">
                {event.partners.map(p => (
                  <span key={p} className="px-3 py-1 rounded-full text-xs"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Event Card (static cover) ────────────────────────────────────────────────

const EventCard = ({ event, onClick }: { event: SGYNEvent; onClick: () => void }) => {
  const color = themeColors[event.theme];
  const [coverError, setCoverError] = useState(false);

  return (
    <button onClick={onClick} className="group w-full text-left rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: '#162d42', border: '1px solid rgba(255,255,255,0.07)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}44`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}>

      {/* Static cover */}
      <div className="aspect-[16/9] relative overflow-hidden">
        {coverError ? (
          <PhotoPlaceholder label={`Add cover.jpg to\npublic/events/${event.id}/`} accent={color} />
        ) : (
          <img src={event.cover} alt={event.title}
            className="w-full h-full object-cover opacity-55 transition-all duration-500 group-hover:opacity-75 group-hover:scale-105"
            onError={() => setCoverError(true)} />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #162d42 0%, transparent 65%)' }} />

        {event.tag && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: `${color}33`, color, border: `1px solid ${color}44` }}>
            <Star size={10} />{event.tag}
          </div>
        )}
        <div className="absolute top-3 right-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          #{String(event.number).padStart(2, '0')}
        </div>

        {/* Photo count hint */}
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
          style={{ background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.5)' }}>
          <Image size={10} /> {event.photos.length} photos
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
          style={{ background: `${color}18`, color }}>
          {event.theme}
        </div>
        <h3 className="font-display font-semibold text-white text-sm leading-snug mb-2 group-hover:text-sgyn-gold transition-colors line-clamp-2">
          {event.title}
        </h3>
        <div className="flex flex-wrap gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span className="inline-flex items-center gap-1"><MapPin size={10} />{event.location}</span>
          <span className="inline-flex items-center gap-1"><Calendar size={10} />{event.date}</span>
        </div>
      </div>
    </button>
  );
};

// ─── Filters ──────────────────────────────────────────────────────────────────

const allThemes: (EventTheme | 'all')[] = ['all', 'Cultural Exchange', 'Youth Diplomacy', 'Language Exchange', 'Literary Salon', 'Networking', 'Diplomatic', 'Academic'];

// ─── Page ─────────────────────────────────────────────────────────────────────

const EventsPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => { setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50); }, []);

  const [filter, setFilter] = useState<EventTheme | 'all'>('all');
  const [selected, setSelected] = useState<SGYNEvent | null>(null);

  const filtered = filter === 'all' ? events : events.filter(e => e.theme === filter);

  return (
    <>
      <div className="min-h-screen" style={{ background: '#0f2438', color: 'white' }}>

        {/* Header */}
        <header className="sticky top-0 z-50"
          style={{ background: 'rgba(15,36,56,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
            <button onClick={onBack}
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e4ab55')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              <ArrowLeft size={14} /> Back to SGYN
            </button>
            <img src="logo.png" alt="SGYN" className="h-8 w-auto object-contain" />
            <a href="mailto:info@sinogulfyouthnetwork.com"
              className="text-sm font-semibold px-4 py-2 rounded-full"
              style={{ background: '#e4ab55', color: '#1a3a52' }}>
              Get Involved
            </a>
          </div>
        </header>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            {/* Left: text */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest block mb-4" style={{ color: '#e4ab55' }}>
                Events | 活动 | الفعاليات
              </span>
              <h1 className="text-white font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 1.05 }}>
                All <span style={{ color: '#e4ab55' }}>Events</span>
              </h1>
              <p className="mb-10" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '480px', lineHeight: 1.8 }}>
                From cultural evenings in Jeddah to youth dialogues at the United Nations — every event SGYN has convened since December 2024. Click any card to see photos.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {[['10+', 'Events'], ['200+', 'Participants'], ['7', 'Cities']].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-bold" style={{ color: '#e4ab55', fontSize: '1.8rem', fontFamily: "'Playfair Display', Georgia, serif" }}>{val}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: hero photo with fade */}
            <div className="relative hidden md:block h-72 lg:h-80">
              <EventsHeroPhoto />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-8">
          <div className="flex flex-wrap gap-2 items-center">
            {allThemes.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
                style={filter === t
                  ? { background: '#e4ab55', color: '#1a3a52', fontWeight: 600 }
                  : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {t === 'all' ? 'All Events' : t}
              </button>
            ))}
            <span className="ml-auto text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {filtered.length} events
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(event => (
              <EventCard key={event.id} event={event} onClick={() => setSelected(event)} />
            ))}
          </div>
        </div>
      </div>

      {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default EventsPage;
