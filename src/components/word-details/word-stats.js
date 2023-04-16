// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies.
import styles from './styles.scss';
import SortGroupResults from '../sort-group-results';

const WordStats = ({ strongsNumber, version }) => {
	const list = useSelector((state) => state.list);
	const wordForResults = list.find(
		({ listType, data }) =>
			listType === 'word' &&
			data.lemma === strongsNumber &&
			data.version === version
	);

	if (!wordForResults || !wordForResults.results) {
		return <p>Stats will appear when you have searched for the word.</p>;
	}

	return (
		<div className={styles.wordStats}>
			<h2>Stats for {version}</h2>
			<SortGroupResults
				results={wordForResults.results}
				strongsNumber={strongsNumber}
				initialGroup="book"
				initialSort="reference"
				supportsWord={true}
			/>
		</div>
	);
};

export default React.memo(WordStats);
