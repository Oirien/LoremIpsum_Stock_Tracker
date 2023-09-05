import React from 'react';
import SearchResult from './SearchResult';

const SearchResultsList = ({ searchBar }) => {
    return (
        <div className="search-results__list">
            {searchBar.map((search, i) => {
                return (
                    <SearchResult
                        searchResult={search.name}
                        searchId={search._id}
                        key={i}
                    />
                );
            })}
        </div>
    );
};

export default SearchResultsList;
