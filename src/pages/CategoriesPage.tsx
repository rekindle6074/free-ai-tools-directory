import { FC } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { categories } from "../data/tools";
import { ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const CategoriesPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>AI Tool Categories - Browse Free AI Solutions by Type</title>
        <meta name="description" content="Explore our curated list of free AI tool categories. From image generation to music production, find the best free AI alternatives for your needs." />
        <meta name="keywords" content="ai categories, free ai tools list, ai image generation, ai music production, ai video editing" />
        <link rel="canonical" href="https://freeaitools.ct.ws/categories" />
      </Helmet>
      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24"
      >
        <h1 className="text-6xl md:text-8xl font-display font-bold text-slate-900 mb-8 tracking-[-0.04em] leading-[0.9]">
          Discovery <br />
          <span className="text-emerald-600">Hub</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium">
          Navigate through our precision-curated verticals to find the exact AI solution for your workflow.
        </p>

        {/* Category Navigation List */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <a 
              key={cat.id} 
              href={`#${cat.id}`}
              className="px-8 py-4 rounded-2xl bg-white/40 backdrop-blur-sm text-slate-900 text-sm font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/20 active:scale-95"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-12 mb-24">
        {categories.map((category, idx) => (
          <motion.div
            key={category.id}
            id={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 backdrop-blur-md rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group scroll-mt-32"
          >
            <div className="p-12">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-4 h-12 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40" />
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-[-0.02em]">{category.name}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.subCategories.map((sub, sIdx) => {
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
                      className="flex items-center justify-between p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-emerald-500 hover:ring-4 hover:ring-emerald-500/10 transition-all group/btn shadow-sm hover:shadow-xl"
                    >
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover/btn:text-emerald-600 transition-colors">{displayTitle}</span>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.count} Verified Tools</span>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-300 group-hover/btn:text-emerald-600 transition-all transform group-hover/btn:translate-x-1" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </>
  );
};

export default CategoriesPage;
