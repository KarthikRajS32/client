import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Select, Input, DatePicker, message } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // For navigation
import Layout from '../components/Layout/Layout';

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editable, setEditable] = useState(null);
  const [user, setUser] = useState(null); // Store logged-in user details
  const [isProfileVisible, setIsProfileVisible] = useState(false); // Toggle profile visibility

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleAddEdit = (values) => {
    const updatedTransactions = editable
      ? transactions.map((item) => (item.id === editable.id ? { ...item, ...values } : item))
      : [...transactions, { id: Date.now(), ...values }];

    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    setShowModal(false);
    setEditable(null);
    message.success(editable ? 'Transaction updated!' : 'Transaction added!');
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this transaction?',
      onOk: () => {
        const updatedTransactions = transactions.filter((item) => item.id !== record.id);
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        message.success('Transaction deleted!');
      },
      onCancel: () => {
        message.info('Transaction not deleted.');
      },
      centered: true,
    });
  };

  const columns = [
    { title: 'Date', dataIndex: 'date', render: (text) => new Date(text).toLocaleDateString() },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Category', dataIndex: 'category' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined onClick={() => handleDelete(record)} className="mx-2" />
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div className="content bg-blue">
        <div className="d-flex align-items-center mb-3">
          {/* Profile Icon */}
          <div
            className="icon ms-auto"
            onClick={() => setIsProfileVisible(!isProfileVisible)} // Toggle profile visibility
          >
            <UserOutlined />
          </div>

          {/* Display User Info (Username, Email, Edit Button) */}
          {isProfileVisible && user && (
            <div className="user-info mt-2">
              <div className="username"><strong>Username:</strong> {user.username}</div>
              <div className="email"><strong>Email:</strong> {user.email}</div>
              <Link to="/profile">
                <button className="btn btn-secondary">Edit</button>
              </Link>
            </div>
          )}

          {/* Transactions Title */}
          <h3 className="flex-grow-1 text-center">Transactions</h3>

          {/* Add Transaction Button */}
          <button className="btn btn-primary ms-auto" onClick={() => setShowModal(true)}>
            Add Transaction
          </button>
        </div>

        <Table columns={columns} dataSource={transactions} rowKey="id" pagination={{ pageSize: 6 }} />

        <Modal
          title={editable ? 'Edit Transaction' : 'Add Transaction'}
          open={showModal}
          onCancel={() => {
            setShowModal(false);
            setEditable(null);
          }}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleAddEdit} initialValues={editable}>
            <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Type" name="type" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="entertainment">Entertainment</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <button className="btn btn-primary" type="submit">
              {editable ? 'Update' : 'Add'}
            </button>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default HomePage;
