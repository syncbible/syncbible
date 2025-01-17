import classnames from 'classnames';

export function rootClasses( darkMode, compareMode, expandedSearchResults ) {
	return classnames( 'root', {
		'dark-mode-on': darkMode === true,
		'dark-mode-off': darkMode === false,
		'compare-mode': compareMode === true,
		'expanded-search-results': expandedSearchResults === true,
	} );
}

export function getLiteralConsistentTranslation(
	LC,
	word,
	lemma,
	morph,
	prevWord
) {
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
		// If the last word was a noun then modify "him" to "his".
		if ( prevWord && prevWord[ 2 ] ) {
			const morphContainsAVerb = prevWord[ 2 ].match( /[N|\/N]/ );
			if ( morphContainsAVerb && morphContainsAVerb.length > 0 ) {
				return 'his';
			}
		}
	}

	if ( typeof LC[ word ][ lemma ][ morph ] === 'string' ) {
		return LC[ word ][ lemma ][ morph ];
	}

	return null;
}
