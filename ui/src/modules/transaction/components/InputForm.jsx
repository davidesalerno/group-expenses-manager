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
        <div class="col-md-4 order-md-1">
            <form onSubmit={handleSubmit}>
                        <div class="col-md-6 mb-3">
                            <label for="amount">Amount:</label>
                            <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleInputChange} class="form-control"/>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="accountId">Account Id:</label>
                            <input type="number" name="accountId" id="accountId" value={formData.accountId} onChange={handleInputChange} class="form-control"/>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="description">Description:</label>
                            <input type="text" name="description" id="description" value={formData.description} onChange={handleInputChange} class="form-control"/>
                        </div>            
                        <div class="col-md-6 mb-3">
                            <label for="type">Type:</label>
                            <input type="text" name="type" id="type" value={formData.type} onChange={handleInputChange} class="form-control" />
                        </div>
                        
                        <div class="col-md-6 mb-3">
                            <label for="date"> Date: </label>
                            <input type="text" name="date" id="date" value={formData.date} onChange={handleInputChange} class="form-control"/>
                        </div>       
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
                    </form>
        </div>
        
    );
};

export default InputForm;