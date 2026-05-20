import { motion } from "motion/react";
import { 
  Video, 
  Image as ImageIcon, 
  Music, 
  Code2, 
  Globe, 
  Database, 
  Mic2, 
  Zap, 
  Shield, 
  Unlock,
  Activity,
  Users,
  Award,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  LayoutGrid,
  Search as SearchIconLucide
} from "lucide-react";
import { FC, useState, FormEvent, useEffect, useRef } from "react";
import { featuredTools, categories } from "../data/tools";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";
import { Button } from "../components/ui/Button";
import { SearchIcon, WeeklyPicksIcon } from "../components/ui/Icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MethodologyItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-emerald-600" />
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const HomePage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const grainCanvas = grainCanvasRef.current;
    if (!grainCanvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const grainCtx = grainCanvas.getContext('2d');
    if (!grainCtx) return;
    
    const density = ' .:-=+*#%@';
    
    const params = {
      rotation: 0,
      atmosphereShift: 0,
      glitchIntensity: 0,
      glitchFrequency: 0
    };

    gsap.to(params, {
      rotation: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
    
    gsap.to(params, {
      atmosphereShift: 1,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Glitch animation
    gsap.to(params, {
      glitchIntensity: 1,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      repeatDelay: Math.random() * 3 + 1
    });

    gsap.to(params, {
      glitchFrequency: 1,
      duration: 0.05,
      repeat: -1,
      yoyo: true,
      ease: "none"
    });

    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        }
      });
    }

    // Film grain generation
    const generateFilmGrain = (width: number, height: number, intensity = 0.15) => {
      const imageData = grainCtx.createImageData(width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * intensity * 255;
        data[i] = Math.max(0, Math.min(255, 128 + grain));
        data[i + 1] = Math.max(0, Math.min(255, 128 + grain));
        data[i + 2] = Math.max(0, Math.min(255, 128 + grain));
        data[i + 3] = Math.abs(grain) * 3;
      }
      
      return imageData;
    };

    // Glitch effect functions
    const drawGlitchedOrb = (centerX: number, centerY: number, radius: number, hue: number, time: number, glitchIntensity: number) => {
      ctx.save();
      
      const shouldGlitch = Math.random() < 0.1 && glitchIntensity > 0.5;
      const glitchOffset = shouldGlitch ? (Math.random() - 0.5) * 20 * glitchIntensity : 0;
      const glitchScale = shouldGlitch ? 1 + (Math.random() - 0.5) * 0.3 * glitchIntensity : 1;
      
      if (shouldGlitch) {
        ctx.translate(glitchOffset, glitchOffset * 0.8);
        ctx.scale(glitchScale, 1 / glitchScale);
      }
      
      const orbGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 1.5
      );
      
      orbGradient.addColorStop(0, `hsla(${hue + 10}, 100%, 95%, 0.9)`);
      orbGradient.addColorStop(0.2, `hsla(${hue + 20}, 90%, 80%, 0.7)`);
      orbGradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, 0.4)`);
      orbGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = orbGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerRadius = radius * 0.3;
      ctx.fillStyle = `hsla(${hue + 20}, 100%, 95%, 0.8)`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
      ctx.fill();
      
      if (shouldGlitch) {
        ctx.globalCompositeOperation = 'screen';
        
        ctx.fillStyle = `hsla(100, 100%, 50%, ${0.6 * glitchIntensity})`;
        ctx.beginPath();
        ctx.arc(centerX + glitchOffset * 0.5, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `hsla(240, 100%, 50%, ${0.5 * glitchIntensity})`;
        ctx.beginPath();
        ctx.arc(centerX - glitchOffset * 0.5, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalCompositeOperation = 'source-over';
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * glitchIntensity})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const y = centerY - radius + (Math.random() * radius * 2);
          const startX = centerX - radius + Math.random() * 20;
          const endX = centerX + radius - Math.random() * 20;
          
          ctx.beginPath();
          ctx.moveTo(startX, y);
          ctx.lineTo(endX, y);
          ctx.stroke();
        }
        
        ctx.fillStyle = `rgba(255, 0, 255, ${0.4 * glitchIntensity})`;
        for (let i = 0; i < 3; i++) {
          const blockX = centerX - radius + Math.random() * radius * 2;
          const blockY = centerY - radius + Math.random() * radius * 2;
          const blockSize = Math.random() * 10 + 2;
          ctx.fillRect(blockX, blockY, blockSize, blockSize);
        }
      }
      
      ctx.strokeStyle = `hsla(${hue + 20}, 80%, 70%, 0.6)`;
      ctx.lineWidth = 2;
      
      if (shouldGlitch) {
        const segments = 8;
        for (let i = 0; i < segments; i++) {
          const startAngle = (i / segments) * Math.PI * 2;
          const endAngle = ((i + 1) / segments) * Math.PI * 2;
          const ringRadius = radius * 1.2 + (Math.random() - 0.5) * 10 * glitchIntensity;
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, startAngle, endAngle);
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      if (shouldGlitch && Math.random() < 0.3) {
        ctx.globalCompositeOperation = 'difference';
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * glitchIntensity})`;
        
        for (let i = 0; i < 3; i++) {
          const barY = centerY - radius + Math.random() * radius * 2;
          const barHeight = Math.random() * 5 + 1;
          ctx.fillRect(centerX - radius, barY, radius * 2, barHeight);
        }
        
        ctx.globalCompositeOperation = 'source-over';
      }
      
      ctx.restore();
    };

    function render() {
      if (!canvas || !ctx || !grainCanvas || !grainCtx) return;
      timeRef.current += 0.016;
      const time = timeRef.current;
      
      const width = canvas.width = grainCanvas.width = window.innerWidth;
      const height = canvas.height = grainCanvas.height = window.innerHeight;
      
      ctx.fillStyle = '#0a0f0d';
      ctx.fillRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.2;
      
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY - 50, 0,
        centerX, centerY, Math.max(width, height) * 0.8
      );
      
      const hue = 135 + params.atmosphereShift * 30; // Emerald hues using #a2efb3 style
      bgGradient.addColorStop(0, `hsla(${hue + 20}, 80%, 55%, 0.25)`);
      bgGradient.addColorStop(0.3, `hsla(${hue}, 60%, 35%, 0.2)`);
      bgGradient.addColorStop(0.6, `hsla(${hue - 20}, 40%, 15%, 0.1)`);
      bgGradient.addColorStop(1, 'rgba(10, 15, 13, 0.95)');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      drawGlitchedOrb(centerX, centerY, radius, hue, time, params.glitchIntensity);
      
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const spacing = 12;
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      
      for (let i = 0; i < cols && i < 150; i++) {
        for (let j = 0; j < rows && j < 100; j++) {
          const x = (i - cols / 2) * spacing + centerX;
          const y = (j - rows / 2) * spacing + centerY;
          
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < radius && Math.random() > 0.4) {
            const z = Math.sqrt(Math.max(0, radius * radius - dx * dx - dy * dy));
            const angle = params.rotation;
            const rotZ = dx * Math.sin(angle) + z * Math.cos(angle);
            const brightness = (rotZ + radius) / (radius * 2);
            
            if (rotZ > -radius * 0.3) {
              const charIndex = Math.floor(brightness * (density.length - 1));
              let char = density[charIndex];
              
              if (dist < radius * 0.8 && params.glitchIntensity > 0.8 && Math.random() < 0.3) {
                const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '■', '□'];
                char = glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              
              const alpha = Math.max(0.2, brightness);
              ctx.fillStyle = `rgba(162, 239, 179, ${alpha})`;
              ctx.fillText(char, x, y);
            }
          }
        }
      }
      
      grainCtx.clearRect(0, 0, width, height);
      const grainIntensity = 0.22 + Math.sin(time * 10) * 0.03;
      const grainImageData = generateFilmGrain(width, height, grainIntensity);
      grainCtx.putImageData(grainImageData, 0, 0);
      
      if (params.glitchIntensity > 0.5) {
        grainCtx.globalCompositeOperation = 'screen';
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const size = Math.random() * 3 + 0.5;
          const opacity = Math.random() * 0.5 * params.glitchIntensity;
          
          grainCtx.fillStyle = `rgba(162, 239, 179, ${opacity})`;
          grainCtx.beginPath();
          grainCtx.arc(x, y, size, 0, Math.PI * 2);
          grainCtx.fill();
        }
      }
      
      grainCtx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 2 + 0.5;
        const opacity = Math.random() * 0.3;
        
        grainCtx.fillStyle = `rgba(162, 239, 179, ${opacity})`;
        grainCtx.beginPath();
        grainCtx.arc(x, y, size, 0, Math.PI * 2);
        grainCtx.fill();
      }
      
      grainCtx.globalCompositeOperation = 'multiply';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.5 + 0.5;
        
        grainCtx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        grainCtx.beginPath();
        grainCtx.arc(x, y, size, 0, Math.PI * 2);
        grainCtx.fill();
      }
      
      frameRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FreeAI Tools",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.svg`,
    "description": "Discover the best free AI tools and alternatives to expensive SaaS. Curated directory for developers, creators, and students.",
    "sameAs": [
      "https://masto.es/@sprain",
      "https://www.linkedin.com/in/maxrivera46887320"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the best free AI tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best free AI tools include CapCut for video editing, Canva for design, and various open-source models for coding and chat."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a free alternative to paid AI tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, FreeAI Tools provides a curated directory of free alternatives to expensive AI SaaS platforms."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>FreeAI Tools - Best Free AI Directory & Alternatives</title>
        <meta name="description" content="Discover the best free AI tools and alternatives to expensive SaaS. Curated directory for developers, creators, and students. No tracking, privacy first." />
        <meta name="keywords" content="free ai tools, ai directory, free ai alternatives, ai for developers, free ai image generator, ai music generator" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : "https://freeaitools.ct.ws/"} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden" ref={containerRef}>
        {/* Animated Canvas Background (Space & Glitch Orb) */}
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: '#0a0f0d' }}
          />
          <canvas
            ref={grainCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              mixBlendMode: 'overlay',
              opacity: 0.35
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 flex flex-col items-center"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-8 backdrop-blur-md"
              >
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.2em]">Privacy First • Open Access</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 leading-[0.9] tracking-[-0.04em] text-center">
                Discover <br />
                <span className="text-emerald-400 relative inline-block">
                  Free AI
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 h-2 bg-emerald-500/20 -z-10" 
                  />
                </span> Tools
              </h1>
              <p className="text-xl text-emerald-100/80 max-w-xl mx-auto mb-12 leading-relaxed font-medium text-center">
                The ultimate curated directory of high-quality AI tools that won't cost you a dime. Save tools, take notes, and build faster.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-5 mb-14 w-full max-w-md mx-auto">
                <Link 
                  to="/browse" 
                  className="flex items-center justify-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-600/20"
                >
                  <LayoutGrid size={20} /> Explore All Tools
                </Link>
                <Link 
                  to="/weekly-picks" 
                  className="flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all shadow-sm backdrop-blur-md"
                >
                  <WeeklyPicksIcon size={20} /> Weekly Picks
                </Link>
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-focus-within:opacity-40" />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="What are you building today?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/95 border border-emerald-500/20 rounded-[2.25rem] px-10 py-6 pl-16 text-lg text-slate-950 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-xl font-sans"
                    />
                    <SearchIconLucide className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-emerald-600 transition-colors" />
                    <button 
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Search
                    </button>
                  </div>
                </form>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <span className="text-[10px] font-black text-emerald-300/60 uppercase tracking-widest self-center px-1">Trending:</span>
                  {["Flux.1", "Cursor AI", "Ollama", "Stable Diffusion"].map((tag) => (
                    <button 
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        navigate(`/search?q=${encodeURIComponent(tag)}`);
                      }}
                      className="text-xs font-bold text-emerald-300 border border-emerald-500/30 bg-white/5 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-400 px-4 py-2 rounded-xl transition-all shadow-sm backdrop-blur-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Benefit Cards - Modernized */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
            {[
              { icon: Zap, title: "Cut Costs", desc: "Save thousands by switching to premium-grade free alternatives." },
              { icon: Shield, title: "Privacy First", desc: "No cookies. No tracking. Your data stays yours, forever." },
              { icon: Unlock, title: "Full Liberty", desc: "Tinker, integrate, and scale without restrictive licenses." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 shadow-sm text-left flex flex-col gap-5 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-emerald-100/70 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="py-32 bg-white/40 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4 tracking-[-0.04em]">Featured <span className="text-emerald-600">Picks</span></h2>
              <p className="text-lg text-slate-500 font-medium font-sans">Hand-picked AI alternatives with the highest community and performance scores.</p>
            </div>
            <Link to="/browse" className="flex items-center gap-3 text-slate-900 font-black uppercase tracking-widest text-xs px-6 py-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-all group shadow-sm bg-white">
              Browse Full Database <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute top-1/2 left-0 w-full h-[600px] bg-emerald-500/5 -skew-y-3 -z-10" />
      </section>

      {/* Methodology Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-[-0.04em]">The <span className="text-emerald-400">Quality</span> Standard</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">We don't just list tools. We evaluate them across four key dimensions to ensure you only get the best.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Activity, title: "Activity", desc: "Update frequency and recent development pace." },
              { icon: Users, title: "Community", desc: "User base, feedback, and contributor engagement." },
              { icon: Award, title: "Maturity", desc: "Stability, documentation quality, and reliability." },
              { icon: TrendingUp, title: "Momentum", desc: "Growth trajectory and rising popularity." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/10 group-hover:bg-emerald-500 transition-all duration-500 group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-emerald-500/20">
                  <item.icon className="w-10 h-10 text-emerald-400 group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[200px] font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Background Mesh */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 blur-[120px] rounded-full" />
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative shadow-[0_32px_64px_-16px_rgba(5,150,105,0.2)]">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full">Coming this week</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[0.9] tracking-[-0.04em]">AI <span className="text-emerald-300">Insights</span> & Global Hub</h2>
              <p className="text-emerald-50/80 text-xl mb-12 leading-relaxed font-medium">
                Deep dives into the AI landscape. We analyze market shifts, tool death-rates, and emerging tech to keep you ahead.
              </p>
              <Link 
                to="/insights" 
                className="inline-flex items-center gap-4 bg-white text-emerald-600 px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                Read Professional Insights <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Visuals */}
            <div className="absolute top-1/2 right-20 -translate-y-1/2 opacity-10 hidden lg:block">
              <TrendingUp className="w-96 h-96" />
            </div>
            <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-emerald-400 blur-[150px] rounded-full opacity-30" />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-[-0.04em]">Search <span className="text-emerald-600">Everything</span></h2>
            <p className="text-lg text-slate-500 font-medium">Precision filtering for every vertical in the generative AI space.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.slice(0, 6).map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -z-10 group-hover:bg-emerald-500/10 transition-all" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-3 h-8 rounded-full bg-${category.color}-500 shadow-lg shadow-${category.color}-500/50`} />
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{category.name}</h3>
                </div>
                
                <div className="space-y-4 mb-10">
                  {category.subCategories.slice(0, 3).map((sub, sIdx) => {
                    const getDisplayTitle = (name: string) => {
                      let base = name;
                      if (base.startsWith("Free AI ")) base = base.substring(8);
                      else if (base.startsWith("Free ")) base = base.substring(5);
                      else if (base.startsWith("AI ")) base = base.substring(3);
                      return `Free AI ${base}`;
                    };
                    const displayTitle = getDisplayTitle(sub.name);

                    return (
                      <Link 
                        key={sIdx} 
                        to={`/category/${sub.path}`}
                        className="flex items-center justify-between text-sm text-slate-500 hover:text-emerald-600 font-bold tracking-tight transition-all"
                      >
                        <span>{displayTitle}</span>
                        <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-2.5 py-1 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">{sub.count}</span>
                      </Link>
                    );
                  })}
                </div>
                
                <Link 
                  to="/categories" 
                  className="flex items-center gap-2 text-xs font-black text-slate-400 group-hover:text-emerald-600 uppercase tracking-widest transition-colors"
                >
                  Explore Category <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-20">
            <Link to="/categories" className="flex items-center gap-3 bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-sm">
              Explore All Categories <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
