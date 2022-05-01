// External dependencies
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { removeFromList, toggleListItemVisible } from '../../actions';
import Collapsible from '../collapsible';
import ReferenceLink from '../reference-link';
import SearchLink from '../search/search-link';
import { getReferenceFromSearchResult } from '../../lib/reference.js';
import { getCrossReferencesArray } from '../../lib/cross-references.js';
import InlineResultsToggle from '../inline-results-toggle';

const Single = ( { bookmark, index } ) => {
	const dispatch = useDispatch();
	const data = useSelector( state => state.data );
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const bookmarkRef = useRef();
	const { data: { reference } } = bookmark;
	const crossReferencesArray = getCrossReferencesArray( data, reference );

	const handleToggle = () => {
		dispatch( toggleListItemVisible( bookmark ) );
	};

	const header = (
		<ReferenceLink reference={ reference } />
	);

	const renderCrossReferences = () => {
		if ( ! data.crossReferences ) {
			return 'Loading cross references';
		}
		return (
			<div>
				{ bookmark.results.length > 0 ? 'Cross references:' : 'No cross references' }
				<InlineResultsToggle />
				<div dir={ bible.isRtlVersion( interfaceLanguage ) ? 'rtl' : 'ltr' }>
					{ bookmark.results.map( ( crossReference, referenceKey ) => {
						return (
							<ol key={ referenceKey } title={ crossReferencesArray[ referenceKey ] }>
								<SearchLink key={ referenceKey } index={ referenceKey } reference={ getReferenceFromSearchResult( crossReference ) } />
							</ol>
						);
					} ) }
				</div>
			</div>
		);
	}

	return (
		<Collapsible
			key={ index }
			header={ header }
			open={ bookmark.visible }
			onToggle={ () => handleToggle() }
			textToCopy={ bookmarkRef }
			onRemove={ () => dispatch( removeFromList( bookmark ) ) }
		>
			<div ref={ bookmarkRef }>
				{ renderCrossReferences() }
			</div>
		</Collapsible>
	);
};

export default Single;
