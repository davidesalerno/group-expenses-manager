import React from 'react';

const TransactionDetail = ({ transaction }) => {
    return (
        <div>
            <h2>Transaction Detail</h2>
            <p>Amount: {transaction.amount}</p>
            <p>Account ID: {transaction.accountId}</p>
            <p>Type: {transaction.type}</p>
            <p>Description: {transaction.description}</p>
            <p>Date: {transaction.date}</p>
        </div>
    );
};

export default TransactionDetail;