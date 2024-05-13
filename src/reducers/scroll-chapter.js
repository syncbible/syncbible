import { LOCATION_CHANGE } from 'connected-react-router';
import { getReferenceFromHash } from '../lib/reference.js';

const initialState = [];

const scrollChapter = ( state = initialState, action ) => {
	switch ( action.type ) {
		case LOCATION_CHANGE:
			if ( 'undefined' === typeof action.payload.location ) {
				return state;
			}
			const hash = action.payload.location.hash;

			return getReferenceFromHash( hash );

		case 'SET_SCROLL_CHAPTER':
			const newState = [ ...state ],
				book = action.book,
				chapter = action.chapter,
				index = action.index;

			newState[ index ] = { book, chapter };
			return newState;

		case 'SET_SCROLL_CHAPTER_SYNCED':
			return state.map( () => {
				return { book: action.book, chapter: action.chapter };
			} );

		case 'REMOVE_COLUMN':
			const removedState = [ ...state ];
			removedState.splice( action.index, 1 );
			return removedState;

		default:
			return state;
	}
};

export default scrollChapter;
