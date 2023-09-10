import styled from 'styled-components';

export const BuySellWrapper = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 10%;
    gap: 1rem;
`;

export const CurrentPrice = styled.p`
    max-width: 20%;
    padding: 1rem;
    margin-left: 1rem;
    display: flex;
    flex-flow: column wrap;
    gap: 15px;
    align-items: flex-start;
    border-radius: 15px;
    border: solid 1px #92cd86;
    height: min-content;
    box-shadow: 0px 0px 8px black;
`;

export const InputNumber = styled.input`
    background-color: white;
    border: none;
    height: 100%;
    font-size: 1rem;
    width: 80px;
    margin: 5px;
    border-radius: 15px;
    text-align: end;
    color: black;
    &:focus {
        outline: none;
    }
`;

export const BuySellButton = styled.button`
    border-radius: 5px;
    border: 1px solid #92cd86;
    &:hover {
        box-shadow: 0px 0px 5px #92cd8645;
    }
    &:active {
        background-color: #92cd8645;
    }
`;
