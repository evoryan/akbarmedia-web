import React from 'react';
import { MessageCircle, Mail, ShieldCheck, Lock } from 'lucide-react';
import { SiteConfig } from '../types';
import { generateWhatsAppLink } from '../utils/storage';

interface FooterProps {
  siteConfig: SiteConfig;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ siteConfig, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={siteConfig.logoPath}
                alt={siteConfig.companyName}
                className="h-10 w-auto object-contain bg-slate-900 p-1.5 rounded-xl border border-slate-800"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-base font-black text-white">AKBAR</span>
                  <span className="text-base font-bold text-red-500">MEDIA</span>
                </div>
                <span className="text-[9px] font-medium tracking-widest text-slate-400 uppercase">
                  GROUP
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Penyedia layanan Internet Broadband Fiber Optic, Instalasi Jaringan Mikrotik/LAN, dan Paket Pasang CCTV HD Bergaransi Resmi.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>Respon Teknisi 24 Jam Nonstop</span>
            </div>
          </div>

          {/* Col 2: Layanan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Layanan Utama
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#paket" className="hover:text-white transition-colors">
                  Internet Rumahan Unlimited
                </a>
              </li>
              <li>
                <a href="#paket" className="hover:text-white transition-colors">
                  Internet Bisnis & Cafe Dedicated
                </a>
              </li>
              <li>
                <a href="#paket" className="hover:text-white transition-colors">
                  Paket Pasang CCTV HD ColorVu
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">
                  Setting Router & Mikrotik Hotspot
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">
                  Splicing & Sambung Fiber Optic
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Area Jangkauan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Area Layanan Utama
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kabupaten Demak (Kota, Sayung, Mranggen, Karangtengah), Kota Semarang, Kabupaten Kudus, Jepara, Grobogan & Sekitarnya.
            </p>
            <div className="pt-1">
              <a
                href="#jangkauan"
                className="text-red-400 hover:text-red-300 font-bold transition-colors inline-block"
              >
                Cek ODP & Jangkauan Area →
              </a>
            </div>
          </div>

          {/* Col 4: Kontak */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Kontak Langsung
            </h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={generateWhatsAppLink(
                    siteConfig.whatsappNumber,
                    'Halo Akbar Media Group.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-bold text-white"
                >
                  {siteConfig.formattedWhatsapp}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{siteConfig.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright with subtle secret admin lock trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p className="flex items-center gap-1">
            © {currentYear} {siteConfig.companyName}. Hak Cipta Dilindungi.
            {/* Secret tiny lock icon */}
            <button
              onClick={onOpenAdmin}
              className="p-1 text-slate-800 hover:text-slate-600 transition-colors ml-1"
              title="·"
            >
              <Lock className="w-2.5 h-2.5" />
            </button>
          </p>
          <p>Desain Cepat, Ringan & Siap Deploy Hosting cPanel / Hostinger.</p>
        </div>
      </div>
    </footer>
  );
};
