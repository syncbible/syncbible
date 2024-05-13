// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { closeAllListItems } from '../../actions';
import styles from './styles.scss';
import Clear from '../clear';
import UnfoldLessDouble from '../svg/unfold-less-double';

const ListHeader = ( { tray } ) => {
	const dispatch = useDispatch();
	const openListItems = useSelector( ( state ) => {
		// Are there any open list items?
		return (
			Object.keys( state.userInterface ).filter(
				( item ) => state.userInterface[ item ]
			).length > 0
		);
	} );
	const listItemsOfType = useSelector( ( state ) => {
		return (
			state.list.filter( ( listItem ) => listItem.listType === tray )
				.length > 0
		);
	} );

	if ( ! listItemsOfType ) {
		return null;
	}

	return (
		<div className={ styles.listHeader }>
			{ openListItems && (
				<button
					onClick={ () => {
						dispatch( closeAllListItems() );
					} }
					title="Close all"
				>
					<UnfoldLessDouble />
				</button>
			) }
			<Clear selectedTrayId={ tray } />
		</div>
	);
};

export default ListHeader;
