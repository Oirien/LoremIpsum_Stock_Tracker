import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import SearchBar from '../Components/SearchBar/SearchBar';
import SearchResultsList from '../Components/SearchBar/SearchResultsList';
import { Link } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { apiKey } from '../api-keys/apiKey';
import { NavBar, HeaderWrapper, Li } from './Styles/HeaderStyles';

function Header() {
    const [stockData, setStockData] = useState([]);
    const [searchBar, setSearchBar] = useState({});
    const [prevPrices, setPrevPrices] = useState({});
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
        let timeout;

        if (lastJsonMessage) {
            timeout = setTimeout(() => {
                const uniqueSymbols = new Set(
                    stockData.map((item) => item.symbol),
                );

                const updatedData = [...stockData];
                const updatedPrevPrices = { ...prevPrices };

                if (!uniqueSymbols.has(lastJsonMessage.symbol)) {
                    updatedData.push(lastJsonMessage);
                    uniqueSymbols.add(lastJsonMessage.symbol);
                } else {
                    updatedData.forEach((item) => {
                        if (item.symbol === lastJsonMessage.symbol) {
                            if (!updatedPrevPrices[item.symbol]) {
                                updatedPrevPrices[item.symbol] = {};
                            }

                            const prevPrice =
                                updatedPrevPrices[item.symbol].price || 0;
                            const currentPrice = lastJsonMessage.price;
                            // DO NOT DELETE
                            // if (prevPrice !== currentPrice) {
                            //     console.log(
                            //         `${item.symbol} price changed from ${prevPrice} to ${currentPrice}`,
                            //     );
                            // }
                            updatedPrevPrices[item.symbol].price = currentPrice;
                        }
                    });
                }

                setStockData(updatedData);
                setPrevPrices(updatedPrevPrices);
            }, 100);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [lastJsonMessage, stockData, prevPrices]);

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
