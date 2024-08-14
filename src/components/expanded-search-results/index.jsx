// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies.
import Verse from '../reference/verse';

const ExpandedSearchResults = ( { book, chapter, verse } ) => {
	if ( ! book || ! chapter || ! verse ) {
		return null;
	}

	const interfaceLanguage = useSelector( ( state ) => {
		return state.settings.interfaceLanguage;
	} );

	const adjustedReference = {
		book: book,
		chapter: chapter - 1,
		verse: verse - 1,
	};

	return (
		<div className="expanded-search-results-verse">
			<Verse
				reference={ adjustedReference }
				index={ adjustedReference.verse }
				version={ interfaceLanguage }
			/>
		</div>
	);
};

export default React.memo( ExpandedSearchResults );
