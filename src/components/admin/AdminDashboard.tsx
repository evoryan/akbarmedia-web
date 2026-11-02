import React, { useState } from 'react';
import {
  SiteConfig,
  PromotionBanner,
  SubscriptionPackage,
  InstallationService,
  Testimonial,
  CoverageArea,
  CustomerLead,
} from '../../types';
import { PromoManager } from './PromoManager';
import { PackagesManager } from './PackagesManager';
import { ServicesManager } from './ServicesManager';
import { CustomerLeadsManager } from './CustomerLeadsManager';
import { TestimonialsManager } from './TestimonialsManager';
import { CoverageManager } from './CoverageManager';
import { SiteConfigManager } from './SiteConfigManager';
import { DeployGuideModal } from './DeployGuideModal';
import {
  exportAllDataAsJSON,
  importAllDataFromJSON,
  resetAllDataToDefault,
} from '../../utils/storage';
import {
  LayoutDashboard,
  Tag,
  Wifi,
  Wrench,
  Users,
  Star,
  MapPin,
  Settings,
  UploadCloud,
  Download,
  RotateCcw,
  LogOut,
  ExternalLink,
  ShieldCheck,
  FileJson,
} from 'lucide-react';

interface AdminDashboardProps {
  siteConfig: SiteConfig;
  promotions: PromotionBanner[];
  packages: SubscriptionPackage[];
  services: InstallationService[];
  testimonials: Testimonial[];
  coverageAreas: CoverageArea[];
  leads: CustomerLead[];
  onUpdateSiteConfig: (config: SiteConfig) => void;
  onUpdatePromotions: (promos: PromotionBanner[]) => void;
  onUpdatePackages: (pkgs: SubscriptionPackage[]) => void;
  onUpdateServices: (services: InstallationService[]) => void;
  onUpdateTestimonials: (testimonials: Testimonial[]) => void;
  onUpdateCoverage: (areas: CoverageArea[]) => void;
  onUpdateLeads: (leads: CustomerLead[]) => void;
  onRefreshAllData: () => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  siteConfig,
  promotions,
  packages,
  services,
  testimonials,
  coverageAreas,
  leads,
  onUpdateSiteConfig,
  onUpdatePromotions,
  onUpdatePackages,
  onUpdateServices,
  onUpdateTestimonials,
  onUpdateCoverage,
  onUpdateLeads,
  onRefreshAllData,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<
    'leads' | 'promos' | 'packages' | 'services' | 'testimonials' | 'coverage' | 'settings'
  >('leads');

  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importAllDataFromJSON(content);
        if (ok) {
          alert('Berhasil mengimpor data backup JSON!');
          onRefreshAllData();
        } else {
          alert('Gagal mengimpor file backup. Format file JSON tidak valid.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (
      confirm(
        'PERHATIAN: Tindakan ini akan mengembalikan seluruh data promosi, paket, testimoni, dan leads ke pengaturan awal default. Lanjutkan?'
      )
    ) {
      resetAllDataToDefault();
      onRefreshAllData();
      alert('Data telah direset ke pengaturan awal default.');
    }
  };

  const newLeadsCount = leads.filter((l) => l.status === 'Baru').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] pb-20">
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-white">
                    {siteConfig.companyName}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-slate-950">
                    CMS ADMIN
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Panel Pengelolaan Konten Promosi & Data Pelanggan
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDeployGuideOpen(true)}
                className="px-3.5 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-red-500/30 flex items-center gap-1.5"
              >
                <UploadCloud className="w-4 h-4" />
                <span className="hidden sm:inline">Panduan Deploy Hosting</span>
              </button>

              <button
                onClick={exportAllDataAsJSON}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                title="Unduh Backup Data JSON"
              >
                <Download className="w-4 h-4" />
              </button>

              <label
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                title="Import Backup Data JSON"
              >
                <FileJson className="w-4 h-4 text-emerald-400" />
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleResetData}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 border border-slate-700"
                title="Reset Data ke Default"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={onExitAdmin}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4 text-amber-400" />
                <span>Ke Website</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Lead Pendaftaran Baru
              </span>
              <div className="text-2xl font-black text-white mt-1">
                {newLeadsCount} <span className="text-xs text-slate-400 font-normal">/ {leads.length} Total</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-red-600/10 text-red-500 border border-red-500/20">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Promo Aktif
              </span>
              <div className="text-2xl font-black text-white mt-1">
                {promotions.filter((p) => p.isActive).length} <span className="text-xs text-slate-400 font-normal">Banner</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <Tag className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Paket Langganan
              </span>
              <div className="text-2xl font-black text-white mt-1">
                {packages.length} <span className="text-xs text-slate-400 font-normal">Paket</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20">
              <Wifi className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Testimoni
              </span>
              <div className="text-2xl font-black text-white mt-1">
                {testimonials.filter((t) => t.isApproved).length} <span className="text-xs text-slate-400 font-normal">Disetujui</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-amber-600/10 text-amber-400 border border-amber-500/20">
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Data Pelanggan ({leads.length})</span>
            {newLeadsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('promos')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'promos'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Konten Promosi ({promotions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'packages'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>Paket Langganan ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Layanan Instalasi ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'testimonials'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Testimoni ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coverage')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'coverage'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Area Jangkauan ({coverageAreas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan & PIN</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl">
          {activeTab === 'leads' && (
            <CustomerLeadsManager
              leads={leads}
              onSaveLeads={onUpdateLeads}
              whatsappNumber={siteConfig.whatsappNumber}
            />
          )}

          {activeTab === 'promos' && (
            <PromoManager
              promotions={promotions}
              onSavePromotions={onUpdatePromotions}
            />
          )}

          {activeTab === 'packages' && (
            <PackagesManager
              packages={packages}
              onSavePackages={onUpdatePackages}
            />
          )}

          {activeTab === 'services' && (
            <ServicesManager
              services={services}
              onSaveServices={onUpdateServices}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsManager
              testimonials={testimonials}
              onSaveTestimonials={onUpdateTestimonials}
            />
          )}

          {activeTab === 'coverage' && (
            <CoverageManager
              coverageAreas={coverageAreas}
              onSaveCoverage={onUpdateCoverage}
            />
          )}

          {activeTab === 'settings' && (
            <SiteConfigManager
              siteConfig={siteConfig}
              onSaveSiteConfig={onUpdateSiteConfig}
            />
          )}
        </div>
      </main>

      {/* Deploy Guide Modal */}
      <DeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
        onExportBackup={exportAllDataAsJSON}
      />
    </div>
  );
};
