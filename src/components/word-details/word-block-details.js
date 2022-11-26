// External dependencies
import map from 'lodash/map';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import KJVDef from './kjv-def';
import morphology from '../../lib/morphology';
import stripPointing from '../../lib/strip-pointing.js';
import styles from './styles.scss';
import { getFamily } from '../../lib/word';
import WordBlockLink from './word-block-link';
import SearchLink from '../search/search-link';
import InlineResultsToggle from '../inline-results-toggle'
import { searchForWord } from '../../actions'

const WordBlockDetails = ( { morphologyProp, strongsNumber, version, word } ) => {
	const dispatch = useDispatch();
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const strongsDictionary = useSelector( state => state.data.strongsDictionary );
	const strongsWithFamilies = useSelector( state => state.data.strongsObjectWithFamilies );
	const [ showDetails, setShowDetails ] = useState( false );

	const getBranchesData = () => {
		return map( javascripture.data.strongsObjectWithFamilies, ( strongsObjectData, strongsObjectNumber ) => {
			if ( strongsObjectData.roots && strongsObjectData.roots.indexOf( strongsNumber ) > -1 ) {
				return (
					<WordBlockLink key={ strongsObjectNumber } strongsNumber={ strongsObjectNumber } version={ version } />
				);
			}
		} );
	};

	const getBranches = () => {
		const branchesData = getBranchesData();
		if ( branchesData ) {
			return branchesData;
		}

		return 'None';
	}

	const getRoots = () => {
		if ( ! strongsWithFamilies || ! strongsWithFamilies[ strongsNumber ] ) {
			return;
		}

		const rootsData = strongsWithFamilies[ strongsNumber ].roots;
		if( rootsData ) {
			return rootsData.map( ( rootNumber, index ) => {
				return (
					<WordBlockLink key={ index } strongsNumber={ rootNumber } version={ version } />
				);
			} );
		}

		return 'None';
	};

	const getMorphology = () => {
		return morphologyProp && morphologyProp.split( ' ' ).map( ( morph, index ) => {
			return ( index !== 0 ? ' - ' : '' ) + morphology( morph, 'noLinks', strongsNumber );
		} );
	};

	const wordDetail = strongsDictionary && strongsDictionary[ strongsNumber ];
	const getKJVDefinitions = () => {
		return wordDetail && wordDetail.kjv_def && wordDetail.kjv_def.split( ',' ).map( ( word, index ) => {
			const wordString = word.trim().replace( /\./g, '' );

			return (
				<span key={ index }>
					{ index === 0 ? '' : ', ' }
					<KJVDef word={ wordString } strongsNumber={ strongsNumber } />
				</span>
			);
		} );
	}

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
				<p>Loading { numberOfUses } search { resultString }.</p>
			);
		}

		if ( strongsWithFamilies && strongsWithFamilies[ strongsNumber ] && strongsWithFamilies[ strongsNumber ].count < 100 ) {
			return ( <p>Searching...</p> );
		}

		return (
			<p><a href="#" className="word-block-details__find-all-uses" onClick={ () => dispatch( searchForWord( word.data ) ) }>Find { numberOfUses } { useString } { numberOfUses > 1000 && <span>(slow!)</span> }</a></p>
		);
 	}
	let moreDetails = (
		<p><a className={ styles.moreDetails } href="#" onClick={ ( event ) => {
			event.preventDefault();
			setShowDetails( true );
		} }>
			View details
		</a></p>
	);
	if ( showDetails ) {
		moreDetails = (
			<>
				{ strongsNumber } | { wordDetail && stripPointing( wordDetail.lemma ) }
				{ wordDetail && wordDetail.xlit ? ' | ' + wordDetail.xlit : null }
				{ wordDetail && wordDetail.translit ? ' | ' + wordDetail.translit : null }
				{ wordDetail && wordDetail.pronounciation ? ' | ' + wordDetail.pronounciation : null }
				<br />
				<div>
					<strong>Roots: </strong>{ getRoots() }
				</div>
				<div>
					<strong>Branches: </strong>{ getBranches() }
				</div>
				<div>
					<strong>Family: </strong>{ getFamily( strongsNumber, strongsWithFamilies ) }
				</div>
				<div>
					{ strongsWithFamilies && strongsWithFamilies[ strongsNumber ] && strongsWithFamilies[ strongsNumber ].count } uses
				</div>
				<br />
				<div>
					<strong>Morphology</strong><br />{ morphologyProp } - { morphologyProp && getMorphology() }<br />
					<br />
					<strong>KJV translations</strong><br />{ getKJVDefinitions( strongsNumber ) }<br />
					<br />
					<strong>Strong's Derivation</strong><br />{ wordDetail && wordDetail.derivation }<br />
				</div>
				<br />
				<p>
					<a className={ styles.moreDetails } href="#" onClick={ ( event ) => {
						event.preventDefault();
						setShowDetails( false );
					} }>
						Hide details
					</a>
				</p>
			</>
		)
	}
	let resultsDisplay = getResultsDisplay();

	return (
		<div>
			{ moreDetails }
			<br />
			{ resultsDisplay }
		</div>
	);
}

export default React.memo( WordBlockDetails );
