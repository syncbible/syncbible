import { LOCATION_CHANGE } from 'connected-react-router';

import { getReferenceText, getReferenceFromHash } from '../lib/reference.js';

const getReferenceFromAction = ( reference, version ) => {
	const book = reference.book.replace( /\%20/gi, ' ' ),
		chapter = parseInt( reference.chapter ),
		verse = reference.verse ? parseInt( reference.verse ) : 1,
		endVerse = reference.verse ? parseInt( reference.endVerse ) : null;

	return { book, chapter, verse, endVerse, version };
};

const reference = ( state = [], action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			let hash;
			if (
				'undefined' !== typeof action.payload.location &&
				action.payload.location.hash
			) {
				hash = action.payload.location.hash;
			} else {
				return state;
			}

			timer = new Date();

			const referenceFromHash = getReferenceFromHash( hash );
			if (
				! referenceFromHash ||
				! window.location.hash ||
				'#/' === window.location.hash
			) {
				return state;
			}

			document.title =
				getReferenceText( referenceFromHash[ 0 ] ) + ' | sync.bible';

			return referenceFromHash;

		case 'SET_REFERENCE':
			const setReferenceState = [ ...state ];
			setReferenceState[ action.index ] = getReferenceFromAction(
				action.reference,
				setReferenceState[ action.index ].version
			);
			return setReferenceState;

		// I suspect this isn't used.
		case 'ADD_COLUMN':
			console.log( 'oh look this is used after all!' );
			const addedState = [ ...state ];
			const addedColumn = Object.assign( {}, state[ state.length - 1 ] );
			addedState.push( addedColumn );
			return addedState;

		case 'REMOVE_COLUMN':
			const removedState = [ ...state ];
			removedState.splice( action.index, 1 );
			return removedState;

		default:
			return state;
	}
};

export default reference;
