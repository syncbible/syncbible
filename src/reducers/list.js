import { isEqual } from 'lodash';

const initialState = [];

const list = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TO_LIST':
			const dataForId = Object.assign({}, action.item.data);
			delete dataForId.clickedWord;
			delete dataForId.morphology;
			const id = JSON.stringify(dataForId);

			const findInState = state.filter((item) => item.id === id);
			if (findInState.length > 0) {
				return [
					...state.map((item) => {
						item.visible = findInState[0].id === item.id;
						return item;
					}),
				];
			}

			return [
				...state.map((item) => {
					if (item.listType === action.item.listType) {
						item.visible = false;
					}
					return item;
				}),
				{ ...action.item, id },
			];

		case 'REMOVE_FROM_LIST':
			return [...state.filter((item) => item.id !== action.item.id)];

		case 'REMOVE_TYPE_FROM_LIST':
			return [
				...state.filter((item) => item.listType !== action.listType),
			];

		case 'ADD_SEARCH_RESULTS':
			return state.map((item) => {
				if (isEqual(action.terms, item.data)) {
					item.loading = false;
					item.loaded = true;
					item.results = action.results;
				}
				return item;
			});

		case 'SET_CURRENT_LIST_RESULT':
			//const indexToChange = state.findIndex( item => item.id === action.id );
			//console.log( state[ indexToChange ] );
			//state[ indexToChange ].current = action.index;
			state.forEach((item) => {
				if (item.id === action.id) {
					item.current = action.index;
				} else {
					delete item.current;
				}
			});
			/*return state.map( item => {
				if ( item.id === action.id ) {
					item.current = action.index;
				} else {
					item.current = -1;
					//delete( item.current )
				}
				return item;
			} );*/
			return state;

		case 'WORD_RESULTS_LOADING':
			return state.map((item) => {
				if (isEqual(action.terms, item.data)) {
					item.loading = true;
				}
				return item;
			});

		default:
			return state;
	}
};

export default list;
