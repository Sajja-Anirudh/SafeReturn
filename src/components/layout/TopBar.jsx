import { useEffect, useState } from 'react';
import { Sun, Moon, Bell, ShieldAlert } from 'lucide-react';

export default function TopBar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="h-14 bg-polar-lighter dark:bg-polar-darker border-b border-slate-300 dark:border-slate-800 flex items-center justify-between px-6 z-10 transition-colors duration-300">
      
      {/* System Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-widest">
          <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse"></div>
          System Nominal
        </div>
      </div>

      {/* Tools & Toggles */}
      <div className="flex items-center gap-4">
        {/* Mock SOS Indicator */}
        <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-polar-alert hover:text-white dark:hover:bg-polar-alert transition-colors border border-slate-300 dark:border-slate-700 hover:border-polar-alert text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-slate-300">
          <ShieldAlert className="w-3.5 h-3.5" />
          TEST SOS
        </button>

        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>

        <button className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setIsDark(!isDark)}
          className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          title="Toggle Light/Dark Mode"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}