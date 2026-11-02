export interface SubscriptionPackage {
  id: string;
  title: string;
  speed: string; // e.g., "20 Mbps" or "4 Camera HD"
  price: number; // e.g., 185000
  period: string; // e.g., "bulan"
  category: 'internet_rumah' | 'internet_bisnis' | 'cctv_paket';
  description: string;
  features: string[];
  badge?: string; // e.g., "Terpopuler", "Hemat", "Rekomendasi"
  popular?: boolean;
  isActive: boolean;
  discountPercentage?: number;
}

export interface InstallationService {
  id: string;
  title: string;
  category: 'internet' | 'network' | 'cctv' | 'maintenance';
  estimatePrice: string; // e.g., "Mulai Rp 150.000"
  turnaroundTime: string; // e.g., "1-2 Jam Selesai"
  description: string;
  features: string[];
  iconName: string;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  customerName: string;
  roleLocation: string; // e.g., "Pemilik Toko, Demak"
  rating: number; // 1 to 5
  comment: string;
  serviceType: string; // e.g., "Paket Internet 50 Mbps" or "CCTV 8 Kamera"
  avatarUrl?: string;
  date: string;
  verified: boolean;
  isApproved: boolean;
}

export interface PromotionBanner {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  discountCode?: string;
  validUntil: string;
  isActive: boolean;
  bgTheme: 'red' | 'blue' | 'emerald' | 'amber';
  ctaText: string;
  ctaLink?: string;
}

export interface CustomerLead {
  id: string;
  name: string;
  phone: string;
  address: string;
  areaDistrict: string;
  serviceInterest: string; // e.g., "Pasang Wifi Rumahan"
  selectedPlanOrService?: string;
  status: 'Baru' | 'Survey' | 'Diproses' | 'Terpasang' | 'Batal';
  notes?: string;
  createdAt: string;
}

export interface CoverageArea {
  id: string;
  district: string;
  city: string;
  status: 'Tersedia FO 100%' | 'Sinyal Jaringan Stabil' | 'Area Expansion (Perlu Survey)';
  coveragePercentage: number;
  availablePorts: number;
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  whatsappNumber: string; // 081329599584
  formattedWhatsapp: string; // +62 813-2959-9584
  email: string;
  address: string;
  operatingHours: string;
  adminPin: string; // Default: 123456
  logoPath: string;
}
