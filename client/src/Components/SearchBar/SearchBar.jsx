/* eslint-disable react/prop-types */
import React, { useState } from 'react';

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
        <div>
            <input
                type="text"
                placeholder="Type to search..."
                value={searchBarInput}
                onChange={(e) => handleInput(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
