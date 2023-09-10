import React from 'react';
import {
    BasicTitle,
    BasicWrapperDiv,
} from '../Components/Styles/SupportAccountStyles';

function SupportContainer() {
    return (
        <>
            <BasicWrapperDiv>
                <BasicTitle>Customer Support</BasicTitle>
                <ul>
                    <li>Customer Support Email: support@loremipsum.com</li>
                    <li>Customer Support Phone: 07444444444</li>
                </ul>
            </BasicWrapperDiv>
        </>
    );
}

export default SupportContainer;
