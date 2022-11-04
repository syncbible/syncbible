// External dependencies
import React from 'react';

// Internal dependencies
import CopySvg from '../svg/copy.js';
import styles from './styles.scss';

import copyToClipboardHelper from '../../lib/copy-to-clipboard-helper';

const CopyToClipboard = ( { fill, textToCopy, customClickHandler, version } ) => {
	const handleClick = ( event, version ) => {
		event.stopPropagation();
		if ( customClickHandler ) {
			customClickHandler( version );
		} else {
			copyToClipboardHelper( textToCopy );
		}
		event.target.focus();
	};
	return (
		<a className={ styles.copyToClipboard } onClick={ ( event ) => handleClick( event, version ) }>
			<CopySvg fill={ fill } />
		</a>
	);
}

export default React.memo( CopyToClipboard );
