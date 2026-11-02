import React, { useState } from 'react';
import { CoverageArea } from '../../types';
import { MapPin, Plus, Trash2, Edit2, Save } from 'lucide-react';

interface CoverageManagerProps {
  coverageAreas: CoverageArea[];
  onSaveCoverage: (areas: CoverageArea[]) => void;
}

export const CoverageManager: React.FC<CoverageManagerProps> = ({
  coverageAreas,
  onSaveCoverage,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('Kabupaten Demak');
  const [status, setStatus] = useState<CoverageArea['status']>('Tersedia FO 100%');
  const [coveragePercentage, setCoveragePercentage] = useState<number>(95);
  const [availablePorts, setAvailablePorts] = useState<number>(30);

  const handleStartAdd = () => {
    setEditingId('new');
    setDistrict('');
    setCity('Kabupaten Demak');
    setStatus('Tersedia FO 100%');
    setCoveragePercentage(95);
    setAvailablePorts(30);
  };

  const handleStartEdit = (area: CoverageArea) => {
    setEditingId(area.id);
    setDistrict(area.district);
    setCity(area.city);
    setStatus(area.status);
    setCoveragePercentage(area.coveragePercentage);
    setAvailablePorts(area.availablePorts);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus data area ini?')) {
      onSaveCoverage(coverageAreas.filter((a) => a.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!district) return;

    if (editingId === 'new') {
      const newArea: CoverageArea = {
        id: 'cov-' + Date.now(),
        district,
        city,
        status,
        coveragePercentage: Number(coveragePercentage),
        availablePorts: Number(availablePorts),
      };
      onSaveCoverage([newArea, ...coverageAreas]);
    } else {
      const updated = coverageAreas.map((a) =>
        a.id === editingId
          ? {
              ...a,
              district,
              city,
              status,
              coveragePercentage: Number(coveragePercentage),
              availablePorts: Number(availablePorts),
            }
          : a
      );
      onSaveCoverage(updated);
    }

    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-white">Kelola Area Jangkauan ODP</h3>
          <p className="text-xs text-slate-400">
            Tambah kecamatan atau perbarui persentase coverage dan sisa slot port ODP.
          </p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Area Baru</span>
        </button>
      </div>

      {editingId && (
        <form
          onSubmit={handleSave}
          className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4"
        >
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{editingId === 'new' ? 'Tambah Area' : 'Edit Area'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Kecamatan / Area:
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Contoh: Kecamatan Sayung"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Kota / Kabupaten:
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Kabupaten Demak / Kota Semarang"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Status Fiber:
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="Tersedia FO 100%">Tersedia FO 100%</option>
                <option value="Sinyal Jaringan Stabil">Sinyal Jaringan Stabil</option>
                <option value="Area Expansion (Perlu Survey)">Area Expansion (Perlu Survey)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Coverage (%):
              </label>
              <input
                type="number"
                value={coveragePercentage}
                onChange={(e) => setCoveragePercentage(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Sisa Port ODP:
              </label>
              <input
                type="number"
                value={availablePorts}
                onChange={(e) => setAvailablePorts(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
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
              <span>Simpan Area</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coverageAreas.map((area) => (
          <div
            key={area.id}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-2"
          >
            <div>
              <h4 className="text-sm font-extrabold text-white">{area.district}</h4>
              <p className="text-xs text-slate-400">{area.city}</p>
              <span className="text-[11px] font-bold text-emerald-400 block mt-1">
                {area.status} • {area.availablePorts} Port
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleStartEdit(area)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(area.id)}
                className="p-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
