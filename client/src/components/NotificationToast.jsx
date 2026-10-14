import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast = () => {
  const { toast, setToast } = useAuth();

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-emerald-900/95 text-white border-emerald-500/50 shadow-emerald-900/20',
    error: 'bg-rose-900/95 text-white border-rose-500/50 shadow-rose-900/20',
    info: 'bg-slate-900/95 text-white border-slate-700/50 shadow-slate-900/20',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-emerald-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border backdrop-blur-md shadow-xl ${bgStyles[toast.type] || bgStyles.info}`}>
        {icons[toast.type]}
        <p className="text-sm font-medium pr-2">{toast.message}</p>
        <button
          onClick={() => setToast(null)}
          className="ml-auto text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
