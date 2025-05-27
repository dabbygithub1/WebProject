import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ProfessionsPage from './pages/ProfessionsPage/ProfessionsPage';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ContactsPage from './pages/ContactsPage/ContactsPage';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<AuthorizationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/professions" element={<ProfessionsPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </Router>
  );
}

export default App;