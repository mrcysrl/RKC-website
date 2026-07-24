const WORDPRESS_URL = "https://rkcindustrialph.com";

// ─── BADGE MAPPING ─────────────────────────────────────────────

const BADGE_MAP = {
  "best-seller": { text: "Best Seller", color: "#F5A800" },
  "new-arrival": { text: "New Arrival", color: "#2E6BB0" },
  "featured": { text: "Featured", color: "#1A3D6E" },
  "popular": { text: "Popular", color: "#F5A800" },
  "limited-stock": { text: "Limited Stock", color: "#D4183D" },
  "none": { text: null, color: null },
};

// ─── HELPER FUNCTIONS ──────────────────────────────────────────

// Helper: Strip HTML tags
function stripHTML(html) {
  if (!html) return "";
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

// Helper: Clean WordPress block markup
function cleanWPContent(html) {
  if (!html) return "";
  
  // Remove wp-block-* classes
  let cleaned = html.replace(/class="wp-block-[^"]*"/g, "");
  
  // Remove empty paragraphs
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, "");
  
  // Remove extra whitespace
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  
  return cleaned;
}

// Helper: Sanitize common JSON issues
function sanitizeJSON(str) {
  if (!str) return str;
  str = str.replace(/,\s*}/g, "}");
  str = str.replace(/,\s*\]/g, "]");
  str = str.replace(/(\{|\,)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1 "$2":');
  str = str.replace(/,\s*}/g, "}");
  str = str.replace(/,\s*\]/g, "]");
  return str;
}

// ─── FETCH HELPERS ─────────────────────────────────────────────

