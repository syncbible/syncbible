// External
import React from 'react';

// Internal
import styles from './styles.scss';

const SingleReference = ( { children } ) => {
	return (
		<div className={ styles.singleReference }>
			{ children }
		</div>
	);
};

export default React.memo( SingleReference );
