// External dependencies
import React, { useState } from "react";
import { groupBy, orderBy } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import classnames from 'classnames';

// Internal dependencies.
import { goToReferenceAction } from '../../actions';
import styles from "./styles.scss";
import { getReferenceFromSearchResult } from '../../lib/reference';

const WordStats = ( { strongsNumber, version } ) => {
	const dispatch = useDispatch();
	const { interfaceLanguage, wordForResults } = useSelector( state => {
		return {
			interfaceLanguage: state.settings.interfaceLanguage,
			wordForResults: state.list.find( ( { listType, data } ) => listType === 'word' && data.lemma === strongsNumber && data.version === version )
		}
 	} );
	const [ selectedGroup, setSelectedGroup ] = useState( 'book' );
	const [ sort, setSort ] = useState( 'reference' );

	const groupSelector = (
		<div>
			<label>Group by</label>
			<select className={ styles.select } value={ selectedGroup } onChange={ ( event ) => setSelectedGroup( event.target.value ) }>
				<option value="book">book</option>
				<option value="chapter">chapter</option>
				<option value="verse">verse</option>
				<option value="word">word</option>
				<option value="morph">morph</option>
			</select>
		</div>
	);

	const sortSelector = (
		<div>
			<label>Sort by</label>
			<select className={ styles.select } value={ sort } onChange={ ( event ) => setSort( event.target.value ) }>
				<option value="reference">Reference</option>
				<option value="desc">Descending ↓</option>
				<option value="asc">Ascending ↑</option>
			</select>
		</div>
	);

	if ( ! wordForResults || ! wordForResults.results ) {
		return (
			<>
				Stats will appear when you have searched for the word.
			</>
		);
	}

	const getLabel = ( result ) => {
		if ( selectedGroup === 'morph' ) {
			return result.word[2];
		}
		if ( selectedGroup === 'word' ) {
			return result.word[0];
		}
		if ( selectedGroup === 'book' ) {
			return result[0];
		}
		if ( selectedGroup === 'chapter' ) {
			return result[0] + ' ' + result[1];
		}
		if ( selectedGroup === 'verse' ) {
			return result[0] + ' ' + result[1] + ':' + result[2];
		}

		return result;
	}

	let results = wordForResults.results;
	const resultsArray = results.map( ( { reference } ) => reference.split('.') );

	const getResults = () => {
		let resultsToDisplay;
		if ( selectedGroup === 'book' ) {
			resultsToDisplay = groupBy( resultsArray, function( item ) {
				return bible.getTranslatedBookName( item[0], interfaceLanguage );
			} );
		} else if ( selectedGroup === 'chapter' ) {
			resultsToDisplay = groupBy( resultsArray, function( item ) {
				return bible.getTranslatedBookName( item[0], interfaceLanguage ) + ' ' + item[1];
			} );
		} else if ( selectedGroup === 'verse' ) {
			resultsToDisplay = groupBy( resultsArray, function( item ) {
				return bible.getTranslatedBookName( item[0], interfaceLanguage ) + ' ' + item[1] + ':' + item[2];
			} );
		} else if ( selectedGroup === 'word' ) {
			resultsToDisplay = groupBy( wordForResults.results, function( { word } ) {
				return word[0];
			} );
		} else if ( selectedGroup === 'morph' ) {
			resultsToDisplay = groupBy( wordForResults.results, function( { word } ) {
				return word[2];
			} );
		}

		if ( sort !== "reference" ) {
			return orderBy( resultsToDisplay, ['length'], [ sort ] );
		}
		return resultsToDisplay;
	}

	const selectedResults = getResults();

	const getReference = ( result ) => {
		if ( selectedGroup === 'word' || selectedGroup === 'morph' ) {
			return null;
		}

		return result[ 0 ]
	}

	return (
		<div className={ styles.wordStats }>
			<h2>Stats for { version }</h2>
			<fieldset>
				{ groupSelector }
				{ sortSelector }
			</fieldset>
			{ Object.keys( selectedResults ).map( ( result, index ) => {
				const label = Array.isArray( selectedResults ) ? getLabel( selectedResults[result][0] ) : result;
				const percent = Math.round( selectedResults[ result ].length / results.length * 100 ) + '%';
				const reference = getReference( selectedResults[ result ] );
				const TagName = reference ? 'a' : 'span';
				return (
					<div key={ index } className={ styles.wordStatsResult }>
						<span className={ classnames( styles.wordStatsResultCount, strongsNumber ) } style={ { width: percent } }></span>
						<TagName className={ styles.wordStatsResultText } onClick={ () => {
							if ( reference ) {
								const referenceObject = getReferenceFromSearchResult( reference[0] + '.' + reference[1] + '.' + reference[2] );
								// should use getReferenceFromSearchResult.
								dispatch( goToReferenceAction( referenceObject ) );
							}
						} }>
							{ label } - { selectedResults[ result ].length } ({ percent })
						</TagName>
					</div>
				);
			} ) }
		</div>
	);
};

export default React.memo( WordStats );
