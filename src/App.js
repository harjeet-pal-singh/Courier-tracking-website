import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TrackCourier from './pages/TrackCourier';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AddCourier from './pages/AddCourier';
import NotFound from './pages/NotFound';
import Contact from './components/Contact';
import ProtectedRoute from './utils/ProtectedRoute';
import ManageCouriers from './pages/ManageCouriers';
import SettingsPage from './pages/SettingsPage';
import TrackingResult from './components/TrackingResult';
import Logout from './pages/Logout';

const App = () => {
  const location = useLocation();
const hideLayout = ['/dashboard', '/manage-courier','/add-courier', '/login']; // add all dashboard paths
   const hideLayoutt=hideLayout.some(path => location.pathname.startsWith(path))

  return (
    <div>
      { <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track" element={<Home/>} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> 
        <Route path="/add-courier" element={<ProtectedRoute><AddCourier /></ProtectedRoute>} />
        <Route path='/manage-courier' element={<ProtectedRoute><ManageCouriers/></ProtectedRoute>}/>
        <Route path="*" element={<Home />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/track/:trackingId" element={<TrackingResult />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>

      {!hideLayoutt && <Footer />}
    </div>
  );
};

export default App;
