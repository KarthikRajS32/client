import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, message } from 'antd';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { email, password } = values; // Extract email and password from form values

    // Mock authentication logic (replace with real API calls if needed)
    if (email === 'user@example.com' && password === 'password123') {
      const user = { email }; // Mock user data
      localStorage.setItem('user', JSON.stringify(user)); // Save user data in localStorage
      message.success('Login successful!');
      navigate('/homepage'); // Redirect to HomePage after successful login
    } else {
      message.error('Invalid email or password.');
    }
  };

  return (
    <div className='register-page'>
      <Form layout='vertical' onFinish={handleLogin}>
        <h1>Login Form</h1>
        {/* Email Input */}
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input type='email' placeholder='Enter your email' />
        </Form.Item>

        {/* Password Input */}
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input type='password' placeholder='Enter your password' />
        </Form.Item>

        {/* Links and Login Button */}
        <div className='d-flex justify-content-between'>
          <Link to='/register'>Not a user? Click here to register</Link>
          <button className='btn btn-primary' type='submit'>
            Login
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
