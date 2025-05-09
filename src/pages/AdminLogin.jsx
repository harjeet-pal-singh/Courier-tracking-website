import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the styles here

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://courier-tracking-website-t92q.onrender.com/api/login', { username, password });
      localStorage.setItem('token', res.data.token); // save token
      navigate('/dashboard'); // go to dashboard
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="login-container"> {/* Apply container class */}
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
