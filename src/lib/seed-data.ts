import { MenuItem } from "@/types";

// ─────────────────────────────────────────────────────────────
// SORRISO — Real Menu Data
// "Your Belly Knows Best"
// ─────────────────────────────────────────────────────────────

export const MENU_ITEMS: MenuItem[] = [

  // ── Rice (Basmathi) ──────────────────────────────────────
  {
    id: "rice-01",
    name: "Fried Rice (Egg, Vege.)",
    description: "Wok-tossed basmathi with egg and fresh vegetables, seasoned with our house spices.",
    price: 750, price_medium: 750, price_large: 950, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
  {
    id: "rice-02",
    name: "Crispy Chicken Fried Rice",
    description: "Golden crispy chicken pieces stir-fried with aromatic basmathi and our signature soy blend.",
    price: 1000, price_medium: 1000, price_large: 1500, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: true,
  },
  {
    id: "rice-03",
    name: "Nasi Gurang",
    description: "Indonesian-inspired basmathi fried with sambal, kecap manis, prawn and chicken.",
    price: 1100, price_medium: 1100, price_large: 1550, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
  {
    id: "rice-04",
    name: "Mongolian Rice",
    description: "Rich Mongolian sauce, julienned vegetables and tender meat strips on silky basmathi.",
    price: 1250, price_medium: 1250, price_large: 1750, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
  {
    id: "rice-05",
    name: "Thai Rice",
    description: "Thai basil fried rice with fish sauce, oyster sauce and fresh chillies.",
    price: 1200, price_medium: 1200, price_large: 1700, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
  {
    id: "rice-06",
    name: "Chilli Fried Rice",
    description: "Fiery wok-tossed basmathi with house chilli paste, crispy shallots and a hint of lime.",
    price: 1100, price_medium: 1100, price_large: 1550, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
  {
    id: "rice-07",
    name: "Chopsuey Rice",
    description: "Classic chopsuey-style basmathi with mixed vegetables, meat and a savoury gravy drizzle.",
    price: 1050, price_medium: 1050, price_large: 1500, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
  {
    id: "rice-08",
    name: "Chicken Fried Rice",
    description: "Classic basmathi fried rice with tender marinated chicken, egg and spring onions.",
    price: 950, price_medium: 950, price_large: 1450, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: true,
  },
  {
    id: "rice-09",
    name: "Mix Meat Fried Rice",
    description: "Premium basmathi stir-fried with chicken, beef and pork in our house sauce.",
    price: 1350, price_medium: 1350, price_large: 1900, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: true,
  },
  {
    id: "rice-10",
    name: "Mix Meat Sea Food Fried Rice",
    description: "Indulgent basmathi with prawn, squid, fish fillet and mixed meats in XO-style sauce.",
    price: 1500, price_medium: 1500, price_large: 2100, has_sizes: true,
    category: "Rice (Basmathi)",
    image_url: "https://images.unsplash.com/photo-1562802378-063ec186a863?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: true,
  },

  // ── Bite ──────────────────────────────────────────────────
  {
    id: "bite-01",
    name: "Chili Pork",
    description: "Wok-seared tender pork in bold house chilli sauce with capsicum and onion.",
    price: 1250, price_medium: 1250, price_large: 1850, has_sizes: true,
    category: "Bite",
    image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: true,
  },
  {
    id: "bite-02",
    name: "Hot Butter Cuttle Fish",
    description: "Flash-fried cuttle fish rings glazed in rich buttery chilli sauce — crispy and addictive.",
    price: 1350, price_medium: 1350, price_large: 2000, has_sizes: true,
    category: "Bite",
    image_url: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: true,
  },
  {
    id: "bite-03",
    name: "Hadello",
    description: "Sri Lankan-style sautéed bite with aromatic spices, curry leaves and caramelised onion.",
    price: 1000, price_medium: 1000, price_large: 1400, has_sizes: true,
    category: "Bite",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
  {
    id: "bite-04",
    name: "Chilli Chicken",
    description: "Juicy fried chicken in signature chilli-ginger glaze with spring onions.",
    price: 1000, price_medium: 1000, price_large: 1500, has_sizes: true,
    category: "Bite",
    image_url: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
  {
    id: "bite-05",
    name: "Pork Deviled",
    description: "Slow-cooked pork in tangy-spicy deviled sauce with tomato, capsicum and green chilli.",
    price: 1200, price_medium: 1200, price_large: 1700, has_sizes: true,
    category: "Bite",
    image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
  {
    id: "bite-06",
    name: "Chicken Deviled",
    description: "Tender chicken in classic deviled sauce — sweet, sour and perfectly spiced.",
    price: 1100, price_medium: 1100, price_large: 1600, has_sizes: true,
    category: "Bite",
    image_url: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=600&auto=format&fit=crop",
    is_available: true, is_featured: false,
  },
];

export const CATEGORIES = [
  { label: "All",             emoji: "✨" },
  { label: "Rice (Basmathi)", emoji: "🍚" },
  { label: "Bite",            emoji: "🌶️" },
];

export const FEATURED_ITEMS = MENU_ITEMS.filter(i => i.is_featured).slice(0, 4);
