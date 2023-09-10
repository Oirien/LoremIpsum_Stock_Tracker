import styled from 'styled-components';

export const BasicWrapperDiv = styled.div`
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const DetailsList = styled.ul`
    /* margin-top: 0.25rem; */
`;

export const DetailUser = styled.li`
    margin-top: 0.25rem;
`;

export const ButtonDiv = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

export const AccSuppButton = styled.button`
    width: 150px;
    border-radius: 25px;
    padding: 0.5rem;
    border: 1px solid #7eda67;
    cursor: pointer;
    &:hover {
        border: none;
        background-color: #7eda67;
        color: black;
    }
    &:active {
        border: 1px solid whitesmoke;
        box-shadow: 0 0 8px whitesmoke;
    }
`;
export const BasicTitle = styled.h1`
    border-bottom: 3px solid #7eda67;
    width: min-content;
`;

export const InputWrapper = styled.div`
    width: 145px;
    height: 1;
    border: none;
    border-radius: 10px;
    padding: 0 0.125rem;
    background-color: white;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 8px black;
`;

export const InputWrapperLarge = styled.div`
    width: 300px;
    height: 2;
    border: none;
    border-radius: 10px;
    padding: 0 0.125rem;
    background-color: white;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 8px black;
`;

export const InputText = styled.input`
    background-color: transparent;
    border: none;
    height: 100%;
    font-size: 1rem;
    width: 100%;
    margin-left: 5px;
    color: black;
    &:focus {
        outline: none;
    }
`;
