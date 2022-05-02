// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

// Internal dependencies
import styles from './styles.scss';
import SidebarControls from './sidebar-controls';
import TrayList from './tray-list';
import Footer from '../footer';
import { toggleSidebar } from '../../actions';

// Tray comonents
import BookMarks from '../bookmarks';
import DailyReadings from '../daily-readings';
import SettingsTray from './settings';
import Stats from '../stats';
import Compare from '../compare';
import ReferenceSelector from '../reference-selector';
import WordDetails from '../word-details';
import CombinedAll from '../combined-all';
import Help from './help';
import Search from '../search';

// SVGs
import BookSvg from '../svg/book.js';
import BookmarksSvg from '../svg/bookmarks.js';
import CompareSvg from '../svg/compare.js';
import HelpSvg from '../svg/help.js';
import EyeSvg from '../svg/eye.js';
import StatsSvg from '../svg/stats.js';
import SearchSvg from '../svg/search.js';
import CalendarSvg from '../svg/calendar.js';
import JoinFull from '../svg/join-full.js';
import CogSvg from '../svg/cog.js';
import { style } from '@mui/system';

const trays = [
	{
		visible: true,
		id: 'goto',
		text: 'Go to',
		component: <ReferenceSelector />,
		icon: <BookSvg />,
	},
	{
		visible: false,
		id: 'word',
		text: 'Words',
		component: <WordDetails />,
		icon: <EyeSvg />,
	},
	{
		visible: false,
		id: 'search',
		text: 'Search',
		component: <Search />,
		icon: <SearchSvg />,
	},
	{
		visible: false,
		id: 'bookmarks',
		text: 'Bookmarks',
		component: <BookMarks />,
		icon: <BookmarksSvg />,
	},
	{
		visible: false,
		id: 'combinedall',
		text: 'Combined',
		component: <CombinedAll />,
		icon: <JoinFull />,
	},
	{
		visible: false,
		id: 'stats',
		text: 'Stats',
		component: <Stats />,
		icon: <StatsSvg />,
	},
	{
		visible: false,
		id: 'reference',
		text: 'Compare',
		component: <Compare />,
		icon: <CompareSvg />,
	},
	{
		visible: false,
		id: 'dailyreadings',
		text: 'Dailies',
		component: <DailyReadings />,
		icon: <CalendarSvg />,
	},
	{
		visible: false,
		id: 'settings',
		text: 'Settings',
		component: <SettingsTray />,
		icon: <CogSvg />,
	},
	{
		visible: false,
		id: 'help',
		text: 'Help',
		component: <Help />,
		icon: <HelpSvg />,
	}
];

const Trays = React.memo( () => {
	const dispatch = useDispatch();
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const compareMode = useSelector( state => state.settings.compareMode );
	const sidebarOpen = useSelector( state => state.sidebar );
	const drawerBleeding = 60;
	const drawerWidth = compareMode ? '100vw' : 320;
	const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);


	if ( interfaceLanguage ) {
		return (
			<div className={ classnames( styles.trays, compareMode ? styles.isCompareModeWrapper : null ) }>
				<Footer trays={ trays } />
				<SwipeableDrawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						zIndex: 9,
						'& .MuiDrawer-paper': {
							background: 'var(--background)',
							boxShadow: 'none',
							boxSizing: 'border-box',
							color: 'var(--color)',
							width: drawerWidth,
						},
						'& .MuiBackdrop-root': {
							display: 'none',
						},
					}}
					anchor="left"
					open={ sidebarOpen }
					onClose={ () => dispatch( toggleSidebar() )}
					onOpen={ () => dispatch( toggleSidebar() )}
					disableSwipeToOpen={ false }
					disableBackdropTransition={ !iOS }
					disableDiscovery={ iOS }
					ModalProps={{
						keepMounted: true,
					}}
					BackdropProps={{ invisible: true }}
				>
					<div className={ classnames(
						styles.trayList,
						sidebarOpen ? styles.sidebarOpen : null,
						compareMode ? styles.isCompareMode : styles.isReferenceMode,
					) }>
						<SidebarControls trays={ trays } />
						<TrayList trays={ trays } />
					</div>
				</SwipeableDrawer>
			</div>
		);
	}

	return null;
} );

export default Trays;
