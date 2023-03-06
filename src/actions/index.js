var cache = 'syncbible.23.0.1678116621';

// External dependencies.
import xhr from 'xhr';
import { push } from 'connected-react-router';

// Internal dependencies.
import {
	addColumnHelper,
	deleteColumnHelper,
	getAllLemmasFromReference,
	goToReferenceHelper,
	getSyncReference,
	getUnSyncReference,
	getNewVersionHash,
	sortReferences,
} from '../lib/reference.js';
import { isValidWord } from '../lib/word.js';
import reference from '../reducers/reference.js';

export const goToReferenceAction = ( reference, targetColumn ) => {
	return function( dispatch, getState ) {
		const state = getState();

		// Preserve the old version.
		const version = state.reference[ 0 ].version;
		reference.version = version;

		if ( typeof targetColumn === "undefined" ) {
			targetColumn = state.settings.targetColumn;
		}

		const newHash = goToReferenceHelper( state.reference, reference, targetColumn, state.settings.inSync );
		dispatch( push( '/#' + newHash ) );
	}
}

export const syncReferences = () => {
	return function( dispatch, getState ) {
		const state = getState();
		const newHash = getSyncReference( state.reference );
		dispatch( push( '/#' + newHash ) );
		dispatch( settingsChange( 'inSync', true ) )
	}
}

export const unSyncReferences = () => {
	return function( dispatch, getState ) {
		const state = getState();
		const newHash = getUnSyncReference( state.reference );
		dispatch( push( '/#' + newHash ) );
		dispatch( settingsChange( 'inSync', false ) )
	}
}

export const addColumnAction = ( version = '' ) => {
	return function( dispatch, getState ) {
		const state = getState();
		const newHash = addColumnHelper( state.reference, version );
		dispatch( push( '/#' + newHash ) );
	}
}

export const deleteColumnAction = () => {
	return function( dispatch, getState ) {
		const state = getState();
		const newHash = deleteColumnHelper( state.reference );
		dispatch( push( '/#' + newHash ) );
	}
}

export const setTrayVisibilityFilter = ( filter ) => {
	return {
		type: 'SET_TRAY_VISIBILITY_FILTER',
		filter
	}
}

export const setScrollChapter = ( book, chapter, index ) => {
	return {
		book,
		chapter,
		index,
		type: 'SET_SCROLL_CHAPTER'
	}
}

export const settingsChange = ( settingName, settingValue ) => {
	var returnValue = {
		type: 'SETTINGS_CHANGE'
	}
	returnValue[ settingName ] = settingValue;

	return returnValue;
}

export const showCrossReferences = ( reference ) => {
	return {
		reference,
		type: 'SHOW_CROSS_REFERENCES'
	}
}

export const findSimilarReferences = ( reference, listItem ) => {
	return function( dispatch, getState ) {
		const searchParameters = {
			clusivity: 'inclusive',
			version: 'original',
			lemma: getAllLemmasFromReference( reference, getState().data.original ),
			range: 'verse',
		};

		// Send data to our worker.
		postMessageToWorker( 'search', searchParameters, getState() );

		dispatch( {
			reference,
			type: 'FIND_SIMILAR_REFERENCES'
		} );
	}
}

function postMessageToWorker( task, parameters, state ) {
	let data = state.data[ parameters.version ];
	if ( parameters.version === 'LC' ) {
		data = state.data[ 'original' ];
	}
	worker.postMessage( {
		task,
		parameters,
		data,
	} );
}

