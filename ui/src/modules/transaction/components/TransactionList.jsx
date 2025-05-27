import React from 'react';

const TransactionList = ({ transactions, viewTransaction, editTransaction, deleteTransaction }) => {

    return (
        <div class="col-md-6 order-md-2">
            <h3>Transaction List</h3>
            {transactions.length === 0 && <div>No transactions available.</div>}

            {transactions.length > 0 && (
            <ul className="list-group">
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.name}
                        <button className="btn btn-primary" onClick={() => viewTransaction(transaction)}>View</button>
                        <button className="btn btn-primary" onClick={() => editTransaction(transaction)}>Edit</button>
                        <button className="btn btn-primary" onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default TransactionList;