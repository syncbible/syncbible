// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

// Internal dependencies.
import Verse from '../reference/verse';
import styles from './styles.scss';

const ExpandedSearchResults = ({ book, chapter, verse }) => {
	if (!book || !chapter || !verse) {
		return null;
	}

	const { compareMode, expandedSearchResults, interfaceLanguage } =
		useSelector((state) => {
			return state.settings;
		});

	const adjustedReference = {
		book: book,
		chapter: chapter - 1,
		verse: verse - 1,
	};
	const className = classnames(
		styles.verse,
		expandedSearchResults ? styles.verseExpanded : null,
		compareMode ? styles.compareMode : styles.smallSidebar
	);

	return (
		<div className={className}>
			<Verse
				reference={adjustedReference}
				index={adjustedReference.verse}
				version={interfaceLanguage}
			/>
		</div>
	);
};

export default React.memo(ExpandedSearchResults);
