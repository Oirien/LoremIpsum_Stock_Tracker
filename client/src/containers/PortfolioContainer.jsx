/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const PortfolioWrapper = styled.div`
    /* border:2px solid yellow; */
    display: flex;
    align-items: center;
    min-height: 100%;
    margin-bottom: 2rem;
`;

const FilterArea = styled.div`
    min-width: 6rem;
    display: flex;
    flex-flow: column wrap;
    margin-left: 20px;
    gap: 10px;
    /* border: 2px solid red; */
`;

const FilterAreaLi = styled.li`
    text-align: center;
    margin: 1rem;
    border: 1px solid white;
    border-radius: 30%;
`;

const StocksListUl = styled.ul`
    display: flex;
    flex-flow: wrap;
`;

const StocksListLi = styled.li`
    min-width: 25%;
    /* border:1px solid pink; */
    text-align: center;
    padding-top: 5px;
    background-color: #353535;
    border-radius: 10%;
    margin: 20px 20px;
`;

const HiddenComponent = styled.div`
    border-radius: 10%;
    align-self: stretch;
    padding: 2%;
    width: auto;
    flex: 1;
    background-color: #474747;
`;

function PortfolioContainer() {
    const [isShown, setIsShown] = useState(false);
    const { userData } = useOutletContext();
    const items = userData[0].stocks.map((stock) => {
        return stock.symbol;
    });

    return (
        <>
            <PortfolioWrapper>
                <FilterArea>
                    <FilterAreaLi> 1 - 9</FilterAreaLi>
                    <FilterAreaLi> 10 - 19</FilterAreaLi>
                    <FilterAreaLi> 20 - 29</FilterAreaLi>
                </FilterArea>

                <StocksListUl>
                    {items.map((item, index) => (
                        <StocksListLi
                            key={index}
                            onMouseEnter={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}
                        >
                            {item}
                        </StocksListLi>
                    ))}
                </StocksListUl>

                {isShown && (
                    <HiddenComponent>
                        Something <br /> something else <br />
                        more than a something else and more
                    </HiddenComponent>
                )}
            </PortfolioWrapper>
        </>
    );
}

export default PortfolioContainer;
