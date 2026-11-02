import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { SiteConfig } from '../types';
import { addCustomerLead, generateWhatsAppLink } from '../utils/storage';

interface ContactSectionProps {
  siteConfig: SiteConfig;
  onRefreshLeads?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  siteConfig,
  onRefreshLeads,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [areaDistrict, setAreaDistrict] = useState('Demak Kota');
  const [serviceInterest, setServiceInterest] = useState('Pasang Internet Rumahan');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Save lead into local storage
    addCustomerLead({
      name,
      phone,
      address,
      areaDistrict,
      serviceInterest,
      notes,
    });

    if (onRefreshLeads) onRefreshLeads();

    const waMsg = `Halo Akbar Media Group, saya mengisi form pendaftaran di website:
- Nama: ${name}
- No. WhatsApp: ${phone}
- Alamat: ${address} (${areaDistrict})
- Layanan Diminati: ${serviceInterest}
- Catatan: ${notes || '-'}
Mohon bantuan survey lokasi & pendaftarannya. Terima kasih!`;

    setSubmitted(true);

    // Open WhatsApp
    window.open(generateWhatsAppLink(siteConfig.whatsappNumber, waMsg), '_blank');

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setAddress('');
      setNotes('');
    }, 3000);
  };

  return (
    <section id="kontak" className="py-20 bg-slate-900/80 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Hubungi Kami Kapan Saja</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Siap Melayani Kebutuhan Internet & CCTV Anda
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Tim <strong className="text-white">{siteConfig.companyName}</strong> siap membantu Anda mendapatkan jaringan internet fiber kencang & sistem keamanan CCTV berkualitas tinggi. Hubungi kami langsung via WhatsApp untuk respon instan!
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    WhatsApp & Hotline
                  </h4>
                  <a
                    href={generateWhatsAppLink(
                      siteConfig.whatsappNumber,
                      'Halo Akbar Media Group, saya ingin berkonsultasi.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-extrabold text-white hover:text-emerald-400 transition-colors"
                  >
                    {siteConfig.formattedWhatsapp}
                  </a>
                  <span className="block text-[11px] text-emerald-400 font-semibold mt-0.5">
                    Aktif Respon Cepat 24/7
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Email Official
                  </h4>
                  <p className="text-sm font-bold text-white">{siteConfig.email}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Alamat Kantor
                  </h4>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Jam Operasional & Kunjungan
                  </h4>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5">
                    {siteConfig.operatingHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Request Form */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
            <h3 className="text-2xl font-black text-white mb-1">
              Form Pendaftaran & Request Survey
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Isi data berikut untuk menjadwalkan pemasangan baru atau konsultasi survey lokasi secara gratis.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Pendaftaran Berhasil Terkirim!</h4>
                <p className="text-xs text-emerald-300">
                  Data Anda telah tersimpan di sistem customer dan halaman WhatsApp telah dibuka. Tim teknisi Akbar Media Group akan segera menghubungi Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Nama Lengkap:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      No. WhatsApp (Aktif):
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Kecamatan / Area:
                    </label>
                    <select
                      value={areaDistrict}
                      onChange={(e) => setAreaDistrict(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Demak Kota">Demak Kota</option>
                      <option value="Sayung">Sayung</option>
                      <option value="Mranggen">Mranggen</option>
                      <option value="Karangtengah">Karangtengah</option>
                      <option value="Pedurungan Semarang">Pedurungan Semarang</option>
                      <option value="Genuk Semarang">Genuk Semarang</option>
                      <option value="Semarang Selatan">Semarang Selatan</option>
                      <option value="Jati Kudus">Jati Kudus</option>
                      <option value="Kudus Kota">Kudus Kota</option>
                      <option value="Jepara Area">Jepara Area</option>
                      <option value="Grobogan Area">Grobogan Area</option>
                      <option value="Lainnya">Lainnya (Perlu Survey)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Layanan Yang Diminati:
                    </label>
                    <select
                      value={serviceInterest}
                      onChange={(e) => setServiceInterest(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Pasang Wifi Rumahan">Pasang Wifi Rumahan</option>
                      <option value="Pasang Internet Bisnis / Cafe">Pasang Internet Bisnis / Cafe</option>
                      <option value="Pasang Paket CCTV HD">Pasang Paket CCTV HD</option>
                      <option value="Setting Mikrotik & Router">Setting Mikrotik & Router</option>
                      <option value="Splicing & Sambung Kabel FO">Splicing & Sambung Kabel FO</option>
                      <option value="Perbaikan / Trouble Jaringan">Perbaikan / Trouble Jaringan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Alamat Lengkap Pemasangan:
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rt/Rw, Desa, Jalan, Patokan lokasi"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Catatan Tambahan (Opsional):
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contoh: Minta dipasang hari Sabtu, butuh kabel CCTV 30 meter..."
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-extrabold transition-all shadow-xl shadow-red-950/50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pendaftaran via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
