import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';

const HomeWrapper = styled.div`
    /* border:2px solid yellow; */
    display: flex;
    align-items: center;
    min-height:100%;
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
 display: flex;
 flex-flow: wrap;
`;

const StocksListLi = styled.li`
    min-width: 25%;
    border:1px solid pink;
    margin: 30px 20px;
`;



const HiddenComponent = styled.div`
    border:1px solid green;
    align-self: stretch;
    width: auto;
    flex:1;
   
`;

function HomeContainer() {

    const [isShown, setIsShown] = useState(false);
    const items = [1,2,3,4,5,6,7,8,9,10]

   
  return (
    <>
    <HomeWrapper >
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
            Something <br /> something else <br />
            more than a something else and more
        </HiddenComponent> 
        }
    
    </HomeWrapper>
    
    </>
  )
}

export default HomeContainer