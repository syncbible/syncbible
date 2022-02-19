// External
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

// Internal
import { addColumnAction, settingsChange, updateSearchForm } from '../../actions';
import Navigation from '../navigation';
import Controls from '../controls';
import styles from './style.scss';
import VersionSelect from '../version-select';

const Dock = React.memo( () => {
	const dispatch = useDispatch();
	const reference = useSelector( state => state.reference );
	const numberOfColumns = reference.length
	const sidebarOpen = useSelector( state => state.sidebar );
	const className = classnames( styles.dock, sidebarOpen ? styles.dockWithSidebarOpen : null );
	const onSelectVerion = ( event ) => {
		const version = event.target.value;
		dispatch( addColumnAction( version ) );
		dispatch( updateSearchForm( 'version', version ) );
		dispatch( settingsChange( 'interfaceLanguage', version ) );
		event.target.blur();
	};

	return (
		<div className={ className }>
			<div className={ styles.dockVersionSelectors }>
				{ reference.length === 0 && <VersionSelect onChange={ onSelectVerion } large={ true } /> }
				{ reference.map( ( reference, index ) => {
					return (
						<Navigation key={ index } reference={ reference } index={ index } last={ ( index + 1 ) === numberOfColumns } />
					);
				} ) }
				{ reference.length > 0 && <Controls /> }
			</div>
		</div>
	);
} );

export default Dock;
