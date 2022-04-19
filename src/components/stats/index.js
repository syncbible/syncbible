// External dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

// Internal dependencies
import { compareTwoReferences, calculateRareWords, calculateCommonWords, calculateConnectionQuality } from '../../lib/reference';
import {
	fetchData,
	selectWord,
	setReferenceInfo,
	setReferenceInfoLimit,
	setTrayVisibilityFilter,
} from '../../actions';

import styles from './styles.scss';

const Rare = React.memo( ( props ) => {
	const dispatch = useDispatch();
	const isOriginalLoaded = useSelector( state => 'undefined' !== typeof state.data.original );
	const isActiveTray = useSelector( state => state.trays === 'stats' );
	const reference = useSelector( state => state.referenceInfo.reference );
	const overlap = useSelector( state => compareTwoReferences( state ) );
	const rare = useSelector( state => calculateRareWords( state ) );
	const common = useSelector( state => calculateCommonWords( state ) );
	const limit = useSelector( state => state.referenceInfo.limit );
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

	const getCommonWords = () => {
		if ( ! common ) {
			return null;
		}

		if ( common.length === 0 ) {
			return 'No common words found';
		}

		return Object.keys( common ).map( lemma => {
			const significance = ( common[ lemma ] / javascripture.data.strongsObjectWithFamilies[ lemma ].count ).toFixed( 2 );
			return (
				<div key={ lemma }>
					{ lemma } - { javascripture.data.strongsDictionary[ lemma ].lemma } - { javascripture.data.strongsDictionary[ lemma ].xlit } - <span title={ 'significance: ' + significance }>({ common[ lemma ] } times)</span>
				</div>
			);
		} );
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

	const addAllRareWords = () => {
		rare.forEach( lemma => addWord( lemma ) );
	};

	const getRareWords = () => {
		if ( ! rare ) {
			return null;
		}

		if ( rare.length === 0 ) {
			return 'No rare words found';
		}

		return rare.map( lemma => <div key={ lemma }>{ getWord( lemma ) }</div> );
	};

	const getWord = ( lemma ) => {
		return (
			<div>
				{ lemma } - { javascripture.data.strongsDictionary[ lemma ].lemma } - { javascripture.data.strongsDictionary[ lemma ].xlit }
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

	const getCompareChapters = () => {
		if ( reference && reference.book ) {
			const bookNumber = bible.getBookId( reference.book );
			return bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		}

		return <option>-</option>;
	};

	const getBooks = () => {
		return (
			<>
				<option value="">Select a book</option>
				{ bible.Data.books.map( book => <option key={ book[ 0 ] }>{ book[0] }</option> ) }
			</>
		);
	};

	if ( ! isOriginalLoaded ) {
		return (
			<div className={ styles.trayPadding }>
				<p>Loading original texts...</p>
			</div>
		)
	}

	return (
		<>
			<div className={ styles.statsReferenceWrapper }>
				<div className={ classnames( styles.statsReference ) }>
					<select className={ styles.compareWithBook } name="compareWithBook" onChange={ compareBookChange } value={ reference ? reference.book : '' }>
						{ getBooks() }
					</select>
					<select name="compareWithChapter" onChange={ compareChapterChange } value={ reference ? reference.chapter : '' }>
						{ getCompareChapters() }
					</select>
					<select name="compareWithVerses" onChange={ compareVerseChange } value={ reference ? reference.verse : '' }>{ getVerses( reference ) }</select>
				</div>
			</div>
			<div className={ styles.statsResults }>
				<div>
					<h2>Rare words</h2>
					<div className={ styles.statsDescription }>
						Used less than <input type="number" name="limit" value={ limit } onChange={ changeLimit } className={ styles.limit } /> times { rare ? '(' + rare.length + ')' : null }:
					</div>
					<div>
						{ getRareWords() }
					</div>
					<div className={ styles.chapterTray }>
						{ rare && rare.length > 0 && <button onClick={ addAllRareWords }>Select all rare words (slow!)</button> }
					</div>
				</div>
				<div>
					<h2>All words</h2>
					<div>
						{ getCommonWords() }
					</div>
				</div>
			</div>
		</>
	);
} );

export default Rare;
