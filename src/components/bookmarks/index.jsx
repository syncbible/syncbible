// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
//import { fetchSearchResults, fetchData } from '../../actions/index.js';
import Bookmark from '../svg/bookmark';
import CombinedResults from '../word-details/combined';
import Single from './single';
import styles from './styles.scss';

const BookMarks = () => {
	const dispatch = useDispatch();
	const list = useSelector( ( state ) => state.list );
	const bookmarks = list.filter(
		( { listType } ) => listType === 'bookmark'
	);

	if ( bookmarks.length > 0 ) {
		// Get the data for extra stuff in single.
		// not used right now
		//dispatch( fetchSearchResults() );
		//dispatch( fetchData( 'original' ) );
	}

	return (
		<>
			{ bookmarks.length === 0 && (
				<p className={ styles.description }>
					Click the <Bookmark /> to bookmark a verse.
				</p>
			) }
			{ bookmarks.map( ( bookmark, key ) => (
				<Single bookmark={ bookmark } key={ key } index={ key } />
			) ) }
			<CombinedResults type="bookmark" />
		</>
	);
};

export default React.memo( BookMarks );
