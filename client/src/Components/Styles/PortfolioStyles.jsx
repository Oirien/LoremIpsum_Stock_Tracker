import styled from 'styled-components';

export const PortfolioWrapper = styled.div`
    display: flex;
    margin-bottom: 2rem;
`;

export const FilterArea = styled.div`
    min-width: 6rem;
    display: flex;
    flex-flow: column wrap;
    margin-left: 20px;
    gap: 10px;
    align-self: flex-start;
    position: sticky;
    top: 10em;
`;

export const FilterAreaLi = styled.li`
    text-align: center;
    margin: 1rem;
`;

export const StocksListUl = styled.ul`
    display: flex;
    flex-flow: row wrap;
    max-width: 60%;
    height: fit-content;
`;

export const StocksListLi = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 10rem;
    text-align: center;
    padding: 0.5rem;
    border: solid 1px #7eda67;
    background-color: #353535;
    border-radius: 15px;
    margin: 20px;
    &:hover {
        box-shadow:
            2px 2px 5px #7eda6741,
            -2px -2px 5px #7eda6741,
            -2px 2px 5px #7eda6741,
            2px -2px 5px #7eda6741;
    }
    p,
    h3 {
        margin: 0.5em 0em;
    }

    a {
        background-color: inherit;
        text-decoration: none;
    }
    * {
        background-color: #353535;
    }
`;
export const StocksListLiText = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
`;

export const HiddenComponent = styled.div`
    border-radius: 40px;
    align-self: stretch;
    padding: 2%;
    width: 10em;
    height: 50%;
    border: 1px solid #7eda67;
    margin-left: auto;
    margin-right: 2rem;
    margin-top: 1rem;
    flex: 1;
    background-color: #474747;
    position: sticky;
    top: 10rem;
`;
