// External
import React from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

// Internal
import { addToList, setTrayVisibilityFilter } from '../../actions';
import styles from './styles.scss';
import Bookmark from '../svg/bookmark';
import { getCrossReferences } from '../../lib/cross-references';

const VerseNumber =  React.memo( ( { book, chapter, verse, isCurrentRef } ) => {
	const dispatch = useDispatch();
	const data = useSelector( state => state.data );

	const addBookmarkAction = () => {
		dispatch( setTrayVisibilityFilter( 'bookmarks' ) );
		dispatch( addToList( {
			listType: 'bookmark',
			data: {
				reference: { book, chapter, verse }
			},
			results: getCrossReferences( data, { book, chapter, verse } ),
			visible: true,
		} ) );
	};

	let fill = '#999';
	return (
		<span className={ classnames( styles.verseNumber ) } onClick={ addBookmarkAction }>
			<span>{ verse }</span>
			<span className={ styles.verseNumberIcon }><Bookmark fill={ fill } /></span>
		</span>
	);
} );

export default VerseNumber;
