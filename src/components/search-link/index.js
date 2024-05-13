// External dependencies
import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { setCurrentListResult, goToReferenceAction } from '../../actions';
import ExpandedSearchResults from '../expanded-search-results';
import styles from './styles.scss';
import ReferenceText from '../reference-text';
import { getReferenceFromSearchResult } from '../../lib/reference';

const SearchLink = ( {
	referenceString,
	index,
	count,
	wordId,
	isActive,
	referenceToDisplay,
} ) => {
	console.log( 'render Searching' );
	// State constants
	const highlightSearchResults = useSelector(
		( state ) => state.settingshighlightSearchResults
	);
	const interfaceLanguage = useSelector(
		( state ) => state.interfaceLanguage
	);

	const reference = getReferenceFromSearchResult( referenceString );
	if ( ! reference ) {
		return null;
	}

	if ( ! referenceToDisplay ) {
		referenceToDisplay = <ReferenceText reference={ reference } />;
	}

	const dispatch = useDispatch();

	// Component constants
	const className = classnames(
		styles.searchLink,
		isActive ? styles.activeReference : null
	);
	const highlightWords = () => {
		if ( ! highlightSearchResults ) {
			return;
		}

		const verseData = getVerseData( reference, interfaceLanguage );
		const strongsNumbers = verseData.map( ( word ) => {
			return word[ 1 ];
		} );

		window.updateAppComponent(
			'highlightedWord',
			strongsNumbers.join( ' ' )
		);
	};
	const unHighlightWords = () => {
		if ( ! highlightSearchResults ) {
			return;
		}

		window.updateAppComponent( 'highlightedWord', null );
	};

	return (
		<li className={ className }>
			<a
				className={ styles.searchLink }
				onClick={ ( event ) => {
					if ( wordId ) {
						//dispatch( setCurrentListResult( wordId, index ) );
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
			<ExpandedSearchResults
				book={ reference.book }
				chapter={ reference.chapter }
				verse={ reference.verse }
			/>
		</li>
	);
};

export default React.memo( SearchLink );
