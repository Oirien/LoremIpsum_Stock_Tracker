import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import {
    BasicWrapperDiv,
    FormWrapper,
    ButtonDiv,
    AccSuppButton,
    InputWrapper,
    InputText,
    InputWrapperLarge,
} from '../Components/Styles/SupportAccountStyles';

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
        <>
            <FormWrapper onSubmit={handleEdit}>
                <label htmlFor="username">
                    <span>Username:</span>
                    {/* Regex: Characters or Digits 0-9 or underscore (_), min char 4 max 18 */}
                    <InputWrapper>
                        <InputText
                            type="text"
                            pattern="^[\w]{4,18}$"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputWrapper>
                </label>

                <label htmlFor="email">
                    Email:
                    {/* Regex: (characters + digits + symbols _.-) @ (characters + digits + _.) . (Char + Digits _.)     */}
                    <InputWrapperLarge>
                        <InputText
                            type="text"
                            value={email}
                            required
                            pattern="[\w%.\-]{1,40}@[\w.]{2,20}.[\w.]"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </InputWrapperLarge>
                </label>
                <label htmlFor="billing_address">
                    Billing Address:
                    {/* Regex: Char + digits + commas + Spaces + dots*/}
                    <InputWrapperLarge>
                        <InputText
                            type="text"
                            pattern="^[A-Za-z0-9\s,.]+$"
                            value={billingAddress}
                            required
                            onChange={(e) => setBillingAddress(e.target.value)}
                        />
                    </InputWrapperLarge>
                </label>
                <label htmlFor="phone">
                    Phone:
                    {/* Regex: 10 numbers , cant start with 0 */}
                    <InputWrapper>
                        <InputText
                            type="text"
                            value={phone}
                            required
                            pattern="^\+?\d{0,4}?\s?\d{6,14}$"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </InputWrapper>
                </label>
                <ButtonDiv>
                    <AccSuppButton onClick={() => setEdit(false)}>
                        Cancel Edit
                    </AccSuppButton>
                    <AccSuppButton>Confirm Edit</AccSuppButton>
                </ButtonDiv>
            </FormWrapper>
        </>
    );
}

export default EditAccount;
