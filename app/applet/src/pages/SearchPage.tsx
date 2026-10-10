import { FC, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toolsByTag, Tool } from "../data/tools";
import ToolCard from "../components/ToolCard";
import { Search } from "lucide-react";
import SEO from "../components/SEO";

const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const allToolsList = useMemo(() => {
    const map = new Map<string, Tool>();
    Object.values(toolsByTag).forEach((tools) => {
      tools.forEach((t) => map.set(t.id, t));
    });
    return Array.from(map.values());
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allToolsList.slice(0, 30);
    return allToolsList.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [allToolsList, query]);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Search Free AI Tools | AI App Store"
        description="Search through hundreds of free AI tools and discover the best applications for design, writing, audio, productivity, and marketing."
      />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Search AI Tools
          </h1>
          <p className="mt-3 text-slate-600">
            Find the right free AI tool across our curated directory.
          </p>

          <div className="relative mt-6 max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name, category, or keyword..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center text-sm text-slate-500">
          <span>Found {results.length} tools</span>
          {query && (
            <button
              onClick={() => handleSearchChange("")}
              className="text-emerald-600 hover:underline cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 text-lg">No tools matched "{query}"</p>
            <p className="text-slate-400 text-sm mt-2">
              Try searching with broader terms or browse categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
