import React, { useState } from 'react';
import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import SearchBar from '../Components/SearchBar/SearchBar';
import SearchResultsList from '../Components/SearchBar/SearchResultsList';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { apiKey } from '../api-keys/apiKey';

const NavBar = styled.nav`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-height: 2rem;
    padding-top: 2rem;
    width: 70%;
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 5rem;
    position: relative;
`;

const Li = styled.li`
    background-color: #252525;
    font-weight: bold;
    font-size: larger;
    padding: 5px 20px;
    border-radius: 10%;
`;

function Header() {
    const [searchBar, setSearchBar] = useState({});
    const testArrayOne = ['George', 'Rob', 'John'];

    // const {
    //     data: stockData,
    //     error: stockError,
    //     isLoading: stockIsLoading,
    // } = useQuery('stockData', async () => {
    //     const response = await fetch(
    //         `https://api.twelvedata.com/quote?symbol=CIM,CL,HSY,MCD&exchange=NYSE&apikey=${apiKey}`,
    //     );
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     const jsonData = await response.json();
    //     const dataArray = Object.values(jsonData);
    //     return dataArray;
    // });

    return (
        <HeaderWrapper>
            {/* <Marquee
                pauseOnHover
                gradient
                gradientWidth={50}
                style={{ height: 30 }}
            >
                {stockData &&
                    !stockIsLoading &&
                    !stockError &&
                    stockData.map((item, index) => (
                        <div key={index}>
                            {item.name} ({item.symbol}) | Close: {item.close} |
                            % Change: {item.percent_change}
                            &ensp; &emsp;
                        </div>
                    ))}
            </Marquee> */}

            <Marquee
                pauseOnHover
                delay={0.3}
                gradient
                gradientWidth={50}
                style={{ height: 50 }}
            >
                {testArrayOne.map((item, index) => (
                    <div key={index}>{item} &ensp; &emsp;</div>
                ))}
            </Marquee>

            <NavBar>
                <Li>
                    <Link to="/"> Home </Link>
                </Li>
                <Li>
                    <Link to="/portfolio">Portfolio</Link>
                </Li>
                <Li>
                    <Link to="/support"> Support </Link>
                </Li>
                <Li>
                    <Link to="/stocks"> Stocks </Link>
                </Li>
                <div>
                    <SearchBar setSearchBar={setSearchBar} />
                    {searchBar && searchBar.length > 0 && (
                        // <SearchResultsList searchBar={searchBar} />
                        <SearchResultsList searchBar={searchBar} setSearchBar={setSearchBar}/>
                    )}
                </div>
            </NavBar>
        </HeaderWrapper>
    );
}

export default Header;
