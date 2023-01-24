// External dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import { compareTwoReferences, calculateRareWords, calculateCommonWords, calculateConnectionQuality } from '../../lib/reference';
import {
	fetchData,
	selectWord,
	setReferenceInfo,
	setReferenceInfoCompareWith,
	setReferenceInfoLimit,
	setTrayVisibilityFilter,
} from '../../actions';
import {
	getBooks,
	getCompareChapters,
} from '../../lib/select-helpers';
import styles from './styles.scss';

const Compare = ( props ) => {
	const dispatch = useDispatch();
	const isOriginalLoaded = useSelector( state => 'undefined' !== typeof state.data.original );
	const isActiveTray = useSelector( state => state.trays === 'reference' );
	const reference = useSelector( state => state.referenceInfo.reference );
	const referenceToCompareWith = useSelector( state => state.referenceInfo.referenceToCompareWith );
	const overlap = useSelector( state => compareTwoReferences( state ) );
	const limit = useSelector( state => state.referenceInfo.limit );
	const data = useSelector( state => state.data );
	const addAllWords = () => {
		overlap.forEach( lemma => addWord( lemma ) );
	};
	const addWord = ( lemma ) => {
		dispatch( setTrayVisibilityFilter( 'word' ) );
		dispatch( selectWord( {
			lemma,
			version: 'original',
		} ) );
	};

	useEffect( () => {
		if ( isActiveTray ) {
			dispatch( fetchData( 'original' ) );
		}
	}, [ isActiveTray ] );

	const getOverlap = () => {
		if ( ! overlap ) {
			return;
		}

		if ( overlap.length === 0 ) {
			return 'No connections found';
		}

		const overlapMarkup = overlap.map( lemma => <div key={ lemma }>{ getWord( lemma ) }</div> )

		return (
			<div>
				<span>Connections ({ overlap.length }):</span>
				{ overlapMarkup }
			</div>
		)
	};

	const bookChange = ( event ) => {
		dispatch( setReferenceInfoCompareWith( { book: event.target.value, chapter: 1, verse: 'all' } ) );
	};

	const chapterChange = ( event ) => {
		dispatch( setReferenceInfoCompareWith( { ...referenceToCompareWith, chapter: event.target.value, verse: 'all' } ) );
	};

	const verseChange = ( event ) => {
		dispatch( setReferenceInfoCompareWith( { ...referenceToCompareWith, verse: event.target.value } ) );
	};

	const getVerses = ( reference ) => {
		if ( reference && reference.book && reference.chapter ) {
			const bookNumber = bible.getBookId( reference.book );
			const numberOfVerses = bible.Data.verses[ bookNumber - 1 ][ reference.chapter - 1 ];
			const verses = [];
			for ( var i = 0 ; i < numberOfVerses ; i++) {
				verses.push( i );
			}
			const versesJSX = verses.map( ( key ) => {
				return <option key={ key }>{ key + 1 }</option>
			} );
			versesJSX.unshift( <option key="all" value="all">All</option> );
			return versesJSX;
		}

		return <option>-</option>;
	};

	const getWord = ( lemma ) => {
		return (
			<div key={ lemma } className={ lemma } onMouseEnter={ () => {
				window.updateAppComponent( 'highlightedWord', lemma );
			} } onClick={ () => {
				dispatch( selectWord( { lemma, version: 'original' } ) );
			} }>
				{ lemma } - { javascripture.data.strongsDictionary[ lemma ].lemma } - { javascripture.data.strongsDictionary[ lemma ].translit }
			</div>
		);
	};

	const changeLimit = (event) => dispatch( setReferenceInfoLimit( event.target.value ) );

	const compareBookChange = ( event ) => {
		dispatch( setReferenceInfo( { book: event.target.value, chapter: 1, verse: 'all' } ) );
	};

	const compareChapterChange = ( event ) => {
		dispatch( setReferenceInfo( { ...reference, chapter: event.target.value, verse: 'all' } ) );
	};

	const compareVerseChange = ( event ) => {
		dispatch( setReferenceInfo( { ...reference, verse: event.target.value } ) );
	};

	if ( ! isOriginalLoaded ) {
		return (
			<div className={ styles.compare }>
				<p>Loading original texts...</p>
			</div>
		)
	}

	const allChapters = '';/*bible.Data.books.map( ( book, id ) => {
		<h3>All chapters</h3>
		return bible.Data.verses[ id ].map( ( numberOfChapters, chapter ) => {
			const parameters = {
				referenceInfo: {
					reference,
					referenceToCompareWith: {
						book: book[0],
						chapter: chapter,
					},
					limit
				},
				data
			};
			const comparisonData = compareTwoReferences( parameters );
			if ( comparisonData.length ) {
				return (
					<div key={ id + chapter }>{ book[ 0 ] + ' ' + ( chapter + 1 ) }: { comparisonData.length }</div>
				);
			}
		} );
	} );*/

	return (
		<>
			<div className={ styles.statsReferenceWrapper }>
				<div className={ styles.statsReference }>
					<select className={ styles.compareWithBook } name="compareWithBook" onChange={ compareBookChange } value={ reference ? reference.book : '' }>
						{ getBooks() }
					</select>
					<select name="compareWithChapter" onChange={ compareChapterChange } value={ reference ? reference.chapter : '' }>
						{ getCompareChapters( reference ) }
					</select>
					<select name="compareWithVerses" onChange={ compareVerseChange } value={ reference ? reference.verse : '' }>{ getVerses( reference ) }</select>
				</div>
			</div>
			<h3 className={ styles.h3 }>compare with</h3>
			<div className={ styles.statsReferenceWrapper }>
				<div className={ styles.statsReference }>
					<select className={ styles.compareWithBook } name="book" onChange={ bookChange } value={ referenceToCompareWith ? referenceToCompareWith.book : '' }>
						{ getBooks() }
					</select>
					<select name="chapter" onChange={ chapterChange } value={ referenceToCompareWith ? referenceToCompareWith.chapter : '' }>{ getCompareChapters( referenceToCompareWith ) }</select>
					<select name="verses" onChange={ verseChange } value={ referenceToCompareWith? referenceToCompareWith.verse : '' }>{ getVerses( referenceToCompareWith ) }</select>
				</div>
			</div>
			<div className={ styles.statsDescription }>
				Word with less than <input type="number" name="limit" value={ limit } onChange={ changeLimit } className={ styles.limit } /> uses.
			</div>
			<div className={ styles.statsResults }>
				{ getOverlap() }
			</div>
			<div className={ styles.chapterTray }>
				{ overlap && overlap.length > 0 && <button onClick={ addAllWords }>Select all words</button> }
			</div>
			<div>{ allChapters }</div>
		</>
	);
};


export default React.memo( Compare );
