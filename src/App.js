import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ProfessionsPage from './pages/ProfessionsPage/ProfessionsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<AuthorizationPage />} />
        <Route path="/professions" element={<ProfessionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;