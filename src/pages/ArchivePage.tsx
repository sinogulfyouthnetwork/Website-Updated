import { useState, useEffect } from 'react';
import { X, Play, FileText, Image, Music, Palette, ArrowLeft, ArrowUpRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type MediaType = 'video' | 'photo-essay' | 'article' | 'audio' | 'art';

interface Submission {
  id: string;
  type: MediaType;
  title: string;
  author: string;
  authorBio: string;
  description: string;
  date: string;
  location?: string;
  videoFile?: string;
  videoEmbed?: string;
  thumbnail?: string;
  content?: string;
  images?: string[];
  audioFile?: string;
  tags?: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// To add a new submission, append an object to this array.

const submissions: Submission[] = [
  {
    id: 'mariam-tradition-in-bloom',
    type: 'video',
    title: 'Tradition in Bloom',
    author: 'Mariam Al Mutawa',
    authorBio:
      'Mariam Al Mutawa is an Emirati student currently studying in Shanghai with a deep interest in exploring cultures beyond her own.',
    description:
      'While walking through a park, Mariam discovers a group of locals dancing and practicing kung fu. What follows is a beautiful and spontaneous exchange — where strangers became teachers, warmly inviting her to join and experience their traditions firsthand. This video captures that meaningful moment of cultural connection and shared joy.',
    date: '2025',
    location: 'Shanghai, China',
    videoFile: 'final.mov',
    thumbnail: 'final.mov',
    tags: ['Culture', 'China', 'UAE', 'Community'],
  },
];

// ─── Type config ──────────────────────────────────────────────────────────────

const typeConfig: Record<MediaType, { label: string; icon: React.ReactNode }> = {
  video:         { label: 'Video',       icon: <Play size={12} />     },
  'photo-essay': { label: 'Photo Essay', icon: <Image size={12} />    },
  article:       { label: 'Article',     icon: <FileText size={12} /> },
  audio:         { label: 'Audio',       icon: <Music size={12} />    },
  art:           { label: 'Art',         icon: <Palette size={12} />  },
};

// ─── Modal ────────────────────────────────────────────────────────────────────

const Modal = ({ item, onClose }: { item: Submission; onClose: () => void }) => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
      style={{ background: 'rgba(26,58,82,0.65)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: '#f5f0e8' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: '#1a3a5212' }}
        >
          <X size={15} style={{ color: '#1a3a52' }} />
        </button>

        {item.type === 'video' && (
          <div className="aspect-video w-full rounded-t-2xl overflow-hidden bg-black">
            {item.videoEmbed ? (
              <iframe src={item.videoEmbed} className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            ) : item.videoFile ? (
              <video src={item.videoFile} controls className="w-full h-full object-contain" poster={item.thumbnail} />
            ) : null}
          </div>
        )}

        <div className="p-8 md:p-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ background: '#e4ab5520', color: '#e4ab55' }}>
            {typeConfig[item.type].icon}
            {typeConfig[item.type].label}
          </div>

          <h2 className="mb-3 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 700, color: '#1a3a52' }}>
            {item.title}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 600, color: '#e4ab55', fontSize: '0.95rem' }}>
              {item.author}
            </span>
            {item.location && <><span style={{ color: '#1a3a5230' }}>·</span><span style={{ color: '#1a3a5255', fontSize: '0.85rem' }}>{item.location}</span></>}
            <span style={{ color: '#1a3a5230' }}>·</span>
            <span style={{ color: '#1a3a5255', fontSize: '0.85rem' }}>{item.date}</span>
          </div>

          <p className="mb-5 pl-4 leading-relaxed"
            style={{ borderLeft: '2px solid #e4ab55', fontStyle: 'italic', fontSize: '0.88rem', color: '#1a3a5270', fontFamily: "'Playfair Display', serif" }}>
            {item.authorBio}
          </p>

          <p className="leading-relaxed" style={{ color: '#1a3a5290', fontSize: '0.95rem', lineHeight: 1.8 }}>
            {item.content || item.description}
          </p>

          {item.tags && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: '1px solid #1a3a5210' }}>
              {item.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs"
                  style={{ background: '#1a3a5206', color: '#1a3a5255', border: '1px solid #1a3a5215' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Featured card ────────────────────────────────────────────────────────────

const FeaturedCard = ({ item, onClick }: { item: Submission; onClick: () => void }) => (
  <button onClick={onClick} className="group w-full text-left grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden"
    style={{ border: '1px solid #1a3a5210', background: '#fff', transition: 'box-shadow 0.3s' }}
    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 40px rgba(26,58,82,0.08)')}
    onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
  >
    <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden" style={{ background: '#e8e2d4', minHeight: '280px' }}>
      {item.thumbnail
        ? <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" style={{ transition: 'transform 0.7s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
        : <div className="w-full h-full flex items-center justify-center" style={{ color: '#e4ab55', opacity: 0.2 }}><Play size={56} /></div>
      }
      {item.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(26,58,82,0.2)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#e4ab55' }}>
            <Play size={22} className="ml-1" style={{ color: '#1a3a52' }} />
          </div>
        </div>
      )}
    </div>

    <div className="p-8 md:p-10 flex flex-col justify-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest w-fit mb-5"
        style={{ background: '#e4ab5520', color: '#e4ab55' }}>
        {typeConfig[item.type].icon}
        {typeConfig[item.type].label}
      </div>

      <h2 className="mb-4 leading-tight group-hover:text-[#e4ab55]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: '#1a3a52', transition: 'color 0.2s' }}>
        {item.title}
      </h2>

      <p className="mb-8 leading-relaxed" style={{ color: '#1a3a52', fontSize: '0.9rem', lineHeight: 1.75 }}>
        {item.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#e4ab55', fontWeight: 600, fontSize: '0.9rem' }}>
            {item.author}
          </p>
          {item.location && <p style={{ color: '#1a3a5245', fontSize: '0.78rem', marginTop: '2px' }}>{item.location} · {item.date}</p>}
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: '#1a3a52', color: '#f5f0e8' }}>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  </button>
);

// ─── Small card ───────────────────────────────────────────────────────────────

const SmallCard = ({ item, onClick }: { item: Submission; onClick: () => void }) => (
  <button onClick={onClick} className="group w-full text-left rounded-2xl overflow-hidden flex flex-col"
    style={{ border: '1px solid #1a3a5210', background: '#fff', transition: 'box-shadow 0.3s' }}
    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,58,82,0.07)')}
    onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
  >
    <div className="aspect-[16/10] relative overflow-hidden" style={{ background: '#e8e2d4' }}>
      {item.thumbnail
        ? <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover"
            style={{ transition: 'transform 0.6s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
        : <div className="w-full h-full flex items-center justify-center" style={{ color: '#e4ab55', opacity: 0.2 }}>
            {item.type === 'video' && <Play size={36} />}
            {item.type === 'article' && <FileText size={36} />}
          </div>
      }
      <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
        style={{ background: '#f5f0e8ee', color: '#e4ab55' }}>
        {typeConfig[item.type].icon}
        {typeConfig[item.type].label}
      </div>
    </div>

    <div className="p-5 flex flex-col flex-1">
      <h3 className="mb-2 leading-snug"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', fontWeight: 700, color: '#1a3a52', transition: 'color 0.2s' }}>
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: '#1a3a52' }}>
        {item.description}
      </p>
      <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #1a3a520c' }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#e4ab55', fontSize: '0.8rem' }}>{item.author}</p>
        <p style={{ color: '#1a3a5238', fontSize: '0.75rem' }}>{item.date}</p>
      </div>
    </div>
  </button>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

type Filter = MediaType | 'all';
const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'video', label: 'Video' },
  { value: 'photo-essay', label: 'Photo Essays' },
  { value: 'article', label: 'Articles' },
  { value: 'audio', label: 'Audio' },
  { value: 'art', label: 'Art' },
];

