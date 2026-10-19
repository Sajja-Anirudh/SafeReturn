import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { connectDB } from './services/db/dbConnector';

// Page Imports
import Dashboard from './pages/Dashboard';
import Personnel from './pages/Personnel';
import MapTracker from './pages/MapTracker';
import Evacuation from './pages/Evacuation';
import Comms from './pages/Comms';
import Cargo from './pages/Cargo';
import Inventory from './pages/Inventory';

// Initialize mock DB on startup
connectDB();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="personnel" element={<Personnel />} />
          <Route path="map" element={<MapTracker />} />
          <Route path="cargo" element={<Cargo />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="evacuation" element={<Evacuation />} />
          <Route path="comms" element={<Comms />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;