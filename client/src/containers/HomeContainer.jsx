import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { newKey } from '../api-keys/apiKey';
import ScrollToTop from 'react-scroll-to-top';
import {
    NewsWrapper,
    NewsArticle,
    ArticleWrapper,
    ArticleImage,
    DateStyle,
    MoreInfoButton,
    HeroWrapper,
    HeroImg,
    HeroRight,
    HeroTitle,
    HeroTitleSpan,
    HeroParaSpan,
} from '../Components/Styles/HomeStyles';
import logo from '../assets/lorem-Ipsum-Logo.png';

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
            <HeroWrapper>
                <HeroImg src={logo} />
                <HeroRight>
                    <HeroTitle>
                        <HeroTitleSpan>Lorem</HeroTitleSpan>Ipsum
                    </HeroTitle>
                    <p>
                        Do you speak pseudo-latin?{' '}
                        <HeroParaSpan>We do!</HeroParaSpan>
                    </p>
                </HeroRight>
            </HeroWrapper>
            <NewsWrapper>
                {articles.map((item) => (
                    <NewsArticle key={item.id}>
                        <ArticleImage src={item.image} alt="" />
                        <ArticleWrapper>
                            <h2
                                style={{
                                    borderBottom: '1px solid grey',
                                    paddingBottom: '1rem',
                                }}
                            >
                                {item.headline}
                            </h2>

                            <h4 style={{ fontWeight: '200' }}>
                                {item.summary}
                            </h4>
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
            <ScrollToTop
                smooth
                color="black"
                className="scroll-to-top-button"
            />
        </>
    );
}

export default HomeContainer;
