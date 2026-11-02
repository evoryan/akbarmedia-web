import React, { useState } from 'react';
import { X, Send, Wifi, Camera, CheckCircle2, ShoppingBag } from 'lucide-react';
import { SubscriptionPackage, SiteConfig } from '../types';
import { addCustomerLead, generateWhatsAppLink } from '../utils/storage';

interface OrderModalProps {
  packageOrService: SubscriptionPackage | { title: string; priceText: string } | null;
  siteConfig: SiteConfig;
  onClose: () => void;
  onRefreshLeads?: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  packageOrService,
  siteConfig,
  onClose,
  onRefreshLeads,
}) => {
  if (!packageOrService) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [areaDistrict, setAreaDistrict] = useState('Demak Kota');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const title =
    'title' in packageOrService ? packageOrService.title : 'Layanan Pemasangan';

  const priceFormatted =
    'price' in packageOrService
      ? `Rp ${packageOrService.price.toLocaleString('id-ID')}/${packageOrService.period}`
      : 'priceText' in packageOrService
      ? packageOrService.priceText
      : 'Harga Sesuai Survey';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Add customer lead
    addCustomerLead({
      name,
      phone,
      address,
      areaDistrict,
      serviceInterest: title,
      selectedPlanOrService: `${title} (${priceFormatted})`,
      notes,
    });

    if (onRefreshLeads) onRefreshLeads();

    const waMsg = `Halo Akbar Media Group, saya mau mendaftar paket/layanan berikut:
- Paket / Layanan: ${title} (${priceFormatted})
- Nama Pelanggan: ${name}
- No. WhatsApp: ${phone}
- Alamat Pemasangan: ${address} (${areaDistrict})
- Catatan / Jadwal: ${notes || '-'}
Mohon bantuan proses pendaftaran & survey teknisnya. Terima kasih!`;

    setSubmitted(true);

    window.open(generateWhatsAppLink(siteConfig.whatsappNumber, waMsg), '_blank');

    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Selected Plan Summary Banner */}
        <div className="p-4 rounded-2xl bg-red-600/10 border border-red-500/30 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
              Pilihan Pendaftaran:
            </span>
            <h4 className="text-base font-extrabold text-white">{title}</h4>
            <span className="text-xs font-bold text-slate-300">{priceFormatted}</span>
          </div>
          <ShoppingBag className="w-8 h-8 text-red-500 shrink-0" />
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Form Order Berhasil Diisi!</h3>
            <p className="text-xs text-slate-300">
              Pesan WhatsApp telah disiapkan. Halaman WhatsApp akan terbuka secara otomatis untuk konfirmasi dengan Customer Service.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Nama Lengkap Pelanggan:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  No. WhatsApp Aktif:
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Kecamatan / Area:
                </label>
                <input
                  type="text"
                  required
                  value={areaDistrict}
                  onChange={(e) => setAreaDistrict(e.target.value)}
                  placeholder="Demak Kota / Sayung / Semarang / Kudus"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Alamat Pemasangan Lengkap:
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rt/Rw, Desa, Jalan, Patokan rumah..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              ></textarea>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Catatan Tambahan (Opsional):
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Pasang Sabtu jam 10 pagi"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Lanjutkan Pesanan via WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
