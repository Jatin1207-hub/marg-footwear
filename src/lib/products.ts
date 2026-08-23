export type Category = "men" | "women" | "kids";
export type SubCategory = "Running" | "Casual" | "Sports" | "Lifestyle" | "Training";

export interface Product {
  id: string;
  name: string;
  category: Category;
  sub: SubCategory;
  price: number;
  colors: { name: string; hex: string }[];
  sizes: number[];
  isNew?: boolean;
  releaseDate?: string;
  rating: number;
  reviews: number;
  description: string;
}

const C = {
  blackOrange: [
    { name: "Volt Orange", hex: "#ff6a00" },
    { name: "Stealth Black", hex: "#111111" },
    { name: "Arctic White", hex: "#f5f5f5" },
  ],
  blueWhite: [
    { name: "Electric Blue", hex: "#1f7aff" },
    { name: "Pure White", hex: "#fafafa" },
    { name: "Carbon", hex: "#222222" },
  ],
  pinkBlush: [
    { name: "Blush Pink", hex: "#ff5a8a" },
    { name: "Ivory", hex: "#f3ead8" },
    { name: "Midnight", hex: "#1a1a2e" },
  ],
};

const mensSizes = [7, 8, 9, 10, 11, 12];
const womensSizes = [5, 6, 7, 8, 9, 10];
const kidsSizes = [1, 2, 3, 4, 5, 6];

export const products: Product[] = [
  { id: "sv-velocity-x", name: "Marg Velocity X", category: "men", sub: "Running", price: 12999, colors: C.blackOrange, sizes: mensSizes, isNew: true, releaseDate: "2026-06-15", rating: 4.8, reviews: 142, description: "Lightweight carbon-plated runner engineered for speed. Energy-return foam delivers explosive takeoff on every stride." },
  { id: "sv-aero-pulse", name: "Marg Aero Pulse", category: "men", sub: "Running", price: 10499, colors: C.blueWhite, sizes: mensSizes, rating: 4.6, reviews: 89, description: "Daily training shoe with breathable engineered mesh and responsive midsole." },
  { id: "sv-court-pro", name: "Marg Court Pro", category: "men", sub: "Sports", price: 8999, colors: C.blackOrange, sizes: mensSizes, rating: 4.5, reviews: 64, description: "Multi-court traction with lateral support for explosive cuts." },
  { id: "sv-urban-low", name: "Marg Urban Low", category: "men", sub: "Casual", price: 7499, colors: C.blueWhite, sizes: mensSizes, rating: 4.4, reviews: 51, description: "Minimalist everyday silhouette in premium leather." },
  { id: "sv-flux-trainer", name: "Marg Flux Trainer", category: "men", sub: "Training", price: 9499, colors: C.blackOrange, sizes: mensSizes, isNew: true, releaseDate: "2026-06-20", rating: 4.7, reviews: 73, description: "Stability-tuned trainer for HIIT, lifting, and cross-training." },

  { id: "sv-glide-w", name: "Marg Glide W", category: "women", sub: "Running", price: 11499, colors: C.pinkBlush, sizes: womensSizes, isNew: true, releaseDate: "2026-06-18", rating: 4.9, reviews: 211, description: "Plush long-distance ride with adaptive heel cradle." },
  { id: "sv-luna-runner", name: "Marg Luna Runner", category: "women", sub: "Running", price: 9999, colors: C.blueWhite, sizes: womensSizes, rating: 4.6, reviews: 98, description: "Daily miles, redefined. Soft cushioning, springy return." },
  { id: "sv-zen-flow", name: "Marg Zen Flow", category: "women", sub: "Lifestyle", price: 8499, colors: C.pinkBlush, sizes: womensSizes, rating: 4.7, reviews: 132, description: "Studio-to-street silhouette with flex-knit upper." },
  { id: "sv-ember-casual", name: "Marg Ember Casual", category: "women", sub: "Casual", price: 6999, colors: C.blackOrange, sizes: womensSizes, rating: 4.3, reviews: 47, description: "Refined everyday classic with sculpted midsole." },
  { id: "sv-strike-w", name: "Marg Strike W", category: "women", sub: "Sports", price: 9299, colors: C.blueWhite, sizes: womensSizes, rating: 4.5, reviews: 58, description: "Multi-surface court grip and dynamic midfoot lockdown." },

  { id: "sv-rocket-kids", name: "Marg Rocket Kids", category: "kids", sub: "Running", price: 4999, colors: C.blackOrange, sizes: kidsSizes, isNew: true, releaseDate: "2026-06-22", rating: 4.8, reviews: 88, description: "Easy-on, easy-off speed runners for the next generation." },
  { id: "sv-mini-court", name: "Marg Mini Court", category: "kids", sub: "Sports", price: 4299, colors: C.blueWhite, sizes: kidsSizes, rating: 4.6, reviews: 54, description: "Durable little court shoes built to keep up with playtime." },
  { id: "sv-cub-casual", name: "Marg Cub Casual", category: "kids", sub: "Casual", price: 3799, colors: C.pinkBlush, sizes: kidsSizes, rating: 4.5, reviews: 39, description: "Soft, supportive, and unstoppable — everyday kids' classic." },
  { id: "sv-spark-k", name: "Marg Spark K", category: "kids", sub: "Lifestyle", price: 3499, colors: C.blackOrange, sizes: kidsSizes, rating: 4.4, reviews: 31, description: "Light-up sole and grippy outsole for daily adventures." },

  { id: "sv-phantom-elite", name: "Marg Phantom Elite", category: "men", sub: "Running", price: 15999, colors: C.blackOrange, sizes: mensSizes, isNew: true, releaseDate: "2026-06-25", rating: 5.0, reviews: 12, description: "Flagship race-day shoe. Full-length carbon plate, ultra-light superfoam." },
  { id: "sv-aria-pro", name: "Marg Aria Pro", category: "women", sub: "Running", price: 14499, colors: C.pinkBlush, sizes: womensSizes, isNew: true, releaseDate: "2026-06-28", rating: 4.9, reviews: 9, description: "Race-tuned women's flagship. Built for podiums." },
  { id: "sv-nova-low", name: "Marg Nova Low", category: "men", sub: "Lifestyle", price: 8299, colors: C.blueWhite, sizes: mensSizes, rating: 4.5, reviews: 76, description: "Heritage runner-inspired silhouette, modernized." },
  { id: "sv-halo-w", name: "Marg Halo W", category: "women", sub: "Lifestyle", price: 7999, colors: C.pinkBlush, sizes: womensSizes, rating: 4.6, reviews: 84, description: "Sculpted everyday silhouette with cloud-like cushioning." },
  { id: "sv-bolt-kids", name: "Marg Bolt Kids", category: "kids", sub: "Sports", price: 4599, colors: C.blackOrange, sizes: kidsSizes, isNew: true, releaseDate: "2026-06-30", rating: 4.7, reviews: 18, description: "Built for the playground champions of tomorrow." },
  { id: "sv-drift-trainer", name: "Marg Drift Trainer", category: "men", sub: "Training", price: 10999, colors: C.blueWhite, sizes: mensSizes, rating: 4.6, reviews: 62, description: "Gym-to-street trainer with stable wide base." },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
