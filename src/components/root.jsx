// External
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
	fetchStrongsDictonaryWithFamilies,
} from '../actions';
import { rootClasses } from './utils';

const Root = ( { highlightedWord } ) => {
	const dispatch = useDispatch();

	// Fetch the other data we need
	// Don't store it in the global state as that is cached in local storage
	// and we don't want to fill up local storage with immutable data.
	dispatch( fetchCrossReferences() );
	dispatch( fetchStrongsDictonary() );
	dispatch( fetchStrongsDictonaryWithFamilies() );

	const reference = useSelector( ( state ) => state.reference );
	const darkMode = useSelector( ( state ) => state.settings.darkMode );
	const compareMode = useSelector( ( state ) => state.settings.compareMode );
	const expandedSearchResults = useSelector(
		( state ) => state.settings.expandedSearchResults
	);
	const getBodyStyles = () => {
		const fontFamily = useSelector(
			( state ) => state.settings.fontFamily
		);
		const fontSize = useSelector( ( state ) => state.settings.fontSize );

		var bodyStyles = 'body, .root { ';
		bodyStyles += 'font-family: ' + fontFamily + ';';
		bodyStyles += 'font-size: ' + fontSize + ';';
		bodyStyles += '}';
		return bodyStyles;
	};
	const clearReferenceSelector = () => {
		dispatch( closeReferenceSelectorMobile() );
	};

	useEffect( () => {
		// show the fallback errors which are hidden initially.
		// this does mean that if this component has an error then nothing will load.
		window.errors.style.display = 'block';
	}, [] );

	const classes = rootClasses( darkMode, compareMode, expandedSearchResults );
	const referenceComponent = ! compareMode && (
		<>
			<Dock />
			<div onClick={ clearReferenceSelector }>
				<ReferenceWrapper />
			</div>
		</>
	);

	return (
		<div className={ classes }>
			<div className={ styles.root }>
				{ reference.length > 0 && <Trays /> }

				<style>{ getBodyStyles() }</style>
				<KeyboardShortcuts />
				<WordHighlight word={ highlightedWord } />
				{ referenceComponent }
				<InitialView />
			</div>
		</div>
	);
};

export default React.memo( Root );
