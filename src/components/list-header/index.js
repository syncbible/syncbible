// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { closeAllListItems } from '../../actions';
import styles from './styles.scss';
import Clear from '../clear';
import UnfoldLess from '../svg/unfold-less';

const ListHeader = ( { tray } ) => {
	const dispatch = useDispatch();
	const { openListItems } = useSelector( ( state ) => {
		// Are there any open list items?
		return {
			openListItems:
				Object.keys( state.userInterface ).filter(
					( item ) => state.userInterface[ item ]
				).length > 0,
		};
	} );

	return (
		<div className={ styles.listHeader }>
			{ openListItems && (
				<button
					onClick={ () => {
						dispatch( closeAllListItems() );
					} }
				>
					<UnfoldLess />
				</button>
			) }
			<Clear selectedTrayId={ tray } />
		</div>
	);
};

export default ListHeader;
