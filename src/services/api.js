// ─── IMPORT MOCK DATA FROM INDEX.JS ────────────────────────────
import { MOCK_PRODUCTS, MOCK_NEWS } from "../data/index.js";

// Use environment variable for API URL
// In development: uses full URL for local testing
// In production: uses empty string for relative URLs (Vercel proxy handles it)
const WORDPRESS_URL = import.meta.env.DEV ? "https://rkcindustrialph.com" : "";

// ─── BADGE MAPPING ─────────────────────────────────────────────

const BADGE_MAP = {
  "best-seller": { text: "Best Seller", color: "#F5A800" },
  "new-arrival": { text: "New Arrival", color: "#2E6BB0" },
  featured: { text: "Featured", color: "#1A3D6E" },
  popular: { text: "Popular", color: "#F5A800" },
  "limited-stock": { text: "Limited Stock", color: "#D4183D" },
  none: { text: null, color: null },
};

// ─── HELPER FUNCTIONS ──────────────────────────────────────────

function stripHTML(html) {
  if (!html) return "";
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

function cleanWPContent(html) {
  if (!html) return "";
  let cleaned = html.replace(/class="wp-block-[^"]*"/g, "");
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, "");
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  return cleaned;
}

function sanitizeJSON(str) {
  if (!str) return str;
  str = str.replace(/,\s*}/g, "}");
  str = str.replace(/,\s*\]/g, "]");
  str = str.replace(/(\{|\,)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1 "$2":');
  str = str.replace(/,\s*}/g, "}");
  str = str.replace(/,\s*\]/g, "]");
  return str;
}

// ─── FETCH WITH CORS-FRIENDLY HEADERS ─────────────────────────

async function fetchFromWP(endpoint, retries = 3) {
  const separator = endpoint.includes("?") ? "&" : "?";
  const cacheBustedEndpoint = `${endpoint}${separator}_=${Date.now()}`;
  // Use relative URL - Vercel proxy will handle the routing
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/${cacheBustedEndpoint}`;

  console.log(`🔍 [DEBUG] Attempting to fetch: ${url}`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${retries}...`);

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(10000),
      });

      console.log(`📊 [DEBUG] Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(
        `✅ [DEBUG] Success! Received ${data.length || "data"} items`,
      );
      return data;
    } catch (error) {
      console.warn(`⚠️ Attempt ${attempt}/${retries} failed:`, error.message);

      if (attempt === retries) {
        console.error(`❌ All ${retries} attempts failed for ${endpoint}`);
        return null;
      }

      const waitTime = 1000 * Math.pow(2, attempt - 1);
      console.log(`⏳ Waiting ${waitTime}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
}

// ─── PRODUCTS ──────────────────────────────────────────────────

