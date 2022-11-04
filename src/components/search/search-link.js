// External dependencies
import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

// Internal dependencies
import { setCurrentListResult, goToReferenceAction } from '../../actions';
import Verse from '../reference/verse';
import styles from './styles.scss';
import ReferenceText from '../reference-text';
import { goToReferenceHelper } from '../../lib/reference.js';
import { style } from '@mui/system';

const SearchLink = ( { reference, index, count, word } ) => {
	// State constants
	const expandedSearchResults = useSelector( state => state.settings.expandedSearchResults );
	const highlightSearchResults = useSelector( state => state.settings.highlightSearchResults );
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const isActive = word && typeof word.current !== 'undefined' && word.current === index;
	const inSync = useSelector( state => state.settings.inSync );
	const targetColumn = useSelector( state => state.settings.targetColumn );
	const stateReference = useSelector( state => state.reference );
	const compareMode = useSelector( state => state.settings.compareMode );
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

	const newHash = '/#' + goToReferenceHelper( stateReference, reference, targetColumn, inSync );

	return (
		<li className={ className }>
			<a href={ newHash }
				className={ styles.searchLink }
				onClick={ ( event ) => {
					if ( word ) {
						dispatch( setCurrentListResult( word.id, index ) );
					}
					event.stopPropagation();
					event.preventDefault();
					dispatch( goToReferenceAction( reference ) );
				} }
				onMouseOver={ highlightWords }
				onMouseOut={ unHighlightWords }
			>
				{ index + 1 }. <ReferenceText reference={ reference } />
				{ count && ' (' + count + ')' }
			</a>
			{ expandedSearchResultsRendered( reference ) }
		</li>
	);
};

export default React.memo( SearchLink );
