import React from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === values.email && u.password === values.password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user)); 
      message.success('Login successful!');
      navigate('/homepage'); 
    } else {
      message.error('Invalid email or password.');
    }
  };

  return (
    <div className="register-page bg">
      <Form layout="vertical" onFinish={handleSubmit}>
        <h1 className="text-white">Login Form</h1>
        <Form.Item
          label={<span style={{ color: 'white' }}>Email</span>}
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: 'white' }}>Password</span>}
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input type="password" placeholder="Enter your password" />
        </Form.Item>
        <div className="d-flex justify-evenly">
          <Link to="/register" className="text-red">
            Not a user? Click Here to register
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
