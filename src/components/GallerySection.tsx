import React from 'react';
import { Camera, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const projects = [
    {
      title: 'Pemasangan CCTV ColorVu 4 Kamera',
      location: 'Perumahan Demak Indah',
      tag: 'CCTV Night Color',
      bgClass: 'from-blue-900 to-slate-900',
    },
    {
      title: 'Instalasi Fiber Optic & Box ODP 16 Core',
      location: 'Kecamatan Sayung, Demak',
      tag: 'Splicing FO',
      bgClass: 'from-red-900 to-slate-900',
    },
    {
      title: 'Setting Mikrotik Router & Hotspot Cafe',
      location: 'Kedai Kopi Majapahit, Semarang',
      tag: 'Mikrotik Hotspot',
      bgClass: 'from-purple-900 to-slate-900',
    },
    {
      title: 'Pemasangan IP Camera 4K POE Gudang',
      location: 'Kawasan Industri Kudus',
      tag: 'IP Cam 4K',
      bgClass: 'from-emerald-900 to-slate-900',
    },
    {
      title: 'Kabelisasi LAN Cat6 & Server Rack',
      location: 'Gedung Sekolah SMK Jepara',
      tag: 'LAN Network',
      bgClass: 'from-amber-900 to-slate-900',
    },
    {
      title: 'Perbaikan Darurat Splicing Kabel FO Putus',
      location: 'Mranggen, Demak',
      tag: 'Service 24 Jam',
      bgClass: 'from-rose-900 to-slate-900',
    },
  ];

  return (
    <section className="py-20 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold mb-3">
            <Camera className="w-3.5 h-3.5 text-red-500" />
            <span>Portofolio Hasil Pengerjaan Lapangan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Dokumentasi Hasil Pemasangan Teknisi
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Pengerjaan rapi, standar keselamatan teknis terjamin, serta perataan kabel yang tertata presisi untuk ketahanan jangka panjang.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl bg-gradient-to-br ${item.bgClass} border border-slate-800 p-6 shadow-xl hover:border-slate-600 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[220px]`}
            >
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-slate-200 border border-slate-800">
                  {item.tag}
                </span>
                <CheckCircle className="w-5 h-5 text-emerald-400 opacity-80" />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                  📍 {item.location}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 font-semibold">
                <span>Pengerjaan Selesai Rapi</span>
                <span className="text-emerald-400">Garansi Respon 24 Jam</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
