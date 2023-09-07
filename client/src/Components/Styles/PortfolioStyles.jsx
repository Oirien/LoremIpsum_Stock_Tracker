import styled from 'styled-components';

export const PortfolioWrapper = styled.div`
    /* border:2px solid yellow; */
    display: flex;
    align-items: center;
    min-height: 100%;
    margin-bottom: 2rem;
`;

export const FilterArea = styled.div`
    min-width: 6rem;
    display: flex;
    flex-flow: column wrap;
    margin-left: 20px;
    gap: 10px;
    /* border: 2px solid red; */
`;

export const FilterAreaLi = styled.li`
    text-align: center;
    margin: 1rem;
    border-radius: 30%;
`;

export const StocksListUl = styled.ul`
    display: flex;
    flex-flow: row wrap;
    height: 300px;
    overflow-y: scroll;
    /* border:1px solid red; */
    max-width: 60%;
`;

export const StocksListLi = styled.li`
    min-width: 25%;
    /* border:1px solid pink; */
    text-align: center;
    padding-top: 5px;
    background-color: #353535;
    border-radius: 10%;
    margin: 20px;
    &:hover {
        background-color: gold;
        color: black;
        a {
            color: black;
        }
    }

    a {
        background-color: inherit;
        text-decoration: none;
    }
`;

export const HiddenComponent = styled.div`
    border-radius: 10%;
    align-self: stretch;
    padding: 2%;
    max-width: 50%;
    border: 1px solid white;
    margin-left: auto;
    flex: 1;
    background-color: #474747;
`;
