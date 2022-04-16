const initalState = [
	{
		visible: true,
		id: 'goto',
		text: 'Go to',
		component: 'GotoTray',
		icon: 'BookSvg',
	},
	{
		visible: false,
		id: 'word',
		text: 'Words',
		component: 'WordTray',
		icon: 'EyeSvg',
	},
	{
		visible: false,
		id: 'search',
		text: 'Search',
		component: 'SearchTray',
		icon: 'SearchSvg',
	},
	{
		visible: false,
		id: 'bookmarks',
		text: 'Bookmarks',
		component: 'BookmarksTray',
		icon: 'BookmarksSvg',
	},
	{
		visible: false,
		id: 'settings',
		text: 'Settings',
		component: 'SettingsTray',
		icon: 'CogSvg',
	},
	{
		visible: false,
		id: 'reference',
		text: 'Compare',
		component: 'ReferenceInfo',
		icon: 'InfoSvg',
	},
	{
		visible: false,
		id: 'dailyreadings',
		text: 'Dailies',
		component: 'DailyReadings',
		icon: 'CalendarSvg',
	},
	{
		visible: false,
		id: 'combinedall',
		text: 'Combined',
		component: 'CombinedAll',
		icon: 'JoinFull',
	},
	{
		visible: false,
		id: 'help',
		text: 'Help',
		component: 'Help',
		icon: 'HelpSvg',
	}];

const trays = ( state = initalState, action ) => {
	switch ( action.type ) {
		case 'SET_TRAY_VISIBILITY_FILTER':
			return state.map( ( tray, index ) => {
				if ( action.filter === tray.id ) {
					tray.visible = true;
				} else if ( parseInt( action.filter ) - 1 === index ) {
					tray.visible = true;
				} else {
					tray.visible = false;
				}
				return tray;
			} );

		default:
			return state;
	}
}

export default trays;
