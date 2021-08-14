// External
import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal
import Reference from '../reference';
import Comparison from '../comparison';
import styles from './style.scss';
import { areReferencesInSync } from '../../lib/reference';

const ReferenceWrapper = React.memo( () => {
	const reference = useSelector( state => state.reference );
	const inSync = areReferencesInSync( reference );
	const compareMode = useSelector( state => state.settings.compareMode );
	const searchSelect = useSelector( state => state.searchSelect );
	const sidebarOpen = useSelector( state => state.sidebar );

	let references;

	if ( reference.length && inSync ) {
		references = <Reference reference={ reference[ 0 ] } index={ 0 } />
	} else {
		references = reference.length && reference.map( ( singleReference, index ) => {
			return ( <Reference reference={ singleReference } key={ index } index={ index } /> );
		} );
	}

	if ( compareMode ) {
		references = <Comparison />
	}

	const className = classnames( styles.referenceWrapper, sidebarOpen ? styles.referenceWrapperSidebarOpen : null, searchSelect ? 'search-select' : null );
	return (
		<div className={ className }>
			<div className={ styles.referenceWrapperInner }>
				{ references }
			</div>
		</div>
	);
} );

export default ReferenceWrapper;
