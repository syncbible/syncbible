// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import styles from './styles.scss';
import SortGroupResults from '../sort-group-results/index';
import SyncBible from '../svg/syncbible';

const CombinedAll = () => {
	const { compareMode } = useSelector( ( state ) => {
		return {
			compareMode: state.settings.compareMode,
		};
	} );

	if ( compareMode ) {
		return (
			<div className={ styles.combinedAll }>
				<p>A combination of all the references in the other panels.</p>
				<div className={ styles.results }>
					<SortGroupResults
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
