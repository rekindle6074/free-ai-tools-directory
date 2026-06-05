import { motion } from "motion/react";
import { 
  Video, 
  Image as ImageIcon, 
  Zap, 
  ExternalLink,
  ChevronLeft,
  Star
} from "lucide-react";
import { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { toolsByTag, categories, SubCategory } from "../data/tools";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";
import { GridBackground } from "../components/ui/grid-background";

const SubCategoryPage: FC<{ forcedPath?: string }> = ({ forcedPath }) => {
  const { subPath } = useParams<{ subPath: string }>();
  
  const currentPath = forcedPath || subPath;
  
  let subCategory: SubCategory | undefined;
  let parentCategoryName = "";
  
  for (const cat of categories) {
    const found = cat.subCategories.find(s => s.path === currentPath);
    if (found) {
      subCategory = found;
      parentCategoryName = cat.name;
      break;
    }
  }
  
  if (!subCategory) {
    return (
      <GridBackground className="py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Category not found</h1>
        <Link to="/categories" className="text-emerald-600 font-bold mt-4 inline-block">Back to Categories</Link>
      </GridBackground>
    );
  }

  const tools = toolsByTag[subCategory.tag] || [];

  const getDisplayTitle = (name: string) => {
    let base = name;
    if (base.startsWith("Free AI ")) base = base.substring(8);
    else if (base.startsWith("Free ")) base = base.substring(5);
    else if (base.startsWith("AI ")) base = base.substring(3);
    return `Free AI ${base}`;
  };

  const displayTitle = getDisplayTitle(subCategory.name);
  const cleanName = subCategory.name.replace("Free AI", "").replace("Free", "").replace("AI", "").trim();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://free-ai-tools-directory.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Categories",
        "item": "https://free-ai-tools-directory.vercel.app/categories"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": displayTitle,
        "item": `https://free-ai-tools-directory.vercel.app/category/${currentPath}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{displayTitle} Tools - Best Free Alternatives 2026</title>
        <meta name="description" content={`Access ${subCategory.count}+ best free AI tools for ${cleanName.toLowerCase()}. Save money with vetted free alternatives in the ${parentCategoryName.toLowerCase()} space. Updated for 2026.`} />
        <meta name="keywords" content={`free ai ${cleanName.toLowerCase()}, best free ${cleanName.toLowerCase()} ai, ${subCategory.tag}, free ai tools 2026, ${parentCategoryName.toLowerCase()} free software`} />
        <link rel="canonical" href={`https://free-ai-tools-directory.vercel.app/category/${currentPath}`} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <GridBackground className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-16 px-4 py-2 bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 w-fit">
          <Link to="/categories" className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-500 transition-all shadow-sm group">
            <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{parentCategoryName}</span>
            <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">{displayTitle}</span>
          </div>
        </div>
        
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-slate-900 mb-8 tracking-[-0.04em] leading-[0.9]">
            {displayTitle}
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl leading-relaxed font-medium">
            The most advanced and reliable free AI-powered tools for {cleanName.toLowerCase()}. Save time and budget with these vetted solutions.
          </p>
          <div className="mt-10 flex items-center gap-5">
            <div className="px-5 py-2.5 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20">
              #{subCategory.tag.toUpperCase()}
            </div>
            <div className="px-5 py-2.5 bg-white/80 backdrop-blur-sm text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100 shadow-sm">
              {subCategory.count} Verified Tools
            </div>
          </div>
        </div>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Coming Soon</h3>
            <p className="text-slate-500">We are currently vetting tools for this category. Check back soon!</p>
          </div>
        )}

        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-display text-slate-900 mb-6">Why Use {displayTitle} Tools?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 leading-relaxed">
              <div>
                <p className="mb-4">
                  In the rapidly evolving world of artificial intelligence, access to quality {cleanName.toLowerCase()} tools 
                  shouldn't always come with a steep subscription fee. Our curated selection of <strong>{displayTitle}</strong> 
                  resources focuses on platforms that offer generous free tiers, open-source models, or high-value trials.
                </p>
                <p>
                  Whether you are a creator, developer, or enthusiast, these tools empower you to harness the power of AI in 
                  {parentCategoryName.toLowerCase()} workflows without upfront costs. We manually vet each link to ensure 
                  they provide real value to the community.
                </p>
              </div>
              <div>
                <h3 className="text-slate-900 font-bold mb-4">Key Benefits of these AI Alternatives:</h3>
                <ul className="space-y-3 list-disc pl-5">
                  <li>Cost-effective entry into {cleanName.toLowerCase()} technology.</li>
                  <li>Privacy-focused and open-source options available.</li>
                  <li>No-registration-required tools for quick tasks.</li>
                  <li>Professional-grade features accessible to students and hobbyists.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridBackground>
  </>
  );
};

export default SubCategoryPage;
