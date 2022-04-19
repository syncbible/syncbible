// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { settingsChange } from '../../actions'
import styles from './styles.scss';

const InlineResultsToggle = React.memo( () => {
	const dispatch = useDispatch();
	const expandedSearchResults = useSelector( state => state.settings.expandedSearchResults );

	const expandSearchResults = () => {
		dispatch( settingsChange( 'expandedSearchResults', true ) );
	};

	const collapseSearchResults = () => {
		dispatch( settingsChange( 'expandedSearchResults', false ) );
	};

	if ( expandedSearchResults ) {
		return <a className={ styles.foundInExtra } onClick={ collapseSearchResults }>collapse</a>
 	} else {
		return <a className={ styles.foundInExtra } onClick={ expandSearchResults }>expand</a>
	}
} );

export default InlineResultsToggle;
