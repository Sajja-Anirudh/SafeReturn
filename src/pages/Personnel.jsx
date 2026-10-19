import { useState } from 'react';
import { Search, Filter, ScanLine, Clock, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { mapData } from '../data/mockData';

export default function Personnel() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter personnel based on search
  const filteredPersonnel = mapData.personnel.filter(op => 
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-6">
      
      {/* Header & Controls */}
      <div className="flex items-end justify-between border-b border-slate-300 dark:border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Personnel Roster</h2>
          <p className="text-xs text-slate-500 font-mono tracking-widest mt-1">TOTAL ACTIVE: {mapData.personnel.length} |SECTOR: GREENLAND SUMMIT</p>
        </div>

        <div className="flex gap-4">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-polar-accent transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH ID, NAME, ROLE..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-72 bg-white dark:bg-polar-darker border border-slate-300 dark:border-white/10 pl-10 pr-4 py-2 text-sm font-mono text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-polar-accent dark:focus:border-polar-accent transition-all"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-polar-darker dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:border-polar-accent dark:hover:border-polar-accent text-sm font-bold uppercase tracking-widest transition-colors dark:text-white">
            <Filter className="w-4 h-4 text-polar-accent" />
            Filter
          </button>

          {/* Mock NFC Action */}
          <button className="flex items-center gap-2 px-4 py-2 bg-polar-accent hover:bg-polar-accent/80 text-white text-sm font-bold uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <ScanLine className="w-4 h-4" />
            Scan ID Tag
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto border border-slate-300 dark:border-white/10 bg-white dark:bg-polar-darker relative shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-slate-100 dark:bg-polar-dark border-b border-slate-300 dark:border-white/10 shadow-sm z-10">
            <tr>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 tracking-[0.2em]">IDENT</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 tracking-[0.2em]">OPERATIVE</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 tracking-[0.2em]">STATUS</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 tracking-[0.2em]">VITALS / POWER</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 tracking-[0.2em]">LAST LOG</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 tracking-[0.2em] text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/5">
            {filteredPersonnel.map((op) => (
              <tr key={op.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">{op.id}</span>
                </td>
                
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 dark:text-white">{op.name}</div>
                  <div className="text-xs text-polar-accent font-medium mt-1">{op.role}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold font-mono tracking-wider border ${
                    op.status === 'NOMINAL' ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400' :
                    op.status === 'WARNING' ? 'bg-amber-50 dark:bg-polar-warning/10 border-amber-200 dark:border-polar-warning/30 text-amber-600 dark:text-polar-warning' :
                    'bg-red-50 dark:bg-polar-alert/10 border-red-200 dark:border-polar-alert/30 text-red-600 dark:text-polar-alert animate-pulse'
                  }`}>
                    {op.status === 'NOMINAL' && <CheckCircle2 className="w-3 h-3" />}
                    {op.status !== 'NOMINAL' && <ShieldAlert className="w-3 h-3" />}
                    {op.status}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-4 text-xs font-mono">
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10px]">HR</span>
                      <span className={`font-bold ${op.heartRate > 100 ? 'text-polar-warning dark:text-polar-warning' : 'text-slate-900 dark:text-white'}`}>{op.heartRate}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10px]">BAT</span>
                      <span className={`font-bold ${parseInt(op.battery) < 20 ? 'text-polar-alert dark:text-polar-alert' : 'text-slate-900 dark:text-white'}`}>{op.battery}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10px]">TMP</span>
                      <span className="font-bold text-slate-900 dark:text-white">{op.temp}</span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <Clock className="w-3 h-3 text-polar-accent" />
                    {op.lastPing}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-slate-400 hover:text-polar-accent transition-colors">
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredPersonnel.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-white/50 dark:bg-polar-darker/50 backdrop-blur-sm">
            <Search className="w-8 h-8 mb-4 opacity-50" />
            <div className="font-mono tracking-widest text-sm">NO OPERATIVES FOUND</div>
          </div>
        )}
      </div>
    </div>
  );
}