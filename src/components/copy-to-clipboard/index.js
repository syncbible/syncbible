// External dependencies
import React from 'react';

// Internal dependencies
import CopySvg from '../svg/copy.js';
import styles from './styles.scss';

import copyToClipboardHelper from '../../lib/copy-to-clipboard-helper';

const CopyToClipboard = ( { fill, textToCopy } ) => {
	return (
		<a className={ styles.copyToClipboard } onClick={ ( event ) => copyToClipboardHelper( event, textToCopy ) }>
			<CopySvg fill={ fill } />
		</a>
	);
}

export default CopyToClipboard;
