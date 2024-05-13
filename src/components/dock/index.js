// External
import React, { useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
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
	const versionArray = useSelector(
		( state ) =>
			state.reference.map(
				( reference, index ) => reference.version ?? 'KJV'
			),
		shallowEqual
	);
	const showControls = useSelector( ( state ) => state.reference.length > 0 );
	const sidebarOpen = useSelector( ( state ) => state.sidebar );
	const className = classnames(
		styles.dock,
		sidebarOpen ? styles.dockWithSidebarOpen : null,
		showControls ? null : styles.noReference
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
				{ ! showControls && (
					<VersionSelect onChange={ onSelectVerion } large={ true } />
				) }
				{ versionArray.map( ( version, index ) => (
					<Navigation
						key={ index }
						version={ version }
						index={ index }
					/>
				) ) }
				{ showControls && <Controls /> }
			</div>
		</div>
	);
};

export default React.memo( Dock );
