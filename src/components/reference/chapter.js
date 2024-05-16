// External
import React, { createRef, useEffect, useRef, Fragment, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { fetchData, setScrollChapterHarmonised } from '../../actions';
import Title from './title';
import VerseWrapper from './verse-wrapper';
import styles from './styles.scss';
import {
	mapVersionToData,
	areReferencesInSync,
	getNumberOfVerses,
	getHarmonisedReference,
} from '../../lib/reference';
import copyToClipboardHelper from '../../lib/copy-to-clipboard-helper';

function getLanguageFromVersion( version, book ) {
	if ( version === 'original' ) {
		if ( bible.Data.otBooks.indexOf( book ) > -1 ) {
			return 'hbo';
		}

		return 'grc';
	}
	return bible.Data.supportedVersions[ version ].language;
}

const Chapter = ( { book, chapter, index } ) => {
	const reference = useSelector( ( state ) => state.reference );
	const currentReference = reference[ index ];
	const startVerse = currentReference.verse;
	const endVerse = currentReference.endVerse;
	const numberOfVerses = getNumberOfVerses( { book, chapter } );
	const verseMap = [];
	for ( let number = 0; number < numberOfVerses; number++ ) {
		verseMap.push( number );
	}

	const dispatch = useDispatch();

	// used to scroll to the current chapter
	const currentRef = useRef();

	// probably move this to the parent
	useEffect( () => {
		reference.forEach( ( { book, version } ) => {
			dispatch( fetchData( mapVersionToData( book, version ) ) );
			if ( version === 'LC' ) {
				// This is needed as LC is mapped to original. It needs both data sources to work.
				dispatch( fetchData( 'LC' ) );
			}
		} );
	}, [ reference ] );

	useEffect( () => {
		scrollToCurrentChapter();
	}, [
		currentReference.book,
		currentReference.chapter,
		currentReference.verse,
	] );

	const scrollToCurrentChapter = () => {
		const currrentChapter = ReactDOM.findDOMNode( currentRef.current );
		const referenceWindow = document.getElementById(
			'referenceWindow' + index
		);
		if ( currrentChapter && referenceWindow ) {
			currrentChapter.scrollIntoView();
			referenceWindow.scrollBy( 0, 0 );
		}
	};

	const isCurrentRef = ( verseNumber ) => {
		if ( verseNumber === null ) {
			return false;
		}
		return currentReference &&
			currentReference.book === book &&
			currentReference.chapter === chapter &&
			currentReference.verse === verseNumber + 1
			? currentRef
			: null;
	};

	const textToCopyRef = createRef( book + chapter + version + index );
	const [ textToCopyText, setTextToCopyText ] = useState( '' );

	const customClickHandler = ( version ) => {
		setTextToCopyText( getDifferentVerses( version ) );
	};
	useEffect( () => {
		copyToClipboardHelper( textToCopyRef );
	}, [ textToCopyText ] );

	const getSyncVerses = () => {
		let parsedReference;
		const title = (
			<div className={ styles.chapterColumn }>
				{ reference.map( ( { version }, index ) => {
					const parsedReference = getHarmonisedReference( {
						book,
						chapter,
						verseNumber: 1, //TODO
						index,
					} );

					return (
						<Fragment key={ index }>
							<Title
								book={ parsedReference.book }
								chapter={ parsedReference.chapter }
								verse={ parsedReference.verseNumber }
								version={ version }
								key={ index }
								customClickHandler={ customClickHandler }
							/>
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
						<div
							className={ styles.singleReference }
							key={ verseNumber }
							ref={ isCurrentRef( verseNumber ) }
						>
							{ book === 'Harmony' && (
								<Waypoint
									topOffset={ 0 }
									onEnter={ ( { previousPosition } ) => {
										if ( previousPosition === 'above' ) {
											dispatch(
												setScrollChapterHarmonised(
													chapter,
													verseNumber
												)
											);
										}
									} }
									onLeave={ ( { currentPosition } ) => {
										if ( currentPosition === 'above' ) {
											dispatch(
												setScrollChapterHarmonised(
													chapter,
													verseNumber
												)
											);
										}
									} }
								>
									<span
										style={ {
											height: '1px',
										} }
									/>
								</Waypoint>
							) }
							{ reference.map( ( { version }, index ) => {
								if ( book === 'Harmony' ) {
									parsedReference = getHarmonisedReference( {
										book,
										chapter,
										verseNumber,
										index,
									} );
								} else {
									parsedReference = {
										book,
										chapter,
										verseNumber,
										index,
									};
								}
								const newVerseNumber =
									parsedReference.verseNumber !== null
										? parsedReference.verseNumber + 1
										: null;
								return (
									<VerseWrapper
										lang={ getLanguageFromVersion(
											version,
											book
										) }
										book={ parsedReference.book }
										version={ version }
										chapter={ parsedReference.chapter }
										verse={ newVerseNumber }
										key={
											'versewrapper' +
											index +
											newVerseNumber
										}
										isCurrentRef={
											!! isCurrentRef( newVerseNumber )
										}
									/>
								);
							} ) }
						</div>
					);
				} ) }
			</div>
		);
	};

	const getDifferentVerses = ( version ) => {
		return (
			<div>
				<Title
					book={ book }
					chapter={ chapter }
					version={ version }
					customClickHandler={ customClickHandler }
				/>
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
						<div
							className={ styles.singleReference }
							key={ verseNumber }
							ref={ isCurrentRef( verseNumber ) }
						>
							<VerseWrapper
								lang={ getLanguageFromVersion( version, book ) }
								book={ book }
								version={ version }
								chapter={ chapter }
								verse={ verseNumber + 1 }
								isCurrentRef={ isCurrentRef( verseNumber ) }
							/>
						</div>
					);
				} ) }
			</div>
		);
	};

	const version = currentReference.version;

	return (
		<div className={ styles.chapter }>
			{ /*This outputs an extra div for copying*/ }
			<div className={ styles.invisible } ref={ textToCopyRef }>
				{ textToCopyText }
			</div>
			{ areReferencesInSync( reference )
				? getSyncVerses()
				: getDifferentVerses( version ) }
		</div>
	);
};

export default React.memo( Chapter );
