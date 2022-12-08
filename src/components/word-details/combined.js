// External dependencies
import { countBy } from 'lodash';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import { setTrayVisibilityFilter } from '../../actions';
import Collapsible from '../collapsible';
import SearchLink from '../search/search-link';
import { getReferenceFromSearchResult, sortCountedReferences } from '../../lib/reference.js'
import styles from './styles.scss';
import JoinFull from '../svg/join-full';

const CombinedResults = ( { type } ) => {
	const dispatch = useDispatch();
	const [ open, setOpen ] = useState( false );
	const words = useSelector( state => state.list.filter( ( { listType } ) => listType === type ) );
	if ( words.length ) {
		let combined = [];
		words.forEach( ( word ) => {
			let results = word.results;
			if ( word.results && ! word.results.length ) {
				results = Object.keys( word.results );
			}
			const uniqueResults = [ ...new Set( results ) ];
			combined = combined.concat( uniqueResults );
		} );

		const countedResults = countBy( combined );
		const countedResultsArray = Object.keys( countedResults ).map(key => ({ key, value: countedResults[key] }));
		const sortedResults = countedResultsArray.sort( sortCountedReferences ).filter( result => result.value > 1 );
		const combinedResults = sortedResults.map( ( result, index ) => <SearchLink key={ index } index={ index } referenceString={ result.key } count={ result.value } /> );

		if ( combinedResults.length > 0 ) {
			return (
				<Collapsible
					open={ open }
					onToggle={ () => setOpen( ! open ) }
					className="collapse"
					header={
						<div>Combined <a onClick={ ( event ) => { event.stopPropagation(); dispatch( setTrayVisibilityFilter('combinedall') ); console.log( 'her' ) } }><JoinFull /></a></div>
					}
				>
					<ol className={ styles.results }>
						{ combinedResults }
					</ol>
				</Collapsible>
			);
		}

		return null
	}

	return null;
};

export default React.memo( CombinedResults );
