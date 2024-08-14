// External dependencies
import React from 'react';

// Internal dependencies
import RemoveSvg from '../svg/remove';
import CopyToClipboard from '../copy-to-clipboard';
import styles from './styles.scss';

const WordBlockHeader = ( { children, className, textToCopy, onRemove } ) => {
	return (
		<div className={ className }>
			{ children }
			<span className={ styles.buttons }>
				{ textToCopy && <CopyToClipboard textToCopy={ textToCopy } /> }
				{ onRemove && (
					<a
						onClick={ ( event ) => {
							event.stopPropagation();
							onRemove();
						} }
					>
						<RemoveSvg />
					</a>
				) }
			</span>
		</div>
	);
};

export default React.memo( WordBlockHeader );
