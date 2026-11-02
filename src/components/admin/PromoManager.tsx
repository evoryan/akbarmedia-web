import React, { useState } from 'react';
import { PromotionBanner } from '../../types';
import { Plus, Trash2, Edit2, Tag, Eye, EyeOff, Save } from 'lucide-react';

interface PromoManagerProps {
  promotions: PromotionBanner[];
  onSavePromotions: (promos: PromotionBanner[]) => void;
}

export const PromoManager: React.FC<PromoManagerProps> = ({
  promotions,
  onSavePromotions,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badgeText, setBadgeText] = useState('HOT PROMO');
  const [discountCode, setDiscountCode] = useState('');
  const [validUntil, setValidUntil] = useState('31 Desember 2026');
  const [ctaText, setCtaText] = useState('Klaim Promo via WA');
  const [bgTheme, setBgTheme] = useState<'red' | 'blue' | 'emerald' | 'amber'>('red');

  const handleStartAdd = () => {
    setEditingId('new');
    setTitle('');
    setSubtitle('');
    setBadgeText('PROMO BARU');
    setDiscountCode('');
    setValidUntil('31 Desember 2026');
    setCtaText('Klaim Promo via WA');
    setBgTheme('red');
  };

  const handleStartEdit = (promo: PromotionBanner) => {
    setEditingId(promo.id);
    setTitle(promo.title);
    setSubtitle(promo.subtitle);
    setBadgeText(promo.badgeText);
    setDiscountCode(promo.discountCode || '');
    setValidUntil(promo.validUntil);
    setCtaText(promo.ctaText || 'Klaim Promo');
    setBgTheme(promo.bgTheme);
  };

  const handleToggleActive = (id: string) => {
    const updated = promotions.map((p) =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    );
    onSavePromotions(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus banner promo ini?')) {
      const updated = promotions.filter((p) => p.id !== id);
      onSavePromotions(updated);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (editingId === 'new') {
      const newPromo: PromotionBanner = {
        id: 'promo-' + Date.now(),
        title,
        subtitle,
        badgeText,
        discountCode,
        validUntil,
        isActive: true,
        bgTheme,
        ctaText,
      };
      onSavePromotions([newPromo, ...promotions]);
    } else {
      const updated = promotions.map((p) =>
        p.id === editingId
          ? {
              ...p,
              title,
              subtitle,
              badgeText,
              discountCode,
              validUntil,
              ctaText,
              bgTheme,
            }
          : p
      );
      onSavePromotions(updated);
    }

    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-white">Kelola Konten Promosi Banner</h3>
          <p className="text-xs text-slate-400">
            Atur promo diskon, voucher, dan penawaran spesial yang tampil di bagian paling atas halaman utama.
          </p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Promo Baru</span>
        </button>
      </div>

      {/* Add / Edit Form Modal or Inline */}
      {editingId && (
        <form
          onSubmit={handleSaveForm}
          className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 animate-in fade-in"
        >
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-red-500" />
            <span>{editingId === 'new' ? 'Tambah Banner Promo' : 'Edit Banner Promo'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Judul Utama Promo:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: PROMO SPESIAL GRATIS PASANG INTERNET"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Badge Tag:
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="Contoh: HOT PROMO / HEMAT"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Deskripsi Subtitle:
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Rincian promo..."
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Kode Voucher (Opsional):
              </label>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="PROMO2026"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Berlaku Sampai:
              </label>
              <input
                type="text"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                placeholder="31 Desember 2026"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Teks Tombol WA:
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="Klaim Promo"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Promo</span>
            </button>
          </div>
        </form>
      )}

      {/* Promos List Table */}
      <div className="space-y-3">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`p-4 rounded-2xl bg-slate-950 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              promo.isActive ? 'border-slate-800' : 'border-slate-800 opacity-50'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-600 text-white">
                  {promo.badgeText}
                </span>
                {promo.discountCode && (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [{promo.discountCode}]
                  </span>
                )}
                <span className="text-[10px] text-slate-400">
                  s/d {promo.validUntil}
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">{promo.title}</h4>
              <p className="text-xs text-slate-400">{promo.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleActive(promo.id)}
                className={`p-2 rounded-xl text-xs font-bold border flex items-center gap-1 ${
                  promo.isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
                title={promo.isActive ? 'Nonaktifkan' : 'Aktifkan'}
              >
                {promo.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{promo.isActive ? 'Tampil' : 'Sembunyi'}</span>
              </button>

              <button
                onClick={() => handleStartEdit(promo)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(promo.id)}
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
