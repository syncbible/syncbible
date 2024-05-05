// External
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

// Internal
import {
	addColumnAction,
	settingsChange,
	updateSearchForm,
} from '../../actions';
import Navigation from '../navigation';
import Controls from '../controls';
import styles from './style.scss';
import VersionSelect from '../version-select';

const Dock = () => {
	const dispatch = useDispatch();
	const reference = useSelector( ( state ) => state.reference );
	const sidebarOpen = useSelector( ( state ) => state.sidebar );
	const className = classnames(
		styles.dock,
		sidebarOpen ? styles.dockWithSidebarOpen : null,
		reference.length ? null : styles.noReference
	);
	const onSelectVerion = useCallback(
		( event ) => {
			const version = event.target.value;
			dispatch( addColumnAction( version ) );
			dispatch( updateSearchForm( 'version', version ) );
			dispatch( settingsChange( 'interfaceLanguage', version ) );
			event.target.blur();
		},
		[ addColumnAction, updateSearchForm, settingsChange ]
	);

	return (
		<div className={ className }>
			<div className={ styles.dockVersionSelectors }>
				{ reference.length === 0 && (
					<VersionSelect onChange={ onSelectVerion } large={ true } />
				) }
				{ reference.map( ( reference, index ) => {
					const version = reference.version
						? reference.version
						: 'KJV';
					return (
						<Navigation
							key={ index }
							version={ version }
							index={ index }
						/>
					);
				} ) }
				{ reference.length > 0 && <Controls /> }
			</div>
		</div>
	);
};

export default React.memo( Dock );
