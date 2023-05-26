// External
import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { activateSearchSelect, selectWord, updateData } from '../../actions';
import { getFamily } from '../../lib/word';
import morphology from '../../lib/morphology';
import { getLiteralConsistentTranslation } from '../utils.js';

const WordSingleComponent = ( props ) => {
	// wordText is the word to display, usually the same as word unless this is LC.
	const { lemma, morph, version, word, wordText, reference, index } = props;
	const lemmaArray = lemma ? lemma.split( /[\&\s]/ ) : []; // Split by space or &.

	const { book, chapter, verse } = reference;
	const dispatch = useDispatch();
	const data = useSelector( ( state ) => state.data );
	let literalConsistentTranslation;
	if ( version === 'LC' || version === 'original' ) {
		literalConsistentTranslation = useSelector( ( state ) =>
			getLiteralConsistentTranslation( state.data.LC, word, lemma, morph )
		);
	}

	const clearHighlightWord = () => {
		window.updateAppComponent( 'highlightedWord', '' );
	};

	const highlightWord = () => {
		window.updateAppComponent( 'highlightedWord', lemmaArray );
	};

	const getTitle = () => {
		let titleText = '';

		if ( lemmaArray.length > 0 ) {
			titleText += lemmaArray
				.map( ( oneLemma ) => {
					let extraTitleText = oneLemma;
					if ( morph ) {
						extraTitleText += '  |  ' + morph;

						const morphDesc = morphology(
							morph,
							'noLinks',
							oneLemma
						);
						if ( morphDesc ) {
							extraTitleText += '  |  ' + morphDesc;
						}
					}
					return extraTitleText;
				} )
				.join( ', ' );
		}

		// Check the translations have loaded.
		if (
			version === 'NMV_strongs' &&
			data.farsiTranslations &&
			data.farsiTranslations[ word ]
		) {
			const farsiTranslations = data.farsiTranslations[ word ];
			titleText += '  |  ' + farsiTranslations.translation;

			const listOfTranslations = parseTranslations( farsiTranslations );
			if ( listOfTranslations.length > 0 ) {
				titleText += '  |  ' + listOfTranslations;
			}
		}

		return titleText;
	};

	const getClassName = () => {
		let family = null;

		if ( lemmaArray.length > 0 ) {
			const strongsObjectWithFamilies = useSelector(
				( state ) => state.data.strongsObjectWithFamilies
			);
			family = lemmaArray.map(
				( oneLemma ) =>
					getFamily( oneLemma, strongsObjectWithFamilies ) + '-family'
			);
		}

		if ( lemma === 'added' ) {
			return classnames( 'single', lemma );
		}

		return classnames( 'single', lemmaArray, family );
	};

	const parseTranslations = ( farsiTranslations ) => {
		return (
			farsiTranslations.translations &&
			Object.keys( farsiTranslations.translations ).map(
				( translation ) => {
					return farsiTranslations.translations[ translation ].join(
						', '
					);
				}
			)
		);
	};

	return (
		<span
			className={ getClassName() }
			onMouseOver={ highlightWord }
			onMouseOut={ clearHighlightWord }
			onClick={ ( event ) => {
				if ( event.altKey || event.ctrlKey || event.metaKey ) {
					// Update the literal consistent translation.
					if ( version === 'LC' ) {
						const translation = window.prompt(
							word + ' ' + lemma + ' ' + morph,
							literalConsistentTranslation
						);
						dispatch(
							updateData( {
								version: 'LC',
								word,
								lemma,
								morph,
								translation,
							} )
						);
					}

					// Update the farsi strongs translation.
					if ( version === 'NMV_strongs' ) {
						reference.index = index;
						dispatch( activateSearchSelect( reference ) );
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
