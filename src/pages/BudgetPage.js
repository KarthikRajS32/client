
import React, { useState } from 'react';
import { Progress, Input, Button, message, Modal } from 'antd';
import Header from '../components/Layout/Header'; // Import your Header component

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]); // List of budgets
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [expenses, setExpenses] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);

  const handleAddBudget = () => {
    if (!category || !limit) {
      message.warning('Please fill in all fields!');
      return;
    }

    const newBudget = {
      id: budgets.length + 1,
      category,
      limit: parseFloat(limit),
      spent: 0,
    };

    setBudgets([...budgets, newBudget]);
    setCategory('');
    setLimit('');
    message.success('Budget added successfully!');
  };

  const handleAddExpense = (id) => {
    const amount = expenses[id] || 0;

    if (amount <= 0) {
      message.warning('Enter a valid expense amount.');
      return;
    }

    const updatedBudgets = budgets.map((budget) => {
      if (budget.id === id) {
        const updatedSpent = budget.spent + parseFloat(amount);

        if (updatedSpent > budget.limit) {
          message.error(`${budget.category} budget limit exceeded!`);
        }

        return {
          ...budget,
          spent: updatedSpent,
        };
      }
      return budget;
    });

    setBudgets(updatedBudgets);
    setExpenses({ ...expenses, [id]: '' });
    message.success('Expense added!');
  };

  const showDeleteModal = (budget) => {
    setBudgetToDelete(budget);
    setIsModalVisible(true);
  };

  const handleDeleteBudget = () => {
    const updatedBudgets = budgets.filter((budget) => budget.id !== budgetToDelete.id);
    setBudgets(updatedBudgets);
    setBudgetToDelete(null);
    setIsModalVisible(false);
    message.success('Budget deleted successfully!');
  };

  const handleCancelDelete = () => {
    setBudgetToDelete(null);
    setIsModalVisible(false);
  };

  return (
    <>
      <Header /> {/* Add the navbar */}
      <div className="container mt-4">
        <h2 className="text-center">Budget Management</h2>

        {/* Budget Creation */}
        <div className="card p-3 mb-4">
          <h4>Create a New Budget</h4>
          <div className="row mb-3">
            <div className="col-md-4">
              <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <Input
                placeholder="Limit (₹)"
                value={limit}
                type="number"
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <Button type="primary" onClick={handleAddBudget}>
                Add Budget
              </Button>
            </div>
          </div>
        </div>

        {/* Budget Monitoring */}
        {budgets.length > 0 && (
          <div className="card p-3">
            <h4>Track Your Budgets</h4>
            <div className="row">
              {budgets.map((budget) => (
                <div key={budget.id} className="col-md-6 mb-3">
                  <div className="card p-3">
                    <h5>{budget.category}</h5>
                    <p>
                      <strong>Limit:</strong> ₹{budget.limit}
                    </p>
                    <p>
                      <strong>Spent:</strong> ₹{budget.spent}
                    </p>
                    <Progress
                      percent={(budget.spent / budget.limit) * 100}
                      status={
                        budget.spent > budget.limit ? 'exception' : 'active'
                      }
                    />
                    <div className="mt-3">
                      <Input
                        placeholder="Add Expense (₹)"
                        type="number"
                        value={expenses[budget.id] || ''}
                        onChange={(e) =>
                          setExpenses({ ...expenses, [budget.id]: e.target.value })
                        }
                      />
                      <Button
                        type="primary"
                        className="mt-2 me-2"
                        onClick={() => handleAddExpense(budget.id)}
                      >
                        Add Expense
                      </Button>
                      <Button
                        style={{ backgroundColor: 'red', color: 'white' }}
                        className="mt-2"
                        onClick={() => showDeleteModal(budget)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notification for No Budgets */}
        {budgets.length === 0 && (
          <p className="text-center text-muted mt-3">
            No budgets created yet. Start by adding a budget!
          </p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDeleteBudget}
        onCancel={handleCancelDelete}
        centered
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete the budget for "{budgetToDelete?.category}"?</p>
      </Modal>
    </>
  );
};

export default BudgetPage;
