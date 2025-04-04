import React from 'react';

const TransactionList = ({ transactions, viewTransaction, editTransaction, deleteTransaction }) => {
    return (
        <div class="col-md-8 order-md-2 mb-2">
            <h2>Transaction List</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.name}
                        <button className="btn btn-primary" onClick={() => viewTransaction(transaction)}>View</button>
                        <button className="btn btn-primary" onClick={() => editTransaction(transaction)}>Edit</button>
                        <button className="btn btn-primary" onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;