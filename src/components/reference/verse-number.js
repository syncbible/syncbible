// External
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal
import { addToList, setTrayVisibilityFilter } from '../../actions';
import styles from './styles.scss';
import Bookmark from '../svg/bookmark';

const VerseNumber =  React.memo( ( { book, chapter, verse } ) => {
	const dispatch = useDispatch();
	const data = useSelector( state => state.data );

	// Should be movede to a lib.
	const getCrossReferences = ( reference ) => {
		if ( ! reference ) {
			return [];
		}

		const bookId = bible.getBookId( reference.book );
		const referenceString = bible.Data.books[ bookId - 1 ][ 1 ] + '.' + reference.chapter + '.' + reference.verse;

		if ( ! data.crossReferences || ! data.crossReferences[ referenceString ] ) {
			return [];
		}

		const crossReferenceArray = data.crossReferences[ referenceString ];
		return crossReferenceArray.map( ( referenceString ) => {
			const referenceArray = referenceString.split('.');
			const bookId = bible.getBookId( referenceArray[0] );
			return bible.Data.books[bookId - 1][0] + "." + referenceArray[1] + "." + referenceArray[2];
		} ) ;
	};

	const addBookmarkAction = () => {
		dispatch( setTrayVisibilityFilter( 'bookmarks' ) );
		dispatch( addToList( {
			listType: 'bookmark',
			data: {
				reference: { book, chapter, verse }
			},
			results: getCrossReferences( { book, chapter, verse } ),
			visible: true,
		} ) );
	};

	return (
		<span className={ styles.verseNumber } onClick={ addBookmarkAction }>
			<span>{ verse }</span>
			<span className={ styles.verseNumberIcon }><Bookmark fill="#999" /></span>
		</span>
	);
} );

export default VerseNumber;
