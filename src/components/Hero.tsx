import React, { useState, useEffect } from 'react';
import {
  Wifi,
  ShieldCheck,
  Zap,
  PhoneCall,
  ChevronRight,
  Award,
  Users,
  CheckCircle2,
  Sparkles,
  Search,
  Camera,
  Server,
  Tag,
} from 'lucide-react';
import { SiteConfig, PromotionBanner } from '../types';
import { generateWhatsAppLink } from '../utils/storage';

interface HeroProps {
  siteConfig: SiteConfig;
  promotions: PromotionBanner[];
  onSelectPlan: (planTitle: string) => void;
  onOpenCoverage: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  siteConfig,
  promotions,
  onSelectPlan,
  onOpenCoverage,
}) => {
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  // Auto cycle active promotions if multiple
  useEffect(() => {
    const activePromos = promotions.filter((p) => p.isActive);
    if (activePromos.length <= 1) return;

    const interval = setInterval(() => {
      setActivePromoIndex((prev) => (prev + 1) % activePromos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [promotions]);

  const activePromos = promotions.filter((p) => p.isActive);
  const currentPromo = activePromos[activePromoIndex] || activePromos[0];

  const waHeroUrl = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    'Halo Akbar Media Group, saya ingin tanya promo pasang Internet/CCTV hari ini.'
  );

  return (
    <section id="beranda" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Decorative Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dynamic Promo Banner from CMS */}
        {currentPromo && (
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 border border-red-500/30 p-4 sm:p-5 shadow-xl backdrop-blur-md relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-600/20 rounded-full blur-2xl group-hover:bg-red-600/30 transition-all"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 shrink-0 mt-0.5">
                  <Tag className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                      {currentPromo.badgeText}
                    </span>
                    {currentPromo.discountCode && (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-slate-700">
                        Kode: {currentPromo.discountCode}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {currentPromo.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {currentPromo.subtitle}
                  </p>
                </div>
              </div>

              <a
                href={generateWhatsAppLink(
                  siteConfig.whatsappNumber,
                  `Halo Akbar Media Group, saya mau klaim promo: "${currentPromo.title}"`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all text-center shrink-0 shadow-lg shadow-red-950/50 flex items-center justify-center gap-1.5"
              >
                <span>{currentPromo.ctaText || 'Klaim Sekarang'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Indicator dots if multiple promos */}
            {activePromos.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-slate-800/60">
                {activePromos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePromoIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activePromoIndex
                        ? 'w-6 bg-red-500'
                        : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hero Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Solusi Internet Broadband & Keamanan CCTV Terintegrasi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Internet <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">Ultra Fast</span>, Jaringan & Solusi CCTV Bergaransi
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              <strong className="text-white">{siteConfig.companyName}</strong> menyediakan koneksi internet 100% Fiber Optic tanpa batasan kuota (Unlimited), pemasangan CCTV HD malam tetap terang, dan instalasi jaringan LAN/Mikrotik profesional untuk Rumah, Toko, Cafe, Sekolah, & Perusahaan.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>100% Unlimited Fiber Optic</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>CCTV Bebas Pantau dari HP</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Garansi Resmi & Teknisi 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Tanpa Biaya Tersembunyi</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <a
                href="#paket"
                className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl font-bold text-sm text-center shadow-xl shadow-red-950/60 hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Lihat Paket Langganan</span>
              </a>

              <a
                href={waHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 rounded-xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Konsultasi Gratis WA (081329599584)</span>
              </a>
            </div>

            {/* Quick Area Coverage Lookup input */}
            <div className="pt-2">
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3 shadow-lg">
                <div className="flex items-center gap-2 text-slate-400 px-2 w-full sm:w-auto">
                  <Search className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-xs font-semibold whitespace-nowrap text-slate-300">
                    Cek Jangkauan:
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex-1">
                  Melayani area Demak, Semarang, Kudus, Jepara, Grobogan, & Sekitarnya.
                </p>
                <button
                  onClick={onOpenCoverage}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-colors whitespace-nowrap"
                >
                  Cek Lokasi Saya
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-rose-500 rounded-3xl blur-2xl opacity-20 transform scale-95"></div>

              {/* Main Card */}
              <div className="relative bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                {/* Header Logo Badge */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={siteConfig.logoPath}
                      alt="Logo Akbar Media"
                      className="h-10 w-auto object-contain bg-slate-950 p-1.5 rounded-xl border border-slate-800"
                    />
                    <div>
                      <h4 className="font-extrabold text-white text-base leading-tight">
                        AKBAR MEDIA GROUP
                      </h4>
                      <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Jaringan Fiber Online Active
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
                    ISP & CCTV
                  </span>
                </div>

                {/* Service Cards Stack */}
                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-red-500/40 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20">
                        <Wifi className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">Internet Rumahan Fiber</h5>
                        <p className="text-[11px] text-slate-400">Unlimited mulai Rp 150rb/bln</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-red-400">100% Unlimited</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-blue-500/40 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">Paket Pasang CCTV HD</h5>
                        <p className="text-[11px] text-slate-400">Night Color + Audio + Akses HP</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-400">Garansi 1 Thn</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20">
                        <Server className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">Mikrotik & Network LAN</h5>
                        <p className="text-[11px] text-slate-400">Setting Bandwidth & Hotspot Cafe</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">Pro Grade</span>
                  </div>
                </div>

                {/* Floating Satisfaction Badge */}
                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-[10px] border-2 border-slate-900">
                        A
                      </div>
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-[10px] border-2 border-slate-900">
                        M
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-[10px] border-2 border-slate-900">
                        G
                      </div>
                    </div>
                    <span className="font-semibold text-white">1,500+ Pelanggan Setia</span>
                  </div>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    ★ 4.9 / 5.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Banner */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center hover:border-red-500/30 transition-all">
            <Users className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white">1,500+</div>
            <div className="text-xs text-slate-400 font-medium">Pelanggan Aktif</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center hover:border-red-500/30 transition-all">
            <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white">99.9%</div>
            <div className="text-xs text-slate-400 font-medium">Uptime Jaringan Fiber</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center hover:border-red-500/30 transition-all">
            <PhoneCall className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white">24/7</div>
            <div className="text-xs text-slate-400 font-medium">Dukungan Teknisi WA</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center hover:border-red-500/30 transition-all">
            <ShieldCheck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
            <div className="text-xs text-slate-400 font-medium">Garansi Pemasangan</div>
          </div>
        </div>
      </div>
    </section>
  );
};
