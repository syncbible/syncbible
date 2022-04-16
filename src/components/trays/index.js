// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal dependencies
import styles from './styles.scss';
import SidebarControls from './sidebar-controls';
import TrayList from './tray-list';
import Footer from '../footer';

const Trays = React.memo( () => {
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const sidebarOpen = useSelector( state => state.sidebar );

	if ( interfaceLanguage ) {
		return (
			<div className={ styles.trays }>
			<Footer />
				<div className={ classnames( styles.trayList, sidebarOpen ? styles.sidebarOpen : null ) }>
					<SidebarControls />
					<TrayList />
				</div>
			</div>
		);
	}

	return null;
} );

export default Trays;
