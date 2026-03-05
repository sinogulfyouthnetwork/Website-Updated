import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    title: 'Saudi-Chinese Cultural Exchange',
    location: 'Jeddah',
    date: 'August 2025',
    description: 'First youth-led Chinese-Saudi cultural exchange with 40+ participants.',
    image: '/programs_left_mentorship.jpg',
  },
  {
    title: 'Beijing Launch Event',
    location: 'Beijing',
    date: 'November 2025',
    description: 'Private networking lunch with scholars from PKU and Tsinghua.',
    image: '/programs_right_workshop.jpg',
  },
  {
    title: 'UAE Union Day Exchange',
    location: 'Yenching Academy, PKU',
    date: 'December 2025',
    description: 'Cultural exchange introducing UAE history to international students.',
    image: '/community_top_center_conversation.jpg',
  },
];

const ProgramsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

      // Phase 1: Entrance
      scrollTl.fromTo(
        '.programs-label',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        '.programs-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        '.program-card',
        { x: (i) => (i % 2 === 0 ? -60 : 60), opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.04, ease: 'none' },
        0.1
      );

      // Phase 3: Exit
      scrollTl.fromTo(
        '.programs-header',
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        '.program-card',
        { opacity: 1, y: 0 },
        { opacity: 0, y: '8vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToEvent = () => {
    const element = document.querySelector('#event');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="relative w-full h-screen bg-sgyn-navy overflow-hidden z-30"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-sgyn-blue/20 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-20">
        {/* Header */}
        <div className="programs-header text-center mb-10">
          <span className="programs-label micro-label text-sgyn-gold mb-3 block">
            Programs | 项目 | البرامج
          </span>
          <h2 className="programs-title headline-lg text-white">
            Our <span className="text-sgyn-gold">2025</span> Activities
          </h2>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="program-card group relative bg-sgyn-navy-light rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {program.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {program.date}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-sgyn-gold transition-colors">
                  {program.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button 
          onClick={scrollToEvent}
          className="mt-10 inline-flex items-center gap-2 text-sgyn-gold font-medium hover:gap-3 transition-all"
        >
          View All Events
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default ProgramsSection;
