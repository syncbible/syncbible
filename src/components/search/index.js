// External dependencies
import React from 'react';

// Internal dependencies
import SearchForm from './search-form';
import SearchResults from './search-results';
import CombinedResults from '../word-details/combined';

const Search = ( { isActive } ) => {
	return (
		<>
			<SearchForm isActive={ isActive } />
			<SearchResults />
			<CombinedResults type="search" />
		</>
	);
};

export default React.memo( Search );
