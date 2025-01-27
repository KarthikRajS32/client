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
        <div className='register-page bg-r'>
            <Form layout='vertical' onFinish={handleSubmit}>
                <h1 className='text-white'>Register Form</h1>
                <Form.Item
                          label={<span style={{ color: 'white' }}> Username </span>}
                          name='username' rules={[{ required: true, message: 'Please enter your username' }]}>
                        <Input type='usernamae' placeholder='Enter your username' />
                        </Form.Item>
               <Form.Item
                         label={<span style={{ color: 'white' }}> Email </span>}
                         name='email' rules={[{ required: true, message: 'Please enter your email' }]}>
                       <Input type='email' placeholder='Enter your email' />
                       </Form.Item>
                <Form.Item
                          label={<span style={{ color: 'white' }}> Password </span>}
                          name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
                        <Input type='password' placeholder='Enter your password' />
                        </Form.Item>
                <div className='d-flex justify-content-between'>
                    <Link to='/login' className="text-red">Already Registered? Click Here to login</Link>
                    <button className='btn btn-primary'>Register</button>
                </div>
            </Form>
        </div>
    );
};

export default Register;
