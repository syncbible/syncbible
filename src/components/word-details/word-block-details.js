// External dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import styles from './styles.scss';
import SearchLink from '../search/search-link';
import InlineResultsToggle from '../inline-results-toggle'
import { searchForWord } from '../../actions'
import MoreDetails from './more-details';

const WordBlockDetails = ( { morphologyProp, strongsNumber, version, word } ) => {
	const dispatch = useDispatch();
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const strongsWithFamilies = useSelector( state => state.data.strongsObjectWithFamilies );

	const results = word.results && word.results.map( ( result, index ) => {
		const isActive = word && typeof word.current !== 'undefined' && word.current === index;
		return <SearchLink key={ index } index={ index } referenceString={ result } wordId={ word.id } isActive={ isActive } />;
	} );

	function getResultsDisplay() {
		const numberOfUses = strongsWithFamilies && strongsWithFamilies[ strongsNumber ] && strongsWithFamilies[ strongsNumber ].count;
		const useString = numberOfUses === 1 ? 'use' : 'uses';
		const resultString = numberOfUses === 1 ? 'result' : 'results';
		if ( results ) {
			return (
				<>
					Found { numberOfUses } { useString } in: <InlineResultsToggle />
					<ol className={ styles.results } dir={ bible.isRtlVersion( interfaceLanguage ) ? 'rtl' : 'ltr' }>
						{ results }
					</ol>
				</>
			)
		}

		if ( word.loading ) {
			return (
				<p>Loading { numberOfUses } search { resultString }...</p>
			);
		}

		if ( strongsWithFamilies && strongsWithFamilies[ strongsNumber ] && strongsWithFamilies[ strongsNumber ].count < 100 ) {
			return ( <p>Searching...</p> );
		}

		return (
			<p><a href="#" className="word-block-details__find-all-uses" onClick={ () => dispatch( searchForWord( word.data ) ) }>Find { numberOfUses } { useString } { numberOfUses > 1000 && <span>(slow!)</span> }</a></p>
		);
 	}

	return (
		<div className={ styles.wordBlocDetails }>
			<MoreDetails morphologyProp={ morphologyProp } strongsNumber={ strongsNumber } version={ version } />
			<br />
			{ getResultsDisplay() }
		</div>
	);
}

export default React.memo( WordBlockDetails );
