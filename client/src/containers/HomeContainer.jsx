import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';

const HomeWrapper = styled.div`
    /* background-color: red; */
    border:2px solid yellow;
    gap: 8rem;
    display: flex;
    align-items: center;
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
    border-radius:30%;
`;

const StocksListUl = styled.ul`
 /* border:1px solid yellow; */
 display: flex;
 flex-flow: wrap;
 margin-left: -100px;
`;

const StocksListLi = styled.li`
    min-width: 25%;
    border:1px solid pink;
    margin: 30px 20px;
`;



const HiddenComponent = styled.div`
    border:1px solid green;
    height: 200px;
`;

function HomeContainer() {

    const [isShown, setIsShown] = useState(false);
    const items = [1,2,3,4,5,6,7,8,9,10]

   
    console.log(isShown)
  return (
    <>
    <HomeWrapper>
        <FilterArea>
            <FilterAreaLi> 1 - 9</FilterAreaLi>
            <FilterAreaLi> 10 - 19</FilterAreaLi>
            <FilterAreaLi> 20 - 29</FilterAreaLi>
        </FilterArea>

        <StocksListUl>
            {items.map((item,index) => 
            <StocksListLi key={index} 
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
                {item}
            </StocksListLi>)}
        </StocksListUl>

        {isShown && 
        <HiddenComponent>
            Hidden
        </HiddenComponent> 
        }
    
    </HomeWrapper>
    
    </>
  )
}

export default HomeContainer