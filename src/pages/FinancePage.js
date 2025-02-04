import React, { useState } from 'react';
import { Progress, Button, Input, message, Modal } from 'antd';
import Layout from '../components/Layout/Layout';

const FinancePage = () => {
  const [goals, setGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState({ name: '', target: '', deadline: '' });
  const [savingsInputs, setSavingsInputs] = useState({}); 

  const handleAddGoal = () => {
    const { name, target, deadline } = currentGoal;

    if (!name || !target || !deadline) {
      message.warning('Please fill in all fields!');
      return;
    }

    const newGoal = { ...currentGoal, saved: 0, id: goals.length + 1 };
    setGoals([...goals, newGoal]);
    setCurrentGoal({ name: '', target: '', deadline: '' });
    setSavingsInputs({ ...savingsInputs, [newGoal.id]: '' }); 
    message.success('Financial goal added successfully!');
  };

  const handleAddSavings = (id) => {
    const amount = parseFloat(savingsInputs[id]);

    if (isNaN(amount) || amount <= 0) {
      message.warning('Please enter a valid amount.');
      return;
    }

    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, saved: goal.saved + amount } : goal
    );

    setGoals(updatedGoals);
    setSavingsInputs({ ...savingsInputs, [id]: '' }); 
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
        const updatedSavingsInputs = { ...savingsInputs };
        delete updatedSavingsInputs[id];
        setSavingsInputs(updatedSavingsInputs);
        message.success('Goal deleted successfully!');
      },
    });
  };

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
                        value={savingsInputs[goal.id] || ''}
                        onChange={(e) =>
                          setSavingsInputs({ ...savingsInputs, [goal.id]: e.target.value })
                        }
                      />
                      <Button
                        type="primary"
                        className="mt-2 me-2"
                        onClick={() => handleAddSavings(goal.id)}
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
