// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { removeTypeFromList } from '../../actions';

import DeleteForever from '../svg/delete-forever.js';
import styles from './style.scss';

const Clear = ({ selectedTrayId }) => {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.list);
	const words = list.filter(({ listType }) => listType === 'word');
	const bookmarks = list.filter(({ listType }) => listType === 'bookmark');
	const searchTerms = list.filter(({ listType }) => listType === 'search');

	if (
		selectedTrayId !== 'bookmarks' &&
		selectedTrayId !== 'word' &&
		selectedTrayId !== 'search'
	) {
		return <span className={styles.button}>&nbsp;</span>;
	}

	if (selectedTrayId === 'bookmarks' && bookmarks.length === 0) {
		return <span className={styles.button}>&nbsp;</span>;
	}

	if (selectedTrayId === 'word' && words.length === 0) {
		return <span className={styles.button}>&nbsp;</span>;
	}

	if (selectedTrayId === 'search' && searchTerms.length === 0) {
		return <span className={styles.button}>&nbsp;</span>;
	}

	const clearTray = (event) => {
		event.preventDefault();
		if (selectedTrayId === 'bookmarks') {
			dispatch(removeTypeFromList('bookmark'));
		}

		if (selectedTrayId === 'word') {
			dispatch(removeTypeFromList('word'));
		}

		if (selectedTrayId === 'search') {
			dispatch(removeTypeFromList('search'));
		}
	};

	return (
		<button
			onClick={(event) => {
				clearTray(event);
			}}
			title="Clear"
			className={styles.clear}
		>
			<DeleteForever />
		</button>
	);
};

export default React.memo(Clear);
