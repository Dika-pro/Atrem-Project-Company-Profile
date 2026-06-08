import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronDown, Cpu, Globe, Rocket, Shield, Zap } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Particle network canvas background
const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      opacity: number;
    }

    const particleCount = Math.floor((width * height) / 12000);
    const particles: Particle[] = [];
    const connectionDistance = 150;
    const mouseRadius = 200;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius * 0.02;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < connectionDistance) {
            const alpha = (1 - cdist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

// Animated counter component
const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({
  end, suffix = '', duration = 2000
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const countRef = useRef(0);

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.floor(eased * end);

      if (ref.current) {
        ref.current.textContent = countRef.current + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, end, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
};

export const About: React.FC = () => {
  const structureItems = [
    {
      icon: Cpu,
      title: 'Innovation Lab',
      label: 'Research & Dev',
      desc: 'Cutting-edge research into modern frameworks, libraries, and development methodologies.'
    },
    {
      icon: Globe,
      title: 'Digital Studio',
      label: 'Product Design',
      desc: 'Crafting beautiful, user-centered digital experiences with pixel-perfect precision.'
    },
    {
      icon: Rocket,
      title: 'Project Hub',
      label: 'Live Deployment',
      desc: 'Real-world project management from concept to production deployment.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      label: 'Industry Standards',
      desc: 'Ensuring code quality, performance, and best practices at every step.'
    },
    {
      icon: Zap,
      title: 'Fast-Track',
      label: 'Learning Curve',
      desc: 'Accelerated learning paths tailored to each participant\'s growth trajectory.'
    },
  ];

  const stats = [
    { value: 20, suffix: '+', label: 'Projects Completed' },
    { value: 15, suffix: '+', label: 'Team Members' },
    { value: 3, suffix: '', label: 'Learning Phases' },
    { value: 100, suffix: '%', label: 'Hands-on Practice' },
  ];

  const scrollToNext = () => {
    const el = document.getElementById('about-content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="about">
      {/* Hero-style full viewport intro — epiminds inspired */}
      <div className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#06040A]">
        {/* Particle network background */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork />
        </div>

        {/* Radial gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#06040A]" />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto">
          {/* Accent italic text — epiminds style */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif italic text-2xl md:text-3xl text-zinc-400 mb-4"
          >
            About Atrem Project
          </motion.p>

          {/* Big heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent">
              About Atrem Project
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Agency.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Atrem Project merupakan hasil inisiatif Merta Yoga yang berfokus pada digitalisasi berbagai lini usaha. 
            Kami menawarkan berbagai solusi digital seperti sistem manajemen laundry, Learning Management System (LMS), 
            hingga jasa desain profil perusahaan untuk membantu bisnis Anda berkembang di era digital.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={scrollToNext}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.06] border border-white/10 text-white font-medium text-base hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Structure
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToNext}
        >
          <span className="text-[11px] text-zinc-500 uppercase tracking-[0.25em] font-medium">
            Scroll & Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content section — below the hero */}
      <div id="about-content" className="bg-zinc-950">
        {/* Stats bar */}
        <div className="border-y border-zinc-800/50">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`py-10 md:py-14 text-center ${
                    i < stats.length - 1 ? 'border-r border-zinc-800/50' : ''
                  }`}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History section */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-24">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.3em] mb-3 block">
              Our Journey
            </span>
            <h3 className="text-3xl md:text-4xl font-bold">
              History of <span className="font-serif italic text-zinc-400">Atrem Project</span>
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 shadow-2xl shadow-indigo-500/5 h-[450px] md:h-[550px]">
                <img 
                  src="https://atremproject.dhiyowikantara.com/assets/images/history.png" 
                  alt="History of Atrem Project"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-zinc-400 text-lg leading-relaxed">
                Semua berawal dari ketertarikan Merta Yoga pada bidang komputer, terutama setelah ia mengetahui bahwa seorang programmer dapat bekerja secara remote. Hal ini mendorongnya untuk memilih SMK 1 Denpasar dengan jurusan Rekayasa Perangkat Lunak (RPL) sebagai langkah awal dalam kariernya.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Setelah menyelesaikan pendidikan di SMK, Merta Yoga memutuskan untuk mendirikan Atrem Project sebagai sumber penghasilan sampingan, yang kini berkembang menjadi agensi digital yang berfokus pada solusi teknologi.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="px-5 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                  <span className="block text-indigo-400 font-bold text-xl">SMK 1 Denpasar</span>
                  <span className="text-zinc-500 text-xs uppercase tracking-widest font-mono">Educational Foundation</span>
                </div>
                <div className="px-5 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                  <span className="block text-indigo-400 font-bold text-xl">RPL Specialist</span>
                  <span className="text-zinc-500 text-xs uppercase tracking-widest font-mono">Core Expertise</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
