import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import {
    BasicWrapperDiv,
    DetailsList,
    DetailUser,
    AccSuppButton,
    BasicTitle,
} from '../Components/Styles/SupportAccountStyles';

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
            <BasicWrapperDiv>
                <BasicTitle>Account </BasicTitle>

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
                        <DetailsList>
                            <DetailUser>
                                Username: {userOne.username}
                            </DetailUser>
                            <DetailUser>Email: {userOne.email}</DetailUser>
                            <DetailUser>
                                Billing Address: {userOne.billing_address}
                            </DetailUser>
                            <DetailUser>Phone: {userOne.phone}</DetailUser>
                        </DetailsList>
                        <AccSuppButton onClick={() => setEdit(true)}>
                            Edit Your Account
                        </AccSuppButton>
                    </>
                ) : (
                    <EditAccount
                        userOne={userOne}
                        queryClient={queryClient}
                        setEdit={setEdit}
                    />
                )}
            </BasicWrapperDiv>
        </>
    );
}

export default AccountContainer;
