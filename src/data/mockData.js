// Tactical Mock Data - Nuuk Command Logistics Engine
export const mapData = {
    baseLocation: [64.1814, -51.6941], 
    
    zones: {
      safeZone: [
        [64.1850, -51.7000], [64.1850, -51.6800],
        [64.1780, -51.6800], [64.1780, -51.7000]
      ],
      crevasseHazard: [
        [64.1920, -51.6600], [64.1950, -51.6500],
        [64.1930, -51.6400], [64.1900, -51.6500]
      ]
    },

    storageFacilities: [
      { 
        id: "HQ-WH", name: "Nuuk Main Warehouse", coords: [64.1814, -51.6941], 
        acceptedCategories: ["Consumables", "Medical", "Hardware"],
        capacity: "10,000 kg"
      },
      { 
        id: "FOB-A", name: "Forward Operating Cache", coords: [64.1880, -51.6750], 
        acceptedCategories: ["Consumables", "Fuel"],
        capacity: "2,500 kg"
      },
      { 
        id: "HAZ-1", name: "Hazard Containment Node", coords: [64.1950, -51.6400], 
        acceptedCategories: ["Scientific", "Hazardous"],
        capacity: "1,000 kg"
      }
    ],
    
    personnel: [
      // Alpha Team
      { id: "OP-01", name: "Dr. Aris Thorne", role: "Glaciologist", status: "NOMINAL", coords: [64.1820, -51.6880], path: [[64.1800, -51.6920], [64.1820, -51.6880]], heartRate: 72, battery: "94%", lastPing: "2 sec ago", temp: "-12°C" },
      { id: "OP-02", name: "Elena Rostova", role: "Field Engineer", status: "NOMINAL", coords: [64.1830, -51.6850], path: [[64.1814, -51.6941], [64.1830, -51.6850]], heartRate: 85, battery: "88%", lastPing: "5 sec ago", temp: "-14°C" },
      { id: "OP-04", name: "Dr. Sarah Chen", role: "Medic", status: "NOMINAL", coords: [64.1800, -51.6900], path: [[64.1814, -51.6941], [64.1800, -51.6900]], heartRate: 68, battery: "98%", lastPing: "1 sec ago", temp: "-11°C" },
      { id: "OP-06", name: "Kaelen Voss", role: "Security", status: "NOMINAL", coords: [64.1790, -51.6850], path: [[64.1814, -51.6941], [64.1790, -51.6850]], heartRate: 78, battery: "91%", lastPing: "3 sec ago", temp: "-13°C" },
      // Beta Team 
      { id: "OP-03", name: "Marcus Vance", role: "Scout", status: "WARNING", coords: [64.1890, -51.6650], path: [[64.1850, -51.6800], [64.1890, -51.6650]], heartRate: 112, battery: "42%", lastPing: "12 sec ago", temp: "-18°C" },
      { id: "OP-05", name: "James Holden", role: "Mechanic", status: "CRITICAL", coords: [64.1940, -51.6480], path: [[64.1890, -51.6650], [64.1940, -51.6480]], heartRate: 145, battery: "12%", lastPing: "45 sec ago", temp: "-22°C" },
      { id: "OP-07", name: "Tariq Sahir", role: "Drill Operator", status: "WARNING", coords: [64.1920, -51.6500], path: [[64.1880, -51.6600], [64.1920, -51.6500]], heartRate: 105, battery: "55%", lastPing: "10 sec ago", temp: "-19°C" },
      { id: "OP-08", name: "Lyra Vance", role: "Geologist", status: "NOMINAL", coords: [64.1910, -51.6550], path: [[64.1870, -51.6650], [64.1910, -51.6550]], heartRate: 88, battery: "76%", lastPing: "4 sec ago", temp: "-17°C" },
      // Delta Team 
      { id: "OP-09", name: "Cole Briggs", role: "Driver", status: "NOMINAL", coords: [64.1860, -51.6780], path: [[64.1814, -51.6941], [64.1860, -51.6780]], heartRate: 75, battery: "85%", lastPing: "2 sec ago", temp: "-15°C" },
      { id: "OP-10", name: "Anya Kova", role: "Comms Tech", status: "NOMINAL", coords: [64.1875, -51.6760], path: [[64.1850, -51.6800], [64.1875, -51.6760]], heartRate: 71, battery: "92%", lastPing: "1 sec ago", temp: "-14°C" },
      { id: "OP-11", name: "Wei Zhang", role: "Logistics", status: "NOMINAL", coords: [64.1885, -51.6740], path: [[64.1860, -51.6780], [64.1885, -51.6740]], heartRate: 69, battery: "95%", lastPing: "3 sec ago", temp: "-13°C" },
      { id: "OP-12", name: "Jax Miller", role: "Security", status: "NOMINAL", coords: [64.1895, -51.6720], path: [[64.1870, -51.6760], [64.1895, -51.6720]], heartRate: 82, battery: "89%", lastPing: "8 sec ago", temp: "-16°C" }
    ],

    assets: [
      { 
        id: "VHC-01", name: "Snowcat Alpha", type: "Vehicle", status: "DEPLOYED", coords: [64.1860, -51.6780],
        power: 78, condition: "NOMINAL", specs: { model: "Polaris T-90", weight: "4.2T" }, 
        currentLoadout: ["INV-004"], operator: "OP-09 Cole Briggs"
      },
      { 
        id: "VHC-02", name: "Heavy Crawler", type: "Vehicle", status: "MAINTENANCE", coords: [64.1810, -51.6950],
        power: 15, condition: "CRITICAL", specs: { model: "Behemoth IC-4", weight: "12.5T" }, 
        currentLoadout: [], operator: "UNASSIGNED"
      },
      { 
        id: "MCH-88", name: "Thermal Drill V2", type: "Machinery", status: "DEPLOYED", coords: [64.1920, -51.6500],
        power: 85, condition: "NOMINAL", specs: { model: "Core-Drill Mk II", weight: "850kg" }, 
        currentLoadout: [], operator: "OP-07 Tariq Sahir"
      },
      { 
        id: "VHC-03", name: "Scout Snowmobile", type: "Vehicle", status: "DEPLOYED", coords: [64.1890, -51.6650],
        power: 45, condition: "WARNING", specs: { model: "Yamaha Frost-Z", weight: "240kg" }, 
        currentLoadout: ["INV-003"], operator: "OP-03 Marcus Vance"
      }
    ],

    inventory: [
      { id: "INV-001", name: "Standard Rations", category: "Consumables", locationId: "HQ-WH", weight: "500kg" },
      { id: "INV-002", name: "Trauma Med-Kits", category: "Medical", locationId: "HQ-WH", weight: "45kg" },
      { id: "INV-003", name: "Ice Core Samples", category: "Scientific", locationId: "VHC-03", weight: "120kg" },
      { id: "INV-004", name: "Diesel Drums", category: "Fuel", locationId: "VHC-01", weight: "800kg" },
      { id: "INV-005", name: "Hazard Suits V4", category: "Hardware", locationId: "HQ-WH", weight: "110kg" },
      { id: "INV-006", name: "Bio-Waste Sealed", category: "Hazardous", locationId: "HAZ-1", weight: "200kg" }
    ]
  };