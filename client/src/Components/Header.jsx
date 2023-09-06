import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import SearchBar from '../Components/SearchBar/SearchBar';
import SearchResultsList from '../Components/SearchBar/SearchResultsList';
import { Link } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
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
    const [stockData, setStockData] = useState([]);
    const [searchBar, setSearchBar] = useState({});
    const socketUrl = `wss://ws.twelvedata.com/v1/quotes/price?apikey=${apiKey}`;
    const initialMessage = {
        action: 'subscribe',
        params: {
            symbols: 'AAPL,QQQ,ABML,EUR/USD,BTC/USD,BT.A:LSE,VFIAX,IXIC',
        },
    };
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log('WebSocket opened');
            sendJsonMessage(initialMessage);
        },
        shouldReconnect: (closeEvent) => true,
    });

    useEffect(() => {
        if (lastJsonMessage) {
            setStockData((prevData) => [...prevData, lastJsonMessage]);
        }
    }, [lastJsonMessage]);

    const renderMarquee = stockData.length > 0;

    return (
        <HeaderWrapper>
            {renderMarquee && (
                <Marquee
                    pauseOnHover
                    delay={0}
                    gradient
                    gradientColor={[35, 35, 35]}
                    gradientWidth={50}
                    style={{ height: 50 }}
                >
                    {stockData.map((item, index) => (
                        <div key={index}>
                            {item.symbol} |{' '}
                            {item.price
                                ? `Price: ${item.price.toFixed(2)} |`
                                : 'Price: N/A |'}
                            {item.exchange
                                ? `Exchange: ${item.exchange}`
                                : 'Exchange: N/A'}
                            &emsp;
                        </div>
                    ))}
                </Marquee>
            )}

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
                        <SearchResultsList
                            searchBar={searchBar}
                            setSearchBar={setSearchBar}
                        />
                    )}
                </div>
            </NavBar>
        </HeaderWrapper>
    );
}

export default Header;