const ArchivePage = ({ onBack }: { onBack: () => void }) => {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Submission | null>(null);

  const filtered = activeFilter === 'all' ? submissions : submissions.filter(s => s.type === activeFilter);
  const [featured, ...rest] = filtered;

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div style={{ minHeight: '100vh', background: '#f5f0e8', color: '#1a3a52', fontFamily: "'DM Sans', sans-serif" }}>

        {/* Header */}
        <header className="sticky top-0 z-50"
          style={{ background: '#1a3a52', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a3a520e' }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
            <button onClick={onBack} className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: '#e4ab55', fontWeight: 400 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e4ab55')}
              onMouseLeave={e => (e.currentTarget.style.color = '#e4ab55')}>
              <ArrowLeft size={14} />
              Back to SGYN
            </button>

            <div className="flex items-center gap-2.5">
              <img src="SGYNBannerSmall.svg" alt="SGYN" className="h-8 md:h-10 w-auto" />
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.2rem', color: '#e4ab55' }}>
              </span>
            </div>

            <a href="https://forms.gle/hP856wgmD7PJuvNA9 "
              className="inline-flex items-center gap-1 text-sm font-medium"
              style={{ color: '#e4ab55' }}>
              Submit Work <ArrowUpRight size={13} />
            </a>
          </div>
        </header>

        {/* Hero text */}
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: '#e4ab55' }}>
            Community · Culture · Exchange
          </p>
          <h1 className="mb-5" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            fontWeight: 700, lineHeight: 1.02, color: '#1a3a52', letterSpacing: '-0.02em'
          }}>
            Digital Archive<br />
            <em style={{ fontWeight: 400, color: '#e4ab55' }}>& Media Lab</em>
          </h1>
          <p className="max-w-lg leading-relaxed" style={{ color: '#1a3a5260', fontSize: '0.95rem', lineHeight: 1.8 }}>
            Stories, films, essays, and art from the SGYN community — voices from across China, the Gulf, and beyond.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-10" style={{ borderBottom: '1px solid #1a3a520c' }}>
          <div className="flex flex-wrap gap-2 items-center">
            {filters.map(f => (
              <button key={f.value} onClick={() => setActiveFilter(f.value)}
                className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
                style={activeFilter === f.value
                  ? { background: '#1a3a52', color: '#f5f0e8', fontWeight: 500 }
                  : { background: 'transparent', color: '#1a3a5255', border: '1px solid #1a3a5218' }}>
                {f.label}
              </button>
            ))}
            <span className="ml-auto text-xs" style={{ color: '#1a3a5230' }}>
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#1a3a5230', fontSize: '1.1rem' }}>
                No submissions in this category yet.
              </p>
              <p style={{ color: '#1a3a5228', fontSize: '0.85rem', marginTop: '8px' }}>Be the first to contribute.</p>
            </div>
          ) : (
            <>
              {featured && (
                <div className="mb-10">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#1a3a5238',fontSize: "1.2rem" }}>Featured</p>
                  <FeaturedCard item={featured} onClick={() => setSelected(featured)} />
                </div>
              )}

              {rest.length > 0 && (
                <>
                  <div className="flex items-center gap-4 my-10">
                    <div className="flex-1 h-px" style={{ background: '#1a3a520c' }} />
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1a3a5238' }}>More from the community</p>
                    <div className="flex-1 h-px" style={{ background: '#1a3a520c' }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map(item => <SmallCard key={item.id} item={item} onClick={() => setSelected(item)} />)}
                  </div>
                </>
              )}
            </>
          )}

          {/* CTA */}
          <div className="mt-20 rounded-2xl p-10 md:p-14 text-center" style={{ background: '#1a3a52' }}>
            <p className="mb-2 text-xs uppercase tracking-widest font-semibold" style={{ color: '#e4ab5555' }}>Open Call</p>
            <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 700, color: '#f5f0e8' }}>
              Have a story to tell?
            </h2>
            <p className="max-w-md mx-auto mb-8 leading-relaxed" style={{ color: '#f5f0e860', fontSize: '0.88rem' }}>
              We welcome video, photography, writing, audio, and art from anyone in the SGYN community.
              Share your experience — in any language, from any city.
            </p>
            <a href="https://forms.gle/hP856wgmD7PJuvNA9 "
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm"
              style={{ background: '#e4ab55', color: '#1a3a52' }}>
              Submit Your Work <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default ArchivePage;
