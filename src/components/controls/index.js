// External
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal
import { addColumnAction, deleteColumnAction, settingsChange, syncReferences, unSyncReferences } from '../../actions';
import styles from './style.scss';

const Controls = React.memo( ( { } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( state => state.settings.inSync );
	const reference = useSelector( state => state.reference );
	const change = ( event ) => {
		if ( event.target.value === 'add' ) {
			dispatch( addColumnAction() );
		}

		if( event.target.value === 'delete' ) {
			dispatch( deleteColumnAction() );
		}

		if ( event.target.value === "sync" ) {
			dispatch( syncReferences() );
		}

		if ( event.target.value === "unsync" ) {
			dispatch( unSyncReferences() );
		}

		setValue( '' );
		event.target.blur();
	};
	const [ value, setValue ] = useState( '' );

	return (
		<select onChange={ change } className={ styles.extraOptions } value={ value }>
			<option>…</option>
			<option value="add">Add a column</option>
			{ reference.length > 1 && <option value="delete">Delete column</option> }
			{ reference.length > 1 && ( inSync ? <option value="unsync">Un-sync references</option> : <option value="sync">Sync references</option> ) }
		</select>
	);
} );

export default Controls;
