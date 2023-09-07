/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
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

function PortfolioContainer() {
    const [isShown, setIsShown] = useState(false);
    const [specificStock, setSpecificStock] = useState('');
    const { userData } = useOutletContext();
    const [items, setItems] = useState([]);
    const allStocks = userData[0].stocks.map((stock) => {
        return stock;
    });

    useEffect(() => {
        setItems(allStocks);
    }, []);

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
                    {items.map((item, index) => (
                        <StocksListLi
                            key={index}
                            onMouseEnter={() => {
                                setSpecificStock(index);
                                setIsShown(true);
                            }}
                            onMouseLeave={() => {
                                setSpecificStock('');
                                setIsShown(false);
                            }}
                        >
                            <Link
                                // className="search__result"
                                className="remove_a_style"
                                to={`/stocks/${item.symbol}`}
                            >
                                {item.symbol}
                            </Link>
                        </StocksListLi>
                    ))}
                </StocksListUl>

                {isShown && (
                    <HiddenComponent>
                        Stock Symbol: {items[specificStock].symbol} <br />
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
