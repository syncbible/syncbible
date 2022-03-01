// External
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { SwipeableDrawer } from '@mui/material';

// Internal
import Dock from './dock';
import ReferenceWrapper from '../components/reference-wrapper';
import MenuCloseSvg from './svg/menu-close.js';
import KeyboardShortcuts from './keyboard-shortcuts';
import Trays from './trays';
import WordHighlight from './word-highlight';
import InitialView from './inital-view';
import styles from './root.scss';
import {
	closeReferenceSelectorMobile,
	toggleSidebar,
	fetchCrossReferences,
	fetchStrongsDictonary,
	fetchStrongsDictonaryWithFamilies
} from '../actions'

const Root = React.memo( ( { highlightedWord } ) => {
	const dispatch = useDispatch();

	// Fetch the other data we need
	// Don't store it in the global state as that is cached in local storage
	// and we don't want to fill up local storage with immutable data.
	dispatch( fetchCrossReferences() );
	dispatch( fetchStrongsDictonary() );
	dispatch( fetchStrongsDictonaryWithFamilies() );

	const reference = useSelector( state => state.reference );
	const sidebarOpen = useSelector( state => state.sidebar );
	const darkMode = useSelector( state => state.settings.darkMode );
	const compareMode = useSelector( state => state.settings.compareMode );
	const getBodyStyles = () => {
		const fontFamily = useSelector( state => state.settings.fontFamily );
		const fontSize = useSelector( state => state.settings.fontSize );

		var bodyStyles = 'body, .root { ';
		bodyStyles += 'font-family: ' + fontFamily + ';';
		bodyStyles += 'font-size: ' + fontSize + ';';
		bodyStyles += '}';
		return bodyStyles;
	};
	const clearReferenceSelector = () => {
		dispatch( closeReferenceSelectorMobile() )
	};

	const drawerWidth = 320;

	return (
		<div className={ classnames( 'root', { 'dark-mode-on': darkMode === true, 'dark-mode-off': darkMode === false } ) }>
			<SwipeableDrawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						background: 'var(--background)',
						borderRight: '1px solid var(--shadow)',
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
				onClose={ () => dispatch( toggleSidebar() ) }
				onOpen={ () => dispatch( toggleSidebar() ) }
				BackdropProps={{ invisible: true }}
			>
				<Trays />
			</SwipeableDrawer>
			<div className={ styles.root }>
				{ reference.length > 0 && (
					<button onClick={ ( event ) => {
						event.preventDefault();
						dispatch( toggleSidebar() );
					} } title="Close sidebar" className={ classnames( styles.sidebarButton ) }>
						<MenuCloseSvg />
					</button>
				) }

				<style>{ getBodyStyles() }</style>
				<KeyboardShortcuts />
				<WordHighlight word={ highlightedWord } />
				{ compareMode ? null : <Dock /> }
				<div onClick={ clearReferenceSelector }>
					<ReferenceWrapper />
				</div>
				<InitialView />
			</div>
		</div>
	);
} );

export default Root;

/**
			<Sidebar
				sidebar={
					<Trays />
				}
				open={ sidebarOpen }
				onSetOpen={ () => dispatch( toggleSidebar() ) }
				shadow={ false }
				styles={{
					sidebar: { background: "var(--background)", borderTop: "1px solid var(--mid)", boxShadow: "var(--shadow) 2px 2px 4px", overflowY: "none", width: "320px", zIndex: "10" },
					overlay: { disply: "none", bottom: "auto", right: "auto" },
					content: { backgroundColor: "var(--background)" },
				}}
			>
			</Sidebar>
 */