// Helper function to fetch data from WordPress REST API
async function fetchFromWP(endpoint) {
  try {
    console.log(`🔄 Fetching: ${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`);
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`);
    
    if (!response.ok) {
      console.warn(`⚠️ API request failed: ${response.status} - ${response.statusText}`);
      return [];
    }
    
    const data = await response.json();
    console.log(`✅ Fetched ${endpoint}:`, data.length || 'data received');
    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error);
    return [];
  }
}

// ─── PRODUCTS ──────────────────────────────────────────────────

export async function fetchProducts() {
  try {
    console.log("🔄 Fetching products from WordPress...");
    const products = await fetchFromWP("product?_embed&per_page=100");

    if (!products || products.length === 0) {
      console.warn("⚠️ No products found in WordPress");
      return [];
    }

    console.log(`📦 Processing ${products.length} products...`);

    const mappedProducts = products.map((item, index) => {
      console.log(
        `  📝 Product ${index + 1}: ${item.title?.rendered || "Untitled"}`,
      );

      // Log ACF fields to see what's available
      console.log(`  📋 ACF fields:`, JSON.stringify(item.acf || {}, null, 2));

      // Extract category from _embedded.wp:term
      let category = "";
      if (item._embedded?.["wp:term"] && item._embedded["wp:term"].length > 0) {
        const termArray = item._embedded["wp:term"].find((terms) =>
          terms.some((term) => term.taxonomy === "product_category"),
        );
        if (termArray && termArray.length > 0) {
          category = termArray.map((term) => term.name).join(", ");
        }
      }

      // Fallback: check acf.category
      if (!category && item.acf?.category) {
        category = item.acf.category;
      }

      // Fallback: check direct categories array
      if (!category && item.categories && item.categories.length > 0) {
        category = item.categories.map((cat) => cat.name).join(", ");
      }

      console.log(`    🏷️ Category: "${category}"`);

      // ─── Handle Badge ────────────────────────────────────────
      let badgeText = null;
      let badgeColor = null;

      // Get the badge_type value from ACF
      const badgeTypeValue = item.acf?.badge_type || "";

      // If badge_type has a value and it's not empty
      if (badgeTypeValue && badgeTypeValue !== "") {
        let foundKey = null;

        // First, try to match by display text
        const foundByText = Object.keys(BADGE_MAP).find(
          (key) => BADGE_MAP[key].text === badgeTypeValue,
        );

        if (foundByText) {
          foundKey = foundByText;
          console.log(
            `    ✅ Badge matched by text: "${badgeTypeValue}" → "${foundKey}"`,
          );
        } else {
          // If not found by text, try by slug
          const foundBySlug = Object.keys(BADGE_MAP).find(
            (key) => key.toLowerCase() === badgeTypeValue.toLowerCase(),
          );
          if (foundBySlug) {
            foundKey = foundBySlug;
            console.log(
              `    ✅ Badge matched by slug: "${badgeTypeValue}" → "${foundKey}"`,
            );
          }
        }

        if (foundKey) {
          const badgeData = BADGE_MAP[foundKey];
          badgeText = badgeData.text;
          badgeColor = badgeData.color;
        } else {
          // If no match, use the value as-is
          badgeText = badgeTypeValue;
          badgeColor = item.acf?.badge_color || "#F5A800";
          console.log(`    ✅ Badge from badge_type (direct): "${badgeText}"`);
        }
      }

      // If no badge from badge_type, check the old badge field
      if (!badgeText && item.acf?.badge && item.acf.badge !== "") {
        const foundKey = Object.keys(BADGE_MAP).find(
          (key) =>
            BADGE_MAP[key].text === item.acf.badge ||
            BADGE_MAP[key].text?.toLowerCase() ===
              item.acf.badge?.toLowerCase(),
        );

        if (foundKey) {
          const badgeData = BADGE_MAP[foundKey];
          badgeText = badgeData.text;
          badgeColor = badgeData.color;
        } else {
          badgeText = item.acf.badge;
          badgeColor = item.acf?.badge_color || "#F5A800";
        }
        console.log(`    ✅ Badge from old badge field: "${badgeText}"`);
      }

      console.log(`    🏷️ Final Badge: "${badgeText}" (${badgeColor})`);

      // ─── Parse Specifications ───────────────────────────────
      let specs = [];
      if (item.acf?.specs_json) {
        try {
          specs = JSON.parse(item.acf.specs_json);
        } catch (e) {
          try {
            const sanitized = sanitizeJSON(item.acf.specs_json);
            specs = JSON.parse(sanitized);
          } catch (e2) {
            console.error(`    ❌ Error parsing specs:`, e2.message);
            specs = [];
          }
        }
      }

      // Get image URL
      const imageUrl = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

      // ─── Handle Stock Status ──────────────────────────────────
      let stockStatus = item.acf?.stock || "In Stock";
      const validStockValues = [
        "In Stock",
        "Out of Stock",
        "Backorder",
        "Pre-order",
      ];
      if (!validStockValues.includes(stockStatus)) {
        stockStatus = "In Stock";
      }

      return {
        id: item.slug || item.id.toString(),
        name: item.title?.rendered || "Untitled",
        description: cleanWPContent(item.content?.rendered) || "",
        brand: item.acf?.brand || "Unknown Brand",
        sku: item.acf?.sku || "",
        category: category || "Uncategorized",
        price: parseInt(item.acf?.price) || 0,
        stock: stockStatus,
        badge: badgeText,
        badgeColor: badgeColor,
        specs: specs,
        img: imageUrl || "https://via.placeholder.com/600x400",
      };
    });

    console.log(`✅ Successfully mapped ${mappedProducts.length} products`);
    return mappedProducts;
  } catch (error) {
    console.error("❌ Error in fetchProducts:", error);
    return [];
  }
}

// ─── NEWS ──────────────────────────────────────────────────────

// Fetch all news
export async function fetchNews() {
  try {
    console.log('🔄 Fetching news from WordPress...');
    const news = await fetchFromWP("news?_embed&per_page=100");
    
    if (!news || news.length === 0) {
      console.warn('⚠️ No news found in WordPress');
      return [];
    }

    return news.map((item) => {
      let category = "";
      
      // Get category from _embedded.wp:term (WordPress taxonomy)
      if (item._embedded?.['wp:term'] && item._embedded['wp:term'].length > 0) {
        const termArray = item._embedded['wp:term'].find(terms => 
          terms.some(term => term.taxonomy === 'news_category')
        );
        if (termArray && termArray.length > 0) {
          category = termArray.map(term => term.name).join(', ');
        }
      }
      
      // Fallback to categories array
      if (!category && item.categories && item.categories.length > 0) {
        category = item.categories.map(cat => cat.name).join(', ');
      }
      
      // Fallback to ACF
      if (!category && item.acf?.category) {
        category = item.acf.category;
      }

      return {
        id: item.slug || item.id.toString(),
        title: item.title?.rendered || "Untitled",
        excerpt: stripHTML(item.excerpt?.rendered) || "",
        body: cleanWPContent(item.content?.rendered) || "",
        category: category || "Uncategorized",
        date: item.acf?.news_date || item.date || "",
        author: item.acf?.author || "RKC Team",
        img: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/800x400",
      };
    });
  } catch (error) {
    console.error('❌ Error in fetchNews:', error);
    return [];
  }
}

// Fetch news categories
export async function fetchNewsCategories() {
  try {
    const data = await fetchFromWP("news_category?per_page=100");
    if (data && data.length > 0) {
      return ["All", ...data.map((cat) => cat.name)];
    }
    return ["All"];
  } catch (error) {
    console.warn("⚠️ Could not fetch news categories:", error.message);
    return ["All"];
  }
}

export async function fetchNewsById(id) {
  try {
    const data = await fetchFromWP(`news?slug=${id}&_embed`);
    if (data && data.length > 0) {
      const item = data[0];
      
      let category = "";
      if (item._embedded?.['wp:term'] && item._embedded['wp:term'].length > 0) {
        const termArray = item._embedded['wp:term'].find(terms => 
          terms.some(term => term.taxonomy === 'news_category')
        );
        if (termArray && termArray.length > 0) {
          category = termArray.map(term => term.name).join(', ');
        }
      }
      if (!category && item.categories && item.categories.length > 0) {
        category = item.categories.map(cat => cat.name).join(', ');
      }
      if (!category && item.acf?.category) {
        category = item.acf.category;
      }

      return {
        id: item.slug || item.id.toString(),
        title: item.title?.rendered || "Untitled",
        excerpt: stripHTML(item.excerpt?.rendered) || "",
        body: cleanWPContent(item.content?.rendered) || "",
        category: category || "Uncategorized",
        date: item.acf?.news_date || item.date || "",
        author: item.acf?.author || "RKC Team",
        img: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/800x400",
      };
    }
    return null;
  } catch (error) {
    console.error(`❌ Error fetching news ${id}:`, error);
    return null;
  }
}

// ─── BRANDS ────────────────────────────────────────────────────

export async function fetchBrands() {
  try {
    const brands = await fetchFromWP("brand?_embed&per_page=100");

    if (!brands || brands.length === 0) {
      console.warn("⚠️ No brands found in WordPress");
      return [];
    }

    return brands.map((item) => ({
      id: item.slug || item.id.toString(),
      name: item.title?.rendered || "Untitled",
      description: cleanWPContent(item.content?.rendered) || "",
      country: item.acf?.country || "",
      brandDescription: item.acf?.brand_description || "",
      productLines: item.acf?.product_lines_json
        ? JSON.parse(item.acf.product_lines_json)
        : [],
      img:
        item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://via.placeholder.com/300x300",
    }));
  } catch (error) {
    console.error("❌ Error in fetchBrands:", error);
    return [];
  }
}

// ─── SERVICES ──────────────────────────────────────────────────

export async function fetchServices() {
  try {
    const services = await fetchFromWP("service?_embed&per_page=100");

    if (!services || services.length === 0) {
      console.warn("⚠️ No services found in WordPress");
      return [];
    }

    return services.map((item) => ({
      id: item.slug || item.id.toString(),
      title: item.title?.rendered || "Untitled",
      description: cleanWPContent(item.content?.rendered) || "",
      icon: item.acf?.icon || "Settings",
      features: item.acf?.features_json
        ? JSON.parse(item.acf.features_json)
        : [],
      industries: item.acf?.industries_json
        ? JSON.parse(item.acf.industries_json)
        : [],
      img:
        item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://via.placeholder.com/900x500",
    }));
  } catch (error) {
    console.error("❌ Error in fetchServices:", error);
    return [];
  }
}

// ─── CATEGORIES ────────────────────────────────────────────────

export async function fetchProductCategories() {
  try {
    const data = await fetchFromWP("product_category?per_page=100");
    return data || [];
  } catch (error) {
    console.error("❌ Error fetching product categories:", error);
    return [];
  }
}