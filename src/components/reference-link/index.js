// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

// Internal
import { goToReferenceHelper } from '../../lib/reference.js';
import ReferenceText from '../reference-text';

//The right way to do a link
const ReferenceLink = ( { reference, number } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( state => state.settings.inSync );
	const stateReference = useSelector( state => state.reference );
	const newHash = '/#' + goToReferenceHelper( stateReference, reference, 0, inSync );
	return (
		<a href={ newHash } onClick={ ( event ) => {
			event.stopPropagation();
			event.preventDefault();
			dispatch( push( newHash ) );
		 } }>
			{ typeof number !== 'undefined' && ( parseInt( number ) + 1 + '.' ) } <ReferenceText reference={ reference } />
		</a>
	);
};

export default ReferenceLink;
