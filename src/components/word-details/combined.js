// External dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import { setTrayVisibilityFilter } from '../../actions';
import Collapsible from '../collapsible';
import { getCombinedResults } from '../../lib/reference.js'
import styles from './styles.scss';
import JoinFull from '../svg/join-full';

const CombinedResults = ( { type } ) => {
	const dispatch = useDispatch();
	const [ open, setOpen ] = useState( false );
	const words = useSelector( state => state.list.filter( ( { listType } ) => listType === type ) );
	if ( words.length ) {
		const combinedResults = getCombinedResults( words );

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
