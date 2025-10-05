import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principal from './pages/Principal';
import AdminPage from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Definimos las rutas con "element" */}
        <Route path="/invitado/:codigo" element={<Principal />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
