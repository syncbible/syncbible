// External dependencies
import React from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux'

// Internal dependencies
import { setTrayVisibilityFilter, settingsChange, toggleSidebar } from '../../actions'
import styles from './styles.scss';

const TrayFilter = ( { children, filter, title } ) => {
	const dispatch = useDispatch();
	const activeTray = useSelector( state => state.trays );

	return (
		<span title={ title } className={ classnames( styles.trayFilter, filter === activeTray ? styles.active : null ) }
			onClick={ event => {
				event.preventDefault();
				if ( activeTray === filter ) {
					dispatch( toggleSidebar() );
					dispatch( settingsChange( "compareMode", false ) );
				} else {
					dispatch( setTrayVisibilityFilter( filter ) );
				}
			} }
		>
			{ children }
		</span>
	);
};

export default TrayFilter;
