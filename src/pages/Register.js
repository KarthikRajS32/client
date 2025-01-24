import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === values.email);

        if (userExists) {
            message.error('User already exists. Please log in.');
        } else {
            users.push(values);
            localStorage.setItem('users', JSON.stringify(users));
            message.success('Registration successful!');
            navigate('/login');
        }
    };

    return (
        <div className='register-page'>
            <Form layout='vertical' onFinish={handleSubmit}>
                <h1>Register Form</h1>
                <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please enter your username' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please enter your email' }]}>
                    <Input type='email' />
                </Form.Item>
                <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
                    <Input type='password' />
                </Form.Item>
                <div className='d-flex justify-content-between'>
                    <Link to='/login'>Already Registered? Click Here to login</Link>
                    <button className='btn btn-primary'>Register</button>
                </div>
            </Form>
        </div>
    );
};

export default Register;
