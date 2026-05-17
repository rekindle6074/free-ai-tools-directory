import { motion } from "motion/react";
import { 
  Video, 
  Image as ImageIcon, 
  Zap, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Star,
  Search
} from "lucide-react";
import { FC, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { toolsByTag, Tool } from "../data/tools";
import { Helmet } from "react-helmet-async";
import ToolCard from "../components/ToolCard";
import { GridBackground } from "../components/ui/grid-background";

const ITEMS_PER_PAGE = 15;

const BrowseAppsPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Aggregate all unique tools
  const allTools = useMemo(() => {
    const uniqueToolsMap = new Map<string, Tool>();
    Object.values(toolsByTag).forEach(toolsArray => {
      toolsArray.forEach(tool => {
        uniqueToolsMap.set(tool.id, tool);
      });
    });
    return Array.from(uniqueToolsMap.values()).sort((a, b) => (b.score || 0) - (a.score || 0));
  }, []);

  // Filter tools based on search
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return allTools;
    const query = searchQuery.toLowerCase();
    return allTools.filter(tool => 
      tool.name.toLowerCase().includes(query) || 
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );
  }, [allTools, searchQuery]);

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const currentTools = filteredTools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Browse All Free AI Tools - Complete Directory</title>
        <meta name="description" content="Browse our complete directory of free AI tools. Search and filter through hundreds of vetted AI solutions for every use case." />
        <meta name="keywords" content="all ai tools, free ai directory, search ai tools, ai tool list" />
        <link rel="canonical" href="https://freeaitools.ct.ws/browse" />
      </Helmet>
      <GridBackground className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
            <h1 className="text-6xl md:text-8xl font-display font-bold text-slate-900 mb-8 tracking-[-0.04em]">
              Complete <br />
              <span className="text-emerald-600">AI Database</span>
            </h1>
          <p className="text-xl text-slate-500 max-w-3xl leading-relaxed font-medium">
            Explore our curated database of high-quality, vetting-passed free AI tools. Save thousands in monthly subscriptions by finding the right alternative here.
          </p>
          
          <div className="mt-12 relative max-w-2xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search across all 500+ tools..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="block w-full pl-16 pr-6 py-6 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-[2rem] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-xl shadow-slate-200/40 transition-all font-sans text-lg"
              />
            </div>
          </div>
        </div>

        {currentTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Page {currentPage}</span>
                  <span className="text-sm text-slate-400">of {totalPages}</span>
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
            
            <div className="mt-8 text-center text-slate-400 text-sm font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredTools.length)} of {filteredTools.length} tools
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No tools found</h3>
            <p className="text-slate-500">Try adjusting your search query to find what you're looking for.</p>
          </div>
        )}
      </div>
    </GridBackground>
  </>
  );
};

export default BrowseAppsPage;
