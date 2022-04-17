// External
import React from 'react';
import { useSelector } from 'react-redux';

// Internal
import styles from './styles.scss';
import Search from '../search';
import DailyReadings from '../daily-readings';
import BookmarksTray from './bookmarks';
import SettingsTray from './settings';
import ReferenceInfo from './reference-info';
import ReferenceSelector from '../reference-selector';
import WordDetails from '../word-details';
import CombinedAll from '../combined-all';
import Help from './help';

const TrayList = React.memo( ( { trays } ) => {
	const activeTray = useSelector( state => state.trays );
	return (
		<div>
			{ trays.map( tray => {
				return (
					<div
						key={ tray.id }
						className={ activeTray === tray.id ? styles.visible : styles.hidden }
					>
						<div className={ styles.tray }>
							{ tray.component }
						</div>
					</div>
				);
			} ) }
		</div>
	);
} );

export default TrayList;
