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


export const getCrossReferences = ( data, reference ) => {
	const crossReferenceArray = getCrossReferencesArray( data, reference );
	return crossReferenceArray.map( ( referenceString ) => {
		const referenceSections = referenceString.split('-');
		const referenceArray = referenceSections[0].split('.');
		const bookId = bible.getBookId( referenceArray[0] );
		return bible.Data.books[bookId - 1][0] + "." + referenceArray[1] + "." + referenceArray[2];
	} ) ;
};
