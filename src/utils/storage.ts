import {
  SiteConfig,
  PromotionBanner,
  SubscriptionPackage,
  InstallationService,
  Testimonial,
  CoverageArea,
  CustomerLead,
} from '../types';
import {
  initialSiteConfig,
  initialPromotions,
  initialPackages,
  initialInstallationServices,
  initialTestimonials,
  initialCoverageAreas,
  initialLeads,
} from '../data/defaultData';

const KEYS = {
  SITE_CONFIG: 'amg_site_config_v1',
  PROMOTIONS: 'amg_promotions_v1',
  PACKAGES: 'amg_packages_v1',
  SERVICES: 'amg_services_v1',
  TESTIMONIALS: 'amg_testimonials_v1',
  COVERAGE: 'amg_coverage_v1',
  LEADS: 'amg_leads_v1',
};

const notifyStorageUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('amg_storage_update'));
  }
};

// Site Config
export const getSiteConfig = (): SiteConfig => {
  try {
    const data = localStorage.getItem(KEYS.SITE_CONFIG);
    return data ? JSON.parse(data) : initialSiteConfig;
  } catch {
    return initialSiteConfig;
  }
};

export const saveSiteConfig = (config: SiteConfig) => {
  localStorage.setItem(KEYS.SITE_CONFIG, JSON.stringify(config));
  notifyStorageUpdate();

  // Sync to VPS backend
  fetch('/api/site-config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  }).catch((err) => console.warn('Backend sync warning:', err));
};

// Promotions
export const getPromotions = (): PromotionBanner[] => {
  try {
    const data = localStorage.getItem(KEYS.PROMOTIONS);
    return data ? JSON.parse(data) : initialPromotions;
  } catch {
    return initialPromotions;
  }
};

export const savePromotions = (promos: PromotionBanner[]) => {
  localStorage.setItem(KEYS.PROMOTIONS, JSON.stringify(promos));
  notifyStorageUpdate();

  // Sync to VPS backend
  fetch('/api/promotions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(promos),
  }).catch((err) => console.warn('Backend sync warning:', err));
};

// Packages
export const getPackages = (): SubscriptionPackage[] => {
  try {
    const data = localStorage.getItem(KEYS.PACKAGES);
    return data ? JSON.parse(data) : initialPackages;
  } catch {
    return initialPackages;
  }
};

export const savePackages = (pkgs: SubscriptionPackage[]) => {
  localStorage.setItem(KEYS.PACKAGES, JSON.stringify(pkgs));
  notifyStorageUpdate();

  // Sync to VPS backend
  fetch('/api/packages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pkgs),
  }).catch((err) => console.warn('Backend sync warning:', err));
};

// Installation Services
export const getInstallationServices = (): InstallationService[] => {
  try {
    const data = localStorage.getItem(KEYS.SERVICES);
    return data ? JSON.parse(data) : initialInstallationServices;
  } catch {
    return initialInstallationServices;
  }
};

export const saveInstallationServices = (services: InstallationService[]) => {
  localStorage.setItem(KEYS.SERVICES, JSON.stringify(services));
  notifyStorageUpdate();

  // Sync to VPS backend
  fetch('/api/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(services),
  }).catch((err) => console.warn('Backend sync warning:', err));
};

// Testimonials
export const getTestimonials = (): Testimonial[] => {
  try {
    const data = localStorage.getItem(KEYS.TESTIMONIALS);
    return data ? JSON.parse(data) : initialTestimonials;
  } catch {
    return initialTestimonials;
  }
};

export const saveTestimonials = (testimonials: Testimonial[]) => {
  localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  notifyStorageUpdate();

  // Sync to VPS backend
  fetch('/api/testimonials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testimonials),
  }).catch((err) => console.warn('Backend sync warning:', err));
};

// Coverage Areas
export const getCoverageAreas = (): CoverageArea[] => {
  try {
    const data = localStorage.getItem(KEYS.COVERAGE);
    return data ? JSON.parse(data) : initialCoverageAreas;
  } catch {
    return initialCoverageAreas;
  }
};

