import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, MapPin, Users, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EventHighlightSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl.fromTo(
        '.event-image',
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        '.event-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        '.event-title',
        { x: '8vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        '.event-meta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.2
      );

      scrollTl.fromTo(
        '.event-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.3
      );

      scrollTl.fromTo(
        '.event-content',
        { opacity: 1, x: 0 },
        { opacity: 0, x: '8vw', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        '.event-image',
        { opacity: 1, x: 0 },
        { opacity: 0, x: '-40vw', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const goToEvent = () => {
    window.location.href = '/#/events?event=sino-gulf-dialogue-nyc-2025';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="event"
        className="relative w-full h-screen bg-sgyn-navy-dark overflow-hidden z-50"
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
        <div className="event-content relative z-10 h-full flex flex-col justify-center px-6 md:pl-[55%] md:pr-12">
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
            <button
              onClick={goToEvent}
              className="btn-primary"
            >
             Event Details
            </button>
            {/* { <a
              href="https://www.instagram.com/sinogulfyouthnetwork/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Follow Our Journey
            </a> } */}
          </div>
        </div>
      </section>

      {/* Get Involved Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-sgyn-navy border-sgyn-navy-light text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-white">
              Get Involved with SGYN
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Whether you want to attend future events, speak at a session, or explore a partnership — we'd love to hear from you.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4 mt-4"
            onSubmit={(e) => { e.preventDefault(); setDialogOpen(false); }}
          >
            <div>
              <label className="block text-sm font-medium text-white mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-sgyn-gold placeholder:text-white/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-sgyn-gold placeholder:text-white/30"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">How would you like to get involved?</label>
              <select className="w-full px-4 py-3 rounded-xl border border-white/10 bg-sgyn-navy text-white focus:outline-none focus:ring-2 focus:ring-sgyn-gold">
                <option value="">Select an option</option>
                <option value="attend">Attend future events</option>
                <option value="speak">Speak at a session</option>
                <option value="partner">Explore a partnership</option>
                <option value="volunteer">Join as a volunteer</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="w-full btn-primary mt-2">
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventHighlightSection;
