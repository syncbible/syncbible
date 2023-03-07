// External dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import { setTrayVisibilityFilter } from '../../actions';
import Collapsible from '../collapsible';
import JoinFull from '../svg/join-full';
import SortGroupResults from '../sort-group-results';

const CombinedResults = ( { type } ) => {
	const dispatch = useDispatch();
	const [ open, setOpen ] = useState( false );
	const list = useSelector( state => state.list );
	const words = list.filter( ( { listType } ) => listType === type );

	if ( words.length < 2 ) {
		return null;
	}

	let combinedResults = [];
	words.forEach( ( item ) => {
		if ( item.results && item.results.length > 0 ) {
			const resultsArray = item.results.map( ( { reference } ) => reference );
			// Make these results unique.
			const uniqueResults = [ ...new Set( resultsArray ) ];
			combinedResults = combinedResults.concat( uniqueResults );
		}
	} );

	return (
		<Collapsible
			open={ open }
			onToggle={ () => setOpen( ! open ) }
			className="collapse"
			header={
				<div>Combined <a onClick={ ( event ) => { event.stopPropagation(); dispatch( setTrayVisibilityFilter('combinedall') ); } }><JoinFull /></a></div>
			}
		>
			<SortGroupResults results={ combinedResults } initialGroup="verse" initialSort="desc" allowPreview={ true } />
		</Collapsible>
	);
};

export default React.memo( CombinedResults );
