// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import InlineResultsToggle from '../inline-results-toggle'
import styles from './styles.scss';
import SortGroupResults from '../sort-group-results/index.js';

const CombinedAll = () => {
	const list = useSelector( state => state.list );

	// duplicated from combined.js.
	let combinedResults = [];
	list.forEach( ( item ) => {
		if ( item.results && item.results.length > 0 ) {
			const resultsArray = item.results.map( ( { reference } ) => reference );
			// Make these results unique.
			const uniqueResults = [ ...new Set( resultsArray ) ];
			combinedResults = combinedResults.concat( uniqueResults );
		}
	} );

	return (
		<div className={ styles.combinedAll }>
			<p>A combination of all the references in the other panels.</p>
			{ combinedResults.length > 0 && <InlineResultsToggle /> }
			<div className={ styles.results }>
				<SortGroupResults results={ combinedResults } initialGroup="verse" initialSort="reference" allowPreview={ true } />
			</div>
		</div>
	);
};

export default React.memo( CombinedAll );
