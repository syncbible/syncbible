// External dependencies
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import classnames from 'classnames';

// Internal dependencies.
import { goToReferenceAction } from '../../actions';
import styles from './styles.scss';
import {
	getReferenceFromSearchResult,
	getGroupedResults,
	getCombinedResults,
} from '../../lib/reference';
import ExpandedSearchResults from '../expanded-search-results';
import InlineResultsToggle from '../inline-results-toggle';

function getReferenceStringByGroup( reference, group ) {
	if ( group === 'word' || group === 'morph' ) {
		return reference.word[ 0 ];
	}

	if ( group === 'book' ) {
		return reference[ 0 ];
	}
	if ( group === 'chapter' ) {
		return reference[ 0 ] + '.' + reference[ 1 ];
	}

	return reference.join( '.' );
}

function getCountedResults( results, group ) {
	const countedResults = {};
	results.forEach( ( resultArray ) => {
		const referenceString = getReferenceStringByGroup(
			resultArray[ 0 ],
			group
		);

		countedResults[ referenceString ] = resultArray.length;
	} );
	return countedResults;
}

let totalResultsCount, countedResults, selectedResultsGrouped;
const SortGroupResults = ( {
	type = null,
	version,
	strongsNumber,
	initialGroup,
	initialSort,
	allowPreview,
	supportsWord,
} ) => {
	const dispatch = useDispatch();
	const [ group, setGroup ] = useState( initialGroup );
	const [ sort, setSort ] = useState( initialSort );

	const interfaceLanguage = useSelector(
		( state ) => state.settings.interfaceLanguage
	);
	const _list = useSelector( ( state ) => {
		if ( type && strongsNumber && version ) {
			return state.list.find(
				( { listType, data } ) =>
					listType === 'word' &&
					data.lemma === strongsNumber &&
					data.version === version
			);
		} else if ( type ) {
			// This for for all results of a certain type, e.g. word.
			return state.list.filter( ( { listType } ) => listType === type );
		}
		return state.list;
	}, shallowEqual );

	if ( type && strongsNumber && version ) {
		const groupedResults = useMemo(
			() =>
				getGroupedResults(
					_list.results,
					group,
					sort,
					interfaceLanguage
				),
			[ getGroupedResults, _list, group, sort, interfaceLanguage ]
		);
		totalResultsCount = _list.results.length;
		countedResults = useMemo(
			() => getCountedResults( groupedResults, group ),
			[ getCountedResults, groupedResults, group ]
		);
		selectedResultsGrouped = groupedResults;
	} else {
		const _results = _list.map( ( { results } ) => {
			return results;
		} );

		const _combinedResults = useMemo(
			() => getCombinedResults( _results ),
			[ getCombinedResults, _results ]
		);
		const _combinedResultsGrouped = useMemo(
			() => getCombinedResults( _results, group ),
			[ getCombinedResults, _results, group ]
		);

		// TODO - calling this twice seens very inefficient.
		const selectedResults = useMemo(
			() =>
				getGroupedResults(
					_combinedResults,
					group,
					sort,
					interfaceLanguage
				),
			[
				getGroupedResults,
				_combinedResults,
				group,
				sort,
				interfaceLanguage,
			]
		);

		// results are all the results to do things like percentages
		// resultsGrouped are grouped by the selected group.
		// This is necessary because otherwise if a passage contains lots of instances of the same word it would be counted as significant by getGroupedResults
		// Instead we have to combined the results by group before grouping them again.
		totalResultsCount = _combinedResults.length;
		countedResults = useMemo(
			() => getCountedResults( selectedResults, group ),
			[ getCountedResults, selectedResults, group ]
		);
		selectedResultsGrouped = useMemo(
			() =>
				getGroupedResults(
					_combinedResultsGrouped,
					group,
					sort,
					interfaceLanguage
				),
			[
				getGroupedResults,
				_combinedResultsGrouped,
				group,
				sort,
				interfaceLanguage,
			]
		);
	}

	const groupSelector = (
		<div>
			<label>Group by</label>
			<select
				className={ styles.select }
				value={ group }
				onChange={ ( event ) => setGroup( event.target.value ) }
			>
				<option value="book">book</option>
				<option value="chapter">chapter</option>
				<option value="verse">verse</option>
				{ supportsWord && <option value="word">word</option> }
				{ supportsWord && <option value="morph">morph</option> }
			</select>
		</div>
	);

	const sortSelector = (
		<div>
			<label>Sort by</label>
			<select
				className={ styles.select }
				value={ sort }
				onChange={ ( event ) => setSort( event.target.value ) }
			>
				<option value="reference">Reference</option>
				<option value="desc">Descending ↓</option>
				<option value="asc">Ascending ↑</option>
			</select>
		</div>
	);

	if ( ! selectedResultsGrouped ) {
		return null;
	}

	const getLabel = ( result ) => {
		if ( group === 'morph' ) {
			return result.word && result.word[ 2 ];
		}
		if ( group === 'word' ) {
			return result.word && result.word[ 0 ];
		}
		if ( group === 'book' ) {
			if ( Array.isArray( result ) ) {
				return result[ 0 ];
			}
		}
		if ( group === 'chapter' ) {
			if ( Array.isArray( result ) ) {
				return result[ 0 ] + ' ' + result[ 1 ];
			}
		}
		if ( group === 'verse' ) {
			if ( Array.isArray( result ) ) {
				return result[ 0 ] + ' ' + result[ 1 ] + ':' + result[ 2 ];
			}
		}

		return result;
	};

	const getReference = ( result ) => {
		let referenceString;
		if ( group === 'word' || group === 'morph' ) {
			referenceString = result[ 0 ].reference;
		} else {
			const reference = result[ 0 ];
			if ( reference ) {
				referenceString =
					reference[ 0 ] +
					'.' +
					( reference[ 1 ] || 1 ) +
					'.' +
					( reference[ 2 ] || 1 );
			}
		}

		return getReferenceFromSearchResult( referenceString );
	};

	return (
		<div className={ styles.sortGroupResults }>
			<fieldset>
				{ groupSelector }
				{ sortSelector }
			</fieldset>

			{ selectedResultsGrouped.length > 0 && group === 'verse' && (
				<InlineResultsToggle />
			) }

			{ Object.keys( selectedResultsGrouped ).map( ( result, index ) => {
				const referenceString = getReferenceStringByGroup(
					selectedResultsGrouped[ result ][ 0 ],
					group
				);
				const label = Array.isArray( selectedResultsGrouped )
					? getLabel( selectedResultsGrouped[ result ][ 0 ] )
					: result;
				const percent = Math.round(
					( countedResults[ referenceString ] / totalResultsCount ) *
						100
				);
				const reference = getReference(
					selectedResultsGrouped[ result ]
				);

				const title =
					selectedResultsGrouped[ result ].length +
					' of type / ' +
					countedResults[ referenceString ] +
					'  total';
				return (
					<div
						key={ index }
						className={ styles.sortGroupResult }
						title={ title }
					>
						<span
							className={ classnames(
								styles.sortGroupResultCount,
								strongsNumber
							) }
							style={ { width: percent + '%' } }
						></span>
						<a
							className={ styles.sortGroupResultText }
							onClick={ () => {
								if ( reference ) {
									dispatch(
										goToReferenceAction( reference )
									);
								}
							} }
						>
							{ label }{ ' ' }
							<span className={ styles.sortGroupResultNumber }>
								({ countedResults[ referenceString ] }
								{ percent > 1 && ' - ' + percent + '%' })
							</span>
						</a>
						{ allowPreview && group === 'verse' && (
							<ExpandedSearchResults
								book={ reference.book }
								chapter={ reference.chapter }
								verse={ reference.verse }
							/>
						) }
					</div>
				);
			} ) }
		</div>
	);
};

export default React.memo( SortGroupResults );