const getResultsForWord = ( versionData, strongsNumber ) => {
	const resultData = [];
	Object.keys( versionData ).forEach( book => versionData[ book ].forEach( ( chapter, chapterNumber ) => chapter.forEach( ( verse, verseNumber ) => verse.forEach( word => {
		const lemmaArray = word[1] && word[1].split(/ |\//); // should also split by &.
		if ( lemmaArray && lemmaArray.indexOf( strongsNumber ) > -1 ) {
			resultData.push( { 'reference': book + '.' + ( chapterNumber + 1 ) + '.' + ( verseNumber + 1 ), word } );
		}
	} ) ) ) );
	return resultData.sort( sortReferences );
};

export const addWord = ( word ) => {
	return function( dispatch, getState ) {
		word.data.clusivity = 'exclusive';
		word.data.range = 'verse';

		// Send data to our worker.
		dispatch( addToList( word ) );

		const state = getState();
		const strongsObjectWithFamilies = state.data.strongsObjectWithFamilies;
		const versionData = state.data[ word.data.version ];
		const uses = strongsObjectWithFamilies[ word.data.lemma ].count;

		if ( uses < 100 ) {
			dispatch( {
				terms: word.data,
				results: getResultsForWord( versionData, word.data.lemma ),
				type: 'ADD_SEARCH_RESULTS',
			} );
		}
	}
}

export const removeWord = ( strongsNumber ) => {
	return {
		strongsNumber,
		type: 'REMOVE_WORD'
	}
}

export const clearAll = () => {
	return {
		type: 'CLEAR_ALL'
	}
}

export const toggleWord = ( strongsNumber ) => {
	return {
		strongsNumber,
		type: 'TOGGLE_WORD'
	}
}

export const openAdvancedSearch = () => {
		return {
		type: 'OPEN_ADVANCED_SEARCH'
	}
};

export const closeAdvancedSearch = () => {
		return {
		type: 'CLOSE_ADVANCED_SEARCH'
	}
};

export const addSearch = ( terms, target ) => {
	return function( dispatch, getState ) {
		// Send data to our worker.
		postMessageToWorker( target, terms, getState() );

		const searchItem = {
			listType: 'search',
			data: terms,
			visible: true,
		}
		dispatch( addToList( searchItem ) );
	}
}

export const searchForWord = ( parameters ) => {
	return function( dispatch, getState ) {
		dispatch( wordResultsLoading( parameters ) );

		// Send data to our worker.
		postMessageToWorker( 'word', parameters, getState() );
	}
}

export const wordResultsLoading = ( terms ) => {
	return {
		terms,
		type: 'WORD_RESULTS_LOADING'
	};
}

export const removeSearch = ( terms ) => {
	return {
		terms,
		type: 'REMOVE_SEARCH'
	}
}

export const toggleSearch = ( terms ) => {
	return {
		terms,
		type: 'TOGGLE_SEARCH'
	}
}

export const clearSearch = ( terms ) => {
	return {
		terms,
		type: 'CLEAR_SEARCH'
	}
}

export const setCurrentVerse = ( terms, index ) => {
	return {
		index,
		terms,
		type: 'SET_CURRENT_VERSE'
	}
}

export const goToNextCurrentVerse = () => {
	return {
		type: 'GO_TO_NEXT_CURRENT_VERSE'
	}
}

export const goToPreviousCurrentVerse = () => {
	return {
		type: 'GO_TO_PREVIOUS_CURRENT_VERSE'
	}
}

export const changeVersion = ( index, version ) => {
	return function( dispatch, getState ) {
		const state = getState();
		const newHash = getNewVersionHash( state.reference, parseInt( index ), version );
		dispatch( push( '/#' + newHash ) );
	}
}

export const setReference = ( reference, index ) => {
	return {
		reference,
		index,
		type: 'SET_REFERENCE'
	}
}

export const referenceSelectorMobileSetBook = ( bookName, bookIndex, index ) => {
	return {
		bookName,
		bookIndex,
		index,
		type: 'REFERENCE_SELECTOR_MOBILE_SET_BOOK',
	}
}

export const closeReferenceSelectorMobile = ( index ) => {
	return {
		index,
		type: 'CLOSE_REFERENCE_SELECTOR_MOBILE',
	}
}

export const toggleReferenceSelectorMobile = ( index ) => {
	return {
		index,
		type: 'TOGGLE_REFERENCE_SELECTOR_MOBILE',
	}
}

export const openReferenceSelectorMobile = ( index ) => {
	return {
		index,
		type: 'OPEN_REFERENCE_SELECTOR_MOBILE',
	}
}

export const activateSearchSelect = ( target ) => {
	return {
		target,
		type: 'ACTIVATE_SEARCH_SELECT',
	}
}

export const deactivateSearchSelect = () => {
	return {
		type: 'DEACTIVATE_SEARCH_SELECT',
	}
}

export const updateSearchForm = ( name, value ) => {
	return {
		name,
		value,
		type: 'UPDATE_SEARCH_FORM',
	}
}

export const appendToSearchForm = ( name, value ) => {
	return {
		name,
		value,
		type: 'APPEND_TO_SEARCH_FORM',
	}
}

export const clearSearchForm = () => {
	return {
		type: 'CLEAR_SEARCH_FORM',
	}
}

function requestData( key ) {
	return {
		type: 'REQUEST_DATA',
		key,
	}
}

export function receiveData( key, data ) {
	return {
		type: 'RECEIVE_DATA',
		key,
		data,
	}
}

export const fetchData = ( key ) => {
	return function( dispatch, getState ) {
		const { data } = getState(); // check that the data isn't already in state
		if ( data[ key ] ) {
			return;
		}

		dispatch( requestData( key ) );

		// If we load NMV_strongs, we need to load the translation data as well.
		if ( key === 'NMV_strongs' ) {
			xhr( {
				method: "get",
				uri: "/data/farsi-translations.json",
				headers: {
					"Content-Type": "application/json"
				}
			}, function ( error, response, body ) {
				const parsedData = JSON.parse( body );
				dispatch( receiveData( 'farsiTranslations', parsedData ) );

				caches.open( cache ).then( function( cache ) {
					return cache.addAll([
						'/data/farsi-translations.json',
					]);
				});
			} );
		}

		return xhr( {
			method: "get",
			uri: "/bibles/" + key + ".json",
			headers: {
				"Content-Type": "application/json"
			}
		}, function ( error, response, body ) {
			const parsedData = JSON.parse( body );
			if ( parsedData.books ) {
				dispatch( receiveData( key, parsedData.books ) );
			} else {
				dispatch( receiveData( key, parsedData ) );
			}
			caches.open( cache ).then( function( cache ) {
				return cache.addAll([
					'/bibles/' + key +'.json'
				]);
			});
		} );
	}
}

export const fetchCrossReferences = () => {
	return function( dispatch, getState ) {
		const { data } = getState();
		if ( data.crossReferences ) {
			return;
		}

		return xhr( {
			method: "get",
			uri: "/data/crossReferences.json",
			headers: {
				"Content-Type": "application/json"
			}
		}, function ( error, response, body ) {
			dispatch( receiveData( 'crossReferences', JSON.parse( body ) ) );
		} );
	}
}

export const fetchStrongsDictonary = () => {
	return function( dispatch, getState ) {
		const { data } = getState();
		if ( data.strongsDictionary ) {
			return;
		}

		// This is a combination of both the Hebrew and Greek dictonaries
		return xhr( {
			method: "get",
			uri: "/data/strongs-dictionary.json",
			headers: {
				"Content-Type": "application/json"
			}
		}, function ( error, response, body ) {
			dispatch( receiveData( 'strongsDictionary', JSON.parse( body ) ) );
		} );
	}
}

export const fetchStrongsDictonaryWithFamilies = () => {
	return function( dispatch, getState ) {
		const { data } = getState();
			if ( data.strongsObjectWithFamilies ) {
			return;
		}

		// This is a combination of both the Hebrew and Greek dictonaries
		return xhr( {
			method: "get",
			uri: "/data/strongsObjectWithFamilies.json",
			headers: {
				"Content-Type": "application/json"
			}
		}, function ( error, response, body ) {
			dispatch( receiveData( 'strongsObjectWithFamilies', JSON.parse( body ) ) );
		} );
	}
}

export const setReferenceInfo = ( reference ) => {
	return {
		type: 'SET_REFERENCE_INFO',
		reference: reference,
	}
}

export const setReferenceInfoCompareWith = ( referenceToCompareWith ) => {
	return {
		type: 'SET_REFERENCE_INFO_COMPARE_WITH',
		referenceToCompareWith: referenceToCompareWith,
	}
}

export const setReferenceInfoLimit = ( limit ) => {
	return {
		type: 'SET_REFERENCE_INFO_LIMIT',
		limit,
	}
}

export const openSidebar = () => {
	return {
		type: 'OPEN_SIDEBAR',
	}
}

export const closeSidebar = () => {
	return {
		type: 'CLOSE_SIDEBAR',
	}
}

export const toggleSidebar = () => {
	return {
		type: 'TOGGLE_SIDEBAR',
	}
}

export const selectWord = ( props ) => {
	const { word, lemma, morph, version } = props;

	return function( dispatch, getState ) {
		const searchSelect = getState().searchSelect;
		const data = getState().data;
		if ( searchSelect ) {
			// If there's a book then this is a reference.
			if ( searchSelect.book ) {
				// Get the reference.
				const { book, chapter, verse, index } = searchSelect;

				// Update the data in memory.
				const currentWord = data['NMV_strongs'][ book ][ chapter ][ verse ][ index ];
				data['NMV_strongs'][ book ][ chapter ][ verse ][ index ] = [ currentWord[0], lemma ];

				// Push the update to the store.
				dispatch( receiveData( 'NMV_strongs', data['NMV_strongs'] ) );
			} else {
				dispatch( appendToSearchForm( searchSelect, props[ searchSelect ] ) );
				dispatch( updateSearchForm( 'version', version ) );
			}
			dispatch( deactivateSearchSelect() );
		} else {
			dispatch( setTrayVisibilityFilter( 'word' ) );

			lemma && lemma.split(/[\&\s]/).map( strongsNumber => {
				if ( ! isValidWord( strongsNumber ) ) {
					return;
				}

				dispatch( addWord( {
					listType: 'word',
					data: {
						lemma: strongsNumber,
						morphology: morph,
						version: version,
						clickedWord: word,
					},
					visible: true,
				} ) );
			} );
		}
	}

};

export const addToList = ( item ) => {
	return {
		type: 'ADD_TO_LIST',
		item: item,
	}
};

export const removeFromList = ( item ) => {
	return function( dispatch ) {
		dispatch( removeSearch( item ) );
		dispatch( {
			type: 'REMOVE_FROM_LIST',
			item: item,
		} );
	}
};

export const removeTypeFromList = ( listType ) => {
	return {
		type: 'REMOVE_TYPE_FROM_LIST',
		listType: listType,
	}
};

export const toggleListItemVisible = ( item ) => {
	return {
		type: 'TOGGLE_LIST_ITEM_VISIBLE',
		item: item,
	}
};

export const setCurrentListResult = ( id, index ) => {
	return {
		id,
		index,
		type: 'SET_CURRENT_LIST_RESULT'
	}
}

export const updateData = ( { version, word, lemma, morph, translation } ) => {
	return {
		type: 'UPDATE_DATA',
		version,
		word,
		lemma,
		morph,
		translation,
	}
}
