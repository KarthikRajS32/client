import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
      form.setFieldsValue(loggedInUser);
    }
  }, [form]);

  const handleSaveChanges = (values) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, ...values } : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify({ ...user, ...values }));
    message.success('Profile updated successfully!');
    navigate('/homepage'); // Redirect to the homepage after saving changes
  };

  return (
    <div className="profile-page user">
      <h2 className="text-white">Edit Profile</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSaveChanges}
        initialValues={user}
      >
        <Form.Item
          label={<span style={{ color: 'white' }}>Username</span>}
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input type="text" placeholder="Enter your username" />
        </Form.Item>

        {/* <Form.Item
          label={<span style={{ color: 'white' }}>Email</span>}
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input type="email" placeholder="Enter your email" disabled />
        </Form.Item> */}

        <Form.Item
          label={<span style={{ color: 'white' }}>Password</span>}
          name="password"
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <div>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
