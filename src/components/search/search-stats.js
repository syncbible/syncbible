// External dependencies
import React from 'react';

// Internal dependencies.
import styles from './styles.scss';
import SortGroupResults from '../sort-group-results';

const SearchStats = ( { results, data } ) => {
	if ( ! results ) {
		return <p>Stats will appear when you have searched for the word.</p>;
	}

	return (
		<div className={ styles.wordStats }>
			<h2>Stats for { data.version }</h2>
			<SortGroupResults
				results={ results }
				initialGroup="book"
				initialSort="reference"
				supportsWord={ false }
			/>
		</div>
	);
};

export default React.memo( SearchStats );
