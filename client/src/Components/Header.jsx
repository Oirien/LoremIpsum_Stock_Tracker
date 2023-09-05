import React, { useState } from 'react';
import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import SearchBar from '../Components/SearchBar/SearchBar';
import SearchResultsList from '../Components/SearchBar/SearchResultsList';
import { Link } from 'react-router-dom';

const NavBar = styled.nav`
    /* background-color: red; */
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-height: 2rem;
    padding-top: 2rem;
    width: 80%;
    /* background-color: red; */
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-height: 2rem;
    padding-top: 2rem;
    width: 70%;
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 5rem;
`;

const Li = styled.li`
    background-color: #252525;
    font-weight: bold;
    font-size: larger;
    padding: 5px 20px;
    border-radius: 10%;
`;

function Header() {
    const [searchBar, setSearchBar] = useState({});
    const testArrayOne = ['George', 'Rob', 'John'];

    return (
        <HeaderWrapper>
            <Marquee
                pauseOnHover
                gradient
                gradientWidth={50}
                style={{ height: 30 }}
            >
                {testArrayOne.map((item, index) => (
                    <div key={index}>{item} &ensp; &emsp; </div>
                ))}
            </Marquee>
            <Marquee
                pauseOnHover
                delay={0.3}
                gradient
                gradientWidth={50}
                style={{ height: 50 }}
                className="Marquee-styling"
            >
                {testArrayOne.map((item, index) => (
                    <div key={index}>{item} &ensp; &emsp; </div>
                ))}
            </Marquee>
            <NavBar>
                <Li> <Link to="/"> Home  </Link></Li>
                <Li> <Link to="/portfolio">Portfolio</Link> </Li>
                <Li> <Link to="/support"> Support </Link></Li>
                <Li>Else</Li>
                <div>
                    <SearchBar setSearchBar={setSearchBar} />
                    {searchBar && searchBar.length > 0 && (
                        <SearchResultsList searchBar={searchBar} />
                    )}
                </div>
            </NavBar>
        </HeaderWrapper>
    );
}

export default Header;
