import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaHome, FaTruck, FaUserShield, FaSignOutAlt, FaPlus, FaEdit, FaStore } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Get the current location (for highlighting active link)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Function to apply active styles for the current page
  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#fff' : '#d1d1d1', // White for active link
    backgroundColor: location.pathname === path ? '#007bff' : 'transparent', // Blue background for active item
    padding: '10px',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'background 0.3s, color 0.3s',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });

  return (
    <div
      style={{
        width: isCollapsed ? '80px' : '220px',
        backgroundColor: '#007bff', // Blue color for the sidebar
        color: 'white',
        height: '100vh',
        paddingTop: '20px',
        position: 'sticky',
        top: 0,
        transition: 'width 0.3s ease',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          <FaBars />
        </button>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: isCollapsed ? '10px' : '20px' }}>
        <Link to="/dashboard" style={getLinkStyle('/dashboard')}>
          <FaHome /> {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link to="/add-courier" style={getLinkStyle('/add-courier')}>
        <FaPlus /> {!isCollapsed && <span>Add Courier</span>}
        </Link>
        <Link to="/manage-courier" style={getLinkStyle('/manage-couriers')}>    <FaEdit /> {!isCollapsed && <span>Manage Couriers</span>}
        </Link>
        <Link to="/settings" style={getLinkStyle('/settings')}>
       <FaStore/> {!isCollapsed && <span>Settings</span>}
        </Link>
        <Link to="/Logout" style={getLinkStyle('/logout')}>
          <FaSignOutAlt /> {!isCollapsed && <span>Logout</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
