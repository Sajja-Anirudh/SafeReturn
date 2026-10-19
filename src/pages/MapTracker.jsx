import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Activity, Battery, Radio, ShieldAlert, ThermometerSnowflake, Crosshair, Box, MapPin } from 'lucide-react';
import { mapData } from '../data/mockData';

// Personnel Status Color
const getStatusColor = (status) => {
  if (status === 'WARNING') return '#ffab00'; // Amber
  if (status === 'CRITICAL') return '#ff2a2a'; // Red
  return '#00e5ff'; // Cyan
};

// Tactical Operator Dots
const createCustomIcon = (status, isSelected) => {
  const color = getStatusColor(status);
  const size = isSelected ? 20 : 14;
  const shadow = isSelected ? `0 0 15px 4px ${color}` : `0 0 8px ${color}`;
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid #fff; box-shadow: ${shadow}; transition: all 0.3s ease;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  });
};

// SVG Hardware Icons (Storage / Vehicles / Machinery)
const createHardwareIcon = (type) => {
  let svgPath, color;
  if (type === 'Facility') {
    color = '#ffffff'; // White for HQ Nodes
    svgPath = `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>`;
  } else if (type === 'Vehicle') {
    color = '#ffab00'; // Amber for Transport
    svgPath = `<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>`;
  } else {
    color = '#a8b2c1'; // Slate for Machinery
    svgPath = `<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>`;
  }

  return L.divIcon({
    className: 'hardware-icon',
    html: `<div style="background-color: ${color}20; width: 24px; height: 24px; border-radius: 4px; border: 1px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${color}40; color: ${color};">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export default function MapTracker() {
  const [selectedOp, setSelectedOp] = useState(mapData.personnel[0]);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      
      {/* LEFT: Tactical Map View */}
      <div className="flex-1 rounded-sm overflow-hidden relative shadow-2xl border border-white/10 bg-polar-darker">
        
        {/* Glassmorphism Map HUD */}
        <div className="absolute top-6 left-6 z-[400] bg-polar-darker/70 backdrop-blur-md p-4 border border-white/10 rounded-sm shadow-2xl font-mono text-xs uppercase tracking-widest text-slate-300">
          <div className="flex items-center gap-2 text-polar-accent font-bold mb-2 text-sm">
            <Crosshair className="w-4 h-4 animate-spin-slow" /> Sector: Nuuk Command
          </div>
          <div className="flex justify-between gap-6 text-[10px]">
            <span>Lat: {mapData.baseLocation[0]}</span>
            <span>Lon: {mapData.baseLocation[1]}</span>
          </div>
        </div>

        <MapContainer center={mapData.baseLocation} zoom={14} className="h-full w-full z-0" zoomControl={false}>
          <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />

          {/* Base Camp Perimeter */}
          <Circle center={mapData.baseLocation} radius={250} pathOptions={{ color: '#00e5ff', fillColor: '#00e5ff', fillOpacity: 0.05, weight: 1, dashArray: '4 8' }} />

          {/* Hazard Zone */}
          <Polygon positions={mapData.zones.crevasseHazard} pathOptions={{ color: '#ff2a2a', fillColor: '#ff2a2a', fillOpacity: 0.15, weight: 1 }} />

          {/* Storage Facilities (Mini-HQs) */}
          {mapData.storageFacilities.map(facility => (
            <Marker key={facility.id} position={facility.coords} icon={createHardwareIcon('Facility')}>
              <Popup className="tactical-popup font-mono text-sm bg-polar-darker text-white border-white/10">
                <div className="font-bold text-white mb-1">{facility.name}</div>
                <div className="text-[10px] text-slate-400">ACCEPTS: {facility.acceptedCategories.join(', ')}</div>
              </Popup>
            </Marker>
          ))}

          {/* Deployed Assets (Vehicles/Machinery) */}
          {mapData.assets.map(asset => (
            asset.coords && (
              <Marker key={asset.id} position={asset.coords} icon={createHardwareIcon(asset.type)}>
                <Popup className="tactical-popup font-mono text-sm bg-polar-darker text-white border-white/10">
                  <div className="font-bold text-polar-warning">{asset.id}</div>
                  <div className="text-[10px]">{asset.name}</div>
                  <div className="text-[10px] mt-1 text-slate-400">CARGO: {asset.currentLoadout.length > 0 ? asset.currentLoadout.join(', ') : 'EMPTY'}</div>
                </Popup>
              </Marker>
            )
          ))}

          {/* Personnel Markers & Trails */}
          {mapData.personnel.map(op => (
            <React.Fragment key={`frag-${op.id}`}>
              <Polyline positions={op.path} pathOptions={{ color: getStatusColor(op.status), weight: 1.5, dashArray: '4 6', opacity: 0.4 }} />
              <Marker position={op.coords} icon={createCustomIcon(op.status, selectedOp?.id === op.id)} eventHandlers={{ click: () => setSelectedOp(op) }}>
                <Popup className="tactical-popup font-mono text-sm bg-polar-darker text-white border-white/10">
                  <div className="font-bold">{op.id} - {op.name}</div>
                  <div style={{ color: getStatusColor(op.status) }}>{op.status}</div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>
      </div>

      {/* RIGHT: High-End Telemetry Data Panel */}
      <div className="w-96 rounded-sm bg-polar-darker border border-white/10 flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-polar-accent to-transparent opacity-50"></div>
        
        <div className="p-5 border-b border-white/5 bg-black/40">
          <h3 className="text-[10px] font-bold text-polar-accent uppercase tracking-[0.3em] flex items-center gap-3">
            <Activity className="w-3 h-3 animate-pulse" /> Personnel Telemetry Feed
          </h3>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {selectedOp ? (
            <div className="space-y-6">
              <div className="border-l border-polar-accent pl-4 py-1 mb-8">
                <div className="text-[10px] text-slate-500 font-mono tracking-[0.2em] mb-1">OPERATIVE IDENT</div>
                <div className="text-3xl font-bold text-white tracking-tighter">{selectedOp.id}</div>
                <div className="text-sm text-polar-accent font-medium mt-1">{selectedOp.name} <span className="text-slate-500 mx-2">|</span> {selectedOp.role}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-sm border border-white/5">
                  <Activity className="w-4 h-4 text-polar-warning mb-2" />
                  <div className="text-[10px] text-slate-400 font-mono tracking-widest">HEART RATE</div>
                  <div className="text-2xl font-bold text-white mt-1">{selectedOp.heartRate} <span className="text-[10px] text-slate-500 font-normal">bpm</span></div>
                </div>
                
                <div className="bg-black/40 p-4 rounded-sm border border-white/5">
                  <Battery className={`w-4 h-4 mb-2 ${parseInt(selectedOp.battery) > 20 ? 'text-emerald-400' : 'text-polar-alert'}`} />
                  <div className="text-[10px] text-slate-400 font-mono tracking-widest">POWER CELL</div>
                  <div className="text-2xl font-bold text-white mt-1">{selectedOp.battery}</div>
                </div>

                <div className="bg-black/40 p-4 rounded-sm border border-white/5 col-span-2 flex justify-between items-center">
                  <div>
                    <ThermometerSnowflake className="w-4 h-4 text-polar-accent mb-2" />
                    <div className="text-[10px] text-slate-400 font-mono tracking-widest">CORE TEMP</div>
                  </div>
                  <div className="text-2xl font-bold text-white">{selectedOp.temp}</div>
                </div>
              </div>

              <div className="mt-8 border border-white/5 bg-black/40 p-4">
                <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-3 flex justify-between items-end">
                  <span>SYSTEM STATUS</span>
                  <span className="text-polar-accent text-[9px]">{selectedOp.lastPing}</span>
                </div>
                
                <div className={`p-3 border flex items-center justify-center gap-3 font-bold text-xs tracking-[0.2em] uppercase ${
                  selectedOp.status === 'NOMINAL' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' :
                  selectedOp.status === 'WARNING' ? 'bg-polar-warning/5 border-polar-warning/20 text-polar-warning' :
                  'bg-polar-alert/5 border-polar-alert/20 text-polar-alert animate-pulse'
                }`}>
                  {selectedOp.status === 'NOMINAL' && <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>}
                  {selectedOp.status === 'WARNING' && <ShieldAlert className="w-4 h-4" />}
                  {selectedOp.status === 'CRITICAL' && <ShieldAlert className="w-4 h-4" />}
                  {selectedOp.status === 'CRITICAL' ? 'CRITICAL FAILURE' : selectedOp.status}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}