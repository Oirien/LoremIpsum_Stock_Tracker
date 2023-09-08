import React from 'react';
import { useState } from 'react';

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
                <form onSubmit={handleAddBalance}>
                    Amount:{' '}
                    <label htmlFor="add-balance">
                        <input
                            type="number"
                            min={1}
                            value={addBalance}
                            onChange={(e) => setAddBalance(e.target.value)}
                        />
                    </label>
                    <button>Add</button>
                </form>
            </div>
        </>
    );
}

export default AddMoneyToWallet;