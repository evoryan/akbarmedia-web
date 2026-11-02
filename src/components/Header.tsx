import React, { useState } from 'react';
import {
  MessageCircle,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { SiteConfig } from '../types';
import { generateWhatsAppLink } from '../utils/storage';

interface HeaderProps {
  siteConfig: SiteConfig;
  onOpenAdmin: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  siteConfig,
  onOpenAdmin,
  activeSection,
  setActiveSection,
  isAdminLoggedIn,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'paket', label: 'Paket Langganan' },
    { id: 'layanan', label: 'Layanan Instalasi' },
    { id: 'kalkulator', label: 'Kalkulator CCTV' },
    { id: 'jangkauan', label: 'Cek Area' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);

    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Secret Logo Clicks (3 rapid clicks open admin modal)
  const handleLogoClick = () => {
    handleNavClick('beranda');
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount >= 3) {
      onOpenAdmin();
      setLogoClickCount(0);
    } else {
      setTimeout(() => setLogoClickCount(0), 1500);
    }
  };

  const directWaUrl = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    'Halo Akbar Media Group, saya ingin berkonsultasi mengenai layanan internet/CCTV.'
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      {/* Top bar announcement */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-sm">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span>Layanan Pemasangan Internet Fiber & CCTV Bergaransi Resmi – Respon Cepat 24 Jam!</span>
        <a
          href={directWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-100 hidden sm:inline ml-1 font-bold"
        >
          Hubungi WA: {siteConfig.formattedWhatsapp}
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name (Secret 3-click trigger) */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer group"
            title="Akbar Media Group"
          >
            <div className="relative p-1.5 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-red-500/50 transition-all duration-300 shadow-md overflow-hidden flex items-center justify-center">
              <img
                src={siteConfig.logoPath}
                alt={siteConfig.companyName}
                className="h-10 w-auto object-contain max-w-[120px]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors">
                  AKBAR
                </span>
                <span className="text-xl font-bold tracking-tight text-red-500">
                  MEDIA
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">
                GROUP • NET & CCTV
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp Direct CTA */}
            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-emerald-950/40 hover:shadow-emerald-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-white stroke-[2.5]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white w-full py-3 rounded-xl font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-white" />
              <span>Chat WhatsApp Direct (081329599584)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
