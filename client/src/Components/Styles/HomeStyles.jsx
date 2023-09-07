import styled from 'styled-components';

export const NewsWrapper = styled.div`
    /* border: 1px solid white; */
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    gap: 2rem;
`;

export const NewsArticle = styled.li`
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

export const ArticleWrapper = styled.div`
    display: Flex;
    flex-direction: column;
    padding: 0.5rem;
    background-color: #474747;
    * {
        background-color: #474747;
    }
`;

export const ArticleImage = styled.img`
    width: 100%;
    height: 200px;
    border-bottom: solid 1px #92cd86;
`;

export const DateStyle = styled.div`
    /* border: 1px solid white; */
    display: flex;
    justify-content: flex-end;
    border-radius: 50%;
    padding-right: 1rem;
    background-color: #474747;
`;

export const MoreInfoButton = styled.a`
    padding: 5px 10px;
    width: 30%;
    align-self: center;
    background-color: #c4c4c4;
    border-radius: 25px;
    font-weight: bold;
    text-decoration: none;
    color: #193214;
    &:hover {
        color: whitesmoke;
        background-color: #264b1f;
    }
`;
