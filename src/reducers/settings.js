import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
	fontSize: "100%",
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", Arial, Helvetica, sans-serif;',
	highlightWordsWith: "same",
	referencePicker: "select",
	subdue: "50%",
	inSync: true,
	expandedSearchResults: false,
	highlightSearchResults: false,
	interfaceLanguage: 'KJV',
	type: "SETTINGS_CHANGE",
	darkMode: null,
	compareMode: false,
	targetColumn: 0,
}

export default ( state = initialState, action ) => {
	let settings;
	switch ( action.type ) {
		case 'SETTINGS_CHANGE':
			state = Object.assign( {}, state, action );
			break;

		case LOCATION_CHANGE:
			state.compareMode = false;
			break;

		default:
			break;
	}

	javascripture.state.settings = state;
	return state;
}
