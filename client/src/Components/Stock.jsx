import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import axios from 'axios';
import { apiKey } from '../api-keys/apiKey';

const StocksWrapper = styled.div`
    border: 1px solid red;
    display: flex;
    gap: 30px;
    min-height: 50vh;
`;

const StockInformation = styled.div`
    border: 3px solid yellow;
    max-width: 20%;
    padding: 4px 8px;
    display: flex;
    flex-flow: column wrap;
    gap: 15px;
    align-items: flex-start;
`;

const GraphSection = styled.div`
    border: 2px solid green;
    flex: 1;
`;

const SpanStyle = styled.span`
    display: flex;
    flex-flow: column;
`;

function Stock() {
    const { symbol } = useParams();

    const fetchAPIData = async () => {
        const res = await axios.get(
            `https://api.twelvedata.com/quote?symbol=${symbol}&exchange=NYSE&apikey=${apiKey}`,
        );
        return res.data;
    };

    const fetchGraphData = async () => {
        const res = await axios.get(
            `https://api.twelvedata.com/time_series?interval=1day&symbol=${symbol}&exchange=NYSE&apikey=${apiKey}`,
        );
        return res.data;
    };

    const {
        data: stockIndividualData,
        error: stockIndividualError,
        isLoading: stockIndividualLoading,
    } = useQuery('stockIndividual', fetchAPIData);

    const {
        data: graphData,
        error: graphError,
        isLoading: graphLoading,
    } = useQuery('graph', fetchGraphData);

    const stock = {
        symbol: '020Y',
        name: 'iShares IV Public Limited Company - iShares Euro Government Bond 20yr Target Duration UCITS ETF',
        currency: 'EUR',
        exchange: 'LSE',
        mic_code: 'XLON',
        country: 'United Kingdom',
        type: 'Common Stock',
    };
    if (stockIndividualLoading) {
        return <div>Loading...</div>;
    }

    if (stockIndividualError) {
        console.error('Database Error:', stockIndividualError);
        return <div>Error fetching user data. Please try again later.</div>;
    }
    return (
        <>
            <StocksWrapper>
                <StockInformation>
                    <SpanStyle>
                        <span>Name:</span>
                        {stockIndividualData.name}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Symbol:</span>
                        {stockIndividualData.symbol}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Currency: </span>
                        {stockIndividualData.currency}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Exchange: </span>
                        {stockIndividualData.exchange}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Closed at: </span>
                        {stockIndividualData.close}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Percent Change: </span>
                        {stockIndividualData.percent_change}
                    </SpanStyle>
                </StockInformation>

                <GraphSection>Stock Graph</GraphSection>
            </StocksWrapper>
        </>
    );
}

export default Stock;
