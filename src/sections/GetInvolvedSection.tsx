import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Users, Handshake, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const forms = [
  {
    icon: Users,
    tag: 'Membership | عضوية | 会员',
    title: 'Join Us',
    description:
      'Become part of a global community of young Saudi women making an impact. Fill out our membership form to get started.',
    cta: 'Apply to Join',
    href: 'https://docs.google.com/forms/d/1sASQ_CiNdzEX7atE9oZQI8ua_qBSgBDhhMHn6rKJBFY/edit',
    accent: 'from-sgyn-gold/20 to-transparent',
    border: 'border-sgyn-gold/30 hover:border-sgyn-gold',
  },
  {
    icon: Building2,
    tag: 'Funding | تمويل | 赞助',
    title: 'Sponsor SGYN',
    description:
      'Support our mission by sponsoring events, programs, and initiatives that empower the next generation of Saudi women leaders.',
    cta: 'Become a Sponsor',
    href: 'https://docs.google.com/forms/d/1JbOUWm9ce2eXi_22SocMDWlzkHB8fFlx089hTFWsEB8/edit',
    accent: 'from-white/10 to-transparent',
    border: 'border-white/10 hover:border-white/30',
  },
  {
    icon: Handshake,
    tag: 'Collaboration | تعاون | 合作',
    title: 'Partner with Us',
    description:
      'Organisations and institutions are welcome to explore partnership opportunities that align with our vision and values.',
    cta: 'Express Interest',
    href: 'https://docs.google.com/forms/d/1vK8upvdKtoODgaXJCRxug7XZr1MbnXTK7vB_ICIHlDU/edit',
    accent: 'from-white/10 to-transparent',
    border: 'border-white/10 hover:border-white/30',
  },
];

const GetInvolvedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label + title entrance
      gsap.fromTo(
        '.gi-label',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.7,
          scrollTrigger: {
            trigger: '.gi-label',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.gi-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: {
            trigger: '.gi-title',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.gi-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.7,
          delay: 0.2,
          scrollTrigger: {
            trigger: '.gi-subtitle',
            start: 'top 85%',
          },
        }
      );

      // Cards staggered entrance
      gsap.fromTo(
        '.gi-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.gi-cards',
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="get-involved"
      className="relative w-full min-h-screen bg-sgyn-navy overflow-hidden py-24 px-6"
    >
      {/* Background texture / radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sgyn-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="gi-label micro-label text-sgyn-gold block mb-4">
            Get Involved | انضمي | 参与
          </span>

          <h2 className="gi-title headline-lg text-white mb-5">
            Shape the <span className="text-sgyn-gold">Future</span> with Us
          </h2>

          <p className="gi-subtitle body-text-lg text-white/60 max-w-xl">
            Whether you're joining as a member, backing our mission as a sponsor, or collaborating as a partner — there's a place for you in SGYN.
          </p>
        </div>

        {/* Cards */}
        <div className="gi-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {forms.map(({ icon: Icon, tag, title, description, cta, href, accent, border }) => (
            <div
              key={title}
              className={`gi-card group relative rounded-2xl border bg-gradient-to-b ${accent} ${border} p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40`}
            >
              {/* Icon */}
              <div className="mb-6 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-sgyn-gold/10 group-hover:border-sgyn-gold/30 transition-all duration-300">
                <Icon size={22} className="text-white/60 group-hover:text-sgyn-gold transition-colors duration-300" />
              </div>

              {/* Tag */}
              <span className="micro-label text-sgyn-gold/70 mb-3 text-xs tracking-widest uppercase">
                {tag}
              </span>

              {/* Title */}
              <h3 className="text-white text-2xl font-semibold mb-3 leading-tight">
                {title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">
                {description}
              </p>

              {/* CTA */}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-sgyn-gold border border-sgyn-gold/40 hover:bg-sgyn-gold hover:text-sgyn-navy rounded-xl px-5 py-3 transition-all duration-300 w-fit group/btn"
              >
                {cta}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom divider / tagline */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            Not sure where to start?{' '}
            <a href="#newsletter" className="text-sgyn-gold hover:underline underline-offset-4 transition-all">
              Subscribe to our newsletter
            </a>{' '}
            and we'll guide you.
          </p>
          <span className="text-white/20 text-xs tracking-widest uppercase">SGYN · سجين · 沙特女青</span>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
