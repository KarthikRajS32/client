import React, { useState } from 'react';
import { Progress, Button, Input, message, Modal } from 'antd';
import { Line } from '@ant-design/charts';
import Layout from '../components/Layout/Layout'; // Import the Layout component

const FinancePage = () => {
  const [goals, setGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState({ name: '', target: '', deadline: '' });
  const [reports, setReports] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddGoal = () => {
    const { name, target, deadline } = currentGoal;

    if (!name || !target || !deadline) {
      message.warning('Please fill in all fields!');
      return;
    }

    setGoals([...goals, { ...currentGoal, saved: 0, id: goals.length + 1 }]);
    setCurrentGoal({ name: '', target: '', deadline: '' });
    message.success('Financial goal added successfully!');
  };

  const handleAddSavings = (id, amount) => {
    if (!amount || amount >= 0) {
      message.warning('Please enter a valid amount.');
      return;
    }

    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, saved: goal.saved + parseFloat(amount) } : goal
    );

    setGoals(updatedGoals);
    message.success('Savings added successfully!');
  };

  const handleDeleteGoal = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this goal?',
      content: 'This action cannot be undone.',
      centered: true,
      okText: 'Yes, Delete',
      cancelText: 'Cancel',
      onOk: () => {
        setGoals(goals.filter((goal) => goal.id !== id));
        message.success('Goal deleted successfully!');
      },
    });
  };

  const generateReports = () => {
    const incomeData = [
      { type: 'January', value: 2000 },
      { type: 'February', value: 2500 },
      { type: 'March', value: 1800 },
      { type: 'April', value: 2700 },
    ];

    const expenseData = [
      { type: 'January', value: 1500 },
      { type: 'February', value: 1800 },
      { type: 'March', value: 1300 },
      { type: 'April', value: 2100 },
    ];

    setReports([
      { title: 'Income Report', data: incomeData },
      { title: 'Expense Report', data: expenseData },
    ]);
    setIsModalVisible(true);
  };

  const chartConfig = (data) => ({
    data,
    xField: 'type',
    yField: 'value',
    point: { size: 5, shape: 'diamond' },
    color: 'blue',
    tooltip: {
      formatter: (item) => ({ name: 'Amount', value: `₹${item.value}` }),
    },
  });

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="text-center">Financial Planning</h2>

        {/* Goal Setting */}
        <div className="card p-3 mb-4">
          <h4>Set Financial Goals</h4>
          <div className="row mb-3">
            <div className="col-md-4">
              <Input
                placeholder="Goal Name"
                value={currentGoal.name}
                onChange={(e) => setCurrentGoal({ ...currentGoal, name: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <Input
                placeholder="Target Amount (₹)"
                value={currentGoal.target}
                type="number"
                onChange={(e) => setCurrentGoal({ ...currentGoal, target: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <Input
                placeholder="Deadline"
                type="date"
                value={currentGoal.deadline}
                onChange={(e) => setCurrentGoal({ ...currentGoal, deadline: e.target.value })}
              />
            </div>
          </div>
          <Button type="primary" onClick={handleAddGoal}>
            Add Goal
          </Button>
        </div>

        {/* Goal Tracking */}
        {goals.length > 0 && (
          <div className="card p-3">
            <h4>Track Your Goals</h4>
            <div className="row">
              {goals.map((goal) => (
                <div key={goal.id} className="col-md-6 mb-3">
                  <div className="card p-3">
                    <h5>{goal.name}</h5>
                    <p>
                      <strong>Target:</strong> ₹{goal.target}
                    </p>
                    <p>
                      <strong>Saved:</strong> ₹{goal.saved}
                    </p>
                    <Progress
                      percent={(goal.saved / goal.target) * 100}
                      status={goal.saved >= goal.target ? 'success' : 'active'}
                    />
                    <div className="mt-2">
                      <Input
                        placeholder="Add Savings (₹)"
                        type="number"
                        className="mb-2"
                        onPressEnter={(e) => handleAddSavings(goal.id, e.target.value)}
                      />
                      <Button
                        type="primary"
                        onClick={() => handleAddSavings(goal.id, goal.saved)}
                        className="mt-2 me-2"
                      >
                        Add Savings
                      </Button>
                      <Button
                        type="danger"
                        style={{ backgroundColor: 'red', color: 'white' }}
                        className="mt-2"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        Delete Goal
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports */}
        {/* <div className="text-center mt-4">
          <Button type="primary" onClick={generateReports}>
            Generate Financial Reports
          </Button>
        </div> */}

        {/* Reports Modal */}
        <Modal
          title="Financial Reports"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {reports.map((report) => (
            <div key={report.title} className="mb-4">
              <h5>{report.title}</h5>
              <Line {...chartConfig(report.data)} />
            </div>
          ))}
        </Modal>

        {/* Notification for No Goals */}
        {goals.length === 0 && (
          <p className="text-center text-muted mt-3">
            No financial goals created yet. Start by setting a goal!
          </p>
        )}
      </div>
    </Layout>
  );
};

export default FinancePage;
