// External
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal
import Dock from './dock';
import ReferenceWrapper from '../components/reference-wrapper';
import KeyboardShortcuts from './keyboard-shortcuts';
import Trays from './trays';
import WordHighlight from './word-highlight';
import InitialView from './inital-view';
import styles from './root.scss';
import {
	closeReferenceSelectorMobile,
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
	return <div className={ classnames( 'root', { 'dark-mode-on': darkMode === true, 'dark-mode-off': darkMode === false } ) }/>;
	return (
		<div className={ classnames( 'root', { 'dark-mode-on': darkMode === true, 'dark-mode-off': darkMode === false } ) }>


			<div className={ styles.root }>
				{ reference.length > 0 && (
					<Trays />
				) }

				<style>{ getBodyStyles() }</style>
				<KeyboardShortcuts />
				<WordHighlight word={ highlightedWord } />
				{ compareMode ? null : (
					<>
						<Dock />
						<div onClick={ clearReferenceSelector }>
							<ReferenceWrapper />
						</div>
					</>
				) }
				<InitialView />
			</div>
		</div>
	);
} );

export default Root;
