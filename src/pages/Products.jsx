// src/pages/Products.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { fetchProducts } from "../services/api";
import { CATEGORIES, BRAND_NAMES } from "../data";
import { PageHero } from "../components/Layout";
import ProductCard from "../components/ui/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All Brands");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Fetch products from WordPress
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        console.log('📦 Products data received:', data);
        
        // Debug: Log all unique categories
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        console.log('🏷️ Unique categories in products:', uniqueCategories);
        
        if (data && data.length > 0) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.warn('⚠️ No products data received');
          setProducts([]);
          setFilteredProducts([]);
          setError('No products found. Please add products in WordPress.');
        }
      } catch (err) {
        console.error('❌ Error loading products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    // Category filter - improved matching
    if (category !== "All") {
      console.log(`🔍 Filtering by category: "${category}"`);
      result = result.filter(p => {
        // Match exactly OR case-insensitive OR partial match
        const match = p.category === category || 
                      p.category?.toLowerCase() === category.toLowerCase() ||
                      p.category?.includes(category);
        if (match) {
          console.log(`  ✅ Matched: "${p.category}"`);
        } else {
          console.log(`  ❌ Skipped: "${p.category}"`);
        }
        return match;
      });
    }

    // Brand filter
    if (brand !== "All Brands") {
      console.log(`🔍 Filtering by brand: "${brand}"`);
      result = result.filter(p => {
        const match = p.brand === brand || 
                      p.brand?.toLowerCase() === brand.toLowerCase();
        return match;
      });
    }

    // Sorting
    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    console.log(`📊 Filtered products count: ${result.length}`);
    setFilteredProducts(result);
    setPage(1);
  }, [products, search, category, brand, sort]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginated = filteredProducts.slice((page - 1) * perPage, page * perPage);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All Brands");
    setSort("default");
    setPage(1);
  };

  const hasFilters = search || category !== "All" || brand !== "All Brands" || sort !== "default";

  if (loading) {
    return (
      <>
        <PageHero title="Product Catalog" subtitle="Browse our complete range of industrial automation components and renewable energy equipment." />
        <div className="min-h-[60vh] flex items-center justify-center" style={{ background: "#F8F9FC" }}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHero title="Product Catalog" subtitle="Browse our complete range of industrial automation components and renewable energy equipment." />
        <div className="min-h-[60vh] flex items-center justify-center" style={{ background: "#F8F9FC" }}>
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

  return (
    <>
      <PageHero
        title="Product Catalog"
        subtitle="Browse our complete range of industrial automation components and renewable energy equipment."
      />

      <section className="py-10" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Sort bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#6B7794" }} />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none font-barlow bg-white border border-steel-blue/15 text-deep-navy focus:border-primary-blue transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={15} style={{ color: "#6B7794" }} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2.5 rounded-lg text-sm outline-none font-barlow bg-white border border-steel-blue/15 text-deep-navy focus:border-primary-blue transition"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>

          {/* Category & Brand filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold font-barlow transition-all duration-150 ${
                  category === c
                    ? "bg-steel-blue text-white border border-steel-blue"
                    : "bg-white text-slate-gray border border-steel-blue/15 hover:border-steel-blue/40"
                }`}
              >
                {c}
              </button>
            ))}
            <div className="w-px mx-1 self-stretch" style={{ background: "rgba(26,61,110,0.15)" }} />
            {BRAND_NAMES.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`px-4 py-2 rounded-full text-sm font-semibold font-barlow transition-all duration-150 ${
                  brand === b
                    ? "bg-amber text-deep-navy border border-amber"
                    : "bg-white text-slate-gray border border-steel-blue/15 hover:border-steel-blue/40"
                }`}
              >
                {b}
              </button>
            ))}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-barlow transition-all"
                style={{ background: "rgba(212,24,61,0.08)", color: "#d4183d", border: "1.5px solid rgba(212,24,61,0.2)" }}
              >
                <X size={12} /> Clear All
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="text-sm mb-8 font-barlow" style={{ color: "#6B7794" }}>
            Showing <strong style={{ color: "#0F1A2E" }}>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 && "s"}
          </p>

          {/* Product grid */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg font-bold mb-2 font-barlow-condensed" style={{ color: "#0F1A2E" }}>No products found</p>
              <p className="text-sm mb-6 font-barlow" style={{ color: "#6B7794" }}>Try adjusting your search or filters.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 rounded font-bold text-sm font-barlow bg-steel-blue text-white hover:bg-opacity-90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold font-barlow transition-all ${
                    page === p
                      ? "bg-steel-blue text-white border border-steel-blue"
                      : "bg-white text-slate-gray border border-steel-blue/15 hover:border-steel-blue/40"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}