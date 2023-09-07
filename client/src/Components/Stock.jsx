import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import axios from 'axios';
import { apiKey } from '../api-keys/apiKey';
import { useOutletContext } from 'react-router-dom';
import Chart from './StockChart';
import {
    StocksWrapper,
    StockInformation,
    GraphSection,
    SpanStyle,
} from './Styles/StockStyles';

function Stock() {
    const [stocksBought, setStocksBought] = useState('');
    const [stocksSold, setStocksSold] = useState('');
    const { symbol } = useParams();
    const { userData } = useOutletContext();

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

        setStocksBought('');
    };

    const handleSellStocks = (e) => {
        e.preventDefault();
        setStocksSold('');
    };

    if (
        userData[0].stocks.map((stock) => {
            stock.symbol === stockIndividualData.symbol;
            return stock.number_of_stocks_owned;
        })
    ) {
        console.log('test');
    }

    const maxSell = userData[0].stocks
        .filter((stock) => stock.symbol === stockIndividualData.symbol)
        .map((y) => y.number_of_stocks_owned);

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

            <div>
                <span>Current Price: {stockIndividualData.close}$</span>
                <div>
                    <form onSubmit={handleBuyStocks}>
                        <input
                            type="number"
                            name="buy-stock"
                            id="buy-stock"
                            style={{ minWidth: '50px' }}
                            min={0}
                            max={Math.floor(
                                userData[0].wallet /
                                    Number(stockIndividualData.close),
                            )}
                            required
                            value={stocksBought}
                            onChange={(e) =>
                                setStocksBought(Number(e.target.value))
                            }
                        />
                        <button>Buy</button>
                    </form>
                </div>

                {maxSell > 1 && (
                    <>
                        <div>
                            <form onSubmit={handleSellStocks}>
                                <input
                                    type="number"
                                    name="sell-stock"
                                    id="sell-stock"
                                    style={{ minWidth: '50px' }}
                                    min={0}
                                    max={maxSell}
                                    required
                                    value={stocksSold}
                                    onChange={(e) =>
                                        setStocksSold(Number(e.target.value))
                                    }
                                />
                                <button>Sell</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Stock;
