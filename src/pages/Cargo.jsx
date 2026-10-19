import { useState } from 'react';
import { Truck, Wrench, Zap, MapPin, CheckCircle, ShieldAlert, Activity, Box, User, Server, Settings } from 'lucide-react';
import { mapData } from '../data/mockData';

export default function Cargo() {
  const [viewMode, setViewMode] = useState('assets'); // 'assets' or 'facilities'
  const [selectedAsset, setSelectedAsset] = useState(mapData.assets[0]);
  const [selectedFacility, setSelectedFacility] = useState(mapData.storageFacilities[0]);

  // Helper to find inventory items in a specific location
  const getInventoryAtLocation = (locId) => mapData.inventory.filter(item => item.locationId === locId);

  return (
    <div className="flex flex-col h-full gap-6">
      
      {/* Header */}
      <div className="flex items-end justify-between border-b border-slate-300 dark:border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Logistics Engine</h2>
          <p className="text-xs text-slate-500 font-mono tracking-widest mt-1">ASSETS, VEHICLES & STORAGE FACILITIES</p>
        </div>
        <div className="flex gap-4 border border-white/10 p-1 bg-black/40 rounded-sm">
          <button 
            onClick={() => setViewMode('assets')}
            className={`px-6 py-2 text-xs font-mono font-bold tracking-widest transition-colors ${viewMode === 'assets' ? 'bg-polar-accent text-polar-darker shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'text-slate-400 hover:text-white'}`}
          >
            HARDWARE ASSETS
          </button>
          <button 
            onClick={() => setViewMode('facilities')}
            className={`px-6 py-2 text-xs font-mono font-bold tracking-widest transition-colors ${viewMode === 'facilities' ? 'bg-polar-accent text-polar-darker shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'text-slate-400 hover:text-white'}`}
          >
            STORAGE NODES
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        
        {/* LEFT COLUMN: LIST */}
        <div className="w-1/3 flex flex-col border border-slate-300 dark:border-white/10 bg-white/5 shadow-lg relative overflow-hidden backdrop-blur-sm">
          <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300 font-mono tracking-widest">
              {viewMode === 'assets' ? 'DEPLOYED HARDWARE' : 'SECTOR FACILITIES'}
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {viewMode === 'assets' ? (
              mapData.assets.map((asset) => (
                <div 
                  key={asset.id} onClick={() => setSelectedAsset(asset)}
                  className={`p-4 border cursor-pointer transition-all group ${selectedAsset?.id === asset.id ? 'border-polar-accent bg-polar-accent/10 shadow-[inset_0_0_15px_rgba(0,229,255,0.1)]' : 'border-white/5 hover:border-white/20 bg-black/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded bg-black/30 ${selectedAsset?.id === asset.id ? 'text-polar-accent' : 'text-slate-400 group-hover:text-white'}`}>
                      {asset.type === 'Vehicle' ? <Truck className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white tracking-tight">{asset.id}</div>
                      <div className="text-xs text-slate-400 font-mono tracking-widest mt-1">{asset.name}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              mapData.storageFacilities.map((fac) => (
                <div 
                  key={fac.id} onClick={() => setSelectedFacility(fac)}
                  className={`p-4 border cursor-pointer transition-all group ${selectedFacility?.id === fac.id ? 'border-polar-accent bg-polar-accent/10 shadow-[inset_0_0_15px_rgba(0,229,255,0.1)]' : 'border-white/5 hover:border-white/20 bg-black/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded bg-black/30 ${selectedFacility?.id === fac.id ? 'text-polar-accent' : 'text-slate-400 group-hover:text-white'}`}>
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white tracking-tight">{fac.id}</div>
                      <div className="text-[10px] text-slate-400 font-mono tracking-widest mt-1 uppercase">{fac.name}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: TELEMETRY & DETAILS */}
        <div className="flex-1 border border-slate-300 dark:border-white/10 bg-gradient-to-b from-polar-darker to-black/50 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-polar-accent to-transparent opacity-30"></div>
          
          {viewMode === 'assets' && selectedAsset && (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-white/5 bg-black/20">
                <div className="text-[10px] text-polar-accent font-mono tracking-[0.3em] mb-2 flex items-center gap-2">
                  <Activity className="w-3 h-3 animate-pulse" /> HARDWARE DIAGNOSTICS
                </div>
                <div className="text-4xl font-bold text-white tracking-tighter mb-1">{selectedAsset.name}</div>
                <div className="text-sm text-slate-400 font-mono flex items-center gap-4">
                  <span>IDENT: {selectedAsset.id}</span>
                  <span className="flex items-center gap-1 text-polar-warning"><User className="w-3 h-3" /> OPERATOR: {selectedAsset.operator}</span>
                </div>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-white/5 p-4">
                    <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-3 flex justify-between"><span>POWER</span><Zap className="w-3 h-3 text-polar-warning" /></div>
                    <div className="text-3xl font-bold text-white mb-2">{selectedAsset.power}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${selectedAsset.power > 30 ? 'bg-polar-accent' : 'bg-polar-alert shadow-[0_0_10px_#ff2a2a]'}`} style={{ width: `${selectedAsset.power}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/5 p-4">
                    <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-3 flex justify-between"><span>CONDITION</span><Wrench className="w-3 h-3 text-slate-400" /></div>
                    <div className={`text-xl font-bold mt-2 flex items-center gap-2 ${selectedAsset.condition === 'NOMINAL' ? 'text-emerald-400' : 'text-polar-alert animate-pulse'}`}>
                      {selectedAsset.condition === 'NOMINAL' ? <CheckCircle className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                      {selectedAsset.condition}
                    </div>
                  </div>
                </div>

                <div className="border border-white/10 bg-black/40 p-4">
                   <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-3">CURRENT MANIFEST / LOADOUT</div>
                   {getInventoryAtLocation(selectedAsset.id).length > 0 ? (
                     <div className="space-y-2">
                       {getInventoryAtLocation(selectedAsset.id).map(item => (
                         <div key={item.id} className="flex justify-between items-center p-2 bg-white/5 border border-white/5 text-sm font-mono">
                           <span className="text-white flex items-center gap-2"><Box className="w-4 h-4 text-polar-accent" /> {item.name}</span>
                           <span className="text-slate-400">{item.weight} | {item.category}</span>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-sm font-mono text-slate-500 italic p-4 bg-white/5 text-center">NO CARGO DETECTED IN BAY</div>
                   )}
                </div>
              </div>
            </div>
          )}

          {viewMode === 'facilities' && selectedFacility && (
             <div className="h-full flex flex-col">
              <div className="p-6 border-b border-white/5 bg-black/20">
                <div className="text-[10px] text-emerald-400 font-mono tracking-[0.3em] mb-2 flex items-center gap-2">
                  <Server className="w-3 h-3" /> STORAGE NODE UPLINK
                </div>
                <div className="text-4xl font-bold text-white tracking-tighter mb-1">{selectedFacility.name}</div>
                <div className="text-sm text-slate-400 font-mono flex items-center gap-4">
                  <span>IDENT: {selectedFacility.id}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {selectedFacility.coords.join(', ')}</span>
                </div>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                <div className="bg-black/40 border border-white/5 p-5">
                   <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-4">ACCEPTED CARGO CATEGORIES</div>
                   <div className="flex gap-3">
                     {selectedFacility.acceptedCategories.map(cat => (
                       <span key={cat} className="px-3 py-1 bg-polar-accent/10 border border-polar-accent/30 text-polar-accent text-xs font-bold uppercase tracking-widest">{cat}</span>
                     ))}
                   </div>
                </div>

                <div className="bg-black/40 border border-white/5 p-5">
                   <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-4 flex justify-between">
                     <span>FACILITY CAPACITY</span>
                     <span className="text-white font-bold">{selectedFacility.capacity} MAX</span>
                   </div>
                   <div className="text-sm font-mono text-slate-400 mb-4 border-b border-white/10 pb-4">
                     CURRENT INVENTORY LISTING:
                   </div>
                   
                   {getInventoryAtLocation(selectedFacility.id).length > 0 ? (
                     <div className="space-y-2">
                       {getInventoryAtLocation(selectedFacility.id).map(item => (
                         <div key={item.id} className="flex justify-between items-center p-3 bg-white/5 border border-white/5 text-sm font-mono">
                           <span className="text-white font-bold">{item.id} - {item.name}</span>
                           <div className="flex gap-4 text-slate-400 text-xs">
                             <span className="w-24 text-right">{item.category}</span>
                             <span className="w-16 text-right text-polar-accent">{item.weight}</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-sm font-mono text-slate-500 italic text-center py-4">FACILITY IS EMPTY</div>
                   )}
                </div>
              </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}