import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const FormItemStyle = styled.div`
    background-color: red;
`;

function EditAccount({ userOne, queryClient, setEdit }) {
    const [name, setName] = useState(userOne.username);
    const [email, setEmail] = useState(userOne.email);
    const [phone, setPhone] = useState(userOne.phone);
    const [billingAddress, setBillingAddress] = useState(
        userOne.billing_address,
    );
    const handleEdit = (e) => {
        e.preventDefault();

        const config = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: name,
                email: email,
                billing_address: billingAddress,
                phone: phone,
            }),
        };

        fetch(`http://localhost:9000/api/users/${userOne._id}`, config)
            .then((res) => res.json())
            .then((data) => queryClient.invalidateQueries('users'));

        setEdit(false);
    };

    return (
        <div>
            <form onSubmit={handleEdit}>
                <label htmlFor="username">
                    <span>Username</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label htmlFor="email">
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="phone">
                    Phone
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
                <label htmlFor="billing_address">
                    Billing Address
                    <input
                        type="text"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                    />
                </label>

                <button>Confirm Edit</button>
            </form>
            <button onClick={() => setEdit(false)}>Cancel Edit</button>
        </div>
    );
}

export default EditAccount;
