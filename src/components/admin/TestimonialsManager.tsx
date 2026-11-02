import React from 'react';
import { Testimonial } from '../../types';
import { Star, CheckCircle, XCircle, Trash2, Plus } from 'lucide-react';

interface TestimonialsManagerProps {
  testimonials: Testimonial[];
  onSaveTestimonials: (testimonials: Testimonial[]) => void;
}

export const TestimonialsManager: React.FC<TestimonialsManagerProps> = ({
  testimonials,
  onSaveTestimonials,
}) => {
  const handleToggleApprove = (id: string) => {
    const updated = testimonials.map((t) =>
      t.id === id ? { ...t, isApproved: !t.isApproved } : t
    );
    onSaveTestimonials(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus testimoni ini?')) {
      onSaveTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-white">Kelola Testimoni Pelanggan</h3>
          <p className="text-xs text-slate-400">
            Setujui atau sembunyikan ulasan yang dikirim oleh pelanggan dari website.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {testimonials.map((testi) => (
          <div
            key={testi.id}
            className={`p-5 rounded-2xl bg-slate-950 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              testi.isApproved ? 'border-slate-800' : 'border-amber-500/40 bg-amber-950/10'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white">
                  {testi.customerName}
                </span>
                <span className="text-xs text-slate-400">({testi.roleLocation})</span>
                <span className="text-amber-400 font-bold text-xs flex items-center gap-0.5">
                  ★ {testi.rating}
                </span>
              </div>

              <p className="text-xs text-slate-300 italic">"{testi.comment}"</p>
              <span className="text-[10px] text-red-400 font-semibold block">
                Layanan: {testi.serviceType} • {testi.date}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleApprove(testi.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border ${
                  testi.isApproved
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}
              >
                {testi.isApproved ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" /> Disetujui
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" /> Tinjau / Setujui
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(testi.id)}
                className="p-2 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
