// External dependencies
import React from 'react';

export function getCompareChapters( reference ) {
	if ( reference && reference.book ) {
		const bookNumber = bible.getBookId( reference.book );
		let chapters = bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		chapters.unshift( <option key="all" value="all">All</option> );
		return chapters;
	}

	return <option>-</option>;
};