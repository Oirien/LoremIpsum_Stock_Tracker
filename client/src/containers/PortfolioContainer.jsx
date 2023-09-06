/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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
    border-radius: 30%;
`;

const StocksListUl = styled.ul`
    display: flex;
    flex-flow: row wrap;
    height:300px;
    overflow-y: scroll;
    /* border:1px solid red; */
    max-width: 60%;
`;

const StocksListLi = styled.li`
    min-width: 25%;
    /* border:1px solid pink; */
    text-align: center;
    padding-top: 5px;
    background-color: #353535;
    border-radius: 10%;
    margin: 20px;
    &:hover{
        background-color: gold;
        color:black;
    }
`;

const HiddenComponent = styled.div`
    border-radius: 10%;
    align-self: stretch;
    padding: 2%;
    max-width: 50%;
    border:1px solid white;
    margin-left:auto;
    flex: 1;
    background-color: #474747;
`;

function PortfolioContainer() {
    const [isShown, setIsShown] = useState(false);
    const [specificStock, setSpecificStock] = useState('')
    const { userData } = useOutletContext();
    const [items,setItems] = useState([])
    const allStocks = userData[0].stocks.map((stock) => {
        return stock;
    });

    useEffect(() => {
        setItems(allStocks)
    },[])

  console.log(items)


    // const handlePages =(page) =>{
    //     if(page==1){
    //         setItems(allStocks.slice(0,9))
    //     }else if(page == 2){
    //         setItems(allStocks.slice(9,18))
    //     }else if(page == 3){
    //         setItems(allStocks.slice(18,27))
    //     }
    // }

    return (
        <>
            <PortfolioWrapper>
                <FilterArea>
                    <FilterAreaLi onClick={(e)=>handlePages(e.target.value)}  value={1}> Maybe</FilterAreaLi>
                    <FilterAreaLi onClick={(e)=>handlePages(e.target.value)}  value={2}> Filter</FilterAreaLi>
                    <FilterAreaLi onClick={(e)=>handlePages(e.target.value)}  value={3}> Something</FilterAreaLi>
                    <FilterAreaLi onClick={(e)=>handlePages(e.target.value)}  value={4}> Here</FilterAreaLi>
                </FilterArea>

                <StocksListUl>
                    {items.map((item, index) => (
                        <StocksListLi
                            key={index}
                            onMouseEnter={() => {
                                setSpecificStock(index)
                                setIsShown(true)
                            }}
                            onMouseLeave={() => {
                                setSpecificStock('')
                                setIsShown(false)}}
                        >
                            {item.symbol}
                        </StocksListLi>
                    ))}
                </StocksListUl>

                {isShown && (
                    <HiddenComponent>
                        Stock Symbol: {items[specificStock].symbol} <br />
                        Amount Spent: {items[specificStock].amount_spent}$ <br />
                        Stocks owned: {items[specificStock].number_of_stocks_owned}
                    </HiddenComponent>
                )}
            </PortfolioWrapper>
        </>
    );
}

export default PortfolioContainer;
