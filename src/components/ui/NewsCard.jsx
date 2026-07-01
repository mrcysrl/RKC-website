// src/components/ui/NewsCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NewsCard = ({ article, featured = false }) => {
  if (featured) {
    return (
      <Link
        to={`/news/${article.id}`}
        className="group block rounded-2xl overflow-hidden no-underline transition-all duration-200 bg-white border border-steel-blue/10 shadow-md hover:shadow-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-64 lg:h-auto bg-[#EDF0F6] overflow-hidden">
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-barlow bg-amber text-deep-navy">
                Featured
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-barlow bg-[#EDF0F6] text-steel-blue">
                {article.category}
              </span>
            </div>
            <h2 className="font-barlow-condensed text-2xl font-bold text-deep-navy mb-3 leading-snug">
              {article.title}
            </h2>
            <p className="text-sm font-barlow text-slate-gray mb-5 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-barlow text-slate-gray">
                <span>{article.date}</span>
                <span>By {article.author}</span>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-semibold font-barlow text-steel-blue">
                Read Full Article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/news/${article.id}`}
      className="group rounded-xl overflow-hidden no-underline transition-all duration-200 bg-white border border-steel-blue/10 shadow-sm hover:shadow-xl hover:-translate-y-1 block"
    >
      <div className="h-44 bg-[#EDF0F6] overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded font-barlow bg-[#EDF0F6] text-steel-blue">
            {article.category}
          </span>
          <span className="text-xs font-barlow text-slate-gray">
            {article.date}
          </span>
        </div>
        <h3 className="font-bold font-barlow-condensed text-lg text-deep-navy mb-2 leading-snug">
          {article.title}
        </h3>
        <p className="text-sm font-barlow text-slate-gray mb-4 leading-relaxed">
          {article.excerpt}
        </p>
        <span className="flex items-center gap-1.5 text-xs font-semibold font-barlow text-primary-blue">
          Read More <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
};

export default NewsCard;
