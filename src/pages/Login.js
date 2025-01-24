import React from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === values.email && user.password === values.password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            message.success('Login successful!');
            navigate('/homepage');
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
