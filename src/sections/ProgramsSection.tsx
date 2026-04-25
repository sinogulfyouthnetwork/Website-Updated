import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    title: 'Saudi-Chinese Cultural Exchange Connections',
    location: 'Jeddah',
    date: 'August 2025',
    description: 'First youth-led Chinese-Saudi cultural exchange with 40+ participants.',
    image: 'Jeddah-Event.jpeg',
  },
  {
    title: 'Beijing Launch Event',
    location: 'Beijing',
    date: 'November 2025',
    description: 'SGYN launched its Beijing presence with a private networking lunch in Sanlintun, hosting scholars from Peking and Tsinghua University.',
    image: 'Beijing-Launch-Event.JPG',
  },
  {
    title: 'Chinese-Emirati Cultural Exchange Connections',
    location: 'NYU Shanghai',
    date: 'December 2024',
    description: 'Cultural exchange introducing UAE history to international students.',
    image: 'UAE-Union-Day-Exchange.jpeg',
  },
];

const ProgramsSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.programs-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.programs-title',
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Cards staggered reveal
      gsap.fromTo(
        '.program-card',
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.program-card',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const goToEvent = () => {
    window.location.href = '/#/events';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="relative w-full bg-sgyn-navy z-30 py-24"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-sgyn-blue/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12">
        <div className="programs-header text-center mb-10">
          <span className="programs-label micro-label text-sgyn-gold mb-3 block">
            Programs | 项目 | البرامج
          </span>
          <h2 className="programs-title headline-lg text-white">
            Our <span className="text-sgyn-gold">Events</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {programs.map((program, index) => (
            <div
              key={index}
              className="program-card group relative bg-sgyn-navy-light rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

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

        <button
          onClick={goToEvent}
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