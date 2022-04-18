import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';

const searchResults = ( state = [], action ) => {
	switch ( action.type ) {
		case 'ADD_SEARCH_RESULTS':
			let newState;
			const searchResultsPosition = findIndex( state, searchTerm => {
					return isEqual( searchTerm.terms, action.terms );
				} );

			newState = [ ...state ];
			if ( searchResultsPosition > -1 ) {
				newState[ searchResultsPosition ] = {
					results: action.results.length > 0 ? action.results : 'No results',
					terms: newState[ searchResultsPosition ].terms,
				};

				return newState;
			}

			return [
				...newState,
				{
					results: action.results.length > 0 ? action.results : 'No results',
					terms: action.terms,
				}
			];

		case 'REMOVE_SEARCH':
			return state.filter( searchTerm => {
				return ! isEqual( searchTerm.terms, action.terms.data );
			} );

		default:
			return state;
	}
}

export default searchResults;
