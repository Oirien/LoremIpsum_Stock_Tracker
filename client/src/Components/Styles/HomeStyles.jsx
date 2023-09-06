import styled from 'styled-components';

export const NewsWrapper = styled.div`
    /* border: 1px solid white; */
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    gap: 2rem;
`;

export const NewsArticle = styled.li`
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

export const ArticleWrapper = styled.div`
    display: Flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const ArticleImage = styled.img`
    max-width: 100%;
    min-width: 100%;
    height: 200px;
`;

export const DateStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    border-radius: 50%;
    padding-right: 1rem;
    padding-top: 5px;
`;

export const SourceInfoWrapper = styled.div`
    border-bottom: 1px solid white;
`;

export const MoreInfoButton = styled.a`
    padding: 5px 10px;
    background-color: #c4c4c4;
    border-radius: 15%;
    font-weight: bold;
    text-decoration: none;
    color: #193214;
    &:hover {
        color: whitesmoke;
        background-color: #264b1f;
    }
`;
