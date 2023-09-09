import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import SearchBar from '../Components/SearchBar/SearchBar';
import SearchResultsList from '../Components/SearchBar/SearchResultsList';
import { Link } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { apiKey } from '../api-keys/apiKey';
import {
    NavBar,
    HeaderWrapper,
    Li,
    Banner,
    StyledPrice,
} from './Styles/HeaderStyles';

function Header({ wallet }) {
    const stockHardcode = [
        {
            symbol: 'AAPL',
            price: 0,
        },
        {
            symbol: 'QQQ',
            price: 0,
        },
        {
            symbol: 'ABML',
            price: 0,
        },
        {
            symbol: 'EUR/USD',
            price: 0,
        },
        {
            symbol: 'BTC/USD',
            price: 0,
        },
        {
            symbol: 'BT.A:LSE',
            price: 0,
        },
        {
            symbol: 'VFIAX',
            price: 0,
        },
        {
            symbol: 'IXIC',
            price: 0,
        },
    ];

    const [stockData, setStockData] = useState(stockHardcode);
    const [searchBar, setSearchBar] = useState({});
    const [searchBarInput, setSearchBarInput] = useState('');
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
            setStockData((prevStockData) => {
                const updatedStockData = [...prevStockData];

                const index = updatedStockData.findIndex(
                    (stock) => stock.symbol === lastJsonMessage.symbol,
                );

                if (index !== -1) {
                    const prevPrice = updatedStockData[index].price;
                    const newPrice = lastJsonMessage.price;
                    const change =
                        prevPrice < newPrice
                            ? '#7EDA67'
                            : prevPrice > newPrice
                            ? '#FF5950'
                            : 'whitesmoke';

                    updatedStockData[index] = {
                        ...updatedStockData[index],
                        price: newPrice,
                        exchange: lastJsonMessage.exchange,
                        change: change,
                    };
                }

                return updatedStockData;
            });
        }
    }, [lastJsonMessage]);

    const renderMarquee = stockData.length > 0;

    return (
        <HeaderWrapper>
            {renderMarquee && (
                <Banner>
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
                                <StyledPrice change={item.change}>
                                    {item.price
                                        ? `Price: ${item.price.toFixed(2)} `
                                        : 'Price: N/A '}
                                </StyledPrice>
                                {item.exchange
                                    ? `Exchange: ${item.exchange}`
                                    : 'Exchange: N/A'}
                                &emsp;
                            </div>
                        ))}
                    </Marquee>
                </Banner>
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
                    <Link to="/account"> Account </Link>
                </Li>
                <div>
                    <SearchBar
                        setSearchBar={setSearchBar}
                        searchBarInput={searchBarInput}
                        setSearchBarInput={setSearchBarInput}
                    />
                    {searchBar && searchBar.length > 0 && (
                        <SearchResultsList
                            searchBar={searchBar}
                            setSearchBar={setSearchBar}
                            setSearchBarInput={setSearchBarInput}
                        />
                    )}
                </div>
                <div>
                    Wallet:{' '}
                    <span style={{ color: 'green' }}>
                        {wallet
                            .toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                        $
                    </span>{' '}
                </div>
            </NavBar>
        </HeaderWrapper>
    );
}

export default Header;
