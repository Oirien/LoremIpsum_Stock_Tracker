import styled from 'styled-components';

export const NavBar = styled.nav`
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 2rem;
    padding: 1rem;
    width: 100vw;
    gap: 1rem;
    border-bottom: 1px solid #92cd86;
    box-shadow: 5px 0px 5px #92cd86;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 5rem;
    position: fixed;
    top: 0;
    @media all and (max-width: 1400px) and (min-width: 500px) {
        margin-bottom: 2.5rem;
    }
    z-index: 9999;
`;

export const Li = styled.li`
    background-color: transparent;
    font-weight: bold;
    font-size: larger;
    padding: 5px 20px;
    margin-left: 5px;
    border-left: solid 5px transparent;
    &:hover {
        border-left: 5px solid #92cd86;
    }
`;

export const Banner = styled.div`
    border-bottom: 1px solid #92cd86;
`;
