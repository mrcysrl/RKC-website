// src/pages/News.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchNews, fetchNewsById, fetchNewsCategories } from "../services/api";
import { PageHero } from "../components/Layout";
import NewsCard from "../components/ui/NewsCard";

// ─── News Listing Component ──────────────────────────────────────

function NewsList() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const regularPostsPerPage = 6;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [newsData, categoriesData] = await Promise.all([
          fetchNews(),
          fetchNewsCategories(),
        ]);

        setNews(newsData);
        setFilteredNews(newsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error loading news:", err);
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Apply category filter
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredNews(news);
    } else {
      const filtered = news.filter((item) => {
        if (typeof item.category === "string") {
          const categoryList = item.category.split(",").map((c) => c.trim());
          return categoryList.some(
            (cat) =>
              cat === selectedCategory ||
              cat.toLowerCase() === selectedCategory.toLowerCase(),
          );
        }
        if (Array.isArray(item.category)) {
          return item.category.some(
            (cat) =>
              cat === selectedCategory ||
              cat.toLowerCase() === selectedCategory.toLowerCase(),
          );
        }
        return false;
      });
      setFilteredNews(filtered);
    }
    setCurrentPage(1);
  }, [selectedCategory, news]);

  // ─── PAGINATION LOGIC ──────────────────────────────────────────

  const getPaginatedArticles = () => {
    if (filteredNews.length === 0) {
      return { featured: null, regular: [], totalPages: 0 };
    }

    const featured = filteredNews[0];
    const remainingArticles = filteredNews.slice(1);
    const remainingCount = remainingArticles.length;

    // If no remaining articles, only page 1
    if (remainingCount === 0) {
      return {
        featured: featured,
        regular: [],
        totalPages: 1,
      };
    }

    // Calculate total pages
    // Page 1: featured + first 6 regular
    // If more than 6 regular, additional pages with 6 each
    let totalPages = 1;
    if (remainingCount > regularPostsPerPage) {
      const extraCount = remainingCount - regularPostsPerPage;
      totalPages += Math.ceil(extraCount / regularPostsPerPage);
    }

    // Get regular articles for current page
    const startIndex = (currentPage - 1) * regularPostsPerPage;
    const endIndex = Math.min(startIndex + regularPostsPerPage, remainingCount);
    const regularArticles = remainingArticles.slice(startIndex, endIndex);

    return {
      featured: currentPage === 1 ? featured : null,
      regular: regularArticles,
      totalPages: totalPages,
    };
  };

  const { featured: featuredArticle, regular: regularArticles, totalPages } = getPaginatedArticles();

  // ─── Display Range ─────────────────────────────────────────────

  const getDisplayRange = () => {
    if (filteredNews.length === 0) return { start: 0, end: 0, total: 0 };
    
    let start, end;
    if (currentPage === 1) {
      start = 1;
      end = 1 + regularArticles.length;
    } else {
      start = (currentPage - 1) * regularPostsPerPage + 1;
      end = Math.min(start + regularArticles.length - 1, filteredNews.length);
    }
    
    return { start, end, total: filteredNews.length };
  };

  const range = getDisplayRange();

  // ─── Loading & Error States ────────────────────────────────────

  if (loading) {
    return (
      <>
        <PageHero
          title="News & Updates"
          subtitle="Industry insights, company announcements, and product news from RKC Industrial Supply."
        />
        <div className="min-h-[60vh] flex items-center justify-center bg-off-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHero
          title="News & Updates"
          subtitle="Industry insights, company announcements, and product news from RKC Industrial Supply."
        />
        <div className="min-h-[60vh] flex items-center justify-center bg-off-white">
          <div className="text-center">
            <p className="text-red-500 font-barlow">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-steel-blue text-white rounded-md hover:bg-opacity-90 transition font-barlow"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────

  return (
    <>
      <PageHero
        title="News & Updates"
        subtitle="Industry insights, company announcements, and product news from RKC Industrial Supply."
      />

      <section className="py-12 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold font-barlow transition-all duration-150 ${
                  selectedCategory === cat
                    ? "bg-steel-blue text-white border border-steel-blue"
                    : "bg-white text-slate-gray border border-steel-blue/15 hover:border-steel-blue/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article (only on page 1) */}
          {featuredArticle && (
            <div className="mb-12">
              <NewsCard article={featuredArticle} featured={true} />
            </div>
          )}

          {/* Article Grid */}
          {regularArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <NewsCard key={article.id} article={article} featured={false} />
              ))}
            </div>
          ) : (
            // If no regular articles but there IS a featured article, show empty state
            // This happens when there's only 1 article total
            !featuredArticle && (
              <div className="text-center py-16">
                <p className="text-lg font-barlow-condensed text-deep-navy">
                  No articles found
                </p>
              </div>
            )
          )}

          {/* ─── Pagination ───────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => {
                  setCurrentPage(Math.max(1, currentPage - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                  currentPage === 1
                    ? "border-steel-blue/10 text-slate-gray/40 cursor-not-allowed"
                    : "border-steel-blue/15 text-steel-blue hover:bg-steel-blue hover:text-white hover:border-steel-blue"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold font-barlow transition-all ${
                      currentPage === page
                        ? "bg-steel-blue text-white border border-steel-blue"
                        : "bg-white text-slate-gray border border-steel-blue/15 hover:border-steel-blue/40 hover:text-steel-blue"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setCurrentPage(Math.min(totalPages, currentPage + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                  currentPage === totalPages
                    ? "border-steel-blue/10 text-slate-gray/40 cursor-not-allowed"
                    : "border-steel-blue/15 text-steel-blue hover:bg-steel-blue hover:text-white hover:border-steel-blue"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Results count */}
          {filteredNews.length > 0 && (
            <p className="text-center text-sm font-barlow text-slate-gray mt-6">
              Showing {range.start}–{range.end} of {range.total} articles
            </p>
          )}
        </div>
      </section>
    </>
  );
}

