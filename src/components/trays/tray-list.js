// External
import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal
import ListHeader from '../list-header';
import styles from './styles.scss';

const TrayList = ( { trays } ) => {
	const activeTray = useSelector( ( state ) => state.trays );

	return trays.map( ( tray ) => {
		let header;
		if (
			tray.id === 'search' ||
			tray.id === 'word' ||
			tray.id === 'bookmark'
		) {
			header = <ListHeader tray={ tray.id } />;
		}

		const isActive = activeTray === tray.id;
		return (
			<div
				key={ tray.id }
				className={ classnames(
					styles.tray,
					isActive ? styles.visible : styles.hidden
				) }
			>
				{ header }
				<tray.component isActive={ isActive } />
			</div>
		);
	} );
};

export default React.memo( TrayList );
