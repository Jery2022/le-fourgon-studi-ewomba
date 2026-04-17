// ══════════════════════════════════════════════
//  Types métier — Le Fourgon
//  Modèles partagés entre frontend et backend
// ══════════════════════════════════════════════

// ── Strapi generics ──
export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

// ── Produit & Catalogue ──
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  depositAmount: number; // montant consigne
  volume: string; // ex: "75cl", "33cl"
  unit: "bouteille" | "pack" | "caisse";
  packSize?: number;
  category: ProductCategory;
  images: StrapiMedia[];
  isAvailable: boolean;
  isNew: boolean;
  isBio: boolean;
  allergens?: string;
  origin?: string;
  producer?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: StrapiMedia;
  order: number;
}

// ── Panier & Commande ──
export interface CartItem {
  product: Product;
  quantity: number;
  depositTotal: number; // quantity * depositAmount
  subtotal: number; // quantity * price
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  totalDeposit: number;
  deliveryFee: number;
  promoDiscount: number;
  total: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  totalDeposit: number;
  deliveryFee: number;
  promoDiscount: number;
  total: number;
  deliveryAddress: Address;
  deliverySlot: DeliverySlot;
  collectionPoint?: CollectionPoint;
  paymentIntentId: string;
  customer: CustomerProfile;
  promoCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  depositAmount: number;
  subtotal: number;
}

// ── Livraison ──
export interface DeliveryZone {
  id: number;
  name: string;
  postalCodes: string[];
  deliveryFee: number;
  minOrderAmount: number;
  isActive: boolean;
}

export interface DeliverySlot {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  maxOrders: number;
  currentOrders: number;
  isAvailable: boolean;
  zone: DeliveryZone;
}

export interface CollectionPoint {
  id: number;
  name: string;
  address: Address;
  latitude: number;
  longitude: number;
  openingHours: string;
  isActive: boolean;
}

// ── Utilisateur & Client ──
export interface CustomerProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  defaultAddressId?: number;
  subscription?: Subscription;
  referralCode: string;
  referralCount: number;
  loyaltyPoints: number;
  createdAt: string;
}

export interface Address {
  id: number;
  label: string; // "Maison", "Bureau"
  street: string;
  complement?: string;
  postalCode: string;
  city: string;
  isDefault: boolean;
}

export interface Subscription {
  id: number;
  status: "active" | "paused" | "cancelled";
  frequency: "weekly" | "biweekly" | "monthly";
  nextDeliveryDate: string;
  items: CartItem[];
  stripeSubscriptionId: string;
}

// ── Consigne ──
export type DepositStatus = "out" | "returned" | "credited";

export interface DepositRecord {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
  amount: number;
  status: DepositStatus;
  returnedAt?: string;
  creditedAt?: string;
}

// ── Blog ──
export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Rich text
  coverImage: StrapiMedia;
  category: ArticleCategory;
  tags: ArticleTag[];
  author: Author;
  readingTime: number;
  seo: SEOData;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface ArticleTag {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  avatar?: StrapiMedia;
}

// ── Vitrine ──
export interface Page {
  id: number;
  title: string;
  slug: string;
  sections: PageSection[];
  seo: SEOData;
}

export interface PageSection {
  id: number;
  type: "hero" | "features" | "testimonials" | "cta" | "faq" | "partners" | "stats" | "content";
  title?: string;
  subtitle?: string;
  content?: string;
  media?: StrapiMedia[];
  order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  avatar?: StrapiMedia;
  isBtoB: boolean;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: "general" | "livraison" | "consigne" | "paiement" | "btob";
  order: number;
}

export interface Partner {
  id: number;
  name: string;
  logo: StrapiMedia;
  url?: string;
  type: "fournisseur" | "partenaire" | "client_btob";
}

// ── SEO ──
export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogImage?: StrapiMedia;
  canonicalUrl?: string;
  noIndex?: boolean;
}

// ── Promo ──
export interface PromoCode {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount?: number;
  maxUses?: number;
  currentUses: number;
  expiresAt?: string;
  isActive: boolean;
}

// ── Notification ──
export type NotificationType =
  | "order_confirmed"
  | "order_shipped"
  | "order_delivered"
  | "deposit_credited"
  | "subscription_reminder"
  | "referral_reward"
  | "promo";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}
