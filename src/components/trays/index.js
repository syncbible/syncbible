// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import styles from './styles.scss';
import SidebarControls from './sidebar-controls';
import TrayList from './tray-list';
import Footer from '../footer';

const Trays = React.memo( () => {
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	console.log( interfaceLanguage );

	if ( interfaceLanguage ) {
		return (
			<div className={ styles.trays }>
				<SidebarControls />
				<TrayList />
				<Footer />
			</div>
		);
	}

	return null;
} );

export default Trays;
