// src/components/ui/NewsCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';

const NewsCard = ({ article, featured = false }) => {
  if (featured) {
    // Featured Article - Large format
    return (
      <Link
        to={`/news/${article.id}`}
        className="group block rounded-2xl overflow-hidden bg-white border border-steel-blue/10 shadow-sm hover:shadow-xl transition-all duration-300 no-underline hover:-translate-y-1"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image - Fixed aspect ratio */}
          <div className="h-64 lg:h-[300px] bg-[#EDF0F6] overflow-hidden flex-shrink-0">
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Content */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-barlow bg-amber text-deep-navy">
                Featured
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-barlow bg-[#EDF0F6] text-steel-blue">
                {article.category}
              </span>
            </div>
            <h2 className="font-barlow-condensed text-2xl font-bold text-deep-navy mb-3 leading-snug line-clamp-2">
              {article.title}
            </h2>
            <p className="text-sm font-barlow text-slate-gray mb-5 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-barlow text-slate-gray">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <User size={12} /> {article.author}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-semibold font-barlow text-steel-blue group-hover:text-amber transition-colors">
                Read Full Article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Regular Article - Card format with fixed image height
  return (
    <Link
      to={`/news/${article.id}`}
      className="group block rounded-xl overflow-hidden bg-white border border-steel-blue/10 shadow-sm hover:shadow-xl transition-all duration-300 no-underline hover:-translate-y-1 h-full flex flex-col"
    >
      {/* Image - Fixed height */}
      <div className="h-48 bg-[#EDF0F6] overflow-hidden flex-shrink-0">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded font-barlow bg-[#EDF0F6] text-steel-blue">
            {article.category}
          </span>
          <span className="text-xs font-barlow text-slate-gray flex items-center gap-1">
            <Calendar size={11} /> {article.date}
          </span>
        </div>
        <h3 className="font-bold font-barlow-condensed text-lg text-deep-navy mb-2 leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm font-barlow text-slate-gray leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-steel-blue/10">
          <span className="text-xs font-barlow text-slate-gray flex items-center gap-1">
            <User size={11} /> {article.author}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold font-barlow text-primary-blue group-hover:text-amber transition-colors">
            Read More <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;