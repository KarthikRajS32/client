import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Here, you can check the credentials (mock or from a real API)
    if (email === 'user@example.com' && password === 'password123') {
      const user = { email }; // Store user data (simplified here)
      localStorage.setItem('user', JSON.stringify(user)); // Save user in localStorage
      message.success('Login successful!');
      navigate('/homepage'); // Redirect to HomePage after successful login
    } else {
      message.error('Invalid email or password.');
    }
  };

  return (
    <div>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
