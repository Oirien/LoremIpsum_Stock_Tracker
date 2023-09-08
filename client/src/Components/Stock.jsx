import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import axios from 'axios';
import { apiKey } from '../api-keys/apiKey';
import { useOutletContext } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Chart from './StockChart';
import {
    StocksWrapper,
    StockInformation,
    GraphSection,
    SpanStyle,
} from './Styles/StockStyles';
import StockBuySell from './StockBuySell';

function Stock() {
    const { symbol } = useParams();
    const { userData } = useOutletContext();
    const queryClient = useQueryClient();

    const fetchAPIData = async () => {
        const res = await axios.get(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`,
        );
        return res.data;
    };

    const fetchGraphData = async () => {
        const res = await axios.get(
            `https://api.twelvedata.com/time_series?interval=1day&symbol=${symbol}&dp=3&apikey=${apiKey}`,
        );
        return res.data;
    };

    const stockQueryKey = ['stockIndividual', symbol];
    const graphQueryKey = ['graph', symbol];

    const {
        data: stockIndividualData,
        error: stockIndividualError,
        isLoading: stockIndividualLoading,
    } = useQuery(stockQueryKey, fetchAPIData);

    const {
        data: graphData,
        error: graphError,
        isLoading: graphLoading,
    } = useQuery(graphQueryKey, fetchGraphData);

    if (stockIndividualLoading || graphLoading) {
        return <div>Loading...</div>;
    }

    if (stockIndividualError) {
        console.error('Database Error:', stockIndividualError);
        return <div>Error fetching user data. Please try again later.</div>;
    }

    if (graphError) {
        console.error('API Error', graphError);
        return <div>Error fetching API data. Please try again later.</div>;
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

                <GraphSection>
                    <Chart graphData={graphData} />
                </GraphSection>
            </StocksWrapper>

            <StockBuySell
                stockIndividualData={stockIndividualData}
                userData={userData}
                queryClient={queryClient}
            ></StockBuySell>
        </>
    );
}

export default Stock;
