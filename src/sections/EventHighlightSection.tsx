import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Users, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EventHighlightSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        '.event-image',
        { x: '-40px', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        '.event-badge, .event-title, .event-meta, .event-cta',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const goToEvent = () => {
    window.location.href = '/#/events?event=sino-gulf-dialogue-nyc-2025';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="event"
      className="relative w-full min-h-screen bg-sgyn-navy-dark overflow-hidden z-50 flex items-center"
    >
      {/* Left Image */}
      <div className="event-image absolute left-0 top-0 w-1/2 h-full hidden md:block">
        <img
          src="SGYN-Flagship-Event.jpeg"
          alt="Sino-Gulf Youth Dialogue at the UAE Mission to the UN"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sgyn-navy-dark" />
      </div>

      {/* Content */}
      <div className="event-content relative z-10 w-full flex flex-col justify-center px-6 md:pl-[55%] md:pr-12 py-24">
        {/* Badge */}
        <div className="event-badge inline-flex items-center gap-2 px-4 py-2 bg-sgyn-gold/20 rounded-full w-fit mb-6">
          <Star size={16} className="text-sgyn-gold" />
          <span className="text-sgyn-gold text-sm font-medium">Flagship Event</span>
        </div>

        {/* Title */}
        <h2 className="event-title headline-lg text-white mb-2">
          Sino-Gulf Youth{' '}
          <span className="text-sgyn-gold">Dialogue</span>
        </h2>
        <p className="event-title text-white/50 text-lg mb-6 font-display italic">
          Uniting Youth Voices for a Shared Future
        </p>

        {/* Meta Info */}
        <div className="space-y-3 mb-8">
          <div className="event-meta flex items-center gap-3 text-white/70">
            <MapPin size={18} className="text-sgyn-gold flex-shrink-0" />
            <span>UAE Permanent Mission to the United Nations, New York City</span>
          </div>
          <div className="event-meta flex items-center gap-3 text-white/70">
            <Calendar size={18} className="text-sgyn-gold flex-shrink-0" />
            <span>November 19, 2025</span>
          </div>
          <div className="event-meta flex items-center gap-3 text-white/70">
            <Users size={18} className="text-sgyn-gold flex-shrink-0" />
            <span>100+ Attendees · Youth Leaders, Scholars & Diplomats</span>
          </div>
        </div>

        {/* Description */}
        <p className="event-meta body-text-lg text-white/60 max-w-lg mb-8">
          A landmark gathering at the United Nations, convening youth leaders and diplomats
          from China and the Gulf to shape the next chapter of bilateral cooperation —
          co-hosted with the UAE Mission to the UN and UAE Youth Society.
        </p>

        {/* CTA */}
        <div className="event-cta flex flex-col sm:flex-row gap-4">
          <button onClick={goToEvent} className="btn-primary">
            Event Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventHighlightSection;