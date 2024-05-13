// External dependencies
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Waypoint } from 'react-waypoint';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { setScrollChapter } from '../../actions';
import Chapter from './chapter';
import styles from './styles.scss';
import { getNextChapter, getPreviousChapter } from '../../lib/reference';

let oldHeight = 0,
	scroller = null,
	isScrolling = false;

const getReferencesFromProps = ( nextProps ) => {
	if ( ! nextProps.reference || ! nextProps.reference.book ) {
		return null;
	}

	const book = nextProps.reference.book;
	const chapter = nextProps.reference.chapter;
	const references = [];
	const loadingPrev = false;
	const prevChapter = getPreviousChapter( { book, chapter } );
	const nextChapter = getNextChapter( { book, chapter } );

	if ( prevChapter ) {
		references.push( prevChapter );
	}
	references.push( { book, chapter } );

	if ( nextChapter ) {
		references.push( nextChapter );
	}

	return { book, chapter, references, loadingPrev };
};

const ReferenceComponent = ( props ) => {
	// We use a local component state to handle scrolling
	const [ references, setReferences ] = useState( {} );
	const referenceWindow = useRef();
	const inSync = useSelector( ( state ) => state.settings.inSync );
	const dispatch = useDispatch();

	useEffect( () => {
		setReferences( getReferencesFromProps( props ) );
	}, [ props ] );

	useLayoutEffect( () => {
		console && console.log( new Date() - timer );

		if ( typeof ga !== 'undefined' ) {
			ga( 'send', {
				hitType: 'event',
				eventCategory: 'Reference',
				eventAction: 'change',
				eventLabel: new Date() - timer,
			} );
		}
	}, [ references.book, references.chapter ] );

	useEffect( () => {
		if ( references.loadingPrev && referenceWindow.current ) {
			const newHeight = referenceWindow.current.scrollHeight;
			document.body.style.overflow = '';

			if ( referenceWindow.current.scrollTop === 0 ) {
				referenceWindow.current.scrollBy( 0, newHeight - oldHeight );
			}
		}
	} );

	const handleScroll = () => {
		const debouncedScroll = ( callback ) => {
			return setTimeout( callback, 250 );
		};

		if ( ! scroller ) {
			isScrolling = true;
		}
		clearTimeout( scroller );
		scroller = debouncedScroll( () => {
			isScrolling = false;

			if ( referenceWindow.current.scrollTop < 500 ) {
				addPreviousChapter();
			}

			if (
				referenceWindow.current.scrollHeight -
					referenceWindow.current.scrollTop -
					document.documentElement.clientHeight <
				1000
			) {
				addNextChapter();
			}
		} );
	};

	const handleWaypointEnter = ( event, book, chapter ) => {
		if ( event.previousPosition === 'above' ) {
			const currentChapter = bible.parseReference( book + ' ' + chapter );
			const prevChapter = currentChapter.prevChapter();
			if ( prevChapter ) {
				dispatch(
					setScrollChapter(
						prevChapter.book,
						prevChapter.chapter1,
						props.index
					)
				);
			}
		}
	};

	const handleWaypointLeave = ( event, book, chapter ) => {
		if ( event.currentPosition === 'above' ) {
			dispatch( setScrollChapter( book, chapter, props.index ) );
		}
	};

	const addNextChapter = () => {
		const localReferences = references.references.slice();
		const lastReference = localReferences[ localReferences.length - 1 ];
		const nextChapter = getNextChapter( lastReference );
		const nextChapterAlreadyLoaded =
			nextChapter &&
			find( localReferences, function ( reference ) {
				return (
					reference.bookID === nextChapter.bookID &&
					reference.chapter1 === nextChapter.chapter1
				);
			} );
		if ( nextChapter && ! nextChapterAlreadyLoaded ) {
			localReferences.push( nextChapter );
		}

		setReferences( {
			book: references.book,
			chapter: references.chapter,
			references: localReferences,
			loadingPrev: false,
		} );
	};

	const addPreviousChapter = () => {
		document.body.style.overflow = 'hidden';

		const localReferences = references.references.slice();
		const firstReference = localReferences[ 0 ];
		const prevChapter = getPreviousChapter( firstReference );
		const prevChapterAlreadyLoaded =
			prevChapter &&
			find( localReferences, function ( reference ) {
				return (
					reference.book === prevChapter.book &&
					reference.chapter === prevChapter.chapter
				);
			} );

		if ( prevChapter && ! prevChapterAlreadyLoaded ) {
			localReferences.unshift( prevChapter );
		}

		oldHeight = referenceWindow.current.scrollHeight;

		setReferences( {
			book: references.book,
			chapter: references.chapter,
			references: localReferences,
			loadingPrev: true,
		} );
	};

	if ( ! references || ! references.book ) {
		return null;
	}

	const classname = classnames(
		styles.reference,
		inSync ? null : styles.isNotSync
	);
	const currentBook = references.book;
	const currentChapter = references.chapter;

	const referenceHasEndVerse = () => {
		return props.reference.endVerse;
	};

	if ( referenceHasEndVerse() ) {
		return (
			<div className={ classname }>
				<div
					className={ styles.referenceInner }
					key={ currentBook + currentBook }
				>
					<Chapter
						book={ currentBook }
						chapter={ currentChapter }
						index={ props.index }
					/>
				</div>
			</div>
		);
	}

	return (
		<div
			id={ 'referenceWindow' + props.index }
			className={ classname }
			key={ currentBook + '-' + currentChapter }
			ref={ referenceWindow }
			onScroll={ handleScroll }
		>
			{ references.references &&
				references.references.map( ( referencesItem, key ) => {
					const book = referencesItem.book;
					const chapter = referencesItem.chapter;

					return (
						<div className={ styles.referenceInner } key={ key }>
							<Waypoint
								onEnter={ ( event ) =>
									handleWaypointEnter( event, book, chapter )
								}
								onLeave={ ( event ) =>
									handleWaypointLeave( event, book, chapter )
								}
								topOffset={ 0 } // This is the height of the dock
							/>
							<Chapter
								book={ book }
								chapter={ chapter }
								index={ props.index }
							/>
						</div>
					);
				} ) }
		</div>
	);
};

export default React.memo( ReferenceComponent );
