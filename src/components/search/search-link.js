// External dependencies
import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { setCurrentListResult, goToReferenceAction } from '../../actions';
import Verse from '../reference/verse';
import styles from './styles.scss';
import ReferenceText from '../reference-text';
import { getReferenceFromSearchResult } from '../../lib/reference';

const SearchLink = ( { referenceString, index, count, wordId, isActive, referenceToDisplay } ) => {
	// State constants
	const settings = useSelector( state => state.settings );
	const compareMode = settings && settings.compareMode;
	const expandedSearchResults = settings && settings.expandedSearchResults;
	const highlightSearchResults = settings && settings.highlightSearchResults;
	const interfaceLanguage = settings && settings.interfaceLanguage;

	const reference = getReferenceFromSearchResult( referenceString );
	if ( ! reference ) {
		return null;
	}

	if ( ! referenceToDisplay ) {
		referenceToDisplay = <ReferenceText reference={ reference } />;
	}

	const dispatch = useDispatch();

	// Component constants
	const className = classnames( styles.searchLink, isActive ? styles.activeReference : null );
	const highlightWords = () => {
		if( ! highlightSearchResults ) {
			return;
		}

		const verseData = getVerseData( reference, interfaceLanguage );
		const strongsNumbers = verseData.map( ( word ) => {
				return word[ 1 ]
			} );

		window.updateAppComponent( 'highlightedWord', strongsNumbers.join( ' ' ) );
	};
	const unHighlightWords = () => {
		if( ! highlightSearchResults ) {
			return;
		}

		window.updateAppComponent( 'highlightedWord', null );
	};
	const expandedSearchResultsRendered = ( reference ) => {
		const adjustedReference = { book: reference.book, chapter: reference.chapter - 1, verse: reference.verse - 1 };
		const className = classnames(
			styles.verse,
			expandedSearchResults ? styles.verseExpanded : null,
			compareMode ? styles.compareMode : styles.smallSidebar,
		);
		return (
			<div className={ className }>
				<Verse reference={ adjustedReference } index={ adjustedReference.verse } version={ interfaceLanguage } />
			</div>
		);
	};

	return (
		<li className={ className }>
			<a
				className={ styles.searchLink }
				onClick={ ( event ) => {
					if ( wordId ) {
						dispatch( setCurrentListResult( wordId, index ) );
					}
					event.stopPropagation();
					event.preventDefault();
					dispatch( goToReferenceAction( reference ) );
				} }
				onMouseOver={ highlightWords }
				onMouseOut={ unHighlightWords }
			>
				{ index + 1 }. { referenceToDisplay }
				{ count && ' (' + count + ')' }
			</a>
			{ expandedSearchResultsRendered( reference ) }
		</li>
	);
};

export default React.memo( SearchLink );
