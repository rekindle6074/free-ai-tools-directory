import { FC, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Search as SearchIcon, 
  ChevronRight, 
  ArrowLeft
} from "lucide-react";
import { categories, toolsByTag, Tool, Category, SubCategory } from "../data/tools";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";

interface SearchResult {
  type: "tool" | "category" | "subcategory";
  item: Tool | Category | SubCategory;
  parentCategory?: string;
  subPath?: string;
}

const SearchPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const results = useMemo(() => {
    if (!query) return [];

    const toolResults: SearchResult[] = [];
    const categoryResults: SearchResult[] = [];
    const subCategoryResults: SearchResult[] = [];

    // Search Categories
    categories.forEach(cat => {
      if (cat.name.toLowerCase().includes(query)) {
        categoryResults.push({ type: "category", item: cat });
      }

      // Search Sub-categories
      cat.subCategories.forEach(sub => {
        if (sub.name.toLowerCase().includes(query)) {
          subCategoryResults.push({ 
            type: "subcategory", 
            item: sub, 
            parentCategory: cat.name,
            subPath: sub.path
          });
        }
      });
    });

    // Search Tools
    Object.values(toolsByTag).flat().forEach(tool => {
      if (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.link.toLowerCase().includes(query)
      ) {
        // Avoid duplicates if a tool is in multiple tags (though unlikely in current structure)
        if (!toolResults.some(r => (r.item as Tool).id === tool.id)) {
          toolResults.push({ type: "tool", item: tool });
        }
      }
    });

    return [...categoryResults, ...subCategoryResults, ...toolResults];
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Search AI Tools - Find Free Alternatives</title>
        <meta name="description" content={`Search results for ${query} in our free AI tool directory. Discover the best free AI alternatives for your needs.`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-900 hover:text-emerald-600 hover:border-emerald-500 transition-all font-black text-xs uppercase tracking-widest shadow-sm mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold text-slate-900 tracking-[-0.04em] leading-[0.9] mb-8">
            Results for <br />
            <span className="text-emerald-600">"{query}"</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium font-sans">
            Found {results.length} results matching your search parameters.
          </p>
        </div>

        {results.length > 0 ? (
          <div className="space-y-20">
            {/* Categories and Subcategories first */}
            {results.some(r => r.type !== "tool") && (
              <div className="grid grid-cols-1 gap-6">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Navigational Matches</h2>
                {results.filter(r => r.type !== "tool").map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {result.type === "category" && (
                      <Link 
                        to="/categories"
                        className="glass p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-8">
                          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                            <SearchIcon className="w-7 h-7 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[9px] font-black bg-blue-500 text-white px-2.5 py-1 uppercase tracking-widest rounded transition-colors group-hover:bg-blue-600">
                                Global Category
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {(result.item as Category).name}
                            </h3>
                            <p className="text-slate-500 text-sm font-medium">Explore the entire taxonomy of tools in this space.</p>
                          </div>
                        </div>
                        <ChevronRight className="w-8 h-8 text-slate-300 group-hover:text-blue-600 transition-all transform group-hover:translate-x-2" />
                      </Link>
                    )}

                    {result.type === "subcategory" && (
                      <Link 
                        to={`/category/${result.subPath}`}
                        className="glass p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-8">
                          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform">
                            <ChevronRight className="w-7 h-7 text-emerald-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-[9px] font-black bg-emerald-500 text-white px-2.5 py-1 uppercase tracking-widest rounded transition-colors group-hover:bg-emerald-600">
                                Target Area
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                in {result.parentCategory}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              {(() => {
                                const name = (result.item as SubCategory).name;
                                let base = name;
                                if (base.startsWith("Free AI ")) base = base.substring(8);
                                else if (base.startsWith("Free ")) base = base.substring(5);
                                else if (base.startsWith("AI ")) base = base.substring(3);
                                return `Free AI ${base}`;
                              })()}
                            </h3>
                            <p className="text-slate-500 text-sm font-medium">Verified repository of {(result.item as SubCategory).count} dedicated tools.</p>
                          </div>
                        </div>
                        <ChevronRight className="w-8 h-8 text-slate-300 group-hover:text-emerald-600 transition-all transform group-hover:translate-x-2" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Tools grid */}
            {results.some(r => r.type === "tool") && (
              <div>
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Direct Tool Matches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {results.filter(r => r.type === "tool").map((result, idx) => (
                    <ToolCard key={(result.item as Tool).id} tool={result.item as Tool} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="glass rounded-[3rem] p-24 text-center border border-slate-100 shadow-sm max-w-4xl mx-auto">
            <div className="w-32 h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 text-slate-300 transform rotate-12">
              <SearchIcon className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-6 tracking-tight">Zero Matches found</h2>
            <p className="text-lg text-slate-500 max-w-md mx-auto mb-12 font-medium">
              We couldn't locate any precise matches for your query. The library is constantly expanding—try a broader term.
            </p>
            <Link 
              to="/categories" 
              className="inline-flex items-center justify-center bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-95"
            >
              Browse Global Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default SearchPage;
