// External
import React, { createRef, useEffect, useRef, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { fetchData } from '../../actions';
import Title from './title';
import VerseWrapper from './verse-wrapper';
import styles from './styles.scss';
import { mapVersionToData, areReferencesInSync } from '../../lib/reference';

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
	  ref.current = value;
	});
	return ref.current;
}

function getLanguageFromVersion( version, book ) {
	if ( version === 'original' ) {
		if ( bible.Data.otBooks.indexOf( book ) > -1 ) {
			return 'hbo';
		}

		return 'grc';
	}
	return bible.Data.supportedVersions[ version ].language;
}

const Chapter = React.memo( ( { book, chapter, index } ) => {
	const reference = useSelector( state => state.reference );
	const currentReference = reference[ index ];
	const startVerse = currentReference.verse;
	const endVerse = currentReference.endVerse;

	const bookId = bible.getBookId( book + ' ' + chapter );
	const numberOfVerses = bible.Data.verses[ bookId - 1 ][ chapter - 1 ];
	const verseMap = [];
	for( let number = 0 ; number < numberOfVerses ; number++ ) {
		verseMap.push( number );
	}

	const dispatch = useDispatch();

	// used to scroll to the current chapter
	const currentRef = useRef();

	// probably move this to the parent
	useEffect( () => {
		reference.forEach( ( { book, version } ) => {
			dispatch( fetchData( mapVersionToData( book, version ) ) );
			if ( version === 'LC' ) { // This is needed as LC is mapped to original. It needs both data sources to work.
					dispatch( fetchData( 'LC' ) );
			}
		} );
	}, [ reference ] );

	useEffect( () => {
		scrollToCurrentChapter();
	}, [ currentReference.book, currentReference.chapter, currentReference.verse ] );

	const scrollToCurrentChapter = () => {
		const currrentChapter = ReactDOM.findDOMNode( currentRef.current );
		const referenceWindow = document.getElementById( 'referenceWindow' + index );
		if ( currrentChapter && referenceWindow ) {
			currrentChapter.scrollIntoView();
			referenceWindow.scrollBy( 0, 0 );
		}
	};

	const isCurrentRef = ( verseNumber ) => ( currentReference && currentReference.book === book && currentReference.chapter === chapter && currentReference.verse === ( verseNumber + 1 ) ) ? currentRef : null;

	const getSyncVerses = () => {
		const title = (
			<div className={ styles.chapterColumn }>
				{ reference.map( ( { version }, index ) => {
					const textToCopy = createRef( book + chapter + version + index );

					// This outputs an extra div for copying
					return (
						<Fragment key={ index }>
							<Title book={ book } chapter={ chapter } version={ version } key={ index } textToCopy={ textToCopy } />
							<div className={ styles.invisible }>
								{ getDifferentVerses( version, textToCopy ) }
							</div>
						</Fragment>
					);
				} ) }
			</div>
		);

		return (
			<div>
				{ title }
				{ verseMap.map( ( verse, verseNumber ) => {
					if ( endVerse && startVerse ) {
						if ( verseNumber + 1 < startVerse ) {
							return;
						}
						if ( verseNumber >= endVerse ) {
							return;
						}

					}

					return (
						<div className={ styles.singleReference } key={ verseNumber } ref={ isCurrentRef( verseNumber ) }>
							{ reference.map( ( { version }, index ) => {
								return (
									<VerseWrapper
										lang={ getLanguageFromVersion( version, book ) }
										book={ book }
										version={ version }
										chapter={ chapter }
										verse={ verseNumber + 1 }
										key={ 'versewrapper' + index + verseNumber }
										isCurrentRef={ !! isCurrentRef( verseNumber ) } />
								);
							} ) }
						</div>
					);
				} ) }
			</div>
		)
	}

	const getDifferentVerses = ( version, textToCopy ) => {
		return (
			<div ref={ textToCopy }>
				<Title book={ book } chapter={ chapter } version={ version } textToCopy={ textToCopy } />
				{ verseMap.map( ( verse, verseNumber ) => {
					if ( endVerse && startVerse ) {
						if ( verseNumber + 1 < startVerse ) {
							return;
						}
						if ( verseNumber >= endVerse ) {
							return;
						}
					}

					return (
						<div className={ styles.singleReference } key={ verseNumber } ref={ isCurrentRef( verseNumber ) }>
							<VerseWrapper
								lang={ getLanguageFromVersion( version, book ) }
								book={ book }
								version={ version }
								chapter={ chapter }
								verse={ verseNumber + 1 }
								isCurrentRef={ isCurrentRef( verseNumber ) } />
						</div>
					);
				} ) }
			</div>
		);
	}

	const version = currentReference.version;
	const textToCopy = createRef( book + chapter + version + index );

	return (
		<div className={ styles.chapter }>
			{ areReferencesInSync( reference ) ? getSyncVerses() : getDifferentVerses( version, textToCopy ) }
		</div>
	);
} );

export default Chapter;
