import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { SiteConfig } from '../types';
import { generateWhatsAppLink } from '../utils/storage';

interface FAQSectionProps {
  siteConfig: SiteConfig;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ siteConfig }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Berapa lama proses pemasangan internet baru setelah pendaftaran?',
      a: 'Proses pemasangan biasanya dilakukan dalam kurun waktu 1 - 2 hari kerja setelah survey ketersediaan tiang ODP selesai. Pada kondisi khusus, teknisi dapat melakukan instalasi Same-Day (hari yang sama).',
    },
    {
      q: 'Apakah paket internet di Akbar Media Group benar-benar Unlimited tanpa FUP?',
      a: 'Ya! Seluruh paket internet rumahan maupun bisnis Akbar Media Group 100% Unlimited tanpa batasan FUP (Fair Usage Policy). Anda dapat melakukan download, streaming 4K, dan upload sepuasnya tanpa penurunan kecepatan.',
    },
    {
      q: 'Apakah kamera CCTV bisa dipantau secara jarak jauh dari HP?',
      a: 'Sangat bisa! Tim teknisi kami akan mengonfigurasi aplikasi cloud p2p di smartphone Android atau iPhone Anda secara gratis hingga siap digunakan dari luar kota.',
    },
    {
      q: 'Bagaimana jika terjadi kendala sinyal lambat atau kabel terputus?',
      a: 'Kami memiliki tim Helpdesk & Teknisi Lapangan yang siap merespon laporan gangguan 24 Jam. Untuk kendala kabel terputus (Splicing), teknisi akan meluncur ke lokasi dengan alat penyambung serat optik presisi tinggi.',
    },
    {
      q: 'Berapa lama garansi peralatan yang didapatkan?',
      a: 'Modem Wi-Fi Fiber Optic & Unit Kamera CCTV mendapatkan garansi resmi distributor hingga 1 Tahun Full. Pemasangan kabel dan jaringan juga dijamin oleh garansi teknis panggil.',
    },
  ];

  return (
    <section className="py-20 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" />
            <span>Pertanyaan Umum (FAQ)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Informasi Pertanyaan Paling Sering Diajukan
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm text-white hover:text-red-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-red-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-extrabold text-white">Masih Memiliki Pertanyaan Lain?</h4>
            <p className="text-xs text-slate-400">Tim CS kami siap membantu menjawab pertanyaan Anda via WhatsApp.</p>
          </div>

          <a
            href={generateWhatsAppLink(
              siteConfig.whatsappNumber,
              'Halo Akbar Media Group, saya punya pertanyaan mengenai layanan Anda.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-white" />
            <span>Tanya Customer Service WA</span>
          </a>
        </div>
      </div>
    </section>
  );
};
