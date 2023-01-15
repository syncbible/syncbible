export const getCrossReferencesArray = ( data, reference ) => {
	if ( ! reference ) {
		return [];
	}

	const bookId = bible.getBookId( reference.book );
	const referenceString = bible.Data.books[ bookId - 1 ][ 1 ] + '.' + reference.chapter + '.' + reference.verse;

	if ( ! data.crossReferences || ! data.crossReferences[ referenceString ] ) {
		return [];
	}

	return data.crossReferences[ referenceString ];
};

function getReverseCrossRefs( data, reference ) {
	if ( ! data.crossReferences ) {
		return [];
	}

	const bookId = bible.getBookId( reference.book );
	const referenceString = bible.Data.books[ bookId - 1 ][ 1 ] + '.' + reference.chapter + '.' + reference.verse;
	return Object.keys( data.crossReferences ).filter( crossReference => {
		return data.crossReferences[ crossReference ].indexOf( referenceString ) > -1;
	} );
}

export const getCrossReferences = ( data, reference ) => {
	const crossReferenceArray = getCrossReferencesArray( data, reference );
	const reverseCrossRefs = getReverseCrossRefs( data, reference );

	// Combine both sets of cross refs.
	const combinedCrossRefs = crossReferenceArray.concat( reverseCrossRefs );
	const uniqueCrossRefs = [ ...new Set( combinedCrossRefs ) ];

	return uniqueCrossRefs.map( ( referenceString ) => {
		const referenceSections = referenceString.split('-');
		const referenceArray = referenceSections[0].split('.');
		const bookId = bible.getBookId( referenceArray[0] );
		return bible.Data.books[bookId - 1][0] + "." + referenceArray[1] + "." + referenceArray[2];
	} ) ;
};
