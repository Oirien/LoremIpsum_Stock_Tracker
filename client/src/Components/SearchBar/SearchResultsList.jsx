import React, { useEffect, useRef } from 'react';
import SearchResult from './SearchResult';

const SearchResultsList = ({ searchBar, setSearchBar }) => {
    useEffect(() => {
        document.addEventListener('click', handleEmptySearchResults, true);
    }, []);

    const refOne = useRef(null);

    const handleEmptySearchResults = (e) => {
        if (!refOne.current.contains(e.target)) {
            if (searchBar.length <= 0) {
                console.log('Clicked out');
            } else {
                setSearchBar([]);
            }
        } else {
            console.log('clicked in');
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
