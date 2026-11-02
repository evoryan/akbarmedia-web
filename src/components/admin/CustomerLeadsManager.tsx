import React, { useState } from 'react';
import { CustomerLead } from '../../types';
import {
  Users,
  Search,
  Download,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit,
  Save,
  MessageCircle,
} from 'lucide-react';
import { generateWhatsAppLink } from '../../utils/storage';

interface CustomerLeadsManagerProps {
  leads: CustomerLead[];
  onSaveLeads: (leads: CustomerLead[]) => void;
  whatsappNumber: string;
}

export const CustomerLeadsManager: React.FC<CustomerLeadsManagerProps> = ({
  leads,
  onSaveLeads,
  whatsappNumber,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<CustomerLead['status']>('Baru');
  const [editNotes, setEditNotes] = useState('');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.serviceInterest.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStartEdit = (lead: CustomerLead) => {
    setEditingId(lead.id);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || '');
  };

  const handleSaveEdit = (id: string) => {
    const updated = leads.map((l) =>
      l.id === id ? { ...l, status: editStatus, notes: editNotes } : l
    );
    onSaveLeads(updated);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus data pendaftaran pelanggan ini?')) {
      onSaveLeads(leads.filter((l) => l.id !== id));
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Nama', 'WhatsApp', 'Alamat', 'Kecamatan', 'Layanan', 'Status', 'Catatan', 'Tanggal'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.address}"`,
      `"${l.areaDistrict}"`,
      `"${l.serviceInterest}"`,
      `"${l.status}"`,
      `"${l.notes || ''}"`,
      `"${l.createdAt}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data-pelanggan-akbar-media-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-red-500" />
            <span>Data Pendaftaran & Prospek Pelanggan ({leads.length})</span>
          </h3>
          <p className="text-xs text-slate-400">
            Daftar calon pelanggan yang mengisi form pendaftaran atau menghubungi via website.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Data CSV / Excel</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, HP, alamat..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'Baru', 'Survey', 'Diproses', 'Terpasang', 'Batal'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {st === 'all' ? 'Semua' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="space-y-3">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => {
            const isEditing = editingId === lead.id;
            const waClientUrl = generateWhatsAppLink(
              lead.phone,
              `Halo Bpk/Ibu ${lead.name}, kami dari Akbar Media Group ingin mengonfirmasi pendaftaran ${lead.serviceInterest}.`
            );

            return (
              <div
                key={lead.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-white">
                      {lead.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-800/50">
                      {lead.areaDistrict}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {lead.createdAt}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        lead.status === 'Baru'
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : lead.status === 'Terpasang'
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                          : lead.status === 'Batal'
                          ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      WhatsApp:
                    </span>
                    <a
                      href={waClientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{lead.phone}</span>
                    </a>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      Layanan Diminati:
                    </span>
                    <span className="font-bold text-white mt-0.5 block">
                      {lead.serviceInterest}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      Alamat Pemasangan:
                    </span>
                    <span className="text-slate-300 mt-0.5 block truncate">
                      {lead.address}
                    </span>
                  </div>
                </div>

                {isEditing ? (
                  <div className="pt-3 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">
                        Ubah Status:
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as any)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      >
                        <option value="Baru">Baru</option>
                        <option value="Survey">Survey</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Terpasang">Terpasang</option>
                        <option value="Batal">Batal</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">
                        Catatan Internal Teknisi:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Jadwal survey / catatan teknis..."
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                        />
                        <button
                          onClick={() => handleSaveEdit(lead.id)}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shrink-0 flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" /> Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                    <span className="text-slate-400 italic">
                      Catatan: {lead.notes || 'Belum ada catatan.'}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(lead)}
                        className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg"
                        title="Edit Status"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-1.5 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg"
                        title="Hapus Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center text-slate-500 text-xs">
            Tidak ada data pendaftaran ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};
