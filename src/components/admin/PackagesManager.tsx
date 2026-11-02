import React, { useState } from 'react';
import { SubscriptionPackage } from '../../types';
import { Plus, Trash2, Edit2, Wifi, Save, Star, Check } from 'lucide-react';

interface PackagesManagerProps {
  packages: SubscriptionPackage[];
  onSavePackages: (pkgs: SubscriptionPackage[]) => void;
}

export const PackagesManager: React.FC<PackagesManagerProps> = ({
  packages,
  onSavePackages,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [speed, setSpeed] = useState('20 Mbps');
  const [price, setPrice] = useState<number>(185000);
  const [period, setPeriod] = useState('bulan');
  const [category, setCategory] = useState<
    'internet_rumah' | 'internet_bisnis' | 'cctv_paket'
  >('internet_rumah');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [badge, setBadge] = useState('');
  const [popular, setPopular] = useState(false);

  const handleStartAdd = () => {
    setEditingId('new');
    setTitle('');
    setSpeed('20 Mbps');
    setPrice(185000);
    setPeriod('bulan');
    setCategory('internet_rumah');
    setDescription('');
    setFeaturesText('Speed 20 Mbps Simetris\nUnlimited Fiber Optic\nGratis Modem Wi-Fi');
    setBadge('Paling Laris');
    setPopular(false);
  };

  const handleStartEdit = (pkg: SubscriptionPackage) => {
    setEditingId(pkg.id);
    setTitle(pkg.title);
    setSpeed(pkg.speed);
    setPrice(pkg.price);
    setPeriod(pkg.period);
    setCategory(pkg.category);
    setDescription(pkg.description);
    setFeaturesText(pkg.features.join('\n'));
    setBadge(pkg.badge || '');
    setPopular(!!pkg.popular);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus paket langganan ini?')) {
      onSavePackages(packages.filter((p) => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const featuresList = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    if (editingId === 'new') {
      const newPkg: SubscriptionPackage = {
        id: 'pkg-' + Date.now(),
        title,
        speed,
        price: Number(price),
        period,
        category,
        description,
        features: featuresList,
        badge,
        popular,
        isActive: true,
      };
      onSavePackages([newPkg, ...packages]);
    } else {
      const updated = packages.map((p) =>
        p.id === editingId
          ? {
              ...p,
              title,
              speed,
              price: Number(price),
              period,
              category,
              description,
              features: featuresList,
              badge,
              popular,
            }
          : p
      );
      onSavePackages(updated);
    }

    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-white">
            Kelola Paket Langganan Internet & CCTV
          </h3>
          <p className="text-xs text-slate-400">
            Tambah, edit harga, Mbps, fasilitas, dan status populer pada tabel paket langganan.
          </p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Paket Baru</span>
        </button>
      </div>

      {editingId && (
        <form
          onSubmit={handleSave}
          className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4"
        >
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Wifi className="w-4 h-4 text-red-500" />
            <span>{editingId === 'new' ? 'Tambah Paket' : 'Edit Paket'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Nama Paket:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Home Super Speed"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Speed / Spesifikasi Utama:
              </label>
              <input
                type="text"
                required
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                placeholder="Contoh: 35 Mbps / 4 Kamera HD"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Kategori Paket:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="internet_rumah">Internet Rumahan</option>
                <option value="internet_bisnis">Internet Bisnis / Cafe</option>
                <option value="cctv_paket">Paket CCTV</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Harga (Rupiah):
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Periode Tagihan:
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="bulan / sekali bayar"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Badge Ribon:
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Terpopuler / Best Seller"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Deskripsi Singkat:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Sebutkan kecocokan penggunaan paket..."
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Fasilitas Termasuk (Satu per baris):
            </label>
            <textarea
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Speed 35 Mbps&#10;Unlimited Fiber&#10;Gratis Dipinjamkan Modem"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
            ></textarea>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="popCheck"
              checked={popular}
              onChange={(e) => setPopular(e.target.checked)}
              className="accent-red-600 rounded"
            />
            <label htmlFor="popCheck" className="text-xs font-bold text-slate-300">
              Tandai sebagai Paket Rekomendasi Utama (Sorotan Khusus)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Paket</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {pkg.category}
                </span>
                {pkg.popular && (
                  <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> Populer
                  </span>
                )}
              </div>

              <h4 className="text-base font-black text-white">{pkg.title}</h4>
              <p className="text-xs font-bold text-red-500">{pkg.speed}</p>
              <p className="text-sm font-extrabold text-white mt-1">
                Rp {pkg.price.toLocaleString('id-ID')} / {pkg.period}
              </p>

              <div className="mt-3 space-y-1 text-xs text-slate-400">
                {pkg.features.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900 flex justify-end gap-2">
              <button
                onClick={() => handleStartEdit(pkg)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(pkg.id)}
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
