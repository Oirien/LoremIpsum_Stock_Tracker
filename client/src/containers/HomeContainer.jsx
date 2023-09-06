import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { newKey } from '../api-keys/apiKey';
import ScrollToTop from 'react-scroll-to-top';
import {
    NewsWrapper,
    NewsArticle,
    ArticleImage,
    ArticleWrapper,
    DateStyle,
    SourceInfoWrapper,
    MoreInfoButton,
} from '../Components/Styles/HomeStyles';

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
    return (
        <>
            <NewsWrapper>
                {articles.map((item) => (
                    <NewsArticle key={item.id}>
                        <ArticleWrapper>
                            <div>
                                <ArticleImage src={item.image} alt="" />
                                <h2 style={{ borderBottom: '1px solid grey' }}>
                                    {item.headline}
                                </h2>
                                <p>{item.summary}</p>
                            </div>
                            <SourceInfoWrapper>
                                <MoreInfoButton href={item.url} target="_blank">
                                    More Info
                                </MoreInfoButton>
                                <h5>Source: {item.source}</h5>
                            </SourceInfoWrapper>
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
