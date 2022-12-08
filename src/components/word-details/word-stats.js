// External dependencies
import React, { useState } from "react";
import { groupBy, orderBy } from "lodash";
import { useSelector } from "react-redux";
import styles from "./styles.scss";

const WordStats = ( { strongsNumber } ) => {
	const words = useSelector( state => state.list.filter( ( { listType } ) => listType === 'word' ) );
	const [ selectedGroup, setSelectedGroup ] = useState( 'book' );

	const groupSelector = (
		<select className={ styles.select } value={ selectedGroup } onChange={ ( event ) => setSelectedGroup( event.target.value ) }>
			<option value="book">by book</option>
			<option value="book-sorted">by book ↓</option>
			<option value="chapter">by chapter</option>
			<option value="chapter-sorted">by chapter ↓</option>
		</select>
	);


	const wordForResults = words.length > 0 && words.find( word => word.data.lemma === strongsNumber );
	if ( ! wordForResults || ! wordForResults.results ) {
		return (
			<>
				Stats will appear when you have searched for the word.
			</>
		);
	}

	let results = wordForResults.results;
	if ( ! wordForResults.results.length ) {
		results = Object.keys( wordForResults.results );
	}
	const resultsArray = results.map( ( result ) => result.split('.') );
	const resultsByBook = groupBy( resultsArray, 0 );
	const resultsByBookSorted = orderBy( resultsByBook, ['length'], ['desc'] );
	const resultsByChapter = groupBy( resultsArray, function( item ) {
		return item[0] + ' ' + item[1];
	} );
	const resultsByChapterSorted = orderBy( resultsByChapter, [ 'length' ], ['desc'] );
	let resultsToDisplay = resultsByBook;
	if ( selectedGroup === 'book-sorted' ) {
		resultsToDisplay = resultsByBookSorted;
	}
	if ( selectedGroup === 'chapter' ) {
		resultsToDisplay = resultsByChapter;
	}
	if ( selectedGroup === 'chapter-sorted' ) {
		resultsToDisplay = resultsByChapterSorted;
	}

	return (
		<div className="word-stats">
			<p>Word stats { groupSelector }</p>
			{ Object.keys( resultsToDisplay ).map( ( result, index ) => {
				const percent = Math.round( resultsToDisplay[ result ].length / results.length * 100 ) + '%';
				return (
					<div key={ index } className={ styles.wordStatsResult } style={{ position: 'relative' }}>
						<span className={ strongsNumber } style={{ width: percent, display: 'inline-block', position: 'absolute', height: '1.2em', top: 0, right: 0 }}></span>
						<span className={ styles.wordStatsResultText } style={{ position: 'relative' }} >{ resultsToDisplay[result][0][0] } { ( selectedGroup === 'chapter' || selectedGroup === 'chapter-sorted' ) && resultsToDisplay[result][0][1] } - { resultsToDisplay[ result ].length } ({ percent })</span>
					</div>
				);
			} ) }
		</div>
	);
};

export default React.memo( WordStats );
