// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import Bookmark from '../svg/bookmark.js';
import CombinedResults from '../word-details/combined.js';
import Single from './single';
import styles from './styles.scss';

const BookMarks = () => {
	const bookmarks = useSelector( state => state.list.filter( ( { listType } ) => listType === 'bookmark' ) );

	return (
		<>
			{ bookmarks.length === 0 && ( <p className={ styles.description }>Click the <Bookmark /> to bookmark a verse.</p> ) }
			{ bookmarks.map( ( bookmark, key ) => <Single bookmark={ bookmark } key={ key } index={ key } /> ) }
			<CombinedResults type="bookmark" />
		</>
	)
};

export default React.memo( BookMarks );
