/**
 * External dependencies
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

const container = document.getElementById( 'content' );
let root = createRoot( container );
root.render(<App />);

if ( module.hot ) {
	module.hot.accept( './app', () => {
		const NextRootContainer = require( './app' ).default;
		root.render( <NextRootContainer /> );
	} );
};
