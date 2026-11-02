import React, { useState } from 'react';
import {
  UploadCloud,
  X,
  FileCode2,
  CheckCircle2,
  Download,
  Terminal,
  Server,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportBackup: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({
  isOpen,
  onClose,
  onExportBackup,
}) => {
  const [activeTab, setActiveTab] = useState<'vps' | 'cpanel'>('vps');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const vpsCommands = [
    {
      title: '1. Update System & Install Node.js, Nginx, PM2',
      cmd: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt update && sudo apt install -y nodejs nginx git\nsudo npm install -g pm2`,
    },
    {
      title: '2. Clone / Upload Source Code & Install Package',
      cmd: `cd /var/www\n# Clone repo / upload folder project\ncd akbar-media-group\nnpm install\nnpm run build`,
    },
    {
      title: '3. Jalankan Application Server dengan PM2 (Background)',
      cmd: `NODE_ENV=production pm2 start "npx tsx server.ts" --name "akbar-media-app"\npm2 save\npm2 startup`,
    },
    {
      title: '4. Konfigurasi Nginx Reverse Proxy (/etc/nginx/sites-available/akbar-media)',
      cmd: `server {\n    listen 80;\n    server_name domainanda.com www.domainanda.com;\n\n    location / {\n        proxy_pass http://127.0.0.1:3000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n        proxy_set_header Host $host;\n        proxy_cache_bypass $http_upgrade;\n    }\n}`,
    },
    {
      title: '5. Aktifkan Nginx & SSL HTTPS Gratis (Certbot)',
      cmd: `sudo ln -s /etc/nginx/sites-available/akbar-media /etc/nginx/sites-enabled/\nsudo nginx -t\nsudo systemctl reload nginx\n\nsudo apt install -y certbot python3-certbot-nginx\nsudo certbot --nginx -d domainanda.com -d www.domainanda.com`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-red-600/10 text-red-500 border border-red-500/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              Panduan Deployment VPS Linux & Hosting
            </h3>
            <p className="text-xs text-slate-400">
              Instruksi praktis mendeploy aplikasi Akbar Media Group di VPS (Ubuntu/Debian) atau Hosting cPanel/Hostinger.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('vps')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'vps'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Deploy di VPS Linux (PM2 + Nginx)</span>
          </button>

          <button
            onClick={() => setActiveTab('cpanel')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'cpanel'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Deploy di cPanel / Hostinger</span>
          </button>
        </div>

        {activeTab === 'vps' ? (
          <div className="space-y-4 text-xs">
            <p className="text-slate-300">
              Tutorial lengkap mendeploy full-stack Express backend & React frontend di VPS (Ubuntu 20.04/22.04/24.04):
            </p>

            {vpsCommands.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between text-white font-bold text-xs">
                  <span>{item.title}</span>
                  <button
                    onClick={() => handleCopy(item.cmd, idx)}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Salin Perintah
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 rounded-xl font-mono text-emerald-400 text-[11px] overflow-x-auto whitespace-pre-wrap border border-slate-800">
                  {item.cmd}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-extrabold text-white text-sm">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
                  1
                </span>
                <span>Jalankan Build Production</span>
              </div>
              <p className="text-slate-400 pl-8">
                Buka terminal di komputer Anda dan jalankan perintah build:
              </p>
              <pre className="ml-8 p-3 bg-slate-900 rounded-xl font-mono text-emerald-400 border border-slate-800 font-bold">
                npm run build
              </pre>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-extrabold text-white text-sm">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
                  2
                </span>
                <span>Upload Ke public_html</span>
              </div>
              <p className="text-slate-400 pl-8">
                Upload seluruh isi folder <strong className="text-white">dist</strong> langsung ke folder <code>public_html</code> pada File Manager cPanel/Hostinger Anda.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onExportBackup}
            className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Backup JSON Database</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
