import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaseList from './pages/CaseList';
import CaseDetail from './pages/CaseDetail';
import SubmitReport from './pages/SubmitReport';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Navigation from './components/Navigation';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<CaseList />} />
          <Route path="/case/:id" element={<CaseDetail />} />
          <Route path="/submit" element={<SubmitReport />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
