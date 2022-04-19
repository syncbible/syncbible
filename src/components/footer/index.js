// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

// Internal dependencies
import SyncBible from '../svg/syncbible.js';
import TrayFilter from '../../components/trays/filter.js';
import { closeSidebar, settingsChange } from '../../actions/index.js';
import styles from './styles.scss';

const Footer = React.memo( ( { trays } ) => {
	const compareMode = useSelector( state => state.settings.compareMode );

	const dispatch = useDispatch();

	return (
	<div className={ styles.footer }>
		<button className={ classnames( styles.syncButton, compareMode ? styles.isCompareMode : null ) } onClick={ ()=> {
			if ( compareMode ) {
				dispatch( settingsChange( "compareMode", false ) );
				dispatch( closeSidebar() );
			} else {
				dispatch( settingsChange( "compareMode", true ) );
			}
		} }>
			<SyncBible />
		</button>

		{ trays.map( tray => {
			return (
				<TrayFilter trays={ trays } key={ tray.id } title={ tray.text } filter={ tray.id }>
					{ tray.icon }
				</TrayFilter>
			);
		} ) }
	</div>
) } );

export default Footer;
