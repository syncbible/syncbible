// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies.
import styles from './styles.scss';
import SortGroupResults from '../sort-group-results';

const WordStats = ( { strongsNumber, version } ) => {
	return (
		<div className={ styles.wordStats }>
			<h2>Stats for { version }</h2>
			<SortGroupResults
				type="word"
				version={ version }
				strongsNumber={ strongsNumber }
				initialGroup="book"
				initialSort="reference"
				supportsWord={ true }
			/>
		</div>
	);
};

export default React.memo( WordStats );
