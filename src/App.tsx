import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ManifestoSection from './sections/ManifestoSection';
import ProgramsSection from './sections/ProgramsSection';
import CommunitySection from './sections/CommunitySection';
import EventHighlightSection from './sections/EventHighlightSection';
import TeamSection from './sections/TeamSection';
import PartnersSection from './sections/PartnersSection';
import NewsletterSection from './sections/NewsletterSection';
import FooterSection from './sections/FooterSection';
import ArchivePage from './pages/ArchivePage.tsx';
import EventsPage from './pages/EventsPage.tsx';
import ProgramsTeaserSection from './sections/ProgramsTeaserSection.tsx';
import LABPage from './pages/LABPage.tsx';
import GetInvolvedSection from './sections/GetInvolvedSection.tsx';
import LiterarySalonPage from './pages/LiterarySalonPage.tsx';
import './App.css';

type Page = 'home' | 'archive' | 'lab' | 'events' | 'literary-salon';

function useHashRoute() {
  const getPage = (): Page => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (path.includes('/archive') || hash.includes('/archive')) return 'archive';
    if (path.includes('/lab') || hash.includes('/lab')) return 'lab';
    if (path.includes('/events') || hash.includes('/events')) return 'events';
    if (path.includes('/literary-salon') || hash.includes('/literary-salon')) return 'literary-salon';
    return 'home';
  };

  const [page, setPage] = useState<Page>(getPage);

  useEffect(() => {
    const handler = () => setPage(getPage());
    window.addEventListener('hashchange', handler);
    window.addEventListener('popstate', handler);
    return () => {
      window.removeEventListener('hashchange', handler);
      window.removeEventListener('popstate', handler);
    };
  }, []);

  const navigate = (to: Page) => {
    if (to === 'archive') window.history.pushState({}, '', '/#/archive');
    else if (to === 'lab') window.history.pushState({}, '', '/#/lab');
    else if (to === 'events') window.history.pushState({}, '', '/#/events');
    else window.history.pushState({}, '', '/');
    setPage(to);
    // Use setTimeout to scroll after the new page has rendered
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
  };

  return { page, navigate };
}

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;
            return pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-sgyn-navy min-h-screen overflow-x-hidden">
      <Navigation />
      <main className="relative">
        <HeroSection />
        <ManifestoSection />
        <ProgramsSection />
        <CommunitySection />
        <ProgramsTeaserSection />
        <EventHighlightSection />
        <TeamSection />
        <PartnersSection />
        <GetInvolvedSection />
        <NewsletterSection />
        <FooterSection />
      </main>
    </div>
  );
}

function App() {
  const { page, navigate } = useHashRoute();

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a3a52',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      {page === 'archive' && <ArchivePage onBack={() => navigate('home')} />}
      {page === 'events' && <EventsPage onBack={() => navigate('home')} />}
      {page === 'lab' && <LABPage onBack={() => navigate('home')} />}
      {page === 'literary-salon' && <LiterarySalonPage onBack={() => navigate('home')} /> }
      {page === 'home' && <HomePage />}
    </>
  );
}

export default App;
