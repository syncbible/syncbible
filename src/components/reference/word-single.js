// External
import React, { useState } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import {
	receiveData,
	selectWord,
	updateData,
} from '../../actions';
import { getFamily } from '../../lib/word';
import morphology from '../../lib/morphology';
import { getLiteralConsistentTranslation } from '../utils.js';
import verse from './verse';

const WordSingleComponent = ( props ) => {
	// wordText is the word to display, usually the same as word unless this is LC.
	const { lemma, morph, version, word, wordText, reference, index } = props;
	const { book, chapter, verse } = reference;
	const dispatch = useDispatch();
	const data = useSelector( state => state.data );
	let literalConsistentTranslation;
	if ( version === 'LC' || version === 'original' ) {
		literalConsistentTranslation = useSelector( state => getLiteralConsistentTranslation( state.data.LC, word, lemma, morph ) );
	}

	const clearHighlightWord = () => {
		window.updateAppComponent( 'highlightedWord', '' );
	};

	const highlightWord = () => {
		window.updateAppComponent( 'highlightedWord', lemma );
	};

	const getTitle = () => {
		let lemmaForMorph = lemma;
		if ( ! lemma ) {
			lemmaForMorph = '';
		}
		return lemmaForMorph + ' - ' + ( morph ? morph : '' ) + ' - ' + morphology( morph, 'noLinks', lemmaForMorph );
	};

	const getClassName = () => {
		let family = null;

		if ( lemma ) {
			const strongsObjectWithFamilies = useSelector( state => state.data.strongsObjectWithFamilies );
			family = lemma.split( ' ' ).map( oneLemma => getFamily( oneLemma, strongsObjectWithFamilies ) + '-family' );
		}

		if ( lemma === 'added' ) {
			return classnames( 'single', lemma );
		}

		return classnames( 'single', lemma, family );
	};

	const parseTranslations = ( farsiTranslations ) => {
		return farsiTranslations.translations && Object.keys( farsiTranslations.translations ).map( translation => {
			return farsiTranslations.translations[ translation ].join( ', ' );
		} )
	}

	return (
		<span
			className={ getClassName() }
			onMouseOver={ highlightWord }
			onMouseOut={ clearHighlightWord }
			onClick={ ( event ) => {
				if( event.altKey ) {
					// Update the literal consistent translation.
					if (  version === 'LC' ) {
						const translation = window.prompt( word + ' ' + lemma + ' ' + morph, literalConsistentTranslation );
						dispatch( updateData( { version: 'LC', word, lemma, morph, translation } ) );
					}

					// Update the farsi strongs translation.
					if ( version === 'NMV_strongs' ) {
						let suggestions = '';
						// Check the translations have loaded.
						if ( data.farsiTranslations && data.farsiTranslations[ word ] ) {
							const farsiTranslations = data.farsiTranslations[ word ];
							suggestions = '\r\nSuggested translation:\r\n' + farsiTranslations.translation + '\r\n\r\nAdditional translations:\r\n' + parseTranslations( farsiTranslations )
						}

						const newStrongsNumber = window.prompt( word + suggestions, lemma );
						// Update the data in memory.
						data['NMV_strongs'][ book ][ chapter ][ verse ][ index ] = [ word, newStrongsNumber ];
						// Push the update to the store.
						dispatch( receiveData( 'NMV_strongs', data['NMV_strongs'] ) );
					}
				} else {
					dispatch( selectWord( props ) );
				}
			} }
			title={ getTitle() }
			key={ lemma }
			>
			{ wordText }
		</span>
	);
};

export default React.memo( WordSingleComponent );
