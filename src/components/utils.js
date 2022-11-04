import classnames from 'classnames';

export function rootClasses( darkMode ) {
	return classnames( 'root', { 'dark-mode-on': darkMode === true, 'dark-mode-off': darkMode === false } );
}

export function getLiteralConsistentTranslation( LC, word, lemma, morph ) {
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
