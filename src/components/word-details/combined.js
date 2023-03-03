// External dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import { setTrayVisibilityFilter } from '../../actions';
import Collapsible from '../collapsible';
import { getCombinedResults } from '../../lib/reference.js'
import styles from './styles.scss';
import JoinFull from '../svg/join-full';
import SearchLink from '../search/search-link';

const CombinedResults = ( { type } ) => {
	const dispatch = useDispatch();
	const [ open, setOpen ] = useState( false );
	const [ group, setGroup ] = useState( 'verse' );
	const words = useSelector( state => state.list.filter( ( { listType } ) => listType === type ) );
	if ( words.length ) {
		const combinedResults = getCombinedResults( words, group );
		const CombinedResultsMarkup = combinedResults.length > 0 ? (
			combinedResults.map( ( result, index ) => {
				const referenceObject = bible.parseReference( result.reference );
				const referenceString = referenceObject.bookName + '.' + referenceObject.chapter + '.' + referenceObject.verse;
				return <SearchLink key={ index } index={ index } referenceString={ referenceString } count={ result.value } />;
			} )
		) : null;

		return (
			<Collapsible
				open={ open }
				onToggle={ () => setOpen( ! open ) }
				className="collapse"
				header={
					<div>Combined <a onClick={ ( event ) => { event.stopPropagation(); dispatch( setTrayVisibilityFilter('combinedall') ); console.log( 'her' ) } }><JoinFull /></a></div>
				}
			>
				Group by <select value={ group } onChange={ ( event ) => {
					setGroup( event.target.value );
				} }>
					<option>book</option>
					<option>chapter</option>
					<option>verse</option>
				</select>
				<ol className={ styles.results }>
					{ CombinedResultsMarkup }
				</ol>
			</Collapsible>
		);
	}

	return null;
};

export default React.memo( CombinedResults );
