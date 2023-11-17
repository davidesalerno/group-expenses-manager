import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';
import TransactionEdit from './components/TransactionEdit';

function App() {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_ENDPOINT}/all`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Create a new transaction
  const addTransaction = async (transactionData) => {
    try {
      console.log(REACT_APP_API_ENDPOINT);
      const response = await fetch(`${REACT_APP_API_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      const data = await response.json();
      setTransactions([...transactions, data]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Update an existing Transaction
  const updateTransaction = async (transactionData) => {
    try {
      const response = await fetch(`${REACT_APP_API_ENDPOINT}/${transactionData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      const updatedTransaction = await response.json();
      const updatedTransactions = transactions.map((transaction) =>
          transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      );
      setTransactions(updatedTransactions);
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  // Delete a transaction
  const deleteTransaction = async (transactionId) => {
    try {
      await fetch(`${REACT_APP_API_ENDPOINT}/${transactionId}`, {
        method: 'DELETE',
      });
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
      <div>
        <h1>CRUD Application</h1>
        <InputForm addTransaction={addTransaction} updateTransaction={updateTransaction} initialData={{ amount: 0, accountId: 0, description: '', type: '', date: new Date()  }} />
        <TransactionList transactions={transactions} viewTransaction={setSelectedTransaction} editTransaction={setSelectedTransaction} deleteTransaction={deleteTransaction} />
        {selectedTransaction ? (
            <div>
              <TransactionDetail transaction={selectedTransaction} />
              <TransactionEdit transaction={selectedTransaction} updateTransaction={updateTransaction} />
            </div>
        ) : null}
      </div>
  );
}

export default App;
