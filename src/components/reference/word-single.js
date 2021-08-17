// External
import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import {
	selectWord,
} from '../../actions';
import { getFamily } from '../../lib/word';
import morphology from '../../lib/morphology';

export default React.memo( ( props ) => {
	const { lemma, morph, version, word } = props;
	const dispatch = useDispatch();
	const LC = useSelector( state => state.data.LC );
	const strongsObjectWithFamilies = useSelector( state => state.data.strongsObjectWithFamilies );

	const getLiteralConsistent = function( word, lemma, morph ) {
		if ( ! LC ) {
			return null;
		}

		if ( ! LC[ word ] ) {
			return null;
		}

		if ( ! lemma ) {
			lemma = '';
		}

		if ( typeof LC[ word ][ lemma ][ morph ] === 'string' ) {
			return LC[ word ][ lemma ][ morph ];
		}

		return null;
	}

	const getWord = () => {
		if ( version === 'LC' ) {
			return getLiteralConsistent( word, lemma, morph ) + ' ';
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
			onClick={ () => dispatch( selectWord( props ) ) }
			title={ getTitle() }
			key={ lemma }
			>
			{ getWord() }
		</span>
	);
} );
