import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { FaPlusCircle } from 'react-icons/fa';
import EditAccount from '../Components/EditAccount';
import AddMoneyToWallet from '../Components/AddMoneyToWallet';

function AccountContainer() {
    const { userData } = useOutletContext();
    const userOne = userData[0];
    const queryClient = useQueryClient();
    const [edit, setEdit] = useState(false);
    const [addBalanceStatus, setAddBalanceStatus] = useState(false);

    return (
        <>

            <h1>Account </h1>

            <span>
                Add Balance{' '}
                <FaPlusCircle
                    onClick={() => setAddBalanceStatus(!addBalanceStatus)}
                />
            </span>
            {addBalanceStatus == true && (
                <AddMoneyToWallet
                    userOne={userOne}
                    setAddBalanceStatus={setAddBalanceStatus}
                    queryClient={queryClient}
                />
            )}

            {edit == false ? (
                <>
                    <ul>
                        <li>Username: {userOne.username}</li>
                        <li>Email: {userOne.email}</li>
                        <li>Billing Address: {userOne.billing_address}</li>
                        <li>Phone: {userOne.phone}</li>
                    </ul>
                    <button onClick={() => setEdit(true)}>
                        Edit Your Account
                    </button>
                </>
            ) : (
                <EditAccount
                    userOne={userOne}
                    queryClient={queryClient}
                    setEdit={setEdit}
                />
            )}

        </>
    );
}

export default AccountContainer;
