import React, { useState } from 'react';
import {
  Calculator,
  Camera,
  HardDrive,
  Cpu,
  Wifi,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Sliders,
  Tv,
  Smartphone,
  Laptop,
} from 'lucide-react';
import { SiteConfig } from '../types';
import { generateWhatsAppLink } from '../utils/storage';

interface InteractiveToolsProps {
  siteConfig: SiteConfig;
}

export const InteractiveTools: React.FC<InteractiveToolsProps> = ({ siteConfig }) => {
  const [activeTool, setActiveTool] = useState<'cctv' | 'bandwidth'>('cctv');

  // CCTV Calculator State
  const [camCount, setCamCount] = useState<number>(4);
  const [camType, setCamType] = useState<'hd' | 'colorvu' | 'ip4k'>('colorvu');
  const [storage, setStorage] = useState<'500gb' | '1tb' | '2tb' | '4tb'>('1tb');
  const [cableLength, setCableLength] = useState<number>(50); // meters

  // Bandwidth Estimator State
  const [phones, setPhones] = useState<number>(3);
  const [tvs, setTvs] = useState<number>(1);
  const [pcs, setPcs] = useState<number>(2);
  const [cctvOnline, setCctvOnline] = useState<number>(1);

  // Calculate CCTV Costs
  const getCctvPrice = () => {
    let basePricePerCam = 350000; // HD
    if (camType === 'colorvu') basePricePerCam = 500000;
    if (camType === 'ip4k') basePricePerCam = 850000;

    let dvrPrice = 750000; // 4 ch
    if (camCount > 4 && camCount <= 8) dvrPrice = 1350000;
    if (camCount > 8) dvrPrice = 2400000;

    let hddPrice = 500000; // 500GB
    if (storage === '1tb') hddPrice = 800000;
    if (storage === '2tb') hddPrice = 1250000;
    if (storage === '4tb') hddPrice = 2100000;

    const cablePrice = cableLength * 6000; // Rp 6.000 / meter
    const installationFeePerCam = 150000;

    const total =
      camCount * basePricePerCam +
      dvrPrice +
      hddPrice +
      cablePrice +
      camCount * installationFeePerCam;

    return Math.round(total / 50000) * 50000; // round to nearest 50k
  };

  const getRetentionDays = () => {
    if (storage === '500gb') return Math.round(14 / (camCount / 2));
    if (storage === '1tb') return Math.round(28 / (camCount / 2));
    if (storage === '2tb') return Math.round(50 / (camCount / 2));
    return Math.round(100 / (camCount / 2));
  };

  const cctvTypeLabel =
    camType === 'hd'
      ? 'HD 1080p Standard'
      : camType === 'colorvu'
      ? 'Night ColorVu (Warna Malam Hari)'
      : 'IP Camera 4K Ultra POE';

  const cctvEstimateMessage = `Halo Akbar Media Group, saya menggunakan Kalkulator CCTV di web:
- Jumlah Kamera: ${camCount} Titik
- Tipe Kamera: ${cctvTypeLabel}
- Storage Harddisk: ${storage.toUpperCase()} (Simpan ~${getRetentionDays()} Hari)
- Estimasi Kabel: ${cableLength} meter
- Estimasi Biaya: Rp ${getCctvPrice().toLocaleString('id-ID')}
Mohon info ketersediaan stok & jadwal pasang teknisi.`;

  // Calculate Bandwidth
  const calculateRecommendedMbps = () => {
    const score = phones * 3 + tvs * 10 + pcs * 8 + cctvOnline * 5;
    if (score <= 15) return { speed: '15 Mbps', plan: 'Home Starter (Rp 150.000/bln)' };
    if (score <= 35) return { speed: '35 Mbps', plan: 'Home Family Pro (Rp 215.000/bln)' };
    if (score <= 65) return { speed: '60 Mbps', plan: 'Home Ultimate (Rp 295.000/bln)' };
    return { speed: '100 Mbps Dedicated', plan: 'Business Dedicated Pro (Rp 850.000/bln)' };
  };

  const recommendedPlan = calculateRecommendedMbps();

  const bandwidthMessage = `Halo Akbar Media Group, hasil Estimator Bandwidth rumah/kantor saya:
- HP / Tablet: ${phones} unit
- Smart TV: ${tvs} unit
- Komputer / Laptop: ${pcs} unit
- CCTV Online: ${cctvOnline} unit
Rekomendasi Paket: ${recommendedPlan.speed} (${recommendedPlan.plan}).
Saya mau tanya ketersediaan jangkauan area saya.`;

  return (
    <section id="kalkulator" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5 text-red-500" />
            <span>Fitur Interaktif Cerdas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Simulasi Biaya CCTV & Bandwidth Internet
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Hitung estimasi biaya paket pasang CCTV lengkap atau cari tahu rekomendasi kecepatan internet yang pas untuk kebutuhan tempat Anda.
          </p>

          {/* Tool Switcher Buttons */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveTool('cctv')}
              className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTool === 'cctv'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Kalkulator Pasang CCTV</span>
            </button>

            <button
              onClick={() => setActiveTool('bandwidth')}
              className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTool === 'bandwidth'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Wifi className="w-4 h-4" />
              <span>Estimator Speed Internet</span>
            </button>
          </div>
        </div>

        {/* TOOL 1: CCTV CALCULATOR */}
        {activeTool === 'cctv' && (
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-red-500" />
                Pilih Spesifikasi CCTV Anda
              </h3>

              {/* Camera Count */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Jumlah Titik Kamera: <span className="text-red-400 text-sm font-extrabold">{camCount} Kamera</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 8, 16].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCamCount(num)}
                      className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                        camCount === num
                          ? 'bg-red-600 text-white border-red-500 shadow-md'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {num} Cam
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera Type */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Tipe & Kualitas Kamera:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setCamType('hd')}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      camType === 'hd'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">HD 1080p Standard</div>
                    <div className="text-[10px] text-slate-400 mt-1">Infrared Malam Hitam Putih</div>
                  </button>

                  <button
                    onClick={() => setCamType('colorvu')}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      camType === 'colorvu'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-300">Night ColorVu 🔥</div>
                    <div className="text-[10px] text-slate-400 mt-1">Malam Hari Tetap Berwarna</div>
                  </button>

                  <button
                    onClick={() => setCamType('ip4k')}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      camType === 'ip4k'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold text-blue-400">IP Camera 4K POE</div>
                    <div className="text-[10px] text-slate-400 mt-1">Super Jernih & Audio 2 Arah</div>
                  </button>
                </div>
              </div>

              {/* Storage Capacity */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">
                  Kapasitas Storage Harddisk:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: '500gb', label: '500 GB' },
                    { key: '1tb', label: '1 TB' },
                    { key: '2tb', label: '2 TB' },
                    { key: '4tb', label: '4 TB' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setStorage(item.key as any)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        storage === item.key
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cable Range Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">Estimasi Panjang Kabel:</span>
                  <span className="text-red-400 font-extrabold">{cableLength} Meter</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="10"
                  value={cableLength}
                  onChange={(e) => setCableLength(Number(e.target.value))}
                  className="w-full accent-red-600 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Price Output Result */}
            <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="text-center pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  ESTIMASI BIAYA TERIMA BERES
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2">
                  Rp {getCctvPrice().toLocaleString('id-ID')}
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">
                  Termasuk Bahan, Setting HP & Garansi 1 Tahun
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Unit Kamera ({camCount}x):</span>
                  <span className="font-bold text-white">{cctvTypeLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">DVR/NVR Smart AI:</span>
                  <span className="font-bold text-white">{camCount > 4 ? '8/16 Channel' : '4 Channel'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lama Rekaman:</span>
                  <span className="font-bold text-amber-400">~{getRetentionDays()} Hari Nonstop</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kabel & Aksesori:</span>
                  <span className="font-bold text-white">{cableLength}m Coaxial/UTP</span>
                </div>
              </div>

              <a
                href={generateWhatsAppLink(siteConfig.whatsappNumber, cctvEstimateMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all text-center shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-white" />
                <span>Kirim Estimasi ke WA Teknisi</span>
              </a>
            </div>
          </div>
        )}

        {/* TOOL 2: BANDWIDTH ESTIMATOR */}
        {activeTool === 'bandwidth' && (
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Wifi className="w-5 h-5 text-red-500" />
                Berapa Perangkat Di Tempat Anda?
              </h3>

              <div className="space-y-4">
                {/* Phones */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Smartphone / Tablet</div>
                      <div className="text-[10px] text-slate-400">Medsos, WhatsApp, YouTube</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPhones(Math.max(0, phones - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm font-extrabold text-white w-6 text-center">{phones}</span>
                    <button
                      onClick={() => setPhones(phones + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Smart TV */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Tv className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Smart TV / Android Box</div>
                      <div className="text-[10px] text-slate-400">Netflix, Vidio, Youtube 4K</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTvs(Math.max(0, tvs - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm font-extrabold text-white w-6 text-center">{tvs}</span>
                    <button
                      onClick={() => setTvs(tvs + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* PC / Laptops */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Laptop className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Komputer / Laptop</div>
                      <div className="text-[10px] text-slate-400">WFH, Mabar Game, Zoom Call</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPcs(Math.max(0, pcs - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm font-extrabold text-white w-6 text-center">{pcs}</span>
                    <button
                      onClick={() => setPcs(pcs + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation Result Box */}
            <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-center">
              <div className="p-3 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-400 inline-block">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  REKOMENDASI KECEPATAN
                </span>
                <div className="text-3xl sm:text-4xl font-black text-red-500 mt-2">
                  {recommendedPlan.speed}
                </div>
                <p className="text-xs text-slate-300 mt-2 font-semibold">
                  {recommendedPlan.plan}
                </p>
              </div>

              <a
                href={generateWhatsAppLink(siteConfig.whatsappNumber, bandwidthMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all text-center shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-white" />
                <span>Pesan Paket Ini via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
