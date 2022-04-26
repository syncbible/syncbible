// External dependencies
import React, { useEffect, useState } from 'react';
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
	const [ sort, setSort ] = useState( 'usesDesc' );
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

	const sortByTotalAsc = ( a, b ) => {
		return javascripture.data.strongsObjectWithFamilies[ a ].count - javascripture.data.strongsObjectWithFamilies[ b ].count;
	};

	const sortByTotalDesc = ( a, b ) => {
		return javascripture.data.strongsObjectWithFamilies[ b ].count - javascripture.data.strongsObjectWithFamilies[ a ].count;
	};

	const sortByUsesDesc = ( a, b ) => {
		return common[ b ] - common[ a ];
	};

	const sortByUsesAsc = ( a, b ) => {
		return common[ a ] - common[ b ];
	};

	const sortBySignificanceAsc = ( a, b ) => {
		const significanceA =  common[ a ] / javascripture.data.strongsObjectWithFamilies[ a ].count;
		const significanceB =  common[ b ] / javascripture.data.strongsObjectWithFamilies[ b ].count;
		return significanceA - significanceB;
	};

	const sortBySignificanceDesc = ( a, b ) => {
		const significanceA =  common[ a ] / javascripture.data.strongsObjectWithFamilies[ a ].count;
		const significanceB =  common[ b ] / javascripture.data.strongsObjectWithFamilies[ b ].count;
		return significanceB - significanceA;
	};

	const getSortFunction = () => {
		switch ( sort ) {
			case 'usesDesc':
				return sortByUsesDesc;

			case 'usesAsc':
				return sortByUsesAsc;

			case 'totalAsc':
				return sortByTotalAsc;

			case 'totalDesc':
				return sortByTotalDesc;

			case 'significanceAsc':
				return sortBySignificanceAsc;

			case 'significanceDesc':
				return sortBySignificanceDesc;
		}
	}

	const getCommonWords = () => {
		if ( ! common || common.length === 0 ) {
			return null;
		}

		const commonWords = Object.keys( common ).sort( getSortFunction() ).map( lemma => {
			const significance = ( common[ lemma ] / javascripture.data.strongsObjectWithFamilies[ lemma ].count ).toFixed( 3 );
			return (
				<tr key={ lemma } className={ lemma } onMouseEnter={ () => {
					window.updateAppComponent( 'highlightedWord', lemma );
				} } onClick={ () => dispatch( selectWord( { lemma, version: 'original' } ) ) }>
					<td>{ lemma }</td>
					<td>{ javascripture.data.strongsDictionary[ lemma ].lemma }</td>
					<td>{ javascripture.data.strongsDictionary[ lemma ].xlit || javascripture.data.strongsDictionary[ lemma ].translit }</td>
					<td>{ common[ lemma ] }</td>
					<td>{ javascripture.data.strongsObjectWithFamilies[ lemma ].count }</td>
					<td>{ significance }</td>
				</tr>
			);
		} );

		return (
			<table>
				<tr>
					<th>Strongs</th>
					<th>Word</th>
					<th>Transliteration</th>
					<th className={ styles.sort } onClick={ () => sort === 'usesDesc' ? setSort('usesAsc') : setSort( 'usesDesc') }>
						Uses in chapter
						{ sort === 'usesAsc' ? ' ↓' : '' }
						{ sort === 'usesDesc' ? ' ↑' : '' }
					</th>
					<th className={ styles.sort } onClick={ () => sort === 'totalDesc' ? setSort( 'totalAsc') : setSort( 'totalDesc') }>
						Total uses
						{ sort === 'totalAsc' ? ' ↓' : '' }
						{ sort === 'totalDesc' ? ' ↑' : '' }
					</th>
					<th className={ styles.sort } onClick={ () => sort === 'significanceDesc' ? setSort( 'significanceAsc') : setSort( 'significanceDesc') }>
						Significance
						{ sort === 'significanceAsc' ? ' ↓' : '' }
						{ sort === 'significanceDesc' ? ' ↑' : '' }
					</th>
				</tr>
				{ commonWords }
			</table>
		);
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

	const wordElement = ( lemma ) => (
		<div key={ lemma } className={ lemma } onMouseEnter={ () => {
			window.updateAppComponent( 'highlightedWord', lemma );
		} } onClick={ () => {
			dispatch( selectWord( { lemma, version: 'original' } ) );
		} }>
			{ getWord( lemma ) }
		</div>

	);

	const getWord = ( lemma ) => {
		return (
			<div>
				{ lemma } - { javascripture.data.strongsDictionary[ lemma ].lemma } - { javascripture.data.strongsDictionary[ lemma ].translit }
			</div>
		);
	};

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
