import styled from 'styled-components';

export const NavBar = styled.nav`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-height: 2rem;
    padding-top: 2rem;
    width: 70%;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 5rem;
    position: relative;
`;

export const Li = styled.li`
    background-color: #252525;
    font-weight: bold;
    font-size: larger;
    padding: 5px 20px;
    border-radius: 10%;
`;
