import { useState } from 'react';
import { Box, ArrowRight, Server, CheckCircle, Navigation, Layers, ShieldCheck } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import { mapData } from '../data/mockData';

// Custom Map Icons
const facilityIcon = L.divIcon({
  className: 'fac-icon',
  html: `<div style="background-color: #00e5ff; width: 18px; height: 18px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px #00e5ff;"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

export default function Inventory() {
  const [selectedItem, setSelectedItem] = useState(mapData.inventory[0]);

  // Find compatible storage facilities for the selected item's category
  const compatibleFacilities = mapData.storageFacilities.filter(fac => 
    fac.acceptedCategories.includes(selectedItem.category)
  );

  // Default to the first compatible facility for routing vector
  const targetFacility = compatibleFacilities[0] || mapData.storageFacilities[0];

  // Resolve current item location coordinates for the map
  const getLocationCoords = (locId) => {
    // Check if location is a facility
    const fac = mapData.storageFacilities.find(f => f.id === locId);
    if (fac) return fac.coords;
    // Check if location is an asset/vehicle
    const asset = mapData.assets.find(a => a.id === locId);
    if (asset && asset.coords) return asset.coords;
    // Fallback to base
    return mapData.baseLocation;
  };

  const itemCoords = getLocationCoords(selectedItem.locationId);

  return (
    <div className="flex flex-col h-full gap-6">
      
      {/* Header */}
      <div className="flex items-end justify-between border-b border-slate-300 dark:border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Consumables & Cargo Routing</h2>
          <p className="text-xs text-slate-500 font-mono tracking-widest mt-1">INTEL-DRIVEN MANIFEST & CATEGORICAL STORAGE DISPATCH</p>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        
        {/* LEFT COLUMN: INVENTORY MANIFEST LIST */}
        <div className="w-1/3 flex flex-col border border-slate-300 dark:border-white/10 bg-white/5 shadow-lg relative overflow-hidden backdrop-blur-sm">
          <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300 font-mono tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-polar-accent" /> GLOBAL MANIFEST ({mapData.inventory.length})
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {mapData.inventory.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 border cursor-pointer transition-all flex items-center justify-between group ${
                    isSelected 
                      ? 'border-polar-accent bg-polar-accent/10 shadow-[inset_0_0_15px_rgba(0,229,255,0.1)]' 
                      : 'border-white/5 hover:border-white/20 bg-black/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded bg-black/30 ${isSelected ? 'text-polar-accent' : 'text-slate-400 group-hover:text-white'}`}>
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white tracking-tight">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono tracking-widest mt-1">ID: {item.id} | LOC: {item.locationId}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 border border-polar-accent/30 text-polar-accent bg-polar-accent/10 font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: INTELLIGENT ROUTING & DISPATCH TERMINAL */}
        <div className="flex-1 border border-slate-300 dark:border-white/10 bg-gradient-to-b from-polar-darker to-black/50 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-polar-accent to-transparent opacity-30"></div>
          
          <div className="p-6 border-b border-white/5 bg-black/20 flex justify-between items-center">
            <div>
              <div className="text-[10px] text-polar-accent font-mono tracking-[0.3em] mb-1 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> CATEGORICAL ROUTING ENGINE
              </div>
              <div className="text-2xl font-bold text-white tracking-tighter">{selectedItem.name}</div>
            </div>
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-500 block">TOTAL WEIGHT</span>
              <span className="text-lg font-bold text-polar-accent">{selectedItem.weight}</span>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
            
            {/* Compatibility Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 border border-white/5 p-4">
                <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">CARGO CLASSIFICATION</div>
                <div className="text-lg font-bold text-white uppercase tracking-wider">{selectedItem.category}</div>
              </div>
              <div className="bg-black/40 border border-white/5 p-4">
                <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">COMPATIBLE STORAGE NODES</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">{compatibleFacilities.length} FACILITIES FOUND</div>
              </div>
            </div>

            {/* Map Routing View */}
            <div className="flex-1 min-h-[220px] rounded border border-white/10 relative overflow-hidden bg-slate-950">
              <MapContainer 
                center={itemCoords} 
                zoom={12} 
                className="h-full w-full z-0"
                zoomControl={false}
              >
                <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
                
                {/* Route Vector Line */}
                <Polyline 
                  positions={[itemCoords, targetFacility.coords]}
                  pathOptions={{ color: '#00e5ff', weight: 3, dashArray: '8 8', opacity: 0.8 }}
                />

                {/* Target Facility Marker */}
                <Marker position={targetFacility.coords} icon={facilityIcon}>
                  <Popup className="font-mono text-xs bg-polar-darker text-white">
                    <span className="font-bold text-polar-accent">{targetFacility.name}</span><br/>
                    Accepts: {targetFacility.acceptedCategories.join(', ')}
                  </Popup>
                </Marker>
              </MapContainer>

              <div className="absolute top-3 left-3 z-[400] bg-polar-darker/90 backdrop-blur-sm px-3 py-1.5 border border-white/10 text-[10px] font-mono text-polar-accent uppercase tracking-widest">
                DISPATCH VECTOR: {selectedItem.locationId} &rarr; {targetFacility.name}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between bg-polar-accent/5 border border-polar-accent/30 p-4">
              <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
                <Navigation className="w-4 h-4 text-polar-accent animate-pulse" />
                <span>NEAREST COMPATIBLE FACILITY: <strong className="text-white">{targetFacility.name}</strong></span>
              </div>
              <button className="px-6 py-2 bg-polar-accent text-polar-darker font-bold font-mono text-xs tracking-widest uppercase hover:bg-polar-accent/80 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center gap-2">
                Initiate Transfer <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}