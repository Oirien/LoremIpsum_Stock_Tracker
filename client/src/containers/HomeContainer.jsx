import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { newKey } from '../api-keys/apiKey';
import ScrollToTop from 'react-scroll-to-top';

const NewsWrapper = styled.div`
    /* border: 1px solid white; */
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    gap: 2rem;
`;

const NewsArticle = styled.li`
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.8);
    max-width: 30%;
    padding: 2px 5px 20px 5px;
    border-bottom-left-radius: 10%;
    border-bottom-right-radius: 10%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ArticleWrapper = styled.div`
    display: Flex;
    flex-direction: column;
`;

const ArticleImage = styled.img`
    max-width: 100%;
    min-width: 100%;
    height: 200px;
`;

const DateStyle = styled.div`
    /* border: 1px solid white; */
    display: flex;
    justify-content: flex-end;
    border-radius: 50%;
    padding-right: 1rem;
`;

function HomeContainer() {
    dayjs.extend(relativeTime);

    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch(
            `https://finnhub.io/api/v1/news?category=business&token=${newKey}`,
        )
            .then((res) => res.json())
            .then((data) => setNews(data));
    }, []);

    const articles = news.filter((item) => item.headline.includes('stock'));
    console.log(articles);
    return (
        <>
            <NewsWrapper>
                {articles.map((item) => (
                    <NewsArticle key={item.id}>
                        <ArticleWrapper>
                            <ArticleImage src={item.image} alt="" />
                            <h2 style={{ borderBottom: '1px solid grey' }}>
                                {item.headline}
                            </h2>
                            <h4>{item.summary}</h4>
                            <h5>Source: {item.source}</h5>
                            <a href={item.url} target="_blank">
                                More Info
                            </a>
                        </ArticleWrapper>
                        <DateStyle>
                            {dayjs().to(dayjs.unix(item.datetime))}
                        </DateStyle>
                    </NewsArticle>
                ))}
            </NewsWrapper>
            <ScrollToTop
                smooth
                color="black"
                className="scroll-to-top-button"
            />
        </>
    );
}

export default HomeContainer;
