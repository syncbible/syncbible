// External
import React, { useState } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import {
	selectWord,
	updateData,
} from '../../actions';
import { getFamily } from '../../lib/word';
import morphology from '../../lib/morphology';


const getLiteralConsistent = function( LC, word, lemma, morph ) {
	if ( ! LC ) {
		return null;
	}

	if ( ! LC[ word ] ) {
		return null;
	}

	if ( ! lemma ) {
		lemma = '';
	}

	if ( 'הו' === word ) {
		console.log( word, lemma, morph, LC[ word ][ lemma ][ morph ] );
	}

	if ( typeof LC[ word ][ lemma ][ morph ] === 'string' ) {
		return LC[ word ][ lemma ][ morph ];
	}

	return null;
}

export default React.memo( ( props ) => {
	const { lemma, morph, version, word } = props;
	const dispatch = useDispatch();
	const literalConsistentTranslation = useSelector( state => getLiteralConsistent( state.data.LC, word, lemma, morph ) );
	const strongsObjectWithFamilies = useSelector( state => state.data.strongsObjectWithFamilies );

	const getWord = () => {
		if ( version === 'LC' ) {
			return literalConsistentTranslation + ' ';
		}

		return word;
	};

	const clearHighlightWord = () => {
		window.updateAppComponent( 'highlightedWord', '' );
	};

	const highlightWord = () => {
		if ( lemma !== "G3588" ) {
			window.updateAppComponent( 'highlightedWord', lemma );
		}
	};

	const getTitle = () => {
		let lemmaForMorph = lemma;
		if ( ! lemma ) {
			lemmaForMorph = '';
		}
		return lemmaForMorph + ' - ' + ( morph ? morph : '' ) + ' - ' + morphology( morph, 'noLinks', lemmaForMorph );
	};

	const getClassName = () => {
		const family = lemma ? lemma.split( ' ' ).map( oneLemma => getFamily( oneLemma, strongsObjectWithFamilies ) + '-family' ) : null;

		if ( lemma === 'added' ) {
			return classnames( 'single', lemma );
		}

		return classnames( 'single', lemma, family );
	};

	return (
		<span
			className={ getClassName() }
			onMouseOver={ highlightWord }
			onMouseOut={ clearHighlightWord }
			onClick={ ( event ) => {
				if( event.altKey && ( version === 'LC' || version === 'original' ) ) {
					const translation = window.prompt( word + ' ' + lemma + ' ' + morph, literalConsistentTranslation );
					dispatch( updateData( { version: 'LC', word, lemma, morph, translation } ) );
				} else {
					dispatch( selectWord( props ) );
				}
			} }
			title={ getTitle() }
			key={ lemma }
			>
			{ getWord() }
		</span>
	);
} );
