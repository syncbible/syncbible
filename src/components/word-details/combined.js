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
	const words = useSelector( ( state ) => {
		return state.list.filter( ( { listType } ) => listType === type );
	} );

	if ( words.length < 2 ) {
		return null;
	}

	return (
		<Collapsible
			open={ open }
			onToggle={ () => setOpen( ! open ) }
			className="collapse"
			header={
				<div>
					Combined{ ' ' }
					<a
						onClick={ ( event ) => {
							event.stopPropagation();
							dispatch(
								setTrayVisibilityFilter( 'combinedall' )
							);
						} }
					>
						<JoinFull />
					</a>
				</div>
			}
		>
			<SortGroupResults
				type={ type }
				initialGroup="verse"
				initialSort="desc"
				allowPreview={ true }
			/>
		</Collapsible>
	);
};

export default React.memo( CombinedResults );
