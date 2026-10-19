import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Map as MapIcon, Helicopter, Radio, PackageOpen, Box } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Command Overview', path: '/', icon: LayoutDashboard },
  { name: 'Personnel', path: '/personnel', icon: Users },
  { name: 'Map & Tracking', path: '/map', icon: MapIcon },
  { name: 'Cargo & Assets', path: '/cargo', icon: Box },
  { name: 'Inventory', path: '/inventory', icon: PackageOpen },
  { name: 'Evacuation', path: '/evacuation', icon: Helicopter },
  { name: 'Comms Log', path: '/comms', icon: Radio },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-polar-lighter/80 dark:bg-polar-darker/80 backdrop-blur-xl border-r border-slate-300 dark:border-white/10 flex flex-col h-full z-20 transition-colors duration-300 shadow-2xl">
      <div className="p-6 border-b border-slate-300 dark:border-white/10 bg-transparent">
        <h1 className="text-xl font-bold tracking-[0.2em] text-slate-900 dark:text-white uppercase flex items-center gap-3">
          <div className="w-2 h-2 bg-polar-accent animate-pulse shadow-[0_0_10px_#00e5ff]"></div>
          SafeReturn
        </h1>
        <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-2 font-mono uppercase tracking-[0.3em]">Polar Logistics OS</p>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-transparent rounded-sm",
                isActive 
                  ? "bg-polar-accent/10 border-polar-accent/50 text-polar-accent shadow-[inset_0_0_20px_rgba(0,229,255,0.1)]" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-white/5 hover:border-white/10 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-300 dark:border-white/10 text-[10px] font-mono text-slate-400 dark:text-slate-600 text-center uppercase tracking-[0.3em] bg-transparent">
        SYS.V1.0.0-DEMO
      </div>
    </aside>
  );
}