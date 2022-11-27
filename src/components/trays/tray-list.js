// External
import React from 'react';
import { useSelector } from 'react-redux';

// Internal
import styles from './styles.scss';

const TrayList = ( { trays } ) => {
	const activeTray = useSelector( state => state.trays );
	return trays.map( tray => {
		const isActive = activeTray === tray.id;
		return (
			<div
				key={ tray.id }
				className={ isActive ? styles.visible : styles.hidden }
			>
				<div className={ styles.tray }>
					<tray.component active={ isActive } />
				</div>
			</div>
		);
	} );
};

export default React.memo( TrayList );
