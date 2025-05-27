import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import TransactionDetail from './components/TransactionDetail.jsx';
import TransactionEdit from './components/TransactionEdit.jsx';
import i18n from  '../../i18n/index.jsx';

const  TransactionApp = () => {
    const { VITE_API_ENDPOINT } = import.meta.env;
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Fetch transactions on component mount
    useEffect(() => {
        fetchTransactions();
    });

    // Fetch transactions from API
    const fetchTransactions = async () => {
        try {
            const response = await fetch(`${VITE_API_ENDPOINT}/all`);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    // Create a new transaction
    const addTransaction = async (transactionData) => {
        try {
            console.log(VITE_API_ENDPOINT);
            const response = await fetch(`${VITE_API_ENDPOINT}`, {
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
            const response = await fetch(`${VITE_API_ENDPOINT}/${transactionData.id}`, {
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
            await fetch(`${VITE_API_ENDPOINT}/${transactionId}`, {
                method: 'DELETE',
            });
            const updatedTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
            setTransactions(updatedTransactions);
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return (
        <div className="py-5 container">
                <div class="mb-5 ©row">
                    <TransactionList transactions={transactions} viewTransaction={setSelectedTransaction} editTransaction={setSelectedTransaction} deleteTransaction={deleteTransaction} />
                    {selectedTransaction ? (
                        <div>
                            <TransactionDetail transaction={selectedTransaction} />
                            <TransactionEdit transaction={selectedTransaction} updateTransaction={updateTransaction} />
                        </div>
                    ) : null}
                    <InputForm addTransaction={addTransaction} updateTransaction={updateTransaction} initialData={{ amount: 0, accountId: 0, description: '', type: '', date: new Date()  }} />
                </div>
        </div>
    );
}

export default TransactionApp;
