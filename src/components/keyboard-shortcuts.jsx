// External dependencies
import React, { useEffect } from 'react';
import mousetrap from 'mousetrap';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import {
	setTrayVisibilityFilter,
	setCurrentListResult,
	goToReferenceAction,
	deactivateSearchSelect,
	goToChapterAction,
} from '../actions';
import { getReferenceFromSearchResult } from '../lib/reference.js';

// Component variables
let lastTimeStamp = 0,
	waiter,
	firstPartOfChapter,
	chapterToGoTo;

const KeyboardShortcuts = () => {
	/* Taking this out for performance reasons.
		const currentListItemFromState = useSelector( ( state ) =>
		state.list.filter( ( { current } ) => typeof current !== 'undefined' )
	);
	const currentListItem = currentListItemFromState.shift();*/

	const dispatch = useDispatch();

	const goToChapter = ( event, combo ) => {
		const currentTimeStamp = Math.floor( event.timeStamp );

		chapterToGoTo = combo;
		if ( currentTimeStamp - lastTimeStamp < 350 ) {
			chapterToGoTo = firstPartOfChapter + chapterToGoTo;
		}

		clearTimeout( waiter );
		waiter = setTimeout( () => {
			dispatch( goToChapterAction( chapterToGoTo ) );
		}, 350 );

		lastTimeStamp = currentTimeStamp;
		firstPartOfChapter = chapterToGoTo;
	};

	const openTray = ( event, combo ) => {
		event.preventDefault();
		const tray = combo.split( '+' )[ 1 ];
		dispatch( setTrayVisibilityFilter( tray ) );
	};

	useEffect( () => {
		mousetrap.bind( [ '=' ], () => {
			if (
				currentListItem &&
				currentListItem.current < currentListItem.results.length - 1
			) {
				dispatch(
					goToReferenceAction(
						getReferenceFromSearchResult(
							currentListItem.results[
								currentListItem.current + 1
							]
						)
					)
				);
				dispatch(
					setCurrentListResult(
						currentListItem.id,
						currentListItem.current + 1
					)
				);
			}
		} );
		mousetrap.bind( [ '-' ], () => {
			if ( currentListItem && currentListItem.current > 0 ) {
				dispatch(
					goToReferenceAction(
						getReferenceFromSearchResult(
							currentListItem.results[
								currentListItem.current - 1
							]
						)
					)
				);
				dispatch(
					setCurrentListResult(
						currentListItem.id,
						currentListItem.current - 1
					)
				);
			}
		} );
		mousetrap.bind(
			[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ],
			( event, combo ) => goToChapter( event, combo )
		);
		mousetrap.bind(
			[ 'alt+1', 'alt+2', 'alt+3', 'alt+4', 'alt+5', 'alt+6' ],
			( event, combo ) => openTray( event, combo )
		);
		mousetrap.bind( [ 'esc' ], () => dispatch( deactivateSearchSelect() ) );
	} );

	return null;
};

export default React.memo( KeyboardShortcuts );