export const saveCoverageAreas = (areas: CoverageArea[]) => {
  localStorage.setItem(KEYS.COVERAGE, JSON.stringify(areas));
  notifyStorageUpdate();

  // Sync to VPS backend
  fetch('/api/coverage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(areas),
  }).catch((err) => console.warn('Backend sync warning:', err));
};

// Customer Leads
export const getCustomerLeads = (): CustomerLead[] => {
  try {
    const data = localStorage.getItem(KEYS.LEADS);
    return data ? JSON.parse(data) : initialLeads;
  } catch {
    return initialLeads;
  }
};

export const saveCustomerLeads = (leads: CustomerLead[]) => {
  localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  notifyStorageUpdate();

  // Sync to VPS backend
  fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leads),
  }).catch((err) => console.warn('Backend sync warning:', err));
};

export const addCustomerLead = (
  lead: Omit<CustomerLead, 'id' | 'createdAt' | 'status'>
): CustomerLead => {
  const leads = getCustomerLeads();
  const newLead: CustomerLead = {
    ...lead,
    id: 'lead-' + Date.now(),
    status: 'Baru',
    createdAt: new Date().toLocaleString('id-ID', {
      dateStyle: 'short',
      timeStyle: 'short',
    }),
  };
  const updated = [newLead, ...leads];
  saveCustomerLeads(updated);

  // Sync new lead to VPS backend
  fetch('/api/leads/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  }).catch((err) => console.warn('Backend sync warning:', err));

  return newLead;
};

// Fetch all data from VPS Express Backend and sync with localStorage
export const fetchServerData = async () => {
  try {
    const res = await fetch('/api/data');
    if (res.ok) {
      const data = await res.json();
      if (data.siteConfig) localStorage.setItem(KEYS.SITE_CONFIG, JSON.stringify(data.siteConfig));
      if (data.promotions) localStorage.setItem(KEYS.PROMOTIONS, JSON.stringify(data.promotions));
      if (data.packages) localStorage.setItem(KEYS.PACKAGES, JSON.stringify(data.packages));
      if (data.services) localStorage.setItem(KEYS.SERVICES, JSON.stringify(data.services));
      if (data.testimonials) localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(data.testimonials));
      if (data.coverageAreas) localStorage.setItem(KEYS.COVERAGE, JSON.stringify(data.coverageAreas));
      if (data.leads) localStorage.setItem(KEYS.LEADS, JSON.stringify(data.leads));
      notifyStorageUpdate();
    }
  } catch (err) {
    console.warn('Backend fetch warning (using local fallback):', err);
  }
};

// Export & Import Helpers
export const exportAllDataAsJSON = () => {
  const exportData = {
    siteConfig: getSiteConfig(),
    promotions: getPromotions(),
    packages: getPackages(),
    services: getInstallationServices(),
    testimonials: getTestimonials(),
    coverage: getCoverageAreas(),
    leads: getCustomerLeads(),
    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `akbar-media-group-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importAllDataFromJSON = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    if (data.siteConfig) saveSiteConfig(data.siteConfig);
    if (data.promotions) savePromotions(data.promotions);
    if (data.packages) savePackages(data.packages);
    if (data.services) saveInstallationServices(data.services);
    if (data.testimonials) saveTestimonials(data.testimonials);
    if (data.coverage) saveCoverageAreas(data.coverage);
    if (data.leads) saveCustomerLeads(data.leads);

    fetch('/api/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonString,
    }).catch((err) => console.warn('Backend sync warning:', err));

    notifyStorageUpdate();
    return true;
  } catch (err) {
    console.error('Import error:', err);
    return false;
  }
};

export const resetAllDataToDefault = () => {
  saveSiteConfig(initialSiteConfig);
  savePromotions(initialPromotions);
  savePackages(initialPackages);
  saveInstallationServices(initialInstallationServices);
  saveTestimonials(initialTestimonials);
  saveCoverageAreas(initialCoverageAreas);
  saveCustomerLeads(initialLeads);

  fetch('/api/reset', {
    method: 'POST',
  }).catch((err) => console.warn('Backend sync warning:', err));

  notifyStorageUpdate();
};

// WhatsApp Link Generator Utility
export const generateWhatsAppLink = (
  phone: string,
  message: string
): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('0')
    ? '62' + cleanPhone.slice(1)
    : cleanPhone;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};
