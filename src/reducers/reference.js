import { LOCATION_CHANGE } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist/lib/constants'

import { getReferenceText, getReferenceFromHash, getRandomReference } from '../lib/reference.js';

const getReferenceFromAction = ( reference, version ) => {
	const book = reference.book.replace( /\%20/gi, ' ' ),
		chapter = parseInt( reference.chapter ),
		verse = reference.verse ? parseInt( reference.verse ) : 1;

	return { book, chapter, verse, version };
}

const reference = ( state = [], action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			let hash;
			if ( "undefined" !== typeof action.payload.location && action.payload.location.hash ) {
				hash = action.payload.location.hash;
			} else {
				return state;
			}

			timer = new Date();

			const reference = getReferenceFromHash( hash );
			if ( ! reference || ! window.location.hash || '#/' === window.location.hash ) {
				return state;
			}

			document.title = getReferenceText( reference[ 0 ] ) + ' | sync.bible';
			return reference;

		case 'SET_REFERENCE':
			const setReferenceState = [ ...state ];
			setReferenceState[ action.index ] = getReferenceFromAction( action.reference, setReferenceState[ action.index ].version );
			return setReferenceState;

		case 'ADD_COLUMN':
			const addedState = [ ...state ];
			const numberOfColumns = state.length;
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
}

export default reference;
