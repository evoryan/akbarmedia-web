import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, PhoneCall, Camera, Wifi, Wrench } from 'lucide-react';
import { SiteConfig } from '../types';
import { generateWhatsAppLink } from '../utils/storage';

interface WhatsAppFloatingButtonProps {
  siteConfig: SiteConfig;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  siteConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      label: 'Tanya Pasang Wifi Rumahan / Fiber',
      text: 'Halo Akbar Media Group, saya berminat pasang Internet Fiber Rumahan. Mohon info paket dan area jangkauan.',
      icon: <Wifi className="w-4 h-4 text-red-400" />,
    },
    {
      label: 'Konsultasi Paket Pasang CCTV HD',
      text: 'Halo Akbar Media Group, saya mau tanya paket pasang CCTV lengkap untuk rumah/toko saya.',
      icon: <Camera className="w-4 h-4 text-blue-400" />,
    },
    {
      label: 'Setting Mikrotik & Network LAN',
      text: 'Halo Akbar Media Group, saya butuh jasa setting Mikrotik / instalasi jaringan LAN kantor/cafe.',
      icon: <Wrench className="w-4 h-4 text-purple-400" />,
    },
    {
      label: 'Laporan Gangguan / Support Teknisi',
      text: 'Halo Helpdesk Akbar Media Group, saya mau melaporkan kendala teknis jaringan internet/CCTV saya.',
      icon: <PhoneCall className="w-4 h-4 text-emerald-400" />,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Menu Overlay */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl animate-in zoom-in-95 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-extrabold text-white">Akbar Media Group WA</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-300">
            Pilih topik di bawah ini untuk terhubung langsung ke WhatsApp Customer Service:
          </p>

          <div className="space-y-1.5">
            {options.map((opt, idx) => (
              <a
                key={idx}
                href={generateWhatsAppLink(siteConfig.whatsappNumber, opt.text)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white border border-slate-800/80 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  {opt.icon}
                  <span className="text-[11px]">{opt.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-extrabold text-xs shadow-2xl shadow-emerald-950/60 hover:shadow-emerald-500/40 transition-all transform hover:scale-105"
        title="Chat WhatsApp Akbar Media Group"
      >
        <MessageCircle className="w-5 h-5 fill-emerald-600 stroke-white stroke-[2.5]" />
        <span className="hidden sm:inline">WhatsApp Direct</span>
      </button>
    </div>
  );
};
