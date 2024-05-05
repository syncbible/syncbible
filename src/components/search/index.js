// External dependencies
import React from 'react';

// Internal dependencies
import ListHeader from '../list-header';
import SearchForm from './search-form';
import SearchResults from './search-results';
import CombinedResults from '../word-details/combined';

const Search = ( { isActive } ) => {
	return (
		<>
			<ListHeader tray="search" />
			<SearchForm isActive={ isActive } />
			<SearchResults />
			<CombinedResults type="search" />
		</>
	);
};

export default React.memo( Search );
