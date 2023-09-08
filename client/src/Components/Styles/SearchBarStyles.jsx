import styled from 'styled-components';

export const InputWrapper = styled.div`
    width: 250px;
    height: 2rem;
    border: none;
    border-radius: 10px;
    padding: 0 5px;
    background-color: white;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 8px black;
`;

export const InputText = styled.input`
    background-color: transparent;
    border: none;
    height: 100%;
    font-size: 1.25rem;
    width: 100%;
    margin-left: 5px;
    color: black;
    &:focus {
        outline: none;
    }
`;
