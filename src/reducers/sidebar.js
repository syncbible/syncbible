import { LOCATION_CHANGE } from 'connected-react-router';

const sidebar = ( state = false, action ) => {
	switch ( action.type ) {
		case 'SET_TRAY_VISIBILITY_FILTER':
		case 'OPEN_SIDEBAR':
			return true;

		case 'CLOSE_SIDEBAR':
			return false;

		case 'TOGGLE_SIDEBAR':
			return ! state;

		case LOCATION_CHANGE:
			if ( window.innerWidth < 960 ) {
				return false;
			}

		default:
			return state;
	}
}

export default sidebar;
