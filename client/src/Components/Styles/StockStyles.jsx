import styled from 'styled-components';

export const StocksWrapper = styled.div`
    display: flex;
    gap: 30px;
    min-height: 50vh;
    margin-right: 1rem;
`;

export const StockInformation = styled.div`
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

export const GraphSection = styled.div`
    flex: 1;
`;

export const SpanStyle = styled.span`
    display: flex;
    flex-flow: column;
`;
