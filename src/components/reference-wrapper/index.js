// External
import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal
import ReferenceComponent from '../reference';
import styles from './style.scss';
import { areReferencesInSync } from '../../lib/reference';

const ReferenceWrapper = () => {
	const reference = useSelector( state => state.reference );
	const inSync = areReferencesInSync( reference );
	const searchSelect = useSelector( state => state.searchSelect );
	const sidebarOpen = useSelector( state => state.sidebar );

	let references;

	if ( reference.length === 0 ) {
		return null;
	}

	if ( inSync ) {
		references = <ReferenceComponent reference={ reference[ 0 ] } index={ 0 } />
	} else {
		references = reference.map( ( singleReference, index ) => {
			return ( <ReferenceComponent reference={ singleReference } key={ index } index={ index } /> );
		} );
	}

	const className = classnames( styles.referenceWrapper, sidebarOpen ? styles.referenceWrapperSidebarOpen : null, searchSelect ? 'search-select' : null );
	return (
		<div className={ className }>
			<div className={ styles.referenceWrapperInner }>
				{ references }
			</div>
		</div>
	);
};

export default React.memo( ReferenceWrapper );
