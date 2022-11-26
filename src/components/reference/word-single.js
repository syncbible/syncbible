// External
import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import {
	selectWord,
	updateData,
} from '../../actions';
import { getFamily } from '../../lib/word';
import morphology from '../../lib/morphology';
import { getLiteralConsistentTranslation } from '../utils.js';

const WordSingleComponent = ( props ) => {
	// wordText is the word to display, usually the same as word unless this is LC.
	const { lemma, morph, version, word, wordText } = props;
	const dispatch = useDispatch();
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
			{ wordText }
		</span>
	);
};

export default React.memo( WordSingleComponent );
