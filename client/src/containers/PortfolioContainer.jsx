/* eslint-disable react/jsx-key */
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
    StocksListLiText,
} from '../Components/Styles/PortfolioStyles';
import { newKey, apiKey } from '../api-keys/apiKey';
import Sort from '../Components/Sort';

function PortfolioContainer() {
    const [isShown, setIsShown] = useState(false);
    const [specificStock, setSpecificStock] = useState(0);
    const { stockCallArray, userData } = useOutletContext();
    const [items, setItems] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [stockPrice, setStockPrice] = useState([]);
    const [apiSpecificStock, setApiSpecificStock] = useState(null);
    const [apiSpecificStockPrice, setApiSpecificStockPrice] = useState(null);
    const allStocks = userData[0].stocks.map((stock) => {
        return stock;
    });
    const [sortBy, setSortBy] = useState('name');
    const [isAsc, setIsAsc] = useState('true');

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

    useEffect(() => {
        const fetchStockData = async (symbol) => {
            try {
                const res = await fetch(
                    `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`,
                );
                const data = await res.json();
                return { ...data, symbol: symbol };
            } catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error);
                return null;
            }
        };
        const fetchAllStockData = async () => {
            const responses = await Promise.all(
                stockCallArray.map((symbol) => fetchStockData(symbol)),
            );
            setStockPrice(responses.filter((data) => data !== null));
        };

        fetchAllStockData();
    }, []);

    const apiStockToFind = stockData.find(
        (stock) => stock.ticker === items[specificStock].symbol,
    );
    const apiPriceToFind = stockPrice.find(
        (stock) => stock.symbol === items[specificStock].symbol,
    );

    const findTotalValueOfStocks = () => {
        let totalValue = 0;
        stockPrice.forEach((priceData) => {
            const { symbol, price } = priceData;
            const stockInfoItem = items.find((item) => item.symbol === symbol);

            if (stockInfoItem) {
                const totalPrice =
                    parseFloat(price) * stockInfoItem.number_of_stocks_owned;
                totalValue += totalPrice;
            }
        });
        return Number(totalValue.toFixed(2));
    };

    const totalValueOfStocks = findTotalValueOfStocks();

    useEffect(() => setApiSpecificStock(apiStockToFind), [specificStock]);
    useEffect(() => setApiSpecificStockPrice(apiPriceToFind), [specificStock]);
    return (
        <>
            <div
                style={{
                    textAlign: 'start',
                    marginLeft: '13rem',
                    borderBottom: '1px solid #92cd86',
                    width: 'max-content',
                }}
            >
                <p>
                    Total Value Of Portfolio: $
                    {totalValueOfStocks
                        .toString()
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                </p>
                <p></p>
            </div>
            <PortfolioWrapper>
                <FilterArea>
                    <FilterAreaLi> Sort By:</FilterAreaLi>
                    <FilterAreaLi>
                        {' '}
                        <button
                            className={
                                'action-button ' +
                                (sortBy === 'name' && isAsc === 'true'
                                    ? 'action-button-focused'
                                    : '')
                            }
                            onClick={() => {
                                setSortBy('name');
                                setIsAsc('true');
                            }}
                        >
                            Name Asc.
                        </button>{' '}
                    </FilterAreaLi>
                    <FilterAreaLi>
                        {' '}
                        <button
                            className={
                                'action-button ' +
                                (sortBy === 'name' && isAsc === 'false'
                                    ? 'action-button-focused'
                                    : '')
                            }
                            onClick={() => {
                                setSortBy('name');
                                setIsAsc('false');
                            }}
                        >
                            Name Desc.
                        </button>
                    </FilterAreaLi>
                    <FilterAreaLi>
                        {' '}
                        <button
                            className={
                                'action-button ' +
                                (sortBy === 'price' && isAsc === 'true'
                                    ? 'action-button-focused'
                                    : '')
                            }
                            onClick={() => {
                                setSortBy('price');
                                setIsAsc('true');
                            }}
                        >
                            Price Asc.
                        </button>
                    </FilterAreaLi>
                    <FilterAreaLi>
                        {' '}
                        <button
                            className={
                                'action-button ' +
                                (sortBy === 'price' && isAsc === 'false'
                                    ? 'action-button-focused'
                                    : '')
                            }
                            onClick={() => {
                                setSortBy('price');
                                setIsAsc('false');
                            }}
                        >
                            Price Desc.
                        </button>
                    </FilterAreaLi>
                </FilterArea>

                <StocksListUl>
                    <Sort by={sortBy} isasc={isAsc}>
                        {stockData.map((item, index) => {
                            const defaultPrice = 0;
                            item.price =
                                Number(
                                    stockPrice.find(
                                        (stock) => stock.symbol === item.ticker,
                                    )?.price,
                                ) || defaultPrice;

                            return (
                                <StocksListLi
                                    key={index}
                                    item={item}
                                    by={sortBy}
                                    isasc={isAsc}
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
                                        <StocksListLiText>
                                            <h3>{item.name}</h3>
                                            <p>{item.ticker}</p>
                                            <p>
                                                Unit Price:&nbsp;
                                                {
                                                    stockPrice.find(
                                                        (stock) =>
                                                            stock.symbol ===
                                                            item.ticker,
                                                    )?.price
                                                }
                                            </p>
                                        </StocksListLiText>
                                    </Link>
                                </StocksListLi>
                            );
                        })}
                    </Sort>
                </StocksListUl>

                {isShown && apiSpecificStock && (
                    <HiddenComponent>
                        Stock Name: {apiSpecificStock.name}
                        <br />
                        Stock Symbol: {items[specificStock].symbol}
                        <br />
                        Company Expertise: {apiSpecificStock.finnhubIndustry}
                        <br />
                        Company Website: {apiSpecificStock.weburl}
                        <br />
                        Amount Spent: {items[specificStock].amount_spent}${' '}
                        <br />
                        Stocks owned:{' '}
                        {items[specificStock].number_of_stocks_owned}
                        <br />
                        Approximate Value of Stocks Owned:
                        <br />$
                        {(
                            items[specificStock].number_of_stocks_owned *
                            apiSpecificStockPrice.price
                        ).toFixed(2)}
                        <br />
                        Unrealised Profit/Loss: <br />$
                        {(
                            items[specificStock].number_of_stocks_owned *
                                apiSpecificStockPrice.price -
                            items[specificStock].amount_spent
                        ).toFixed(2)}
                        <br />
                        <img
                            src={apiSpecificStock.logo}
                            style={{ borderRadius: '35px' }}
                        />
                    </HiddenComponent>
                )}
            </PortfolioWrapper>
        </>
    );
}

export default PortfolioContainer;
