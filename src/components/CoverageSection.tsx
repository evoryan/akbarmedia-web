import React, { useState } from 'react';
import {
  MapPin,
  Search,
  CheckCircle2,
  Signal,
  AlertTriangle,
  MessageCircle,
  Building2,
} from 'lucide-react';
import { CoverageArea, SiteConfig } from '../types';
import { generateWhatsAppLink } from '../utils/storage';

interface CoverageSectionProps {
  coverageAreas: CoverageArea[];
  siteConfig: SiteConfig;
}

export const CoverageSection: React.FC<CoverageSectionProps> = ({
  coverageAreas,
  siteConfig,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = coverageAreas.filter((area) => {
    const q = searchTerm.toLowerCase();
    return (
      area.district.toLowerCase().includes(q) ||
      area.city.toLowerCase().includes(q) ||
      area.status.toLowerCase().includes(q)
    );
  });

  return (
    <section id="jangkauan" className="py-20 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Jaringan Fiber Luas & Terus Bertambah</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Cek Area Jangkauan Fiber Optic
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Cari kecamatan atau kota tempat tinggal Anda untuk mengetahui ketersediaan tiang ODP Fiber Optic Akbar Media Group.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama kecamatan / kota (cth: Demak, Sayung, Semarang, Kudus)..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Coverage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAreas.length > 0 ? (
            filteredAreas.map((area) => (
              <div
                key={area.id}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-white">
                        {area.district}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {area.city}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        area.status.includes('100%')
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {area.status}
                    </span>
                  </div>

                  {/* Coverage Progress Bar */}
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Jangkauan Fiber:</span>
                      <span className="font-bold text-white">{area.coveragePercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full"
                        style={{ width: `${area.coveragePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Signal className="w-3.5 h-3.5 text-emerald-400" />
                    Sisa Port ODP: <strong className="text-white">{area.availablePorts} Slot</strong>
                  </span>

                  <a
                    href={generateWhatsAppLink(
                      siteConfig.whatsappNumber,
                      `Halo Akbar Media Group, saya berada di ${area.district}, ${area.city}. Mau cek posisi ODP terdekat untuk pasang Wifi.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Cek ODP</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
              <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Area Tidak Ditemukan Dalam Pencarian</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Jangan khawatir! Tim teknisi kami terus melakukan perluasan jaringan. Hubungi kami untuk cek survey lokasi Anda secara langsung.
              </p>
              <a
                href={generateWhatsAppLink(
                  siteConfig.whatsappNumber,
                  `Halo Akbar Media Group, lokasi saya "${searchTerm}" belum tercantum. Mohon bantu survey lokasi apakah bisa ditarik kabel.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-red-600 stroke-white" />
                <span>Minta Survey Area Baru via WA</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
