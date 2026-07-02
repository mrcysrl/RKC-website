// src/services/api.js

// Replace this with your actual WordPress URL
const WORDPRESS_URL = "http://rkc-wordpress.local";

// Helper: Sanitize common JSON issues
function sanitizeJSON(str) {
  if (!str) return str;

  // Remove trailing commas
  str = str.replace(/,\s*}/g, "}");
  str = str.replace(/,\s*\]/g, "]");

  // Fix unquoted property names: { label: "value" } → {"label": "value"}
  str = str.replace(/(\{|\,)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1 "$2":');

  // Remove any remaining trailing commas
  str = str.replace(/,\s*}/g, "}");
  str = str.replace(/,\s*\]/g, "]");

  return str;
}

// Helper function to fetch data from WordPress REST API
async function fetchFromWP(endpoint) {
  try {
    console.log(`🔄 Fetching: ${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`);
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log(`✅ Fetched ${endpoint}:`, data.length || 'data received');
    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error);
    return [];
  }
}

// Fetch all products
export async function fetchProducts() {
  try {
    console.log('🔄 Fetching products from WordPress...');
    const products = await fetchFromWP("product?_embed&per_page=100");
    
    if (!products || products.length === 0) {
      console.warn('⚠️ No products found in WordPress');
      return [];
    }

    console.log(`📦 Processing ${products.length} products...`);

    const mappedProducts = products.map((item, index) => {
      console.log(`  📝 Product ${index + 1}: ${item.title?.rendered || 'Untitled'}`);
      
      let specs = [];
      if (item.acf?.specs_json) {
        try {
          // Try to parse as-is first
          specs = JSON.parse(item.acf.specs_json);
          console.log(`    ✅ Specs parsed successfully`);
        } catch (e) {
          try {
            // If that fails, sanitize and try again
            const sanitized = sanitizeJSON(item.acf.specs_json);
            specs = JSON.parse(sanitized);
            console.log(`    ✅ Specs parsed after sanitization`);
          } catch (e2) {
            console.error(
              `    ❌ Error parsing specs for product "${item.title?.rendered}":`,
              e2.message
            );
            console.log(`    Raw specs_json:`, item.acf.specs_json);
            specs = [];
          }
        }
      }

      const imageUrl = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
      
      return {
        id: item.slug || item.id.toString(),
        name: item.title?.rendered || "Untitled",
        description: item.content?.rendered || "",
        brand: item.acf?.brand || "Unknown Brand",
        sku: item.acf?.sku || "",
        category: item.categories?.map((cat) => cat.name).join(", ") || "",
        price: parseInt(item.acf?.price) || 0,
        stock: item.acf?.stock || "In Stock",
        badge: item.acf?.badge || null,
        badgeColor: item.acf?.badge_color || "",
        specs: specs,
        img: imageUrl || "https://via.placeholder.com/600x400",
      };
    });

    console.log(`✅ Successfully mapped ${mappedProducts.length} products`);
    return mappedProducts;
  } catch (error) {
    console.error('❌ Error in fetchProducts:', error);
    return [];
  }
}

export async function fetchProductById(id) {
  try {
    const data = await fetchFromWP(`product?slug=${id}&_embed`);
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.error(`❌ Error fetching product ${id}:`, error);
    return null;
  }
}

// Fetch all news
export async function fetchNews() {
  try {
    const news = await fetchFromWP("news?_embed&per_page=100");
    
    if (!news || news.length === 0) {
      console.warn('⚠️ No news found in WordPress');
      return [];
    }

    return news.map((item) => ({
      id: item.slug || item.id.toString(),
      title: item.title?.rendered || "Untitled",
      excerpt: item.excerpt?.rendered || "",
      body: item.content?.rendered || "",
      category: item.categories?.map((cat) => cat.name).join(", ") || "",
      date: item.acf?.news_date || item.date || "",
      author: item.acf?.author || "RKC Team",
      img: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/800x400",
    }));
  } catch (error) {
    console.error('❌ Error in fetchNews:', error);
    return [];
  }
}

// Fetch all brands
export async function fetchBrands() {
  try {
    const brands = await fetchFromWP("brand?_embed&per_page=100");
    
    if (!brands || brands.length === 0) {
      console.warn('⚠️ No brands found in WordPress');
      return [];
    }

    return brands.map((item) => ({
      id: item.slug || item.id.toString(),
      name: item.title?.rendered || "Untitled",
      description: item.content?.rendered || "",
      country: item.acf?.country || "",
      brandDescription: item.acf?.brand_description || "",
      productLines: item.acf?.product_lines_json ? JSON.parse(item.acf.product_lines_json) : [],
      img: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/300x300",
    }));
  } catch (error) {
    console.error('❌ Error in fetchBrands:', error);
    return [];
  }
}

// Fetch all services
export async function fetchServices() {
  try {
    const services = await fetchFromWP("service?_embed&per_page=100");
    
    if (!services || services.length === 0) {
      console.warn('⚠️ No services found in WordPress');
      return [];
    }

    return services.map((item) => ({
      id: item.slug || item.id.toString(),
      title: item.title?.rendered || "Untitled",
      description: item.content?.rendered || "",
      icon: item.acf?.icon || "Settings",
      features: item.acf?.features_json ? JSON.parse(item.acf.features_json) : [],
      industries: item.acf?.industries_json ? JSON.parse(item.acf.industries_json) : [],
      img: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/900x500",
    }));
  } catch (error) {
    console.error('❌ Error in fetchServices:', error);
    return [];
  }
}

// Fetch all categories
export async function fetchProductCategories() {
  try {
    return await fetchFromWP("product_category?per_page=100");
  } catch (error) {
    console.error('❌ Error fetching product categories:', error);
    return [];
  }
}

export async function fetchNewsCategories() {
  try {
    return await fetchFromWP("news_category?per_page=100");
  } catch (error) {
    console.error('❌ Error fetching news categories:', error);
    return [];
  }
}