import React, { useState } from 'react';
import { InstallationService } from '../../types';
import { Plus, Trash2, Edit2, Wrench, Save } from 'lucide-react';

interface ServicesManagerProps {
  services: InstallationService[];
  onSaveServices: (services: InstallationService[]) => void;
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({
  services,
  onSaveServices,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'internet' | 'network' | 'cctv' | 'maintenance'>('internet');
  const [estimatePrice, setEstimatePrice] = useState('Mulai Rp 150.000');
  const [turnaroundTime, setTurnaroundTime] = useState('1 - 2 Jam');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [iconName, setIconName] = useState('Zap');

  const handleStartAdd = () => {
    setEditingId('new');
    setTitle('');
    setCategory('internet');
    setEstimatePrice('Mulai Rp 150.000');
    setTurnaroundTime('1 - 2 Jam');
    setDescription('');
    setFeaturesText('Pengerjaan Rapi\nGaransi Service');
    setIconName('Zap');
  };

  const handleStartEdit = (srv: InstallationService) => {
    setEditingId(srv.id);
    setTitle(srv.title);
    setCategory(srv.category);
    setEstimatePrice(srv.estimatePrice);
    setTurnaroundTime(srv.turnaroundTime);
    setDescription(srv.description);
    setFeaturesText(srv.features.join('\n'));
    setIconName(srv.iconName);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus layanan instalasi ini?')) {
      onSaveServices(services.filter((s) => s.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const feats = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    if (editingId === 'new') {
      const newSrv: InstallationService = {
        id: 'srv-' + Date.now(),
        title,
        category,
        estimatePrice,
        turnaroundTime,
        description,
        features: feats,
        iconName,
        isActive: true,
      };
      onSaveServices([newSrv, ...services]);
    } else {
      const updated = services.map((s) =>
        s.id === editingId
          ? {
              ...s,
              title,
              category,
              estimatePrice,
              turnaroundTime,
              description,
              features: feats,
              iconName,
            }
          : s
      );
      onSaveServices(updated);
    }

    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-white">
            Kelola Layanan Instalasi & Jaringan
          </h3>
          <p className="text-xs text-slate-400">
            Atur item jasa instalasi Fiber Optic, CCTV, Mikrotik, dan perbaikan jaringan.
          </p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan Baru</span>
        </button>
      </div>

      {editingId && (
        <form
          onSubmit={handleSave}
          className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4"
        >
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-red-500" />
            <span>{editingId === 'new' ? 'Tambah Layanan' : 'Edit Layanan'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Judul Layanan:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Splicing Kabel Fiber Optic"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Estimasi Biaya:
              </label>
              <input
                type="text"
                value={estimatePrice}
                onChange={(e) => setEstimatePrice(e.target.value)}
                placeholder="Mulai Rp 150.000"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Lama Pengerjaan:
              </label>
              <input
                type="text"
                value={turnaroundTime}
                onChange={(e) => setTurnaroundTime(e.target.value)}
                placeholder="1 - 2 Jam"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Deskripsi Ringkas:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Rincian pekerjaan..."
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Checklist Poin (Satu per baris):
            </label>
            <textarea
              rows={3}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Alat Fujikura Presisi&#10;Pengukuran OPM&#10;Garansi Pemasangan"
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
            ></textarea>
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
              <span>Simpan Layanan</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
          >
            <div>
              <h4 className="text-sm font-extrabold text-white">{srv.title}</h4>
              <span className="text-xs font-bold text-red-400 block mt-0.5">
                {srv.estimatePrice} ({srv.turnaroundTime})
              </span>
              <p className="text-xs text-slate-400 mt-1">{srv.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleStartEdit(srv)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(srv.id)}
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
