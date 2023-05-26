// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { settingsChange } from '../../actions';
import UnfoldLess from '../svg/unfold-less';
import UnfoldMore from '../svg/unfold-more';
import styles from './styles.scss';

const InlineResultsToggle = () => {
	const dispatch = useDispatch();
	const expandedSearchResults = useSelector(
		( state ) => state.settings.expandedSearchResults
	);

	const expandSearchResults = () => {
		dispatch( settingsChange( 'expandedSearchResults', true ) );
	};

	const collapseSearchResults = () => {
		dispatch( settingsChange( 'expandedSearchResults', false ) );
	};

	if ( expandedSearchResults ) {
		return (
			<a
				className={ styles.foundInExtra }
				onClick={ collapseSearchResults }
			>
				<UnfoldLess />
			</a>
		);
	}

	return (
		<a className={ styles.foundInExtra } onClick={ expandSearchResults }>
			<UnfoldMore />
		</a>
	);
};

export default React.memo( InlineResultsToggle );
