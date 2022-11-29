// External dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import Translate from '../svg/translate';
import Search from '../svg/search';
import Stats from '../svg/stats';
import styles from './styles.scss';
import SearchLink from '../search/search-link';
import InlineResultsToggle from '../inline-results-toggle'
import { searchForWord } from '../../actions'
import MoreDetails from './more-details';
import WordStats from './word-stats';
import { style } from '@mui/system';

const WordBlockDetails = ( { morphologyProp, strongsNumber, version, word } ) => {
	const dispatch = useDispatch();
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const strongsWithFamilies = useSelector( state => state.data.strongsObjectWithFamilies );
	const [ activeTab, setActiveTab ] = useState( 'search' );

	const results = word.results && word.results.map( ( result, index ) => {
		const isActive = word && typeof word.current !== 'undefined' && word.current === index;
		return <SearchLink key={ index } index={ index } referenceString={ result } wordId={ word.id } isActive={ isActive } />;
	} );

	function getResultsDisplay() {
		let numberOfUses = strongsWithFamilies && strongsWithFamilies[ strongsNumber ] && '~' + strongsWithFamilies[ strongsNumber ].count;
		if ( results && results.length > 0 ) {
			numberOfUses = results.length;
		}
		const useString = numberOfUses === 1 ? 'use' : 'uses';
		const resultString = numberOfUses === 1 ? 'result' : 'results';
		if ( results ) {
			return (
				<>
					Found { numberOfUses } { useString } in { version }: <InlineResultsToggle />
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

	const getActiveTab = () => {
		if ( activeTab === 'search' ) {
			return getResultsDisplay();
		}

		if ( activeTab === 'more' ) {
			return <MoreDetails morphologyProp={ morphologyProp } strongsNumber={ strongsNumber } version={ version } />;
		}

		if ( activeTab === 'stats' ) {
			return <WordStats strongsNumber={ strongsNumber } />;
		}
	};

	return (
		<>
			<div className={ styles.tabs }>
				<a className={ activeTab === 'search' && styles.active } onClick={ () => setActiveTab( 'search' ) }><Search /></a>
				<a className={ activeTab === 'more' && styles.active } onClick={ () => setActiveTab( 'more' ) }><Translate /></a>
				<a className={ activeTab === 'stats' && styles.active } onClick={ () => setActiveTab( 'stats' ) }><Stats /></a>
			</div>
			<div className={ styles.wordBlocDetails }>
				{ getActiveTab() }
			</div>
		</>
	);
}

export default React.memo( WordBlockDetails );
