// External dependencies
import React from 'react';
import { countBy, sortBy } from 'lodash';
import { useSelector } from 'react-redux';

// Internal dependencies
import SearchLink from '../search-link';
import { getReferenceFromSearchResult } from '../../lib/reference.js';
import styles from './styles.scss';
import InlineResultsToggle from '../inline-results-toggle';

const SearchBlock = (props) => {
	const interfaceLanguage = useSelector(
		(state) => state.settings.interfaceLanguage
	);
	const { visible, sorted, terms, results } = props;
	if (!results) {
		return <div className={styles.noResults}>Loading…</div>;
	}

	if (results.length === 0 || typeof results === 'string') {
		return (
			<div className={visible ? styles.noResults : styles.hidden}>
				No results.
			</div>
		);
	}

	let renderedResults;
	if (sorted) {
		const countedResults = countBy(results);
		const countedResultsArray = Object.keys(countedResults).map((key) => ({
			key,
			value: countedResults[key],
		}));
		const sortedResults = sortBy(countedResultsArray, ['value', 'key'])
			.filter((result) => result.value > 2)
			.reverse();

		renderedResults =
			Array.isArray(sortedResults) &&
			sortedResults.map((result, index) => {
				const isActive =
					props &&
					typeof props.current !== 'undefined' &&
					props.current === index;
				return (
					<SearchLink
						key={index}
						index={index}
						referenceString={result.reference}
						wordId={props.id}
						isActive={isActive}
						count={result.value}
					/>
				);
			});
	} else {
		renderedResults =
			Array.isArray(results) &&
			results.map((result, index) => {
				const isActive =
					props &&
					typeof props.current !== 'undefined' &&
					props.current === index;
				return (
					<SearchLink
						key={index}
						index={index}
						referenceString={result.reference}
						wordId={props.id}
						isActive={isActive}
					/>
				);
			});
	}

	return (
		<div dir={bible.isRtlVersion(interfaceLanguage) ? 'rtl' : 'ltr'}>
			<InlineResultsToggle />
			<ol className={styles.results}>{renderedResults}</ol>
		</div>
	);
};

export default React.memo(SearchBlock);
