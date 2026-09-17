import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { STATIC_PAGE_SEO } from "../lib/seoHelpers";
import { Home, Compass, AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <SEO
        title={STATIC_PAGE_SEO.notFound.title}
        description={STATIC_PAGE_SEO.notFound.description}
        canonical="/404"
        noindex={true}
        nofollow={true}
        ogType="website"
      />

      <div className="max-w-md w-full text-center bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 shadow-xl shadow-slate-200/40">
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
          Error 404
        </span>

        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          The page or tool category you are looking for doesn't exist, was renamed, or has been removed from the directory.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            to="/browse"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-all duration-200"
          >
            <Compass className="w-4 h-4" />
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
