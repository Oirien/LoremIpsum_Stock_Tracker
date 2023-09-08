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
    const [stocksBought, setStocksBought] = useState('');
    const [stocksSold, setStocksSold] = useState('');
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

    const handleBuyStocks = (e) => {
        e.preventDefault();

        const stockSymbol = stockIndividualData.symbol;

        const previousStocksAmount = Number(
            userData[0].stocks
                .filter((stock) => stock.symbol === stockIndividualData.symbol)
                .map((stocks_number) => stocks_number.number_of_stocks_owned),
        );
        const newAmountOfStocks = stocksBought + previousStocksAmount;

        const newAmountSpentForStock = Math.round(
            stocksBought * stockIndividualData.close +
                Number(
                    userData[0].stocks
                        .filter(
                            (stock) =>
                                stock.symbol === stockIndividualData.symbol,
                        )
                        .map((amount) => amount.amount_spent),
                ),
        );

        const newStockData = {
            symbol: stockSymbol,
            number_of_stocks_owned: newAmountOfStocks,
            amount_spent: newAmountSpentForStock,
        };

        const newStocks = [
            ...userData[0].stocks.filter(
                (stock) => stock.symbol !== stockSymbol,
            ),
            newStockData,
        ];

        const newLifeTimeSpend = Math.round(
            stocksBought * stockIndividualData.close +
                userData[0].lifetime_spend,
        );

        const newWallet = Math.round(
            userData[0].wallet - stocksBought * stockIndividualData.close,
        );

        const config = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stocks: newStocks,
                lifetime_spend: newLifeTimeSpend,
                wallet: newWallet,
            }),
        };

        console.log(newStocks);
        fetch(`http://localhost:9000/api/users/${userData[0]._id}`, config)
            .then((res) => res.json())
            .then((data) => queryClient.invalidateQueries('users'));

        setStocksBought('');
    };

    const handleSellStocks = (e) => {
        e.preventDefault();

        const stockSymbol = stockIndividualData.symbol;

        const previousStocksAmount = Number(
            userData[0].stocks
                .filter((stock) => stock.symbol === stockIndividualData.symbol)
                .map((stocks_number) => stocks_number.number_of_stocks_owned),
        );
        const newAmountOfStocks = previousStocksAmount - stocksSold;

        const newAmountSpentForStock = Math.round(
            Number(
                userData[0].stocks
                    .filter(
                        (stock) => stock.symbol === stockIndividualData.symbol,
                    )
                    .map((amount) => amount.amount_spent),
            ) -
                stocksSold * stockIndividualData.close,
        );

        const newLifeTimeSpend = Math.round(
            Number(
                userData[0].lifetime_spend -
                    stocksSold * stockIndividualData.close,
            ),
        );

        const newWallet = Math.round(
            Number(userData[0].wallet + stocksSold * stockIndividualData.close),
        );

        if (newAmountOfStocks > 0) {
            const newStockData = {
                symbol: stockSymbol,
                number_of_stocks_owned: newAmountOfStocks,
                amount_spent: newAmountSpentForStock,
            };

            const newStocks = [
                ...userData[0].stocks.filter(
                    (stock) => stock.symbol !== stockSymbol,
                ),
                newStockData,
            ];

            const config = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stocks: newStocks,
                    lifetime_spend: newLifeTimeSpend,
                    wallet: newWallet,
                }),
            };
            fetch(`http://localhost:9000/api/users/${userData[0]._id}`, config)
                .then((res) => res.json())
                .then((data) => queryClient.invalidateQueries('users'));
        } else {
            const newStocks = [
                ...userData[0].stocks.filter(
                    (stock) => stock.symbol !== stockSymbol,
                ),
            ];
            const config = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stocks: newStocks,
                    lifetime_spend: newLifeTimeSpend,
                    wallet: newWallet,
                }),
            };
            fetch(`http://localhost:9000/api/users/${userData[0]._id}`, config)
                .then((res) => res.json())
                .then((data) => queryClient.invalidateQueries('users'));
        }

        console.log(newAmountSpentForStock);

        setStocksSold('');
    };

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
                handleBuyStocks={handleBuyStocks}
                handleSellStocks={handleSellStocks}
                stocksBought={stocksBought}
                stocksSold={stocksSold}
                setStocksBought={setStocksBought}
                setStocksSold={setStocksSold}
                userData={userData}
            />
        </>
    );
}

export default Stock;
