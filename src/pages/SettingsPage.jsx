import React,{useState} from "react";
function SettingsPage(){
    const [username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const handleUpdate = (e) => {
        e.preventDefault();
        // Later: Call API to update admin credentials
        console.log('Updating...', { username, password });
      };
    
      return (
        <div className="settings-container" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
          <h2>Admin Settings</h2>
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Update Username:</label>
              <input 
                type="text" 
                placeholder="New Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Update Password:</label>
              <input 
                type="password" 
                placeholder="New Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <button type="submit" style={{ background: '#007bff', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
              Update Settings
            </button>
          </form>
        </div>
      );
    }
    
    export default SettingsPage;