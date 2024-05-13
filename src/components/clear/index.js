// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { removeTypeFromList } from '../../actions';

import DeleteForever from '../svg/delete-forever.js';
import styles from './style.scss';

const Clear = ( { selectedTrayId } ) => {
	const dispatch = useDispatch();
	const list = useSelector( ( state ) => state.list );
	const words = list.filter( ( { listType } ) => listType === 'word' );
	const bookmarks = list.filter(
		( { listType } ) => listType === 'bookmark'
	);
	const searchTerms = list.filter(
		( { listType } ) => listType === 'search'
	);

	if (
		selectedTrayId !== 'bookmark' &&
		selectedTrayId !== 'word' &&
		selectedTrayId !== 'search'
	) {
		return null;
	}

	if ( selectedTrayId === 'bookmark' && bookmarks.length === 0 ) {
		return null;
	}

	if ( selectedTrayId === 'word' && words.length === 0 ) {
		return null;
	}

	if ( selectedTrayId === 'search' && searchTerms.length === 0 ) {
		return null;
	}

	const clearTray = ( event ) => {
		event.preventDefault();
		if ( selectedTrayId === 'bookmark' ) {
			dispatch( removeTypeFromList( 'bookmark' ) );
		}

		if ( selectedTrayId === 'word' ) {
			dispatch( removeTypeFromList( 'word' ) );
		}

		if ( selectedTrayId === 'search' ) {
			dispatch( removeTypeFromList( 'search' ) );
		}
	};

	return (
		<button
			onClick={ ( event ) => {
				clearTray( event );
			} }
			title="Clear"
			className={ styles.clear }
		>
			<DeleteForever />
		</button>
	);
};

export default React.memo( Clear );
