import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Header from './Components/Header';
import HomeContainer from './containers/HomeContainer';

const fetchDBData = async () => {
    const res = await axios.get('http://localhost:9000/api/users/');
    return res.data;
};

const fetchAPIData = async () => {
    const res = await axios.get(
        'https://api.twelvedata.com/stocks?exchange=LSE',
    );
    return res.data;
};

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

    return <>
    
    <Header />

    <HomeContainer />
    
    {stockData.data[0].name}</>;
}

export default App;
