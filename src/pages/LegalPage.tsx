import { FC } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Shield, Mail, User, Globe, Scale } from "lucide-react";

const LegalPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Legal Notice & Privacy Policy - FreeAI Tools</title>
        <meta name="description" content="Legal information and privacy policy for FreeAI Tools. Transparency about data collection and site ownership." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                <Scale className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Legal Notice & <span className="text-emerald-600">Privacy Policy</span>
              </h1>
            </div>

            <div className="space-y-12">
              {/* Ownership Section */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-slate-900">1. Site Ownership</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  This website, accessible at <span className="font-medium text-slate-900">https://freeaitools.ct.ws/</span>, is owned and operated by <span className="font-medium text-slate-900">Max Rivera</span>.
                </p>
              </section>

              {/* Data Collection Section */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-slate-900">2. Data Collection & Privacy</h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We value your privacy. This application is designed to be as non-intrusive as possible:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                  <li><span className="font-medium text-slate-900">No Analytics:</span> We do not use third-party analytics tools (like Google Analytics) to track your behavior on this site.</li>
                  <li><span className="font-medium text-slate-900">No Cookies:</span> This application does not install or use cookies to track users or store personal information.</li>
                  <li><span className="font-medium text-slate-900">Google Search Console:</span> We use Google Search Console to monitor the site's performance and health in search results. This tool provides us with aggregated data and does not identify individual users.</li>
                </ul>
              </section>

              {/* External Links Section */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-slate-900">3. External Links</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Our directory contains links to external websites. We are not responsible for the content, privacy policies, or practices of any third-party sites. We recommend reviewing the privacy policy of any website you visit via a link from our directory.
                </p>
              </section>

              {/* Contact Section */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-slate-900">4. Contact Information</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  If you have any questions regarding this legal notice or your privacy, you can contact us at:
                  <br />
                  <a href="mailto:maxrivera@zohomail.com" className="text-emerald-600 font-bold hover:underline mt-2 inline-block">
                    maxrivera@zohomail.com
                  </a>
                </p>
              </section>

              {/* Last Update */}
              <div className="pt-12 border-t border-slate-100 text-sm text-slate-400">
                Last updated: March 20, 2026
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LegalPage;
