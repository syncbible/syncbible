// External dependencies
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { removeFromList, toggleListItemVisible } from '../../actions';
import Collapsible from '../collapsible';
import ReferenceLink from '../reference-link';
import SearchLink from '../search-link';
import InlineResultsToggle from '../inline-results-toggle';
import { getGroupedResults } from '../../lib/reference';

const Single = ( { bookmark, index } ) => {
	const dispatch = useDispatch();
	const data = useSelector( ( state ) => state.data );
	const interfaceLanguage = useSelector(
		( state ) => state.settings.interfaceLanguage
	);
	const bookmarkRef = useRef();
	const userInterface = useSelector( ( state ) => state.userInterface );
	const {
		data: { reference },
	} = bookmark;

	const handleToggle = () => {
		dispatch( toggleListItemVisible( bookmark ) );
	};

	const header = <ReferenceLink reference={ reference } />;

	const renderCrossReferences = () => {
		if ( ! data.crossReferences ) {
			return 'Loading cross references';
		}
		return (
			<div>
				{ bookmark.results.length > 0
					? 'Cross references:'
					: 'No cross references' }
				<InlineResultsToggle />
				<div
					dir={
						bible.isRtlVersion( interfaceLanguage ) ? 'rtl' : 'ltr'
					}
				>
					<ol>
						{ bookmark.results.map(
							( crossReference, referenceKey ) => {
								const isActive =
									bookmark &&
									typeof bookmark.current !== 'undefined' &&
									bookmark.current === referenceKey;
								return (
									<SearchLink
										key={ referenceKey }
										index={ referenceKey }
										referenceString={
											crossReference.reference
										}
										wordId={ bookmark.id }
										isActive={ isActive }
									/>
								);
							}
						) }
					</ol>
				</div>
			</div>
		);
	};

	const renderOverlap = () => {
		const original = useSelector( ( state ) => state.data.original );
		const searchResultsData = useSelector(
			( state ) => state.data.searchResults
		);

		// Return if there's no data. Surely there's a better way.
		if ( Object.keys( original ).length === 0 ) {
			return;
		}
		const originalVerse =
			original[ reference.book ][ reference.chapter - 1 ][
				reference.verse - 1
			];

		const allLemmasForVerse = originalVerse
			.map( ( word ) => {
				return word[ 1 ].split( '/' );
			} )
			.flat();
		const searchResultsForAllWords = allLemmasForVerse
			.map( ( lemma ) => {
				// Get the results from cache
				if ( searchResultsData && searchResultsData[ lemma ] ) {
					return searchResultsData[ lemma ];
				}
			} )
			.flat();

		const processedResults = searchResultsForAllWords.map(
			( reference ) => {
				if ( ! reference ) {
					return;
				}
				const referenceArray = reference.split( '.' );
				const bookCode = referenceArray[ 0 ];
				const bookId = bible.getBookId( bookCode );
				const bookName = bible.getBook( bookId );
				return {
					reference:
						bookName +
						'.' +
						referenceArray[ 1 ] +
						'.' +
						referenceArray[ 2 ],
				};
			}
		);

		const groupedResults = getGroupedResults(
			processedResults,
			'verse',
			'desc',
			interfaceLanguage
		);

		return (
			<ol>
				{ groupedResults.map( ( result, resultKey ) => {
					const reference = result[ 0 ];
					if ( ! reference ) {
						return;
					}
					return (
						<SearchLink
							key={ resultKey }
							index={ resultKey }
							referenceString={
								reference[ 0 ] +
								'.' +
								reference[ 1 ] +
								'.' +
								reference[ 2 ]
							}
							count={ result.length }
						/>
					);
				} ) }
			</ol>
		);
	};

	return (
		<Collapsible
			key={ index }
			header={ header }
			open={ userInterface[ bookmark.id ] }
			onToggle={ () => handleToggle() }
			textToCopy={ bookmarkRef }
			onRemove={ () => dispatch( removeFromList( bookmark ) ) }
		>
			<div ref={ bookmarkRef }>{ renderCrossReferences() }</div>
			<div>{ /*renderOverlap()*/ }</div>
		</Collapsible>
	);
};

export default Single; // Adding memo here stops it updating correctly.
