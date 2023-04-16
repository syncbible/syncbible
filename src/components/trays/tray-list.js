// External
import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal
import styles from './styles.scss';

const TrayList = ({ trays }) => {
	const activeTray = useSelector((state) => state.trays);
	return trays.map((tray) => {
		const isActive = activeTray === tray.id;
		return (
			<div
				key={tray.id}
				className={classnames(
					styles.tray,
					isActive ? styles.visible : styles.hidden
				)}
			>
				<tray.component isActive={isActive} />
			</div>
		);
	});
};

export default React.memo(TrayList);
