// External dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { fetchData, settingsChange } from '../../actions';
import BookSvg from '../svg/book.js';
import EyeSvg from '../svg/eye.js';
import SearchSvg from '../svg/search.js';
import BookmarksSvg from '../svg/bookmarks.js';
import HelpSvg from '../svg/help.js';
import InfoSvg from '../svg/info.js';
import CalendarSvg from '../svg/calendar.js';
import JoinFull from '../svg/join-full.js';
import styles from './styles.scss';
import { mapVersionToData } from '../../lib/reference';
import VersionSelect from '../version-select';
import Clear from '../clear';



const SidebarControls = React.memo( () => {
	const dispatch = useDispatch();
	const selectedTray = useSelector( state => state.trays.find( tray => {
		return tray.visible;
	} ) );
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const title = selectedTray && selectedTray.text;

	useEffect( () => {
		// Load data for OT and NT
		const otData = mapVersionToData( 'Genesis', interfaceLanguage );
		const ntData = mapVersionToData( 'Matthew', interfaceLanguage )
		dispatch( fetchData( otData ) );
		if ( ntData !== otData ) {
			dispatch( fetchData( ntData ) );
		}
	}, [ interfaceLanguage ] );

	return (
		<div className={ styles.sidebarControls }>
			<span className={ styles.sidebarControlsInner }>
				<span className={ styles.sidebarControlsTitle }>{ title }</span>
			</span>

			<span className={ styles.sidebarControlsRightOuter}>
				<VersionSelect name="version" value={ interfaceLanguage } onChange={
					( event ) => {
						dispatch( settingsChange( 'interfaceLanguage', event.target.value ) );
						event.target.blur();
					}
				} />

				<span className={ styles.sidebarControlsRight }>
					<Clear selectedTrayId={ selectedTray && selectedTray.id } />
				</span>
			</span>
		</div>
	);
} );

export default SidebarControls;
