import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
	fontSize: '100%',
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", Arial, Helvetica, sans-serif;',
	highlightWordsWith: 'same',
	referencePicker: 'select',
	inSync: true,
	expandedSearchResults: false,
	highlightSearchResults: false,
	interfaceLanguage: 'KJV',
	type: 'SETTINGS_CHANGE',
	darkMode: null,
	compareMode: false,
	targetColumn: 0,
};

export default ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'SETTINGS_CHANGE':
			return Object.assign( {}, state, action );

		case LOCATION_CHANGE:
			return { ...state, compareMode: false };

		default:
			return state;
	}

	//javascripture.state.settings = state;
};
