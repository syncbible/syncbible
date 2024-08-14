// External dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { fetchData, settingsChange, toggleSidebar } from '../../actions';
import styles from './styles.scss';
import { mapVersionToData } from '../../lib/reference';
import VersionSelect from '../version-select';
import LeftPanelClose from '../svg/left-panel-close';

const SidebarControls = ( { trays } ) => {
	const dispatch = useDispatch();
	const activeTray = useSelector( ( state ) => state.trays );
	const interfaceLanguage = useSelector(
		( state ) => state.settings.interfaceLanguage
	);
	const selectedTray = trays.find( ( tray ) => activeTray === tray.id );

	useEffect( () => {
		// Load data for OT and NT
		const otData = mapVersionToData( 'Genesis', interfaceLanguage );
		const ntData = mapVersionToData( 'Matthew', interfaceLanguage );
		dispatch( fetchData( otData ) );
		if ( ntData !== otData ) {
			dispatch( fetchData( ntData ) );
		}
	}, [ interfaceLanguage ] );

	return (
		<div className={ styles.sidebarControls }>
			<span className={ styles.sidebarControlsInner }>
				<span className={ styles.sidebarControlsTitle }>
					{ selectedTray.text }
				</span>
			</span>

			<span className={ styles.sidebarControlsRightOuter }>
				<VersionSelect
					name="version"
					value={ interfaceLanguage }
					onChange={ ( event ) => {
						dispatch(
							settingsChange(
								'interfaceLanguage',
								event.target.value
							)
						);
						event.target.blur();
					} }
				/>

				<span className={ styles.sidebarControlsRight }>
					<button
						className={ styles.sidebarButton }
						onClick={ () => {
							dispatch( toggleSidebar() );
						} }
					>
						<LeftPanelClose />
					</button>
				</span>
			</span>
		</div>
	);
};

export default React.memo( SidebarControls );
