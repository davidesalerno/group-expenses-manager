import React from 'react';

const TransactionList = ({ transactions, viewTransaction, editTransaction, deleteTransaction }) => {
    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.name}
                        <button onClick={() => viewTransaction(transaction)}>View</button>
                        <button onClick={() => editTransaction(transaction)}>Edit</button>
                        <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;