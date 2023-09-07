/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import SearchResult from './SearchResult';

const SearchResultsList = ({ searchBar, setSearchBar, setSearchBarInput }) => {
    useEffect(() => {
        document.addEventListener('click', handleEmptySearchResults, true);
    }, []);

    const refOne = useRef(null);

    const handleEmptySearchResults = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setSearchBar([]);
            setSearchBarInput('');
        }
    };

    return (
        <div className="search-results__list" ref={refOne}>
            {searchBar.map((search, i) => {
                return (
                    <SearchResult
                        searchResult={search.description}
                        searchId={search.symbol}
                        key={i}
                    />
                );
            })}
        </div>
    );
};

export default SearchResultsList;
