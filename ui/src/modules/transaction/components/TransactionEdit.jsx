import React from 'react';
import InputForm from './InputForm.jsx';

const TransactionEdit = ({ transaction, updateTransaction }) => {
    return (
        <div>
            <h2>Edit Transaction</h2>
            <InputForm initialData={transaction} updateTransaction={updateTransaction} />
        </div>
    );
};

export default TransactionEdit;