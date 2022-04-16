// External dependencies
import React from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux'

// Internal dependencies
import { setTrayVisibilityFilter, openSidebar, toggleSidebar } from '../../actions'
import styles from './styles.scss';

const TrayFilter = ( { children, filter, title } ) => {
	const dispatch = useDispatch();
	const active = useSelector( state => state.trays.some( tray => {
		return ( tray.id === filter && tray.visible );
	} ) );
	const activeTray = useSelector( state => state.trays.filter( tray => {
		return tray.visible;
	} ) )[ 0 ].id;

	return (
		<span title={ title } className={ classnames( styles.trayFilter, active ? styles.active : null ) }
			onClick={ event => {
				event.preventDefault();
				if ( activeTray === filter ) {
					dispatch( toggleSidebar() );
				} else {
					dispatch( openSidebar() );
				}
				dispatch( setTrayVisibilityFilter( filter ) );
			} }
		>
			{ children }
		</span>
	);
};

export default TrayFilter;
