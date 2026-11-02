/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  SiteConfig,
  PromotionBanner,
  SubscriptionPackage,
  InstallationService,
  Testimonial,
  CoverageArea,
  CustomerLead,
} from './types';
import {
  getSiteConfig,
  saveSiteConfig,
  getPromotions,
  savePromotions,
  getPackages,
  savePackages,
  getInstallationServices,
  saveInstallationServices,
  getTestimonials,
  saveTestimonials,
  getCoverageAreas,
  saveCoverageAreas,
  getCustomerLeads,
  saveCustomerLeads,
  fetchServerData,
} from './utils/storage';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PricingSection } from './components/PricingSection';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveTools } from './components/InteractiveTools';
import { CoverageSection } from './components/CoverageSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { OrderModal } from './components/OrderModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getSiteConfig);
  const [promotions, setPromotions] = useState<PromotionBanner[]>(getPromotions);
  const [packages, setPackages] = useState<SubscriptionPackage[]>(getPackages);
  const [services, setServices] = useState<InstallationService[]>(getInstallationServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials);
  const [coverageAreas, setCoverageAreas] = useState<CoverageArea[]>(getCoverageAreas);
  const [leads, setLeads] = useState<CustomerLead[]>(getCustomerLeads);

  const [activeSection, setActiveSection] = useState('beranda');
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<
    SubscriptionPackage | { title: string; priceText: string } | null
  >(null);

  // Sync state helper function
  const reloadAllData = useCallback(() => {
    setSiteConfig(getSiteConfig());
    setPromotions(getPromotions());
    setPackages(getPackages());
    setServices(getInstallationServices());
    setTestimonials(getTestimonials());
    setCoverageAreas(getCoverageAreas());
    setLeads(getCustomerLeads());
  }, []);

  // Fetch initial data from VPS Express Backend and poll every 5 seconds for cross-browser sync
  useEffect(() => {
    fetchServerData();
    const interval = setInterval(() => {
      fetchServerData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Listen to custom storage updates and browser window storage events
  useEffect(() => {
    const handleStorageEvent = () => {
      reloadAllData();
    };

    window.addEventListener('amg_storage_update', handleStorageEvent);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('amg_storage_update', handleStorageEvent);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [reloadAllData]);

  // Check URL hash (#admin) or query parameter (?admin=true) on load
  useEffect(() => {
    const checkSecretRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);

      if (
        hash === '#admin' ||
        hash === '#cms' ||
        searchParams.get('admin') === 'true' ||
        searchParams.get('cms') === '1'
      ) {
        setIsAdminLoginModalOpen(true);
      }
    };

    checkSecretRoute();
    window.addEventListener('hashchange', checkSecretRoute);
    return () => window.removeEventListener('hashchange', checkSecretRoute);
  }, []);

  // Keyboard shortcut listener: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleOpenAdminTrigger();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const handleOpenAdminTrigger = () => {
    if (isAdminLoggedIn) {
      setViewMode('admin');
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleSuccessfulAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setViewMode('admin');
  };

  // State update handlers
  const handleUpdateSiteConfig = (updated: SiteConfig) => {
    saveSiteConfig(updated);
    setSiteConfig(updated);
  };

  const handleUpdatePromotions = (updated: PromotionBanner[]) => {
    savePromotions(updated);
    setPromotions(updated);
  };

  const handleUpdatePackages = (updated: SubscriptionPackage[]) => {
    savePackages(updated);
    setPackages(updated);
  };

  const handleUpdateServices = (updated: InstallationService[]) => {
    saveInstallationServices(updated);
    setServices(updated);
  };

  const handleUpdateTestimonials = (updated: Testimonial[]) => {
    saveTestimonials(updated);
    setTestimonials(updated);
  };

  const handleUpdateCoverage = (updated: CoverageArea[]) => {
    saveCoverageAreas(updated);
    setCoverageAreas(updated);
  };

  const handleUpdateLeads = (updated: CustomerLead[]) => {
    saveCustomerLeads(updated);
    setLeads(updated);
  };

  // If in Admin Mode, render full screen Admin Dashboard
  if (viewMode === 'admin' && isAdminLoggedIn) {
    return (
      <AdminDashboard
        siteConfig={siteConfig}
        promotions={promotions}
        packages={packages}
        services={services}
        testimonials={testimonials}
        coverageAreas={coverageAreas}
        leads={leads}
        onUpdateSiteConfig={handleUpdateSiteConfig}
        onUpdatePromotions={handleUpdatePromotions}
        onUpdatePackages={handleUpdatePackages}
        onUpdateServices={handleUpdateServices}
        onUpdateTestimonials={handleUpdateTestimonials}
        onUpdateCoverage={handleUpdateCoverage}
        onUpdateLeads={handleUpdateLeads}
        onRefreshAllData={reloadAllData}
        onExitAdmin={() => setViewMode('public')}
      />
    );
  }

  // Public Main Website
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-red-600 selection:text-white">
      {/* Header Bar */}
      <Header
        siteConfig={siteConfig}
        onOpenAdmin={handleOpenAdminTrigger}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Banner with CMS promos */}
        <Hero
          siteConfig={siteConfig}
          promotions={promotions}
          onSelectPlan={(title) =>
            setSelectedOrder({ title, priceText: 'Mulai Rp 150.000' })
          }
          onOpenCoverage={() => {
            const elem = document.getElementById('jangkauan');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Subscription Packages */}
        <PricingSection
          packages={packages}
          siteConfig={siteConfig}
          onSelectPackage={(pkg) => setSelectedOrder(pkg)}
        />

        {/* Installation & Network Services */}
        <ServicesSection
          services={services}
          siteConfig={siteConfig}
          onRequestQuote={(title) =>
            setSelectedOrder({ title, priceText: 'Sesuai Survey Lokasi' })
          }
        />

        {/* Interactive CCTV Calculator & Bandwidth Estimator */}
        <InteractiveTools siteConfig={siteConfig} />

        {/* Coverage Area Search */}
        <CoverageSection coverageAreas={coverageAreas} siteConfig={siteConfig} />

        {/* Customer Testimonials */}
        <TestimonialsSection
          testimonials={testimonials}
          siteConfig={siteConfig}
          onRefreshData={reloadAllData}
        />

        {/* Photo Gallery of Completed Work */}
        <GallerySection />

        {/* FAQ Accordion */}
        <FAQSection siteConfig={siteConfig} />

        {/* Contact & Request Lead Form */}
        <ContactSection
          siteConfig={siteConfig}
          onRefreshLeads={reloadAllData}
        />
      </main>

      {/* Footer */}
      <Footer
        siteConfig={siteConfig}
        onOpenAdmin={handleOpenAdminTrigger}
      />

      {/* WhatsApp Floating Action Button */}
      <WhatsAppFloatingButton siteConfig={siteConfig} />

      {/* Order Modal */}
      {selectedOrder && (
        <OrderModal
          packageOrService={selectedOrder}
          siteConfig={siteConfig}
          onClose={() => setSelectedOrder(null)}
          onRefreshLeads={reloadAllData}
        />
      )}

      {/* Admin Passcode Modal */}
      <AdminLoginModal
        siteConfig={siteConfig}
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccessLogin={handleSuccessfulAdminLogin}
      />
    </div>
  );
}
