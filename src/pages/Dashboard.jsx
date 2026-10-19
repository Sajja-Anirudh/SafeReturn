import { Activity, Users, ShieldAlert, ThermometerSnowflake, Wind, Navigation2, Radio, Truck } from 'lucide-react';
import { mapData } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const criticalOps = mapData.personnel.filter(op => op.status === 'CRITICAL');
  const warningOps = mapData.personnel.filter(op => op.status === 'WARNING');

  return (
    <div className="flex flex-col gap-6 h-full">
      
      {/* Header */}
      <div className="flex items-end justify-between border-b border-slate-300 dark:border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Command Overview</h2>
          <p className="text-xs text-slate-500 font-mono tracking-widest mt-1">HQ: NUUK, GREENLAND | {new Date().toISOString().split('T')[0]}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-polar-darker dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs font-mono font-bold uppercase tracking-widest">
            UPLINK: <span className="text-emerald-500">STABLE</span>
          </div>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white dark:bg-polar-darker border border-slate-300 dark:border-white/10 p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-15 text-polar-accent">
            <Users className="w-16 h-16" />
          </div>
          <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">TOTAL OPERATIVES</div>
          <div className="text-4xl font-bold text-slate-900 dark:text-white">{mapData.personnel.length}</div>
          <div className="text-xs text-emerald-500 font-mono mt-2 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> SQUADS DEPLOYED
          </div>
        </div>

        <div className="bg-white dark:bg-polar-darker border border-slate-300 dark:border-white/10 p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-15 text-polar-accent">
            <Truck className="w-16 h-16" />
          </div>
          <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">DEPLOYED ASSETS</div>
          <div className="text-4xl font-bold text-slate-900 dark:text-white">{mapData.assets.length}</div>
          <div className="text-xs text-polar-accent font-mono mt-2">
            VEHICLES & MACHINERY
          </div>
        </div>

        <div className="bg-white dark:bg-polar-darker border border-slate-300 dark:border-white/10 p-5 shadow-lg relative overflow-hidden group cursor-pointer hover:border-polar-alert transition-colors" onClick={() => navigate('/evacuation')}>
          <div className="absolute top-0 right-0 p-4 opacity-15 text-polar-alert">
            <ShieldAlert className="w-16 h-16" />
          </div>
          <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">ACTIVE EMERGENCIES</div>
          <div className="text-4xl font-bold text-polar-alert">{criticalOps.length}</div>
          <div className="text-xs text-polar-alert font-mono mt-2 animate-pulse">
            REQUIRES IMMEDIATE ACTION
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-polar-darker border border-slate-700 p-5 shadow-lg relative overflow-hidden text-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="text-[10px] text-slate-400 font-mono tracking-widest">LOCAL HQ WEATHER</div>
            <ThermometerSnowflake className="w-5 h-5 text-polar-accent" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-bold">-18°C</div>
              <div className="text-sm text-polar-accent font-mono mt-1">BLIZZARD WARNING</div>
            </div>
            <div className="text-right space-y-1 font-mono text-xs text-slate-400">
              <div className="flex items-center justify-end gap-2"><Wind className="w-3 h-3" /> 45 KNOTS</div>
              <div className="flex items-center justify-end gap-2"><Navigation2 className="w-3 h-3" /> VIS: 1.2KM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 flex-1 min-h-[300px]">
        
        {/* Critical Alerts Panel */}
        <div className="col-span-1 bg-white dark:bg-polar-darker border border-slate-300 dark:border-white/10 flex flex-col shadow-lg">
          <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-polar-warning" />
              Active System Warnings
            </h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {criticalOps.map(op => (
              <div key={op.id} className="p-3 bg-polar-alert/10 border border-polar-alert/30 rounded cursor-pointer hover:bg-polar-alert/20 transition-colors" onClick={() => navigate('/evacuation')}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-polar-alert text-sm">{op.id} {op.name}</span>
                  <span className="text-[10px] bg-polar-alert text-white px-1.5 py-0.5 rounded font-mono">CRITICAL</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">BIOMETRICS FAILURE / LOW TEMP</div>
              </div>
            ))}
            {warningOps.map(op => (
              <div key={op.id} className="p-3 bg-polar-warning/10 border border-polar-warning/30 rounded cursor-pointer hover:bg-polar-warning/20 transition-colors" onClick={() => navigate('/map')}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-polar-warning text-sm">{op.id} {op.name}</span>
                  <span className="text-[10px] bg-polar-warning text-white px-1.5 py-0.5 rounded font-mono">WARNING</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">HAZARD ZONE PROXIMITY</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Map & Comms Link */}
        <div className="col-span-2 grid grid-rows-2 gap-6">
          <div className="bg-slate-900 border border-slate-700 shadow-lg relative overflow-hidden flex flex-col justify-end p-6 cursor-pointer group" onClick={() => navigate('/map')}>
            <div className="absolute inset-0 bg-gradient-to-t from-polar-darker to-transparent"></div>
            <div className="relative z-10 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-1">Live Tracking Map</h3>
                <p className="text-polar-accent font-mono text-xs">MONITOR SECTOR: NUUK OUTSKIRTS (12 OPERATIVES DEPLOYED)</p>
              </div>
              <div className="text-white bg-polar-accent/20 px-4 py-2 border border-polar-accent/50 font-mono text-sm group-hover:bg-polar-accent group-hover:text-polar-darker transition-colors">
                LAUNCH MAP &rarr;
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-polar-darker border border-slate-300 dark:border-white/10 shadow-lg p-6 flex flex-col justify-center items-center text-center cursor-pointer group hover:border-polar-accent transition-colors" onClick={() => navigate('/comms')}>
            <Radio className="w-10 h-10 text-polar-accent mb-4 group-hover:animate-pulse" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-2">Secure Communications</h3>
            <p className="text-slate-500 text-sm max-w-md">Access encrypted VHF and Satellite uplink logs. Broadcast emergency directives to deployed field operatives.</p>
          </div>
        </div>

      </div>
    </div>
  );
}