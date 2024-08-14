// External
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal
import {
	addColumnAction,
	deleteColumnAction,
	syncReferences,
	unSyncReferences,
	harmoniseAction,
} from '../../actions';
import Add from '../svg/add';
import Menu from '../svg/menu';
import styles from './style.scss';

const Controls = () => {
	const dispatch = useDispatch();
	const inSync = useSelector( ( state ) => state.settings.inSync );
	const referenceLength = useSelector( ( state ) => state.reference.length );
	const change = ( event ) => {
		if ( event.target.value === 'add' ) {
			dispatch( addColumnAction() );
		}

		if ( event.target.value === 'delete' ) {
			dispatch( deleteColumnAction() );
		}

		if ( event.target.value === 'sync' ) {
			dispatch( syncReferences() );
		}

		if ( event.target.value === 'unsync' ) {
			dispatch( unSyncReferences() );
		}

		if ( event.target.value === 'harmonised' ) {
			dispatch( harmoniseAction() );
		}

		setValue( '' );
		event.target.blur();
	};
	const [ value, setValue ] = useState( '' );

	if ( referenceLength > 1 ) {
		return (
			<div className={ styles.controls }>
				<button className={ styles.menu }>
					<Menu />
				</button>
				<select
					onChange={ change }
					className={ styles.extraOptions }
					value={ value }
				>
					<option value="" disabled hidden>
						…
					</option>
					<option value="add">Add a column</option>
					<option value="delete">Delete column</option>
					{ inSync !== true && (
						<option value="sync">Sync references</option>
					) }
					{ inSync !== false && (
						<option value="unsync">Un-sync references</option>
					) }
					{ inSync !== 'harmonised' && (
						<option value="harmonised">Harmonise</option>
					) }
				</select>
			</div>
		);
	}

	if ( referenceLength === 1 ) {
		return (
			<div className={ styles.controls }>
				<button
					className={ styles.addButton }
					onClick={ () => dispatch( addColumnAction() ) }
				>
					<Add />
				</button>
			</div>
		);
	}
};

export default React.memo( Controls );
