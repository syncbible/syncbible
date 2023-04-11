// External dependencies
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import InlineResultsToggle from '../inline-results-toggle'
import styles from './styles.scss';
import SortGroupResults from '../sort-group-results/index.js';
import { getCombinedResults } from '../../lib/reference';

const CombinedAll = () => {
	const list = useSelector( state => state.list );
	const combinedResults = useMemo( () => getCombinedResults( list ),
		[ list ]
	);

	return (
		<div className={ styles.combinedAll }>
			<p>A combination of all the references in the other panels.</p>
			{ combinedResults.length > 0 && <InlineResultsToggle /> }
			<div className={ styles.results }>
				<SortGroupResults results={ combinedResults } initialGroup="verse" initialSort="reference" allowPreview={ true } />
			</div>
		</div>
	);
};

export default React.memo( CombinedAll );
