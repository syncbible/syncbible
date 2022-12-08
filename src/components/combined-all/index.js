// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countBy } from 'lodash';

// Internal dependencies
import SearchLink from '../search/search-link';
import { getReferenceFromSearchResult, sortCountedReferences } from '../../lib/reference.js'
import InlineResultsToggle from '../inline-results-toggle'
import styles from './styles.scss';

const CombinedAll = () => {
	const list = useSelector( state => state.list );
	let combined = [];
	list.forEach( ( item ) => {
		let results = item.results;
		if ( item.results && ! item.results.length ) {
			results = Object.keys( item.results );
		}
		const uniqueResults = [ ...new Set( results ) ];
		combined = combined.concat( uniqueResults );
	} );

	const countedResults = countBy( combined );
	const countedResultsArray = Object.keys( countedResults ).map(key => ({ key, value: countedResults[key] }));
	const sortedResults = countedResultsArray.sort( sortCountedReferences );

	const combinedResults = sortedResults.map( ( result, index ) => {
		return <SearchLink key={ index } index={ index } referenceString={ result.key } wordId={ result.id } count={ result.value } />
	} );

	return (
		<div className={ styles.combinedAll }>
			<p>A combination of all the references in the other panels.</p>
			{ combinedResults.length > 0 && <InlineResultsToggle /> }
			{ combinedResults && <ol className={ styles.results }>{ combinedResults }</ol> }
		</div>

	);
};

export default React.memo( CombinedAll );
