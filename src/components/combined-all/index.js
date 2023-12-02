// External dependencies
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import InlineResultsToggle from '../inline-results-toggle';
import styles from './styles.scss';
import SortGroupResults from '../sort-group-results/index.js';
import { getCombinedResults } from '../../lib/reference';
import SyncBible from '../svg/syncbible.js';

const CombinedAll = () => {
	const { compareMode, list } = useSelector( ( state ) => {
		console.log( state );
		return {
			list: state.list,
			compareMode: state.settings.compareMode,
		};
	} );
	const results = list.map( ( { results } ) => {
		return results;
	} );
	const combinedResults = useMemo(
		() => getCombinedResults( results ),
		[ results ]
	);
	if ( compareMode ) {
		return (
			<div className={ styles.combinedAll }>
				<p>A combination of all the references in the other panels.</p>
				{ combinedResults.length > 0 && <InlineResultsToggle /> }
				<div className={ styles.results }>
					<SortGroupResults
						results={ combinedResults }
						initialGroup="verse"
						initialSort="reference"
						allowPreview={ true }
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={ styles.combinedAll }>
			<p>
				To use compare mode, use the <SyncBible /> icon. This will load
				a combination of all the references in the other panels.
			</p>
		</div>
	);
};

export default React.memo( CombinedAll );
