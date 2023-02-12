// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import { getCombinedResults } from '../../lib/reference.js'
import InlineResultsToggle from '../inline-results-toggle'
import styles from './styles.scss';

const CombinedAll = () => {
	const list = useSelector( state => state.list );
	const combinedResults = getCombinedResults( list );
	return (
		<div className={ styles.combinedAll }>
			<p>A combination of all the references in the other panels.</p>
			{ combinedResults.length > 0 && <InlineResultsToggle /> }
			{ combinedResults && <ol className={ styles.results }>{ combinedResults }</ol> }
		</div>

	);
};

export default React.memo( CombinedAll );
