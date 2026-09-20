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
import { getParentCategoryForCategoryId } from "../data/parentCategories";
import { SEO } from "../components/SEO";
import { getSubCategorySeoTitle, getSubCategorySeoDescription, createItemListSchema } from "../lib/seoHelpers";
import ToolCard from "../components/ToolCard";
import MemberToolsGuard from "../components/MemberToolsGuard";
import { GridBackground } from "../components/ui/grid-background";
import { CategoryIconBadge } from "../components/CategoryIconBadge";
import { SubCategoryEditorial } from "../components/SubCategoryEditorial";
import { getSubCategoryEditorial } from "../data/subcategoryContent";

const SubCategoryPage: FC<{ forcedPath?: string }> = ({ forcedPath }) => {
  const { subPath } = useParams<{ subPath: string }>();
  
  const currentPath = forcedPath || subPath;
  
  let subCategory: SubCategory | undefined;
  let categoryId = "";
  let categoryName = "";
  
  for (const cat of categories) {
    const found = cat.subCategories.find(s => s.path === currentPath);
    if (found) {
      subCategory = found;
      categoryId = cat.id;
      categoryName = cat.name;
      break;
    }
  }

  const superCategory = getParentCategoryForCategoryId(categoryId);
  
  if (!subCategory) {
    return (
      <GridBackground className="pt-36 pb-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Category not found</h2>
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

  const seoTitle = getSubCategorySeoTitle(subCategory.name);
  const seoDescription = getSubCategorySeoDescription(subCategory.name);

  const editorialData = getSubCategoryEditorial(
    currentPath,
    cleanName,
    displayTitle,
    categoryName
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": editorialData.subsections
      .filter((sub) => sub.paragraphs || sub.features)
      .map((sub) => ({
        "@type": "Question",
        "name": sub.h3Title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": sub.paragraphs
            ? sub.paragraphs.map(p => p.replace(/<[^>]*>?/gm, "")).join(" ")
            : sub.features?.join(". ")
        }
      }))
  };

  const toolsItemListSchema = createItemListSchema(
    `${displayTitle} - Free AI Tools`,
    `Curated list of free AI tools and software for ${cleanName.toLowerCase()}.`,
    tools.map(t => ({
      name: t.name,
      url: `https://free-ai-tools-directory.vercel.app/tool/${t.id}`,
      description: t.description,
      image: t.iconUrl
    }))
  );

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`https://free-ai-tools-directory.vercel.app/category/${currentPath}`}
        keywords={`free ai ${cleanName.toLowerCase()}, best free ${cleanName.toLowerCase()} ai, ${subCategory.tag}, free ai tools 2026, ${categoryName.toLowerCase()} free software`}
        jsonLd={[breadcrumbSchema, toolsItemListSchema, faqSchema]}
        ogType="website"
      />
      <GridBackground className="pt-32 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-16 px-4 py-2.5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 w-fit shadow-xs">
          <Link
            to={superCategory ? `/categories#${superCategory.id}` : "/categories"}
            className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-500 transition-all shadow-sm group"
            title="Back to category"
            aria-label={superCategory ? `Back to ${superCategory.name} categories` : "Back to categories"}
          >
            <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div className="flex items-center gap-3">
            <CategoryIconBadge
              categoryId={categoryId}
              categoryName={categoryName}
              size="sm"
              className="!w-8 !h-8"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {superCategory && (
                  <>
                    <Link
                      to={`/categories#${superCategory.id}`}
                      className="hover:text-emerald-600 transition-colors"
                    >
                      {superCategory.name}
                    </Link>
                    <span>&bull;</span>
                  </>
                )}
                <Link
                  to={`/categories#${categoryId}`}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {categoryName}
                </Link>
              </div>
              <span className="text-sm font-bold text-emerald-600 tracking-wide">
                {displayTitle}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-8">
            <CategoryIconBadge
              categoryId={categoryId}
              categoryName={categoryName}
              size="xl"
              className="shadow-xl border-emerald-500/30"
            />
            <h1 className="text-6xl md:text-8xl font-display font-bold text-slate-900 tracking-[-0.04em] leading-[0.9]">
              {displayTitle}
            </h1>
          </div>
          <p className="text-xl text-slate-500 max-w-3xl leading-relaxed font-medium">
            The most advanced and reliable free AI-powered tools for {cleanName.toLowerCase()}. Save time and budget with these vetted solutions.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <div className="px-5 py-2.5 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20">
              #{subCategory.tag.toUpperCase()}
            </div>
            <div className="px-5 py-2.5 bg-white/80 backdrop-blur-sm text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100 shadow-sm">
              {subCategory.count} Verified Tools
            </div>
          </div>
        </div>

        {/* Rich White Card Editorial Section */}
        <SubCategoryEditorial
          editorial={editorialData}
          subCategoryPath={currentPath}
        />

        <div className="w-full h-px bg-slate-200/80 mb-12" />

        {/* H2 section introducing the tools collection */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-[-0.03em] leading-tight">
              Best {displayTitle.toLowerCase().startsWith("free") ? displayTitle : `Free ${displayTitle}`} Tools & Software
            </h2>
            <p className="text-base text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Explore our curated selection of verified free {cleanName.toLowerCase()} solutions, offering generous free plans, freemium features, or zero-cost access.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200/80 shrink-0 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {tools.length} Tools Available
          </div>
        </div>

        <MemberToolsGuard toolCount={tools.length} categoryTitle={cleanName}>
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
        </MemberToolsGuard>
      </div>
    </GridBackground>
  </>
  );
};

export default SubCategoryPage;
