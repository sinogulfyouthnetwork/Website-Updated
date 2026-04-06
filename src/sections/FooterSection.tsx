import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Mail, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    //setIsMobileMenuOpen(false);
    //setProgramsOpen(false);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // XHS (RedNote / Xiaohongshu) — Chinese characters in a rounded badge
  const XHSIcon = () => (
    <span style={{
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '22px',
      height: '22px',
    }}>
      小红书
    </span>
  );

  const socialLinks = [
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/sinogulfyouthnetwork/', label: 'Instagram' },
    { icon: <Linkedin size={20} />, href: 'https://ae.linkedin.com/company/sino-gulf-youth-network', label: 'LinkedIn' },
    { icon: <XHSIcon />, href: 'https://xhslink.com/m/8LjkMvEEZ95', label: 'RedNote (小红书)' },
  ];

  const quickLinks = [
    { label: 'Team', href: '#team' },
    { label: 'Events', href: '#event' },
    { label: 'Programs', href: '#programs' },
    { label: 'About Us', href: '#manifesto' },
  ];

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative w-full bg-sgyn-navy-dark pt-16 pb-8 px-6 lg:px-12 z-90 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 mb-12">
          {/* Left Column */}
          <div ref={leftRef} className="lg:w-1/2">
            {/* Logo */}
            <img 
              src="SGYNBannerSmallFooter.svg" 
              alt="SGYN Logo" 
              className="h-16 w-auto object-contain mb-6 -ml-8 "
            />

            {/* Tagline */}
            <p className="body-text text-white/60 mb-6 max-w-md">
              Building bridges between China and the Gulf through culture, dialogue, and collaboration. 
              A youth-led initiative shaping the future of cross-regional partnership.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 bg-white/5 rounded-full text-white/60 hover:bg-sgyn-gold hover:text-sgyn-navy transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="lg:w-1/2 lg:text-left">
            <div className="grid grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        className="text-white/60 hover:text-sgyn-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="mailto:info@sinogulfyouthnetwork.com"
                      className="inline-flex items-center gap-2 text-white/60 hover:text-sgyn-gold transition-colors"
                    >
                      <Mail size={16} />
                      info@sinogulfyouthnetwork.com
                    </a>
                  </li>
                  <li>
            <button onClick={() => scrollToSection('#partnersections')} className="inline-flex items-center gap-2 text-white/60 hover:text-sgyn-gold transition-colors">
                      <ExternalLink size={16} />
                      Partnerships
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Trilingual Tagline */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="text-white/40 font-arabic">中海湾青年网络</span>
            <span className="text-white/20">|</span>
            <span className="text-white/40">Sino-Gulf Youth Network</span>
            <span className="text-white/20">|</span>
            <span className="text-white/40 font-arabic" dir="rtl">شبكة الشباب الخليجي الصيني</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} SGYN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
