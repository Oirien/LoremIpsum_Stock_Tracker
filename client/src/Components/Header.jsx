import React, { useState } from 'react';
import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import SearchBar from '../Components/SearchBar/SearchBar';
import SearchResultsList from '../Components/SearchBar/SearchResultsList';

const NavBar = styled.nav`
    /* background-color: red; */
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-height: 2rem;
    padding-top: 2rem;
    width: 80%;
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
                <Li>Home</Li>
                <Li>Portfolio</Li>
                <Li>Something</Li>
                <Li>Else</Li>
                <div>
                    <SearchBar
                        searchBar={searchBar}
                        setSearchBar={setSearchBar}
                    />
                    {searchBar && searchBar.length > 0 && (
                        <SearchResultsList searchBar={searchBar} />
                    )}
                </div>
            </NavBar>
        </HeaderWrapper>
    );
}

export default Header;
