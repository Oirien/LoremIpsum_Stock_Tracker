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
    box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.4);
    max-width: 30%;
    padding-bottom: 20px;
    border-radius: 0 0 25px 25px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: solid 1px #92cd86;
    background-color: #474747;
`;

const ArticleWrapper = styled.div`
    display: Flex;
    flex-direction: column;
    padding: 0.5rem;
    background-color: #474747;
`;

const ArticleImage = styled.img`
    width: 100%;
    height: 200px;
    border-bottom: solid 1px #92cd86;
`;

const DateStyle = styled.div`
    /* border: 1px solid white; */
    display: flex;
    justify-content: flex-end;
    border-radius: 50%;
    padding-right: 1rem;
    background-color: #474747;
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

    const articles = news
        .filter((item) => item.headline.includes('stock'))
        .slice(0, 12);
    console.log(articles);
    return (
        <>
            <NewsWrapper>
                {articles.map((item) => (
                    <NewsArticle key={item.id}>
                        <ArticleImage src={item.image} alt="" />
                        <ArticleWrapper>
                            <h2
                                style={{
                                    borderBottom: '1px solid grey',
                                    paddingBottom: '1rem',
                                    backgroundColor: '#474747',
                                }}
                            >
                                {item.headline}
                            </h2>
                            <h4 style={{ backgroundColor: '#474747' }}>
                                {item.summary}
                            </h4>
                            <h5 style={{ backgroundColor: '#474747' }}>
                                Source: {item.source}
                            </h5>
                            <a
                                style={{ backgroundColor: '#474747' }}
                                href={item.url}
                                target="_blank"
                            >
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
