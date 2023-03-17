// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal
import { getHighlight, getHighlightBorder } from '../strongs-color.js';
import { isValidWord } from '../../lib/word.js';

const WordHighlight = ( { word } ) => {
	const settings = useSelector( state => state.settings );
	const searchSelect = useSelector( state => state.searchSelect );
	const strongsObjectWithFamilies = useSelector( state => state.data.strongsObjectWithFamilies );
	if ( typeof word === 'string' ) {
		word = [ word ];
	}
	return (
		<style>
			{ word && word.map( word => {
				if ( ! isValidWord( word ) ) {
					return;
				}

				if ( searchSelect ) {
					return getHighlightBorder( word, settings.highlightWordsWith, strongsObjectWithFamilies );
				}

				return getHighlight( word, settings.highlightWordsWith, strongsObjectWithFamilies );
			} ) }
		</style>
	);
};

export default React.memo( WordHighlight );
