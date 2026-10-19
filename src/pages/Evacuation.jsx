import { AlertTriangle, Helicopter, Navigation, Wind, Crosshair, Activity, ShieldAlert } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import { mapData } from '../data/mockData';

const targetIcon = L.divIcon({
  className: 'evac-target',
  html: `<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 20px 5px #ef4444; animation: pulse 2s infinite;"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const medbayIcon = L.divIcon({
  className: 'evac-medbay',
  html: `<div style="background-color: #0ea5e9; width: 24px; height: 24px; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-family: monospace; font-size: 14px; box-shadow: 0 0 15px #0ea5e9;">H</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

export default function Evacuation() {
  // Dynamically pull data so it never desyncs from the database
  const targetOp = mapData.personnel.find(p => p.id === 'OP-05');
  const op5Coords = targetOp.coords;
  // Change this line in Evacuation.jsx:
  const medbayCoords = mapData.storageFacilities[0].coords;
  
  const mapCenter = [(op5Coords[0] + medbayCoords[0]) / 2, (op5Coords[1] + medbayCoords[1]) / 2];

  return (
    <div className="flex flex-col h-full gap-6">
      
      <div className="flex items-end justify-between border-b-2 border-polar-alert/50 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="px-2 py-1 bg-polar-alert text-white text-xs font-bold font-mono tracking-widest animate-pulse flex items-center gap-2">
              <ShieldAlert className="w-3 h-3" />
              ACTIVE EMERGENCY
            </div>
            <span className="text-xs text-polar-alert font-mono tracking-widest">CODE: RED-ICE (NUUK SECTOR)</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Evacuation Protocol</h2>
        </div>
        
        <button className="bg-polar-alert hover:bg-polar-alert/80 text-white px-8 py-3 font-bold font-mono text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center gap-3">
          <Helicopter className="w-5 h-5" />
          Dispatch Rescue Air-1
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1">
        
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-polar-alert/5 border border-polar-alert/30 p-5 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-polar-alert animate-pulse"></div>
            <h3 className="text-xs font-mono text-polar-alert tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              CRITICAL CASUALTY TARGET
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-[10px] text-slate-500 font-mono tracking-widest">OPERATIVE</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{targetOp.id} {targetOp.name}</div>
                <div className="text-sm text-polar-accent">{targetOp.role}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-polar-darker p-3 border border-slate-200 dark:border-white/10">
                  <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">LAST KNOWN HR</div>
                  <div className="text-xl font-bold text-polar-alert flex items-center gap-2">
                    {targetOp.heartRate} <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-white dark:bg-polar-darker p-3 border border-slate-200 dark:border-white/10">
                  <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">SUIT POWER</div>
                  <div className="text-xl font-bold text-polar-alert">{targetOp.battery}</div>
                </div>
              </div>

              <div className="bg-white dark:bg-polar-darker p-3 border border-slate-200 dark:border-white/10">
                <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">COORDINATES</div>
                {/* Dynamically rendering the coordinates so they match the map */}
                <div className="text-lg font-mono text-slate-900 dark:text-white">{op5Coords[0].toFixed(4)}, {op5Coords[1].toFixed(4)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-polar-darker border border-slate-300 dark:border-white/10 p-5 rounded-lg flex-1">
             <h3 className="text-xs font-mono text-slate-500 tracking-widest mb-4 flex items-center gap-2">
              <Wind className="w-4 h-4" />
              LZ WEATHER CONDITIONS
            </h3>
            <div className="space-y-3 font-mono text-sm dark:text-slate-300">
              <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-slate-500">VISIBILITY</span>
                <span className="font-bold text-polar-warning">1.2 KM (SNOW)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-slate-500">WIND</span>
                <span className="font-bold text-polar-alert">45 KNOTS NNE</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-slate-500">TEMP</span>
                <span className="font-bold">-22°C</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-700 rounded-lg flex-1 relative overflow-hidden shadow-inner">
            
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              className="h-full w-full z-0"
              zoomControl={false}
            >
              <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              />
              
              <Polyline 
                positions={[medbayCoords, op5Coords]}
                pathOptions={{ color: '#0ea5e9', weight: 3, dashArray: '10 10', opacity: 0.8 }}
              />

              <Marker position={medbayCoords} icon={medbayIcon}>
                <Popup className="font-mono text-sm bg-polar-darker text-white">NUUK BASE CAMP MEDBAY</Popup>
              </Marker>

              <Marker position={op5Coords} icon={targetIcon}>
                <Popup className="font-mono text-sm bg-polar-darker text-white">
                  <div className="text-polar-alert font-bold">{targetOp.id} {targetOp.name.split(' ')[1].toUpperCase()}</div>
                  <div>LZ UNSTABLE</div>
                </Popup>
              </Marker>
            </MapContainer>

            <div className="absolute top-4 right-4 z-[400] bg-polar-darker/90 text-polar-accent p-2 border border-polar-accent/30 rounded text-xs font-mono font-bold tracking-widest backdrop-blur-sm">
              <Crosshair className="inline w-3 h-3 mr-2 mb-0.5" />
              EXTRACTION VECTOR PLOTTED
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="bg-white dark:bg-polar-darker border border-slate-300 dark:border-white/10 p-5 rounded-lg">
                <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">NEAREST MED FACILITY</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white uppercase">Nuuk Base Medbay</div>
                <div className="text-sm font-mono text-slate-500 mt-2 flex items-center gap-2">
                  <Navigation className="w-3 h-3 text-polar-accent" /> Vector Distance: 4.8 KM
                </div>
             </div>
             <div className="bg-white dark:bg-polar-darker border border-slate-300 dark:border-white/10 p-5 rounded-lg">
                <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">ESTIMATED RESCUE ETA</div>
                <div className="text-3xl font-bold text-polar-accent font-mono">04:12</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">MINUTES TO INTERCEPT</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}