import { FC } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Zap, 
  Sparkles, 
  Cpu, 
  Globe, 
  MessageSquare, 
  Database, 
  ArrowUpRight,
  TrendingUp,
  Star
} from "lucide-react";

interface Pick {
  id: number;
  title: string;
  description: string;
  logo?: string;
  tag: string;
  color: string;
  size: "large" | "medium" | "small";
  url: string;
}

const picks: Pick[] = [
  {
    id: 1,
    title: "OpenAI GPT-5.4",
    description: "OpenAI's most capable frontier model features native computer-use capabilities, allowing it to autonomously click, type, and navigate software. It launches with a full financial services suite and ChatGPT integration for Excel, available in 'Thinking' and 'Pro' modes.",
    tag: "New Model",
    color: "emerald",
    size: "large",
    url: "https://openai.com"
  },
  {
    id: 2,
    title: "Luma AI Creative Agents",
    description: "Luma unveiled AI agents that can transform a single brief into a complete ad campaign (text, image, video, audio). Powered by the new Uni-1 model, these agents coordinate with external tools like Google's Veo 3 and utilize iterative self-critique to refine outputs.",
    tag: "Creative",
    color: "blue",
    size: "medium",
    url: "https://lumaal.ai"
  },
  {
    id: 3,
    title: "Google Nano Banana 2",
    description: "Built on Gemini 3.1 Flash, this viral image generator is now significantly faster and capable of producing 4K resolution images.",
    logo: "https://free-ai-tools-directory.vercel.app/public/google.svg",
    tag: "Image Gen",
    color: "amber",
    size: "small",
    url: "https://deepmind.google"
  },
  {
    id: 4,
    title: "Perplexity Computer",
    description: "A new general-purpose digital worker capable of running complex projects for hours or months.",
    logo: "https://free-ai-tools-directory.vercel.app/public/perplexity.svg",
    tag: "Productivity",
    color: "purple",
    size: "small",
    url: "https://perplexity.ai"
  },
  {
    id: 5,
    title: "Google Gemini & Opal Updates",
    description: "Google is infusing agentic features into its ecosystem: Gemini on Android can now autonomously complete multi-step tasks like booking Ubers.",
    logo: "https://free-ai-tools-directory.vercel.app/public/googlegemini.svg",
    tag: "Ecosystem",
    color: "cyan",
    size: "medium",
    url: "https://gemini.google.com"
  },
  {
    id: 6,
    title: "Anthropic Sonnet 4.6",
    description: "Anthropic released an affordable model boasting 'human-level capability' at computer tasks like navigating spreadsheets and updating websites.",
    logo: "https://free-ai-tools-directory.vercel.app/public/anthropic.svg",
    tag: "Efficiency",
    color: "orange",
    size: "medium",
    url: "https://anthropic.com"
  },
  {
    id: 7,
    title: "Claude (Sonnet 4.6)",
    description: "Widely regarded as the most human-sounding AI, Claude excels at creative writing and following complex coding instructions.",
    tag: "Writing",
    color: "rose",
    size: "medium",
    url: "https://claude.ai"
  },
  {
    id: 8,
    title: "DataCamp DataLab",
    description: "A browser-based data science tool that removes the need for environment management. It connects directly to data sources.",
    logo: "https://free-ai-tools-directory.vercel.app/public/datacamp.svg",
    tag: "Data Science",
    color: "indigo",
    size: "medium",
    url: "https://datacamp.com"
  }
];

const WeeklyPicksPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Weekly Picks - Best Free AI Tools of the Week</title>
        <meta name="description" content="Our hand-picked selection of the most innovative and useful free AI tools released or updated this week." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6"
            >
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Curated Selection</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display text-slate-900 mb-6 tracking-tight"
            >
              Weekly <span className="text-emerald-600">Picks</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              The most groundbreaking AI releases and updates, curated for creators, developers, and innovators.
            </motion.p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {picks.map((pick, idx) => (
              <motion.a
                key={pick.id}
                href={pick.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`
                  relative group overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col
                  ${pick.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
                  ${pick.size === "medium" ? "md:col-span-2 md:row-span-1" : ""}
                  ${pick.size === "small" ? "md:col-span-1 md:row-span-1" : ""}
                `}
              >
                {/* Background Decoration */}
                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${pick.color}-500/5 blur-3xl rounded-full group-hover:bg-${pick.color}-500/10 transition-colors duration-500`} />
                
                <div className="relative h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      {pick.logo ? (
                        <div className="w-12 h-12 rounded-xl bg-slate-50 p-2 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                          <img 
                            src={pick.logo} 
                            alt={pick.title} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className={`w-12 h-12 rounded-xl bg-${pick.color}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                          <Zap className={`w-6 h-6 text-${pick.color}-600`} />
                        </div>
                      )}
                      <div>
                        <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] text-${pick.color}-600 mb-1 block`}>
                          {pick.tag}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                          {pick.title}
                        </h3>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  <p className="text-slate-500 leading-relaxed mb-6">
                    {pick.description}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trending Now</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
                      Visit Site <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default WeeklyPicksPage;
