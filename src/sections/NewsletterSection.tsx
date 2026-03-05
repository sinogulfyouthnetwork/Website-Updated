import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'sonner';
import { Mail, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NewsletterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
        '.newsletter-image',
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        '.newsletter-label',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        '.newsletter-title',
        { x: '8vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        '.newsletter-form',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // Phase 3: Exit
      scrollTl.fromTo(
        '.newsletter-content',
        { opacity: 1, x: 0 },
        { opacity: 0, x: '6vw', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        '.newsletter-image',
        { opacity: 1, x: 0 },
        { opacity: 0, x: '-30vw', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      toast.success('Welcome to SGYN!', {
        description: 'You\'ll receive our next newsletter soon.',
      });
      setEmail('');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative w-full h-screen bg-sgyn-navy overflow-hidden z-80"
    >
      {/* Left Image */}
      <div className="newsletter-image absolute left-0 top-0 w-1/2 h-full hidden lg:block">
        <img 
          src="/newsletter_image.jpg"
          alt="Join SGYN"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sgyn-navy" />
      </div>

      {/* Content */}
      <div className="newsletter-content relative z-10 h-full flex flex-col justify-center px-6 lg:pl-[55%] lg:pr-12">
        {/* Label */}
        <span className="newsletter-label micro-label text-sgyn-gold mb-4">
          Connect | 联系 | تواصل
        </span>

        {/* Title */}
        <h2 className="newsletter-title headline-lg text-white mb-4">
          Stay in the <span className="text-sgyn-gold">Loop</span>
        </h2>

        {/* Description */}
        <p className="body-text-lg text-white/60 max-w-md mb-8">
          Get event invites, program updates, and community highlights—delivered monthly to your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="newsletter-form max-w-md"
        >
          {!submitted ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-sgyn-gold placeholder:text-white/30 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                <Send size={18} className="mr-2" />
                Subscribe
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-sgyn-gold/20 rounded-xl">
              <CheckCircle size={24} className="text-sgyn-gold" />
              <span className="text-white">Thank you for subscribing!</span>
            </div>
          )}
          
          <p className="text-sm text-white/40 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </form>

        {/* Social Proof */}
        <div className="mt-12 flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="w-10 h-10 rounded-full bg-sgyn-navy-light border-2 border-sgyn-navy flex items-center justify-center text-xs text-white/60"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/50">
            Join <span className="text-sgyn-gold font-semibold">200+</span> members worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
