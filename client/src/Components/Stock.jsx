import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import axios from 'axios';
import { apiKey, newKey } from '../api-keys/apiKey';
import { useOutletContext } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Chart from './StockChart';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    StocksWrapper,
    StockInformation,
    GraphSection,
    SpanStyle,
} from './Styles/StockStyles';
import {
    NewsWrapper,
    NewsArticle,
    ArticleWrapper,
    ArticleImage,
    DateStyle,
    MoreInfoButton,
    ArticleSummary,
    ArticleTitle,
} from './Styles/HomeStyles';
import StockBuySell from './StockBuySell';

function Stock() {
    const { symbol } = useParams();
    const { userData } = useOutletContext();
    const queryClient = useQueryClient();

    const fetchAPIData = async () => {
        const res = await axios.get(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`,
        );
        return res.data;
    };

    const fetchGraphData = async () => {
        const res = await axios.get(
            `https://api.twelvedata.com/time_series?interval=1day&symbol=${symbol}&dp=3&apikey=${apiKey}`,
        );
        return res.data;
    };

    const stockQueryKey = ['stockIndividual', symbol];
    const graphQueryKey = ['graph', symbol];

    const {
        data: stockIndividualData,
        error: stockIndividualError,
        isLoading: stockIndividualLoading,
    } = useQuery(stockQueryKey, fetchAPIData);

    const {
        data: graphData,
        error: graphError,
        isLoading: graphLoading,
    } = useQuery(graphQueryKey, fetchGraphData);

    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch(
            `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2023-08-01&to=2023-09-08&token=${newKey}`,
        )
            .then((res) => res.json())
            .then((data) => setNews(data));
    }, []);

    if (stockIndividualLoading || graphLoading) {
        return <div>Loading...</div>;
    }

    if (stockIndividualError) {
        console.error('Database Error:', stockIndividualError);
        return <div>Error fetching user data. Please try again later.</div>;
    }

    if (graphError) {
        console.error('API Error', graphError);
        return <div>Error fetching API data. Please try again later.</div>;
    }
    dayjs.extend(relativeTime);

    const articles = news.length >= 12 ? news.slice(0, 12) : news;
    console.log(articles);

    return (
        <>
            <StocksWrapper>
                <StockInformation>
                    <SpanStyle>
                        <span>Name:</span>
                        {stockIndividualData.name}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Symbol:</span>
                        {stockIndividualData.symbol}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Currency: </span>
                        {stockIndividualData.currency}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Exchange: </span>
                        {stockIndividualData.exchange}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Closed at: </span>
                        {stockIndividualData.close}
                    </SpanStyle>
                    <SpanStyle>
                        <span>Percent Change: </span>
                        {stockIndividualData.percent_change}
                    </SpanStyle>
                </StockInformation>

                <GraphSection>
                    <Chart graphData={graphData} />
                </GraphSection>
            </StocksWrapper>

            <StockBuySell
                stockIndividualData={stockIndividualData}
                userData={userData}
                queryClient={queryClient}
            ></StockBuySell>
            <NewsWrapper>
                {articles.map((item) => (
                    <NewsArticle key={item.id}>
                        <ArticleImage src={item.image} alt="" />
                        <ArticleWrapper>
                            <ArticleTitle>{item.headline}</ArticleTitle>

                            <ArticleSummary>{item.summary}</ArticleSummary>
                            <h5
                                style={{
                                    fontWeight: '300',
                                    fontStyle: 'italic',
                                }}
                            >
                                Source: {item.source}
                            </h5>
                            <MoreInfoButton href={item.url} target="_blank">
                                More Info
                            </MoreInfoButton>
                        </ArticleWrapper>
                        <DateStyle>
                            {dayjs().to(dayjs.unix(item.datetime))}
                        </DateStyle>
                    </NewsArticle>
                ))}
            </NewsWrapper>
        </>
    );
}

export default Stock;
