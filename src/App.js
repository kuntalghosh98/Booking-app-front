import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Availability from './pages/Availability';
import Bookings from './pages/Bookings';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch business data
    const fetchBusiness = async () => {
      try {
        const response = await fetch('/api/business');
        const data = await response.json();
        setBusiness(data);
      } catch (error) {
        console.error('Error fetching business:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navbar business={business} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard business={business} />} />
            <Route path="/availability" element={<Availability business={business} />} />
            <Route path="/bookings" element={<Bookings business={business} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;