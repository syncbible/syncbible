// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countBy } from 'lodash';

// Internal dependencies
import SearchLink from '../search/search-link';
import { getReferenceFromSearchResult, sortCountedReferences } from '../../lib/reference.js'
import InlineResultsToggle from '../inline-results-toggle'
import styles from './styles.scss';

const CombinedAll = React.memo( () => {
	const list = useSelector( state => state.list );
	let combined = [];
	list.forEach( ( item ) => {
		const results = item.results;
		const uniqueResults = [ ...new Set( results ) ];
		combined = combined.concat( uniqueResults );
	} );

	const countedResults = countBy( combined );
	const countedResultsArray = Object.keys( countedResults ).map(key => ({ key, value: countedResults[key] }));
	const sortedResults = countedResultsArray.sort( sortCountedReferences );

	const combinedResults = sortedResults.map( ( result, index ) => {
		return <SearchLink key={ index } index={ index } reference={ getReferenceFromSearchResult( result.key ) } count={ result.value } />
	} );

	return (
		<div>
			<div className={ styles.results }>A combination of all the references in the other panels.</div>
			{ combinedResults.length > 0 && <InlineResultsToggle /> }
			{ combinedResults && <ol className={ styles.results }>{ combinedResults }</ol> }
		</div>

	);
} );

export default CombinedAll;