export async function fetchProducts() {
  console.log("🚀 [DEBUG] fetchProducts() called");

  try {
    console.log("🔄 Fetching products from WordPress...");
    const products = await fetchFromWP("product?_embed&per_page=100", 3);

    if (!products || products.length === 0) {
      console.warn("⚠️ No products from WordPress API, using MOCK_PRODUCTS");
      return MOCK_PRODUCTS;
    }

    console.log(`📦 Processing ${products.length} products from WordPress...`);

    const mappedProducts = products.map((item) => {
      // Extract category
      let category = "";
      if (item._embedded?.["wp:term"] && item._embedded["wp:term"].length > 0) {
        const termArray = item._embedded["wp:term"].find((terms) =>
          terms.some((term) => term.taxonomy === "product_category"),
        );
        if (termArray && termArray.length > 0) {
          category = termArray.map((term) => term.name).join(", ");
        }
      }
      if (!category && item.acf?.category) category = item.acf.category;
      if (!category && item.categories && item.categories.length > 0) {
        category = item.categories.map((cat) => cat.name).join(", ");
      }

      // Extract brand (from the "brand" taxonomy, assigned via checkboxes in wp-admin)
      let brand = "";
      if (item._embedded?.["wp:term"] && item._embedded["wp:term"].length > 0) {
        const termArray = item._embedded["wp:term"].find((terms) =>
          terms.some((term) => term.taxonomy === "brand"),
        );
        if (termArray && termArray.length > 0) {
          brand = termArray.map((term) => term.name).join(", ");
        }
      }

      // Handle Badge
      let badgeText = null;
      let badgeColor = null;
      const badgeTypeValue = item.acf?.badge_type || "";

      if (badgeTypeValue && badgeTypeValue !== "") {
        let foundKey = null;
        const foundByText = Object.keys(BADGE_MAP).find(
          (key) => BADGE_MAP[key].text === badgeTypeValue,
        );
        if (foundByText) foundKey = foundByText;
        else {
          const foundBySlug = Object.keys(BADGE_MAP).find(
            (key) => key.toLowerCase() === badgeTypeValue.toLowerCase(),
          );
          if (foundBySlug) foundKey = foundBySlug;
        }
        if (foundKey) {
          const badgeData = BADGE_MAP[foundKey];
          badgeText = badgeData.text;
          badgeColor = badgeData.color;
        } else {
          badgeText = badgeTypeValue;
          badgeColor = item.acf?.badge_color || "#F5A800";
        }
      }

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
      }

      // Parse Specifications
      let specs = [];
      if (item.acf?.specs_json) {
        try {
          specs = JSON.parse(item.acf.specs_json);
        } catch (e) {
          try {
            const sanitized = sanitizeJSON(item.acf.specs_json);
            specs = JSON.parse(sanitized);
          } catch (e2) {
            specs = [];
          }
        }
      }

      const imageUrl = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

      let stockStatus = item.acf?.stock || "In Stock";
      const validStockValues = [
        "In Stock",
        "Out of Stock",
        "Backorder",
        "Pre-order",
      ];
      if (!validStockValues.includes(stockStatus)) stockStatus = "In Stock";

      return {
        id: item.slug || item.id.toString(),
        name: item.title?.rendered || "Untitled",
        description: cleanWPContent(item.content?.rendered) || "",
        brand: brand || "Unknown Brand",
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

    console.log(
      `✅ Successfully mapped ${mappedProducts.length} products from WordPress`,
    );
    return mappedProducts;
  } catch (error) {
    console.error("❌ Error in fetchProducts:", error);
    console.warn("⚠️ Returning MOCK_PRODUCTS as fallback");
    return MOCK_PRODUCTS;
  }
}

// ─── NEWS ──────────────────────────────────────────────────────

export async function fetchNews() {
  console.log("🚀 [DEBUG] fetchNews() called");

  try {
    console.log("🔄 Fetching news from WordPress...");
    const news = await fetchFromWP("news?_embed&per_page=100", 3);

    if (!news || news.length === 0) {
      console.warn("⚠️ No news from WordPress API, using MOCK_NEWS");
      return MOCK_NEWS;
    }

    return news.map((item) => {
      let category = "";
      if (item._embedded?.["wp:term"] && item._embedded["wp:term"].length > 0) {
        const termArray = item._embedded["wp:term"].find((terms) =>
          terms.some((term) => term.taxonomy === "news_category"),
        );
        if (termArray && termArray.length > 0) {
          category = termArray.map((term) => term.name).join(", ");
        }
      }
      if (!category && item.categories && item.categories.length > 0) {
        category = item.categories.map((cat) => cat.name).join(", ");
      }
      if (!category && item.acf?.category) category = item.acf.category;

      return {
        id: item.slug || item.id.toString(),
        title: item.title?.rendered || "Untitled",
        excerpt: stripHTML(item.excerpt?.rendered) || "",
        body: cleanWPContent(item.content?.rendered) || "",
        category: category || "Uncategorized",
        date: item.acf?.news_date || item.date || "",
        author: item.acf?.author || "RKC Team",
        img:
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/800x400",
      };
    });
  } catch (error) {
    console.error("❌ Error in fetchNews:", error);
    return MOCK_NEWS;
  }
}

// ─── EXPORT OTHER FUNCTIONS ──────────────────────────────────

export async function fetchNewsCategories() {
  try {
    const data = await fetchFromWP("news_category?per_page=100", 2);
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
    const data = await fetchFromWP(`news?slug=${id}&_embed`, 2);
    if (data && data.length > 0) {
      const item = data[0];
      let category = "";
      if (item._embedded?.["wp:term"] && item._embedded["wp:term"].length > 0) {
        const termArray = item._embedded["wp:term"].find((terms) =>
          terms.some((term) => term.taxonomy === "news_category"),
        );
        if (termArray && termArray.length > 0) {
          category = termArray.map((term) => term.name).join(", ");
        }
      }
      if (!category && item.categories && item.categories.length > 0) {
        category = item.categories.map((cat) => cat.name).join(", ");
      }
      if (!category && item.acf?.category) category = item.acf.category;

      return {
        id: item.slug || item.id.toString(),
        title: item.title?.rendered || "Untitled",
        excerpt: stripHTML(item.excerpt?.rendered) || "",
        body: cleanWPContent(item.content?.rendered) || "",
        category: category || "Uncategorized",
        date: item.acf?.news_date || item.date || "",
        author: item.acf?.author || "RKC Team",
        img:
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/800x400",
      };
    }
    return null;
  } catch (error) {
    console.error(`❌ Error fetching news ${id}:`, error);
    return null;
  }
}

export async function fetchBrands() {
  try {
    const brands = await fetchFromWP("brands?per_page=100", 2);
    if (!brands || brands.length === 0) return [];
    return brands.map((item) => ({
      id: item.slug || item.id.toString(),
      name: item.name || "Untitled",
    }));
  } catch (error) {
    console.error("❌ Error in fetchBrands:", error);
    return [];
  }
}

export async function fetchServices() {
  try {
    const services = await fetchFromWP("service?_embed&per_page=100", 2);
    if (!services || services.length === 0) return [];
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

export async function fetchProductCategories() {
  try {
    const data = await fetchFromWP("product_category?per_page=100", 2);
    if (!data || data.length === 0) return [];
    return data.map((item) => ({
      id: item.slug || item.id.toString(),
      name: item.name || "Untitled",
    }));
  } catch (error) {
    console.error("❌ Error fetching product categories:", error);
    return [];
  }
}

export async function checkAPIHealth() {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/`, {
      signal: AbortSignal.timeout(5000),
      headers: {
        Accept: "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("❌ API health check failed:", error);
    return false;
  }
}
