import React, { useState } from 'react';

const InputForm = ({ addTransaction, updateTransaction, initialData }) => {
    const [formData, setFormData] = useState(initialData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.id) {
            updateTransaction(formData);
        } else {
            addTransaction(formData);
        }
        setFormData({ amount: 0, accountId: 0, description: '', type: '', date: new Date().toISOString().slice(0, 10) });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Amount:
                <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} />
            </label>
            <label>
                Account Id:
                <input type="number" name="accountId" value={formData.accountId} onChange={handleInputChange} />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
            </label>
            <label>
                Type:
                <input type="text" name="type" value={formData.type} onChange={handleInputChange} />
            </label>
            <label>
                Date:
                <input type="text" name="date" value={formData.date} onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default InputForm;