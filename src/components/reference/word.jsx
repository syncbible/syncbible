// External
import React from 'react';
import { useSelector } from 'react-redux';

// Internal
import WordSingle from './word-single';
import { getLiteralConsistentTranslation } from '../utils.js';

function startsWithPunctuation( word ) {
	return (
		word.indexOf( '.' ) === 0 ||
		word.indexOf( ')' ) === 0 ||
		word.indexOf( '?' ) === 0 ||
		word.indexOf( '!' ) === 0 ||
		word.indexOf( ':' ) === 0 ||
		word.indexOf( ';' ) === 0 ||
		word.indexOf( ',' ) === 0
	);
}

const WordComponent = ( { word, version, prevWord, reference, index } ) => {
	if ( ! word ) {
		return null;
	}

	const [ wordValue, lemma, morph ] = word;

	const lemmaArray =
		lemma && typeof lemma === 'string' ? lemma.split( '/' ) : null;
	const morphArray =
		morph && typeof morph === 'string' ? morph.split( '/' ) : null;

	const getWordSingle = ( wordSingleValue, lemmaSingle, morphSingle ) => {
		if ( version === 'LC' ) {
			return useSelector( ( state ) =>
				getLiteralConsistentTranslation(
					state.data.LC,
					wordSingleValue,
					lemmaSingle,
					morphSingle,
					prevWord
				)
			);
		}

		return wordSingleValue;
	};

	const getLemmaSingle = ( key ) => {
		return lemmaArray ? lemmaArray[ key ] : null;
	};

	const getMorphSingle = ( key ) => {
		if ( ! morphArray ) {
			return null;
		}

		if ( morph.indexOf( 'H' ) === 0 && key > 0 ) {
			return 'H' + morphArray[ key ];
		}

		if ( morph.indexOf( 'A' ) === 0 && key > 0 ) {
			return 'A' + morphArray[ key ];
		}

		return morphArray[ key ];
	};

	const wordString =
		wordValue &&
		typeof wordValue === 'string' &&
		wordValue.split( '/' ).map( ( wordSingleValue, key ) => {
			const lemmaSingle = getLemmaSingle( key );
			const morphSingle = getMorphSingle( key );
			const wordSingle = getWordSingle(
				wordSingleValue,
				lemmaSingle,
				morphSingle
			);
			if ( version === 'LC' ) {
				return (
					<React.Fragment key={ key }>
						{ ' ' }
						<WordSingle
							key={ key }
							lemma={ lemmaSingle }
							word={ wordSingleValue }
							wordText={ wordSingle }
							morph={ morphSingle }
							version={ version }
							reference={ reference }
							index={ index }
						/>
					</React.Fragment>
				);
			}
			return (
				<WordSingle
					key={ key }
					lemma={ lemmaSingle }
					word={ wordSingleValue }
					wordText={ wordSingle }
					morph={ morphSingle }
					version={ version }
					reference={ reference }
					index={ index }
				/>
			);
		} );

	// Having this earlier helps speed.
	if ( startsWithPunctuation( wordValue ) ) {
		return wordString;
	}

	return <React.Fragment key={ word }> { wordString }</React.Fragment>;
};

export default React.memo( WordComponent );
