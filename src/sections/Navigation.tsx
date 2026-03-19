import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { label: 'About', href: '#manifesto' },
    { label: 'Events', href: '#programs', external: true },
    { label: 'Archive', href: '/#/archive', external: true },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#footer' },
  ];

  // Programs dropdown items — add more here when they get their own pages
  const programLinks = [
    { label: 'Language Across Borders (LAB)', href: '/#/lab' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setProgramsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-sgyn-navy/95 backdrop-blur-md py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3"
          >
            <img src="SGYNBannerSmall.svg" alt="SGYN Logo" className="h-10 md:h-12 w-auto object-contain" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((link) =>
              link.external ? (
                <a key={link.label} href={link.href}
                  className="text-sm font-medium text-white/80 hover:text-sgyn-gold transition-colors duration-300">
                  {link.label}
                </a>
              ) : (
                <button key={link.label} onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-white/80 hover:text-sgyn-gold transition-colors duration-300">
                  {link.label}
                </button>
              )
            )}

            {/* Programs dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProgramsOpen(o => !o)}
                onMouseEnter={() => setProgramsOpen(true)}
                className="inline-flex items-center gap-1 text-sm font-medium text-white/80 hover:text-sgyn-gold transition-colors duration-300"
              >
                Programs
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200"
                  style={{ transform: programsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Dropdown panel */}
              <div
                onMouseLeave={() => setProgramsOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  minWidth: '220px',
                  background: '#162d42',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                  opacity: programsOpen ? 1 : 0,
                  pointerEvents: programsOpen ? 'auto' : 'none',
                  transform: `translateX(-50%) translateY(${programsOpen ? '0' : '-6px'})`,
                }}
              >
                {/* View all programs link */}
                <button
                  onClick={() => scrollToSection('#our-programs')}
                  className="w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e4ab55')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                >
                  All Programs ↓
                </button>

                {programLinks.map(p => (
                  <a key={p.label} href={p.href}
                    onClick={() => setProgramsOpen(false)}
                    className="block px-4 py-3 text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = '#e4ab55';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>

            <button onClick={() => scrollToSection('#newsletter')} className="btn-secondary text-sm py-2.5 px-5">
              Get Involved
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-sgyn-navy transition-transform duration-500 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">

          {navLinks.map((link) =>
            link.external ? (
              <a key={link.label} href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-semibold text-white hover:text-sgyn-gold transition-colors">
                {link.label}
              </a>
            ) : (
              <button key={link.label} onClick={() => scrollToSection(link.href)}
                className="text-2xl font-display font-semibold text-white hover:text-sgyn-gold transition-colors">
                {link.label}
              </button>
            )
          )}

          {/* Mobile Programs accordion */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setMobileProgramsOpen(o => !o)}
              className="inline-flex items-center gap-2 text-2xl font-display font-semibold text-white hover:text-sgyn-gold transition-colors"
            >
              Programs
              <ChevronDown size={20}
                className="transition-transform duration-200"
                style={{ transform: mobileProgramsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {mobileProgramsOpen && (
              <div className="flex flex-col items-center gap-3">
                <button onClick={() => scrollToSection('#our-programs')}
                  className="text-sm text-white/40 hover:text-sgyn-gold transition-colors uppercase tracking-widest">
                  All Programs
                </button>
                {programLinks.map(p => (
                  <a key={p.label} href={p.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg text-white/70 hover:text-sgyn-gold transition-colors">
                    {p.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => scrollToSection('#newsletter')} className="btn-secondary mt-4">
            Join Us
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
