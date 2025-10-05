import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principal from './pages/Principal';
import AdminPage from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/invitado/:codigo" element={<Principal />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<Principal />} />
      </Routes>
    </Router>
  );
}

export default App;
