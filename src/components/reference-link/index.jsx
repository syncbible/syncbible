// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal
import { goToReferenceHelper } from '../../lib/reference.js';
import ReferenceText from '../reference-text';
import { goToReferenceAction } from '../../actions/index.js';

//The right way to do a link
const ReferenceLink = ( { reference, number } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( ( state ) => state.settings.inSync );
	const targetColumn = useSelector(
		( state ) => state.settings.targetColumn
	);
	const stateReference = useSelector( ( state ) => state.reference );
	const newHash =
		'/#' +
		goToReferenceHelper( stateReference, reference, targetColumn, inSync );
	return (
		<a
			href={ newHash }
			onClick={ ( event ) => {
				event.stopPropagation();
				event.preventDefault();
				dispatch( goToReferenceAction( reference ) );
			} }
		>
			{ typeof number !== 'undefined' && parseInt( number ) + 1 + '.' }{ ' ' }
			<ReferenceText reference={ reference } />
		</a>
	);
};

export default React.memo( ReferenceLink );
