import { FC, useState } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Shield, 
  Mail, 
  User, 
  Globe, 
  Scale, 
  Server, 
  FileText, 
  AlertTriangle, 
  ExternalLink,
  MapPin,
  CheckCircle2,
  Lock
} from "lucide-react";

const LegalPage: FC = () => {
  const [activeLang, setActiveLang] = useState<"fr" | "en">("fr");

  return (
    <>
      <Helmet>
        <title>Mentions Légales & Politique de Confidentialité - FreeAI Tools</title>
        <meta name="description" content="Mentions légales, éditeur, hébergement, propriété intellectuelle et politique de confidentialité du site FreeAI Tools Directory." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-slate-200"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100/70 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <Scale className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {activeLang === "fr" ? "Mentions Légales" : "Legal Notice"}
                  </h1>
                  <p className="text-sm font-semibold text-emerald-600">
                    {activeLang === "fr" ? "& Politique de Confidentialité" : "& Privacy Policy"}
                  </p>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center self-start sm:self-center p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setActiveLang("fr")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeLang === "fr"
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Français (FR)
                </button>
                <button
                  onClick={() => setActiveLang("en")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    activeLang === "en"
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  English (EN)
                </button>
              </div>
            </div>

            {/* Content in French */}
            {activeLang === "fr" ? (
              <div className="space-y-10 text-slate-700 leading-relaxed">
                {/* 1. Éditeur du site */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <User className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">1. Éditeur du site</h2>
                  </div>
                  <p className="text-slate-600">
                    Le site <a href="https://free-ai-tools-directory.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline">https://free-ai-tools-directory.vercel.app</a> est édité par :
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-sm">
                    <p className="font-bold text-slate-900 text-base">Mohcin Tok</p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      Résidant à Tanger, Maroc
                    </p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400" />
                      Email de contact : <a href="mailto:jumpsaron@gmail.com" className="font-semibold text-emerald-600 hover:underline">jumpsaron@gmail.com</a>
                    </p>
                  </div>
                </section>

                {/* 2. Hébergement */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <Server className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">2. Hébergement</h2>
                  </div>
                  <p className="text-slate-600">
                    Hébergement du site :
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-sm">
                    <p className="font-bold text-slate-900 text-base">Vercel Inc.</p>
                    <p className="text-slate-600">Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                    <p className="text-slate-600">
                      Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline inline-flex items-center gap-1">https://vercel.com <ExternalLink className="w-3 h-3" /></a>
                    </p>
                  </div>
                </section>

                {/* 3. Propriété intellectuelle */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">3. Propriété intellectuelle</h2>
                  </div>
                  <p className="text-slate-600">
                    L’ensemble du contenu présent sur ce site (textes, images, logos, mise en page, etc.) est la propriété de <strong>Mohcin Tok</strong> ou de ses auteurs respectifs et est protégé par le droit d’auteur.
                  </p>
                  <p className="text-slate-600 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie de ce site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation préalable écrite de <strong>Mohcin Tok</strong>, sauf dans les cas prévus par la loi (par exemple, courte citation avec mention de la source).
                  </p>
                </section>

                {/* 4. Limitation de responsabilité */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <AlertTriangle className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">4. Limitation de responsabilité</h2>
                  </div>
                  <p className="text-slate-600">
                    <strong>Mohcin Tok</strong> s’efforce de fournir sur ce site des informations aussi exactes que possible. Toutefois, il ne peut être tenu responsable :
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                    <li>des omissions, inexactitudes ou carences dans la mise à jour des informations ;</li>
                    <li>des dommages directs ou indirects résultant de l’accès au site ou de l’impossibilité d’y accéder ;</li>
                    <li>de l’utilisation du site par un tiers et de toute violation de droits de propriété intellectuelle ou autres qui en résulterait.</li>
                  </ul>
                </section>

                {/* 5. Liens hypertextes */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">5. Liens hypertextes</h2>
                  </div>
                  <p className="text-slate-600">
                    Ce site peut contenir des liens hypertextes vers d’autres sites présents sur Internet. <strong>Mohcin Tok</strong> ne dispose d’aucun moyen de contrôle sur ces autres sites et décline toute responsabilité quant à leur contenu, leur politique de confidentialité ou leurs pratiques.
                  </p>
                </section>

                {/* 6. Données personnelles et vie privée */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">6. Données personnelles et vie privée</h2>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-sm space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <Lock className="w-4 h-4 text-emerald-600" />
                      Protection & Non-collecte
                    </div>
                    <p className="text-emerald-950">
                      Ce site ne collecte <strong>aucune donnée personnelle</strong> via des formulaires, comptes utilisateurs, commentaires, newsletters ou autres dispositifs similaires pour le grand public.
                    </p>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Le seul service externe utilisé est <strong>Google Search Console</strong>, mis à disposition par Google Ireland Limited, utilisé exclusivement pour :
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                    <li>suivre les performances du site dans les résultats de recherche Google ;</li>
                    <li>identifier et résoudre d’éventuels problèmes techniques liés à l’indexation.</li>
                  </ul>
                  <p className="text-slate-600 text-sm">
                    Les traitements de données réalisés via Google Search Console sont soumis à la politique de confidentialité de Google, disponible à l’adresse :{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline">
                      https://policies.google.com/privacy
                    </a>
                  </p>
                  <p className="text-slate-600 text-sm pt-2">
                    Conformément à la <strong>loi n° 09‑08</strong> relative à la protection des personnes physiques à l’égard du traitement des données à caractère personnel, les visiteurs disposent d’un droit d’accès, de rectification et d’opposition aux données les concernant.
                  </p>
                  <p className="text-slate-600 text-sm">
                    Pour toute question relative à la protection des données personnelles, vous pouvez contacter <strong>Mohcin Tok</strong> à l’adresse :{" "}
                    <a href="mailto:jumpsaron@gmail.com" className="font-bold text-emerald-600 hover:underline">
                      jumpsaron@gmail.com
                    </a>.
                  </p>
                </section>

                {/* 7. Droit applicable */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <Scale className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">7. Droit applicable & Juridiction</h2>
                  </div>
                  <p className="text-slate-600 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    Les présentes mentions légales sont régies par le droit marocain. En cas de litige, et après tentative de résolution amiable, les tribunaux de <strong>Tanger, Maroc</strong>, seront seuls compétents.
                  </p>
                </section>
              </div>
            ) : (
              /* English Version */
              <div className="space-y-10 text-slate-700 leading-relaxed">
                {/* 1. Publisher */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <User className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">1. Site Publisher & Owner</h2>
                  </div>
                  <p className="text-slate-600">
                    The website <a href="https://free-ai-tools-directory.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline">https://free-ai-tools-directory.vercel.app</a> is published and operated by:
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-sm">
                    <p className="font-bold text-slate-900 text-base">Mohcin Tok</p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      Residing in Tangier, Morocco
                    </p>
                    <p className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400" />
                      Contact Email: <a href="mailto:jumpsaron@gmail.com" className="font-semibold text-emerald-600 hover:underline">jumpsaron@gmail.com</a>
                    </p>
                  </div>
                </section>

                {/* 2. Hosting */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <Server className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">2. Web Hosting</h2>
                  </div>
                  <p className="text-slate-600">
                    Site hosting provider:
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-sm">
                    <p className="font-bold text-slate-900 text-base">Vercel Inc.</p>
                    <p className="text-slate-600">Address: 440 N Barranca Ave #4133, Covina, CA 91723, United States</p>
                    <p className="text-slate-600">
                      Website: <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline inline-flex items-center gap-1">https://vercel.com <ExternalLink className="w-3 h-3" /></a>
                    </p>
                  </div>
                </section>

                {/* 3. Intellectual Property */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">3. Intellectual Property</h2>
                  </div>
                  <p className="text-slate-600">
                    All content on this site (texts, images, logos, layout, etc.) is the exclusive property of <strong>Mohcin Tok</strong> or their respective authors and is protected by applicable copyright laws.
                  </p>
                  <p className="text-slate-600 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    Any reproduction, representation, modification, publication or adaptation of all or part of this site is strictly prohibited without prior written authorization from <strong>Mohcin Tok</strong>.
                  </p>
                </section>

                {/* 4. Limitation of Liability */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <AlertTriangle className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">4. Limitation of Liability</h2>
                  </div>
                  <p className="text-slate-600">
                    <strong>Mohcin Tok</strong> strives to provide accurate and up-to-date information. However, no liability is assumed for:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                    <li>Omissions, inaccuracies, or deficiencies in updating information;</li>
                    <li>Direct or indirect damages resulting from accessing or being unable to access the site;</li>
                    <li>Third-party use of the website and any intellectual property infringements that may result.</li>
                  </ul>
                </section>

                {/* 5. External Links */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">5. Hyperlinks & Third-Party Sites</h2>
                  </div>
                  <p className="text-slate-600">
                    This directory contains links to external websites. <strong>Mohcin Tok</strong> has no control over these external destinations and disclaims any responsibility for their content, privacy policies, or practices.
                  </p>
                </section>

                {/* 6. Privacy & Personal Data */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">6. Personal Data & Privacy</h2>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-sm space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-900">
                      <Lock className="w-4 h-4 text-emerald-600" />
                      Zero Public Tracking & Privacy Protection
                    </div>
                    <p className="text-emerald-950">
                      This site collects <strong>no personal data</strong> from the general public via forms, user accounts, comments, or newsletters.
                    </p>
                  </div>
                  <p className="text-slate-600 text-sm">
                    The only external tool utilized is <strong>Google Search Console</strong> (provided by Google Ireland Limited) solely to monitor aggregate search visibility and resolve indexing issues.
                  </p>
                  <p className="text-slate-600 text-sm">
                    Google privacy policy:{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline">
                      https://policies.google.com/privacy
                    </a>
                  </p>
                  <p className="text-slate-600 text-sm pt-2">
                    In compliance with applicable data protection laws (Law No. 09-08), users retain rights of access, rectification, and opposition.
                  </p>
                  <p className="text-slate-600 text-sm">
                    Contact for privacy queries:{" "}
                    <a href="mailto:jumpsaron@gmail.com" className="font-bold text-emerald-600 hover:underline">
                      jumpsaron@gmail.com
                    </a>.
                  </p>
                </section>

                {/* 7. Governing Law */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 text-slate-900">
                    <Scale className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-bold">7. Governing Law & Jurisdiction</h2>
                  </div>
                  <p className="text-slate-600 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    These legal terms are governed by Moroccan law. In the event of a dispute, the courts of <strong>Tangier, Morocco</strong>, shall have exclusive jurisdiction.
                  </p>
                </section>
              </div>
            )}

            {/* Footer timestamp */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mentions légales conformes</span>
              </div>
              <div>Dernière mise à jour : 19 Août 2026</div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LegalPage;

