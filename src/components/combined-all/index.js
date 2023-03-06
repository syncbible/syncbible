// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import { getCombinedResults } from '../../lib/reference.js'
import InlineResultsToggle from '../inline-results-toggle'
import styles from './styles.scss';
import SearchLink from '../search/search-link';

const CombinedAll = () => {
	const list = useSelector( state => state.list );
	const combinedResults = getCombinedResults( list ); // TODO replace with getGroupedResults.

	// copied from combined/index.js.
	const CombinedResultsMarkup = combinedResults.length > 0 ? (
		combinedResults.map( ( result, index ) => {
			const referenceObject = bible.parseReference( result.reference );
			const referenceString = referenceObject.bookName + '.' + referenceObject.chapter + '.' + referenceObject.verse;
			return <SearchLink key={ index } index={ index } referenceString={ referenceString } count={ result.value } />;
		} )
	) : null;
	return (
		<div className={ styles.combinedAll }>
			<p>A combination of all the references in the other panels.</p>
			{ combinedResults.length > 0 && <InlineResultsToggle /> }
			{ combinedResults && <ol className={ styles.results }>{ CombinedResultsMarkup }</ol> }
		</div>

	);
};

export default React.memo( CombinedAll );
