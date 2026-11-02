import React, { useState } from 'react';
import { Lock, KeyRound, ShieldCheck, X, AlertCircle } from 'lucide-react';
import { SiteConfig } from '../../types';

interface AdminLoginModalProps {
  siteConfig: SiteConfig;
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  siteConfig,
  isOpen,
  onClose,
  onSuccessLogin,
}) => {
  if (!isOpen) return null;

  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === siteConfig.adminPin) {
      setError(false);
      onSuccessLogin();
      onClose();
    } else {
      setError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    setPin(siteConfig.adminPin);
    setError(false);
    onSuccessLogin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto mb-3 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">Login Admin CMS</h3>
          <p className="text-xs text-slate-400 mt-1">
            Masukkan PIN Keamanan untuk mengelola konten promosi dan data pelanggan.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5 text-center">
              Masukkan PIN Admin:
            </label>
            <input
              type="password"
              autoFocus
              maxLength={10}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Default PIN: 123456"
              className="w-full text-center tracking-[0.5em] text-lg font-mono font-bold py-3 px-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-xs text-center flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>PIN Salah! Coba gunakan PIN default: 123456</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Masuk Ke Dashboard CMS</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center space-y-2">
          <p className="text-[11px] text-slate-400">
            PIN Default: <strong className="text-amber-400 font-mono">123456</strong>
          </p>
          <button
            onClick={handleQuickDemoLogin}
            className="text-xs font-bold text-slate-300 hover:text-amber-400 underline transition-colors"
          >
            Atau Klik Disini Untuk Akses Instan (Mode Demo)
          </button>
        </div>
      </div>
    </div>
  );
};
