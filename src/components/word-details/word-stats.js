// External dependencies
import React, { useState } from "react";
import { groupBy, orderBy } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import classnames from 'classnames';

// Internal dependencies.
import { goToReferenceAction } from '../../actions';
import styles from "./styles.scss";
import { getReferenceFromSearchResult, getGroupedResults } from '../../lib/reference';
import SortGroupResults from "../sort-group-results";

const WordStats = ( { strongsNumber, version } ) => {
	const dispatch = useDispatch();
	const list = useSelector( state => state.list );
	const wordForResults = list.find( ( { listType, data } ) => listType === 'word' && data.lemma === strongsNumber && data.version === version );

	if ( ! wordForResults || ! wordForResults.results ) {
		return (
			<>
				Stats will appear when you have searched for the word.
			</>
		);
	}

	return (
		<div className={ styles.wordStats }>
			<h2>Stats for { version }</h2>
			<SortGroupResults results={ wordForResults.results } strongsNumber={ strongsNumber } initialGroup="book" initialSort="reference" supportsWord={ true } />
		</div>
	);
};

export default React.memo( WordStats );
