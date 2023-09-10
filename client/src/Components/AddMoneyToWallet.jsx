import React from 'react';
import { useState } from 'react';
import {
    AccSuppButton,
    FormWrapper,
} from '../Components/Styles/SupportAccountStyles';

function AddMoneyToWallet({ userOne, queryClient, setAddBalanceStatus }) {
    const [wallet, setWallet] = useState(userOne.wallet);
    const [addBalance, setAddBalance] = useState(1);

    const handleAddBalance = (e) => {
        e.preventDefault();

        const newWallet = Number(userOne.wallet) + Number(addBalance);

        const config = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                wallet: newWallet,
            }),
        };

        fetch(`http://localhost:9000/api/users/${userOne._id}`, config)
            .then((res) => res.json())
            .then((data) => queryClient.invalidateQueries('users'));

        setAddBalanceStatus(false);
        setAddBalance(1);
    };
    return (
        <>
            <div>
                <FormWrapper onSubmit={handleAddBalance}>
                    <div>
                        Amount:{' '}
                        <label htmlFor="add-balance">
                            <input
                                type="number"
                                min={1}
                                max={2000000000}
                                value={addBalance}
                                onChange={(e) => setAddBalance(e.target.value)}
                            />
                        </label>
                    </div>
                    <AccSuppButton>Add</AccSuppButton>
                </FormWrapper>
            </div>
        </>
    );
}

export default AddMoneyToWallet;
