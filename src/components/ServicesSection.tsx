import React from 'react';
import {
  Zap,
  Camera,
  Server,
  Network,
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { InstallationService, SiteConfig } from '../types';
import { generateWhatsAppLink } from '../utils/storage';

interface ServicesSectionProps {
  services: InstallationService[];
  siteConfig: SiteConfig;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  siteConfig,
  onRequestQuote,
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-red-500" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-blue-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-emerald-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-purple-400" />;
      default:
        return <Wrench className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="layanan" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold mb-3">
            <Wrench className="w-3.5 h-3.5 text-red-500" />
            <span>Layanan Teknisi Spesialis Terpercaya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Layanan Instalasi & Jaringan Profesional
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Didukung oleh tim teknisi berpengalaman dan peralatan standar industri (Splicer Fujikura, OTDR, Cable Tester Pro) untuk hasil pengerjaan terbaik dan bergaransi.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services
            .filter((s) => s.isActive)
            .map((service) => {
              const waServiceUrl = generateWhatsAppLink(
                siteConfig.whatsappNumber,
                `Halo Akbar Media Group, saya butuh layanan "${service.title}". Mohon estimasi biaya dan jadwal teknisi.`
              );

              return (
                <div
                  key={service.id}
                  className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300">
                        <Clock className="w-3 h-3 text-red-500" />
                        <span>{service.turnaroundTime}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-white group-hover:text-red-500 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-800/80">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Biaya Estimasi:
                      </div>
                      <div className="text-base font-extrabold text-red-400">
                        {service.estimatePrice}
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="mt-5 space-y-2">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-slate-800 space-y-2">
                    <button
                      onClick={() => onRequestQuote(service.title)}
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-red-950/40"
                    >
                      <span>Minta Penawaran / Survey</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={waServiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 text-slate-400 hover:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Tanya Spesifikasi via WA</span>
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
