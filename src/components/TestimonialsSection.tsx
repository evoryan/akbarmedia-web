import React, { useState } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  PlusCircle,
  MessageCircle,
  ThumbsUp,
  X,
} from 'lucide-react';
import { Testimonial, SiteConfig } from '../types';
import { addCustomerLead, saveTestimonials } from '../utils/storage';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  siteConfig: SiteConfig;
  onRefreshData: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  siteConfig,
  onRefreshData,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [roleLocation, setRoleLocation] = useState('');
  const [serviceType, setServiceType] = useState('Internet Rumahan 35Mbps');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const approvedTestimonials = testimonials.filter((t) => t.isApproved);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newTestimonial: Testimonial = {
      id: 'testi-' + Date.now(),
      customerName: name,
      roleLocation: roleLocation || 'Pelanggan Setia',
      rating,
      comment,
      serviceType,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      verified: true,
      isApproved: true, // auto approve in client demo
    };

    const updated = [newTestimonial, ...testimonials];
    saveTestimonials(updated);
    onRefreshData();

    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsAddModalOpen(false);
      setName('');
      setComment('');
      setRoleLocation('');
    }, 2000);
  };

  return (
    <section id="testimoni" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold mb-3">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Testimoni & Pengalaman Asli</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Apa Kata Pelanggan Akbar Media Group?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
              Kepercayaan pelanggan adalah kebanggaan kami. Lebih dari 1,500+ titik rumah, toko, cafe, & instansi telah menggunakan layanan kami.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-red-950/40"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Ulasan Anda</span>
          </button>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Terverifikasi
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    {item.customerName}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {item.roleLocation}
                  </p>
                  <span className="inline-block text-[10px] text-red-400 font-semibold mt-0.5">
                    Paket: {item.serviceType}
                  </span>
                </div>

                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white uppercase">
                  {item.customerName.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Testimonial Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-white mb-1">
              Tulis Ulasan & Testimoni
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Pengalaman Anda sangat berharga untuk membantu meningkatkan kualitas layanan Akbar Media Group.
            </p>

            {submittedMessage ? (
              <div className="p-6 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-center space-y-2">
                <ThumbsUp className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Terima Kasih Atas Ulasan Anda!</h4>
                <p className="text-xs text-emerald-300">
                  Ulasan Anda telah tersimpan dan dapat dilihat secara langsung di halaman testimoni.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Nama Lengkap Anda:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Pak Supri / Ibu Maya"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Profesi / Lokasi:
                  </label>
                  <input
                    type="text"
                    value={roleLocation}
                    onChange={(e) => setRoleLocation(e.target.value)}
                    placeholder="Contoh: Pemilik Toko, Demak"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Layanan Yang Digunakan:
                  </label>
                  <input
                    type="text"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    placeholder="Contoh: Paket CCTV 4 Kamera / Internet 35Mbps"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Rating Bintang:
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Komentar Ulasan:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tuliskan pengalaman Anda menggunakan internet atau jasa instalasi Akbar Media Group..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Kirim Ulasan Testimoni
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
