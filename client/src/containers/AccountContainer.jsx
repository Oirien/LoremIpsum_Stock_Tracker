import React from 'react';
import { useOutletContext } from 'react-router-dom';

function AccountContainer() {
    const { userData } = useOutletContext();
    const userOne = userData[0];
    return (
        <>
            <h1>Account</h1>
            <ul>
                <li>Username: {userOne.username}</li>
                <li>Email: {userOne.email}</li>
                <li>Billing Address: {userOne.billing_address}</li>
                <li>Phone: {userOne.phone}</li>
            </ul>
        </>
    );
}

export default AccountContainer;