// ─── News Detail Component ──────────────────────────────────────

export function NewsDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const data = await fetchNewsById(id);
        if (!data) {
          setError("Article not found");
          return;
        }
        setArticle(data);

        // ─── Fetch more articles (any category) ──────────────────
        try {
          const allNews = await fetchNews();
          const otherArticles = allNews.filter((item) => item.id !== data.id);
          const relatedArticles = otherArticles.slice(0, 3);
          setRelated(relatedArticles);
        } catch (relatedError) {
          console.error("Error fetching related articles:", relatedError);
          setRelated([]);
        }
      } catch (err) {
        console.error("Error loading article:", err);
        setError("Failed to load article. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-off-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <>
        <PageHero title="Article Not Found" />
        <div className="min-h-[50vh] flex flex-col items-center justify-center bg-off-white">
          <p className="text-slate-gray font-barlow mb-4">
            {error || "The article you're looking for does not exist."}
          </p>
          <Link
            to="/news"
            className="text-steel-blue font-barlow hover:text-amber transition"
          >
            ← Back to News
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-20 pb-0 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-xs font-barlow text-white/40">
            <Link to="/" className="hover:text-amber transition">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link to="/news" className="hover:text-amber transition">
              News
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-amber">{article.title}</span>
          </div>
        </div>
      </div>

      <section className="py-12 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold font-barlow text-steel-blue hover:text-amber transition mb-8"
          >
            <ArrowLeft size={16} /> Back to News
          </Link>

          <div className="rounded-2xl overflow-hidden bg-[#EDF0F6] aspect-video mb-8 border border-steel-blue/10">
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold font-barlow bg-amber text-deep-navy">
              {article.category}
            </span>
            <span className="text-sm font-barlow text-slate-gray flex items-center gap-1.5">
              <Calendar size={14} /> {article.date}
            </span>
            <span className="text-sm font-barlow text-slate-gray flex items-center gap-1.5">
              <User size={14} /> {article.author}
            </span>
          </div>

          <h1 className="font-barlow-condensed text-3xl md:text-4xl font-bold text-deep-navy mb-6 leading-tight">
            {article.title}
          </h1>

          <div
            className="prose prose-lg max-w-none font-barlow text-slate-gray"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          <div className="mt-12 p-6 rounded-2xl bg-steel-blue border border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white font-barlow-condensed text-lg font-bold">
                  Interested in this product or service?
                </p>
                <p className="text-sm font-barlow text-white/60">
                  Contact our team for availability, pricing, and technical consultation.
                </p>
              </div>
              <Link
                to="/rfq"
                className="px-6 py-3 rounded-lg font-bold font-barlow-condensed text-base bg-amber text-deep-navy hover:bg-opacity-90 transition whitespace-nowrap"
              >
                Request Quote <ArrowRight size={16} className="inline ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── More Articles ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-12 bg-off-white border-t border-steel-blue/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-barlow-condensed text-2xl font-bold text-deep-navy mb-6">
              More Articles
            </h2>
            <div className="flex flex-col gap-4">
              {related.map((n) => (
                <Link
                  to={`/news/${n.id}`}
                  key={n.id}
                  className="flex gap-4 p-4 rounded-xl no-underline transition-all bg-white border border-steel-blue/10 hover:border-steel-blue/25"
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#EDF0F6]">
                    <img
                      src={n.img}
                      alt={n.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded mb-1.5 inline-block font-barlow bg-[#EDF0F6] text-steel-blue">
                      {n.category}
                    </span>
                    <h3 className="font-bold font-barlow-condensed text-base text-deep-navy leading-snug">
                      {n.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────

export default function News() {
  const { id } = useParams();
  return id ? <NewsDetail /> : <NewsList />;
}