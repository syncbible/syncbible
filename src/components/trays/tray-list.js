// External
import React from 'react';
import { useSelector } from 'react-redux';

// Internal
import styles from './styles.scss';

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
