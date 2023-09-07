/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    PortfolioWrapper,
    FilterArea,
    FilterAreaLi,
    StocksListUl,
    StocksListLi,
    HiddenComponent,
} from '../Components/Styles/PortfolioStyles';
import { newKey } from '../api-keys/apiKey';

function PortfolioContainer() {
    const [isShown, setIsShown] = useState(false);
    const [specificStock, setSpecificStock] = useState(0);
    const { stockCallArray, userData } = useOutletContext();
    const [items, setItems] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [apiSpecificStock, setApiSpecificStock] = useState(null);
    const allStocks = userData[0].stocks.map((stock) => {
        return stock;
    });

    useEffect(() => {
        setItems(allStocks);
    }, []);

    useEffect(() => {
        const fetchStockData = async (symbol) => {
            try {
                const res = await fetch(
                    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${newKey}`,
                );
                const data = await res.json();
                return data;
            } catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error);
                return null;
            }
        };
        const fetchAllStockData = async () => {
            const responses = await Promise.all(
                stockCallArray.map((symbol) => fetchStockData(symbol)),
            );
            setStockData(responses.filter((data) => data !== null));
        };

        fetchAllStockData();
    }, []);

    const apiStockToFind = stockData.find(
        (stock) => stock.ticker === items[specificStock].symbol,
    );

    useEffect(() => setApiSpecificStock(apiStockToFind), [specificStock]);
    console.log(apiSpecificStock);
    return (
        <>
            <PortfolioWrapper>
                <FilterArea>
                    <FilterAreaLi> Maybe</FilterAreaLi>
                    <FilterAreaLi> Filter</FilterAreaLi>
                    <FilterAreaLi> Something</FilterAreaLi>
                    <FilterAreaLi> Here</FilterAreaLi>
                </FilterArea>

                <StocksListUl>
                    {stockData.map((item, index) => {
                        return (
                            <StocksListLi
                                key={index}
                                onMouseEnter={() => {
                                    setSpecificStock(index);
                                    setIsShown(true);
                                }}
                                onMouseLeave={() => {
                                    setSpecificStock(0);
                                    setIsShown(false);
                                }}
                            >
                                <Link
                                    // className="search__result"
                                    className="remove_a_style"
                                    to={`/stocks/${item.ticker}`}
                                >
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>{item.ticker}</p>
                                    </div>
                                </Link>
                            </StocksListLi>
                        );
                    })}
                </StocksListUl>

                {isShown && (
                    <HiddenComponent>
                        Stock Name: {apiSpecificStock.name}
                        <br />
                        Stock Symbol: {items[specificStock].symbol}
                        <br />
                        Amount Spent: {items[specificStock].amount_spent}${' '}
                        <br />
                        Stocks owned:{' '}
                        {items[specificStock].number_of_stocks_owned}
                    </HiddenComponent>
                )}
            </PortfolioWrapper>
        </>
    );
}

export default PortfolioContainer;
