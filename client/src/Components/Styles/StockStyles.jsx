import styled from 'styled-components';

export const StocksWrapper = styled.div`
    display: flex;
    gap: 30px;
    min-height: 50vh;
`;

export const StockInformation = styled.div`
    max-width: 20%;
    padding: 4px 8px;
    display: flex;
    flex-flow: column wrap;
    gap: 15px;
    align-items: flex-start;
`;

export const GraphSection = styled.div`
    border: 2px solid green;
    flex: 1;
`;

export const SpanStyle = styled.span`
    display: flex;
    flex-flow: column;
`;
