import React, { useState } from 'react';
import {
  Wifi,
  Check,
  Zap,
  Building,
  Camera,
  MessageCircle,
  Sparkles,
  Shield,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { SubscriptionPackage, SiteConfig } from '../types';
import { generateWhatsAppLink } from '../utils/storage';

interface PricingSectionProps {
  packages: SubscriptionPackage[];
  siteConfig: SiteConfig;
  onSelectPackage: (pkg: SubscriptionPackage) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  packages,
  siteConfig,
  onSelectPackage,
}) => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'internet_rumah' | 'internet_bisnis' | 'cctv_paket'
  >('all');

  const filteredPackages = packages.filter((pkg) => {
    if (!pkg.isActive) return false;
    if (activeTab === 'all') return true;
    return pkg.category === activeTab;
  });

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section id="paket" className="py-20 bg-slate-900/50 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Pilihan Paket Terjangkau & Tanpa Batas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Paket Langganan Internet & CCTV
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Pilih paket yang paling sesuai dengan kebutuhan rumah, bisnis, atau sistem keamanan lokasi Anda. Semua paket internet <strong className="text-white">100% Unlimited</strong> tanpa FUP!
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Semua Paket</span>
          </button>

          <button
            onClick={() => setActiveTab('internet_rumah')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'internet_rumah'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Internet Rumahan</span>
          </button>

          <button
            onClick={() => setActiveTab('internet_bisnis')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'internet_bisnis'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Internet Bisnis / Cafe</span>
          </button>

          <button
            onClick={() => setActiveTab('cctv_paket')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'cctv_paket'
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Paket Pasang CCTV</span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const isPopular = pkg.popular;
            const waPlanUrl = generateWhatsAppLink(
              siteConfig.whatsappNumber,
              `Halo Akbar Media Group, saya mau pasang paket "${pkg.title}" (${pkg.speed}) dengan harga ${formatIDR(pkg.price)}/${pkg.period}. Mohon info pendaftarannya.`
            );

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl bg-slate-900/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isPopular
                    ? 'border-red-500 shadow-2xl shadow-red-950/40 ring-2 ring-red-500/20 transform hover:-translate-y-1'
                    : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {/* Popular / Badge Top Ribbon */}
                {pkg.badge && (
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isPopular
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  {/* Category icon */}
                  <div className="mb-4 inline-flex p-3 rounded-2xl bg-slate-950 border border-slate-800 text-red-500">
                    {pkg.category === 'cctv_paket' ? (
                      <Camera className="w-6 h-6" />
                    ) : pkg.category === 'internet_bisnis' ? (
                      <Building className="w-6 h-6" />
                    ) : (
                      <Wifi className="w-6 h-6" />
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-white">{pkg.title}</h3>

                  <div className="mt-2 text-2xl font-black text-red-500">
                    {pkg.speed}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 min-h-[36px] line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-6 pt-6 border-t border-slate-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {formatIDR(pkg.price)}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        / {pkg.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Fasilitas Termasuk:
                    </div>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 bg-slate-900/90 space-y-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md ${
                      isPopular
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/50'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>Daftar / Pesan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={waPlanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 text-slate-400 hover:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Tanya via WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Survey Guarantee Box */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Bingung Memilih Paket Yang Tepat?
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Tim teknisi Akbar Media Group bersedia melakukan survey lokasi secara gratis & memberikan rekomendasi sesuai anggaran Anda.
              </p>
            </div>
          </div>
          <a
            href={generateWhatsAppLink(
              siteConfig.whatsappNumber,
              'Halo Akbar Media Group, saya mau minta survey lokasi untuk pemasangan internet/CCTV gratis.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all text-center shrink-0 shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-white" />
            <span>Minta Survey Gratis WA</span>
          </a>
        </div>
      </div>
    </section>
  );
};
