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
        <div className='register-page'>
            <Form layout='vertical' onFinish={handleSubmit}>
                <h1>Login Form</h1>
                <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please enter your email' }]}>
                    <Input type='email' />
                </Form.Item>
                <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
                    <Input type='password' />
                </Form.Item>
                <div className='d-flex justify-content-between'>
                    <Link to='/register'>Not a user? Click Here to register</Link>
                    <button className='btn btn-primary'>Login</button>
                </div>
            </Form>
        </div>
    );
};

export default Login;
