/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { InputWrapper, InputText } from '../Styles/SearchBarStyles';

const SearchBar = ({ setSearchBar, searchBarInput, setSearchBarInput }) => {
    const fetchData = (value) => {
        value.length > 0
            ? fetch(`http://localhost:9000/api/stocks/search?q=${value}`)
                  .then((res) => res.json())
                  .then((data) => setSearchBar(data))
            : setSearchBar([]);
    };

    const handleInput = (value) => {
        setSearchBarInput(value);
        fetchData(value);
    };

    return (
        <InputWrapper>
            <InputText
                type="text"
                placeholder="Type to find stocks..."
                value={searchBarInput}
                onChange={(e) => handleInput(e.target.value)}
            />
        </InputWrapper>
    );
};

export default SearchBar;
