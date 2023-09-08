import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const fetchDBData = async () => {
    const res = await axios.get('http://localhost:9000/api/users/');
    return res.data;
};

const fetchAPIData = async () => {
    const res = await axios.get('http://localhost:9000/api/stocks/');
    return res.data;
};

const Container = styled.div`
    /* margin-left: 15%;
    margin-right: 15%; */
`;

function App() {
    const {
        data: userData,
        error: userError,
        isLoading: userLoading,
    } = useQuery('users', fetchDBData);
    const {
        data: stockData,
        error: stockError,
        isLoading: stockLoading,
    } = useQuery('stocks', fetchAPIData);

    if (userLoading || stockLoading) {
        return <div>Loading...</div>;
    }

    if (userError) {
        console.error('Database Error:', userError);
        return <div>Error fetching user data. Please try again later.</div>;
    }

    if (stockError) {
        console.error('API Error:', stockError);
        return <div>Error fetching stock data. Please try again later.</div>;
    }

    if (!stockData || stockData.length === 0) {
        return <div>No stock data available.</div>;
    }
    console.log('userData', userData);

    const stockCallArray = userData[0].stocks.map((stock) => stock.symbol);

    return (
        <>
            <Header wallet={userData[0].wallet} />

            <Container className="resolution">
                <div className="topSpacing">
                    <Outlet
                        context={{
                            userData: userData,
                            stockCallArray: stockCallArray,
                        }}
                    />
                </div>
            </Container>
        </>
    );
}

export default App;
