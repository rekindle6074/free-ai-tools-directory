import React from 'react';
import { motion } from 'motion/react';
import { 
  Linkedin, 
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import VisitorCounter from './VisitorCounter';
import { MastodonIcon, ChainLinkIcon } from './ui/Icons';

const FooterLink = ({ to, href, children }: { to?: string; href?: string; children: React.ReactNode }) => {
  const className = "text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1.5 group";
  const content = (
    <>
      <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
      {children}
    </>
  );

  if (to) {
    return <Link to={to} className={className}>{content}</Link>;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer nofollow" className={className}>{content}</a>;
};

interface FooterProps {
  openSubmitForm: () => void;
}

export default function Footer({ openSubmitForm }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const menuSections = [
    {
      title: "Navigation",
      links: [
        { label: "Browse Apps", to: "/browse" },
        { label: "Categories", to: "/categories" },
        { label: "Weekly Picks", to: "/weekly-picks" },
        { label: "AI Insights", to: "/insights" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "BestAI", href: "https://bestai.66ghz.com/" },
        { label: "Avatar Generator", to: "/avatar-generator" },
        { label: "Submit Tool", onClick: openSubmitForm },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Legal Notice", to: "/legal" },
        { label: "Privacy Policy", to: "/legal" },
        { label: "Terms of Use", to: "/legal" },
      ]
    }
  ];

  return (
    <footer className="relative w-full overflow-hidden pt-20 pb-10 text-slate-500">
      {/* Subtle Glow Effects */}
      <div className="absolute top-0 left-1/4 -z-10 h-64 w-64 rounded-full bg-emerald-500/5 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />

      <motion.div 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        {/* Main Glass Box */}
        <div className="rounded-3xl border border-white/60 bg-white/40 p-8 backdrop-blur-2xl md:p-12 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            
            {/* Column 1: Brand & Description */}
            <div className="md:col-span-4">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <img src="/logo.svg" alt="FreeAI Tools Logo" className="h-8 w-auto object-contain" />
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-display">
                  FreeAI<span className="text-emerald-600">Tools</span>
                </span>
              </Link>
              <p className="text-base leading-relaxed text-slate-500 mb-6 italic">
                "Free AI Tools Catalog – Discover, Filter, Bookmark & Use Top No-Cost AI Resources."
              </p>
              
              <div className="flex items-center gap-3 text-sm text-emerald-400 font-medium bg-emerald-500/5 border border-emerald-500/10 rounded-2xl px-4 py-2 w-fit mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                All Systems Operational
              </div>

              <VisitorCounter />
            </div>

            {/* Dynamic Menu Columns */}
            {menuSections.map((section, idx) => (
              <div key={idx} className="md:col-span-2">
                <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      {link.onClick ? (
                        <button 
                          onClick={link.onClick}
                          className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1.5 group text-left"
                        >
                          <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                          {link.label}
                        </button>
                      ) : (
                        <FooterLink to={link.to} href={link.href}>
                          {link.label}
                        </FooterLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Column 5: Community */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Community</h3>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/maxrivera46887320" target="_blank" rel="noopener noreferrer nofollow" className="rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="https://masto.es/@sprain" target="_blank" rel="noopener noreferrer nofollow" className="rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                  <MastodonIcon size={20} />
                </a>
                <a href="https://bestai.66ghz.com/" target="_blank" rel="noopener noreferrer nofollow" className="rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
                  <ChainLinkIcon size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>&copy; {currentYear} FreeAI Tools. Crafted for the AI Revolution.</p>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200" />
              <p>Powered by Open Source Community</p>
            </div>
            <div className="flex gap-8">
              <Link to="/legal" className="hover:text-emerald-600 transition-colors">Privacy</Link>
              <Link to="/legal" className="hover:text-emerald-600 transition-colors">Terms</Link>
              <Link to="/legal" className="hover:text-emerald-600 transition-colors">Contact</Link>
            </div>
          </div>

        </div>
      </motion.div>
    </footer>
  );
}
