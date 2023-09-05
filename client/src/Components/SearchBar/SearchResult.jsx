import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ searchResult, searchId }) => {
    return (
        <div>
            <Link className="search__result" to={`/stocks/${searchId}`}>
                {searchResult}
            </Link>
        </div>
    );
};

export default SearchResult;
