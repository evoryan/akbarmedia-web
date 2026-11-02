import React, { useState, useEffect } from 'react';
import { SiteConfig } from '../../types';
import { Settings, Save, Lock, Check, Phone, Mail, MapPin } from 'lucide-react';

interface SiteConfigManagerProps {
  siteConfig: SiteConfig;
  onSaveSiteConfig: (config: SiteConfig) => void;
}

export const SiteConfigManager: React.FC<SiteConfigManagerProps> = ({
  siteConfig,
  onSaveSiteConfig,
}) => {
  const [companyName, setCompanyName] = useState(siteConfig.companyName);
  const [whatsappNumber, setWhatsappNumber] = useState(siteConfig.whatsappNumber);
  const [formattedWhatsapp, setFormattedWhatsapp] = useState(siteConfig.formattedWhatsapp);
  const [email, setEmail] = useState(siteConfig.email);
  const [address, setAddress] = useState(siteConfig.address);
  const [operatingHours, setOperatingHours] = useState(siteConfig.operatingHours);
  const [adminPin, setAdminPin] = useState(siteConfig.adminPin);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Keep local state in sync when siteConfig prop changes
  useEffect(() => {
    setCompanyName(siteConfig.companyName);
    setWhatsappNumber(siteConfig.whatsappNumber);
    setFormattedWhatsapp(siteConfig.formattedWhatsapp);
    setEmail(siteConfig.email);
    setAddress(siteConfig.address);
    setOperatingHours(siteConfig.operatingHours);
    setAdminPin(siteConfig.adminPin);
  }, [siteConfig]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteConfig = {
      ...siteConfig,
      companyName,
      whatsappNumber,
      formattedWhatsapp,
      email,
      address,
      operatingHours,
      adminPin,
    };
    onSaveSiteConfig(updated);

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-red-500" />
          <span>Pengaturan Kontak & PIN Keamanan CMS</span>
        </h3>
        <p className="text-xs text-slate-400">
          Ubah nomor WhatsApp tujuan order, alamat kantor, jam operasional, dan PIN akses CMS Admin.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Pengaturan Berhasil Diperbarui & Disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Nama Perusahaan:
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Nomor WhatsApp Direct (Tanpa Spasi / Tanda Baca):
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => {
                  setWhatsappNumber(e.target.value);
                  setFormattedWhatsapp(e.target.value);
                }}
                placeholder="081329599584"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono font-bold"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Email Perusahaan:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              PIN Login Admin CMS:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                maxLength={10}
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="123456"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-amber-300 font-mono font-bold"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Alamat Kantor Resmi:
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Jam Operasional & Pelayanan:
          </label>
          <input
            type="text"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan Pengaturan</span>
        </button>
      </form>
    </div>
  );
};
