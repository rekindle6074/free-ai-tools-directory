import { FC } from "react";
import { SubCategoryEditorialData } from "../data/subcategoryContent";

interface SubCategoryEditorialProps {
  editorial: SubCategoryEditorialData;
  subCategoryPath?: string;
}

export const SubCategoryEditorial: FC<SubCategoryEditorialProps> = ({
  editorial,
  subCategoryPath
}) => {
  return (
    <section
      id={`editorial-${subCategoryPath || "content"}`}
      aria-labelledby="editorial-heading"
      className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm mb-16 overflow-hidden"
    >
      {/* Floated Image Column on tablet and desktop so text wraps naturally around it */}
      <div className="w-full sm:w-[360px] md:w-[400px] lg:w-[440px] sm:float-right sm:ml-8 lg:ml-10 mb-6 lg:mb-8">
        <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-slate-100 p-4 sm:p-5 shadow-sm">
          <figure className="m-0">
            <div className="rounded-2xl overflow-hidden border border-emerald-100/80 bg-slate-50 shadow-inner">
              <img
                src={editorial.image.src}
                alt={editorial.image.alt}
                className="w-full h-auto object-cover max-h-[460px] mx-auto block"
                loading="lazy"
              />
            </div>
            <figcaption className="text-xs sm:text-sm italic text-slate-600 pt-3.5 px-2 text-center leading-relaxed">
              {editorial.image.caption}
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Main Editorial Content - wraps around the floated image, then expands to full width */}
      <div>
        <h2
          id="editorial-heading"
          className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-[-0.03em] leading-tight"
        >
          {editorial.h2Title}
        </h2>

        {editorial.introParagraphs.map((paragraph, index) => (
          <p
            key={index}
            className={`text-base text-slate-500 leading-relaxed ${
              index === 0 ? "mt-6" : "mt-4"
            }`}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}

        {editorial.subsections.map((sub, sIndex) => (
          <div key={sIndex} className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {sub.h3Title}
            </h3>

            {sub.paragraphs &&
              sub.paragraphs.map((para, pIndex) => (
                <p
                  key={pIndex}
                  className="text-base text-slate-500 leading-relaxed mt-4"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}

            {sub.features && sub.features.length > 0 && (
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {sub.features.map((feat, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className="text-base text-slate-500 leading-normal"
                      dangerouslySetInnerHTML={{ __html: feat }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Clear floated element to guarantee clean container boundaries */}
      <div className="clear-both" />
    </section>
  );
};
