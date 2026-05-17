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
import { FC, useState, FormEvent } from "react";
import { featuredTools, categories } from "../data/tools";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";
import { Button } from "../components/ui/Button";
import { SearchIcon, WeeklyPicksIcon } from "../components/ui/Icons";

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
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center lg:text-left relative z-20"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md"
              >
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">Privacy First • Open Access</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-display font-bold text-slate-900 mb-8 leading-[0.9] tracking-[-0.04em]">
                Discover <br />
                <span className="text-emerald-600 relative inline-block">
                  Free AI
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 h-2 bg-emerald-100 -z-10" 
                  />
                </span> Tools
              </h1>
              <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed font-medium">
                The ultimate curated directory of high-quality AI tools that won't cost you a dime. Save tools, take notes, and build faster.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5 mb-14">
                <Link 
                  to="/browse" 
                  className="flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20"
                >
                  <LayoutGrid size={20} /> Explore All Tools
                </Link>
                <Link 
                  to="/weekly-picks" 
                  className="flex items-center justify-center gap-3 bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm"
                >
                  <WeeklyPicksIcon size={20} /> Weekly Picks
                </Link>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto lg:mx-0">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-focus-within:opacity-30" />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="What are you building today?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/80 border border-slate-200 rounded-[2.25rem] px-10 py-6 pl-16 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-xl shadow-slate-200/40 font-sans"
                    />
                    <SearchIconLucide className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <button 
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Search
                    </button>
                  </div>
                </form>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest self-center px-1">Trending:</span>
                  {["Flux.1", "Cursor AI", "Ollama", "Stable Diffusion"].map((tag) => (
                    <button 
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        navigate(`/search?q=${encodeURIComponent(tag)}`);
                      }}
                      className="text-xs font-bold text-slate-500 border border-slate-200 bg-white hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 p-4">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-8 border-white glass"
                >
                  <img 
                    src="/rocket-privacy.png" 
                    alt="AI Transformation" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                </motion.div>
                
                {/* Floaties */}
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -top-8 -left-8 w-24 h-24 bg-emerald-500 rounded-3xl rotate-12 -z-10 blur-2xl opacity-20" 
                />
                <motion.div 
                  animate={{ x: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full -z-10 blur-3xl opacity-20" 
                />
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
                className="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-100 shadow-sm text-left flex flex-col gap-5 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
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
