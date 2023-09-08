import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

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
                    {/* Regex: Characters or Digits 0-9 or underscore (_), min char 4 max 18 */}
                    <input
                        type="text"
                        pattern="^[\w]{4,18}$"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label htmlFor="email">
                    Email
                    {/* Regex: (characters + digits + symbols _.-) @ (characters + digits + _.) . (Char + Digits _.)     */}
                    <input
                        type="text"
                        value={email}
                        required
                        pattern="[\w%.\-]{1,40}@[\w.]{2,20}.[\w.]"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </label>
                <label htmlFor="phone">
                    Phone
                    {/* Regex: 10 numbers , cant start with 0 */}
                    <input
                        type="text"
                        value={phone}
                        required
                        pattern="^[1-9]\d{9}$"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
                <label htmlFor="billing_address">
                    Billing Address
                    {/* Regex: Char + digits + commas + Spaces + dots*/}
                    <input
                        type="text"
                        pattern="^[A-Za-z0-9\s,.]+$"
                        value={billingAddress}
                        required
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
