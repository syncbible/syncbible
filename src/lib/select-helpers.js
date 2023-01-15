// External dependencies
import React from 'react';

export function getBooks() {
	return (
		<>
			<option value="">Select a book</option>
			{ bible.Data.books.map( book => <option key={ book[ 0 ] }>{ book[0] }</option> ) }
		</>
	);
};

export function getCompareChapters( reference ) {
	if ( reference && reference.book ) {
		const bookNumber = bible.getBookId( reference.book );
		let chapters = bible.Data.verses[ bookNumber - 1 ].map( ( verses, index ) => <option key={ index }>{ index + 1 }</option> );
		chapters.unshift( <option key="all" value="all">All</option> );
		return chapters;
	}

	return <option>-</option>;
};