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
    height: 600px;
    overflow-y: scroll;
    /* border:1px solid red; */
    max-width: 60%;
`;

export const StocksListLi = styled.li`
    width: 25%;
    height: 30%;
    /* border:1px solid pink; */
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
    max-width: 20%;
    height: 50%;
    border: 1px solid #7eda67;
    margin-left: auto;
    margin-right: auto;
    flex: 1;
    background-color: #474747;
`;
