import _ from 'lodash';
import { uniq, forEach, groupBy, orderBy } from 'lodash';

export const createReferenceLink = ( reference ) => {
	let newReference =
		'/' +
		reference.version +
		'/' +
		reference.book +
		'/' +
		reference.chapter +
		'/' +
		reference.verse +
		'/';
	if ( reference.endVerse ) {
		newReference += reference.endVerse + '/';
	}
	return newReference;
};

export const createSyncedHashFromReference = (
	stateReference,
	newReference
) => {
	return stateReference
		.map( ( referenceToIgnore ) => {
			newReference.version = referenceToIgnore.version;
			return createReferenceLink( newReference );
		} )
		.join( '&' );
};

export const getHashFromStateReference = ( stateReference ) => {
	return stateReference
		.map( ( reference ) => {
			return createReferenceLink( reference );
		} )
		.join( '&' );
};

export const getHashAndUpdateWithIndex = (
	stateReference,
	newReference,
	index
) => {
	const unmutatedReference = stateReference.map( ( reference, key ) => {
		if ( key === parseInt( index ) ) {
			newReference.version = reference.version;
			return newReference;
		}

		return reference;
	} );

	return getHashFromStateReference( unmutatedReference );
};

export const getVerseData = ( reference, version, data ) => {
	return data[ version ][ reference.book ][ reference.chapter - 1 ][
		reference.verse - 1
	];
};

export const mapVersionToData = ( book, version ) => {
	if ( version === 'LC' ) {
		return 'original';
	}

	return version;
};

export const getReferenceText = ( referenceObject ) => {
	return (
		referenceObject.book +
		' ' +
		referenceObject.chapter +
		':' +
		referenceObject.verse
	);
};

export const getAllLemmasFromReference = ( reference, data ) => {
	const verse =
		data[ reference.version ][ reference.book ][ reference.chapter - 1 ][
			reference.verse - 1
		];
	const lemmas = verse.map( ( word ) => {
		const lemma = word[ 1 ].split( '/' );
		// filter out non-numeric lemmas
		return lemma.filter( ( singleLemma ) => ! isNaN( singleLemma[ 1 ] ) );
	} );

	// convert to string
	return lemmas.join( ' ' );
};

function getLemmasForBook( reference, data ) {
	return data.original[ reference.book ]
		.map( ( chapter, chapterNumber ) => {
			return getLemmasForChapter(
				{ ...reference, chapter: chapterNumber + 1 },
				data
			);
		} )
		.flat();
}

function getLemmasForChapter( reference, data ) {
	return data.original[ reference.book ][ reference.chapter - 1 ]
		.map( ( verse, verseNumber ) => {
			return getLemmasForVerse(
				{ ...reference, verse: verseNumber + 1 },
				data
			);
		} )
		.flat();
}

function getLemmasForVerse( reference, data ) {
	return data[ 'original' ][ reference.book ][ reference.chapter - 1 ][
		reference.verse - 1
	]
		.map( ( word ) => {
			return word[ 1 ].split( '/' );
		} )
		.flat();
}

export const getLemmasForReference = ( reference, data ) => {
	if (
		typeof data === 'undefined' ||
		typeof data.original === 'undefined' ||
		typeof data.original[ reference.book ] === 'undefined'
	) {
		return [];
	}

	// Get lemmas for book.
	if ( ! reference.chapter || reference.chapter === 'all' ) {
		return getLemmasForBook( reference, data );
	}

	// Get lemmas for chapter.
	if ( ! reference.verse || reference.verse === 'all' ) {
		return getLemmasForChapter( reference, data );
	}

	// Get lemmas for verse.
	return getLemmasForVerse( reference, data );
};

export const getReferenceFromSearchResult = ( result ) => {
	if ( ! result ) {
		return null;
	}
	const reference = result.split( '.' );
	return {
		book: reference[ 0 ],
		chapter: reference[ 1 ],
		verse: reference[ 2 ],
	};
};

const getDataFromBook = ( reference, data ) => {
	return bible.Data.otBooks.indexOf( reference.book ) > -1
		? data.hebrew
		: data.greek;
};

export const compareTwoReferences = ( {
	referenceInfo: { reference, referenceToCompareWith, limit },
	data,
} ) => {
	if ( ! reference || ! referenceToCompareWith ) {
		return null;
	}

	const ref1Lemmas = getLemmasForReference( reference, data );
	const ref2Lemmas = getLemmasForReference( referenceToCompareWith, data );
	const comparison = ref1Lemmas.filter( ( lemma ) => {
		if (
			javascripture.data.strongsObjectWithFamilies[ lemma ].count < limit
		) {
			if ( ref2Lemmas.indexOf( lemma ) > -1 ) {
				return lemma;
			}
		}
	} );

	return uniq( comparison );
};

export const calculateRareWords = ( {
	referenceInfo: { reference, limit },
	data,
} ) => {
	if ( ! reference ) {
		return null;
	}

	const lemmas = getLemmasForReference( reference, data );
	return uniq(
		lemmas.filter( ( lemma ) => {
			return (
				javascripture.data.strongsObjectWithFamilies[ lemma ].count <
				limit
			);
		} )
	);
};

export const calculateCommonWords = ( reference, data ) => {
	if ( ! reference ) {
		return null;
	}

	const lemmas = getLemmasForReference( reference, data );
	const counted = {};
	forEach( lemmas, ( lemma ) => {
		if ( typeof counted[ lemma ] === 'undefined' ) {
			counted[ lemma ] = 1;
		} else {
			counted[ lemma ] = counted[ lemma ] + 1;
		}
	} );

	return _( counted )
		.toPairs( counted )
		.orderBy( [ 1 ], [ 'desc' ] )
		.fromPairs()
		.value();
};

export const calculateConnectionQuality = ( state ) => {
	const {
		referenceInfo: { reference, limit },
		data,
	} = state;
	if ( ! reference ) {
		return null;
	}

	const comparisonState = JSON.parse( JSON.stringify( state ) );
	comparisonState.referenceInfo.limit = 99999999999;
	const numberOfWordsInReference = uniq(
		getLemmasForReference( reference, data )
	).length;
	const comparison = compareTwoReferences( comparisonState );
	const numberOfConnections = comparison ? comparison.length : 0;
	return numberOfConnections / numberOfWordsInReference;
};

export const getReferenceFromHashFragment = function ( hash ) {
	const reference = hash.split( '/' );

	if ( ! reference[ 1 ] || reference[ 1 ] === '' ) {
		return getRandomReference( version );
	}

	const version = reference[ 1 ],
		book = reference[ 2 ].replace( /\%20/gi, ' ' ),
		chapter = parseInt( reference[ 3 ] ),
		verse = reference[ 4 ] ? parseInt( reference[ 4 ] ) : 1,
		endVerse = reference[ 5 ] ? parseInt( reference[ 5 ] ) : null;

	return { book, chapter, verse, endVerse, version };
};

export const getReferenceFromHash = function ( hash ) {
	const cleanHash = hash.replace( '#', '' ).split( '&' );
	return cleanHash.map( ( hashFragment ) => {
		return getReferenceFromHashFragment( hashFragment );
	} );
};

export const getRandomReference = function ( version = 'KJV' ) {
	var bookNumber = Math.floor( Math.random() * bible.Data.books.length ),
		chapterNumber = Math.floor(
			Math.random() * bible.Data.verses[ bookNumber ].length
		),
		numberOfVerses = bible.Data.verses[ bookNumber ][ chapterNumber ],
		verseNumber = Math.floor( Math.random() * numberOfVerses ),
		referenceObject = {};
	referenceObject.book = bible.Data.books[ bookNumber ][ 0 ];
	referenceObject.chapter = chapterNumber + 1;
	referenceObject.verse = verseNumber + 1;
	referenceObject.version = version;
	return referenceObject;
};

export const areReferencesInSync = ( stateReference ) => {
	let inSync = true;
	let previousReference = stateReference[ 0 ];
	stateReference.forEach( ( reference ) => {
		if ( previousReference.book !== reference.book ) {
			inSync = false;
		}
		if ( previousReference.chapter !== reference.chapter ) {
			inSync = false;
		}
		if ( previousReference.verse !== reference.verse ) {
			inSync = false;
		}
		previousReference = reference;
	} );
	return inSync;
};

export function getPreviousChapter( { book, chapter } ) {
	if ( book === 'Harmony' ) {
		return null;
	}

	let bookId = bible.getBookId( book + ' ' + chapter );
	if ( chapter == 1 && bookId > 1 ) {
		bookId--;
		chapter = bible.Data.verses[ bookId - 1 ].length;
	} else if ( chapter === 1 && bookId === 1 ) {
		return null;
	} else {
		chapter--;
	}

	const newBookName = bible.getBook( bookId );
	return { book: newBookName, chapter };
}
export function getNextChapter( { book, chapter } ) {
	if ( book === 'Harmony' ) {
		return null;
	}
	let bookId = bible.getBookId( book + ' ' + chapter );
	if ( chapter < bible.Data.verses[ bookId - 1 ].length ) {
		chapter++;
	} else if ( bookId < bible.Data.books.length ) {
		bookId++;
		chapter = 1;
	} else {
		return null;
	}

	const newBookName = bible.getBook( bookId );
	return { book: newBookName, chapter };
}

export function getNumberOfVerses( { book, chapter } ) {
	if ( book === 'Harmony' ) {
		return harmonised.length;
	}
	const bookId = bible.getBookId( book + ' ' + chapter );
	return bible.Data.verses[ bookId - 1 ][ chapter - 1 ];
}

export function getHarmonisedReference( {
	book,
	chapter,
	verseNumber,
	index,
} ) {
	const harmonisedReference = harmonised[ verseNumber ][ index ];
	const books = [ 'Matthew', 'Mark', 'Luke', 'John' ];
	return {
		book: books[ index ],
		chapter: harmonisedReference[ 0 ],
		verseNumber: harmonisedReference[ 1 ] - 1,
		index,
	};
}

export const goToReferenceHelper = (
	stateReference,
	newReference,
	index,
	inSync = false
) => {
	if ( inSync ) {
		return createSyncedHashFromReference( stateReference, newReference );
	} else {
		return getHashAndUpdateWithIndex( stateReference, newReference, index );
	}
};

export const addColumnHelper = ( stateReference, version = '' ) => {
	if ( stateReference.length < 1 ) {
		return createReferenceLink( getRandomReference( version ) );
	}

	const referenceToAdd = stateReference[ stateReference.length - 1 ];
	if ( version ) {
		referenceToAdd.version = version;
	}
	const newReference = [ ...stateReference, referenceToAdd ];
	return getHashFromStateReference( newReference );
};

export const deleteColumnHelper = ( stateReference ) => {
	stateReference.splice( stateReference.length - 1, 1 );
	return getHashFromStateReference( stateReference );
};

export const getSyncReference = ( stateReference ) => {
	const syncedReference = stateReference.map( ( reference ) => {
		let newSyncedReference = {
			book: stateReference[ 0 ].book,
			chapter: stateReference[ 0 ].chapter,
			verse: stateReference[ 0 ].verse,
			version: reference.version,
		};

		if ( stateReference[ 0 ].endVerse ) {
			newSyncedReference.endVerse = stateReference[ 0 ].endVerse;
		}

		return newSyncedReference;
	} );
	return getHashFromStateReference( syncedReference );
};

export const getUnSyncReference = ( stateReference ) => {
	const unSyncedReference = stateReference.map( ( reference, index ) => {
		if ( index > 0 ) {
			return getRandomReference( reference.version );
		}

		return reference;
	} );
	return getHashFromStateReference( unSyncedReference );
};

export const getNewVersionHash = ( stateReference, index, version ) => {
	const newReference = stateReference.map( ( reference, referenceIndex ) => {
		if ( referenceIndex === index ) {
			reference.version = version;
		}

		return reference;
	} );

	return getHashFromStateReference( newReference );
};

export const sortReferences = (
	{ reference: referenceA },
	{ reference: referenceB }
) => {
	const referenceAArray = referenceA.split( '.' );
	const referenceBArray = referenceB.split( '.' );
	const positionOfReferenceA = bible.Data.allBooks.indexOf(
		referenceAArray[ 0 ]
	);
	const positionOfReferenceB = bible.Data.allBooks.indexOf(
		referenceBArray[ 0 ]
	);

	if ( positionOfReferenceA === positionOfReferenceB ) {
		if ( referenceAArray[ 1 ] === referenceBArray[ 1 ] ) {
			return referenceAArray[ 2 ] - referenceBArray[ 2 ];
		}

		return referenceAArray[ 1 ] - referenceBArray[ 1 ];
	}

	return positionOfReferenceA - positionOfReferenceB;
};

export const sortCountedReferences = ( reference1, reference2 ) => {
	const difference = reference2.value - reference1.value;
	if ( difference === 0 ) {
		return sortReferences( reference1, reference2 );
	}

	return difference;
};

function sortByReference( reference ) {
	const bookId = bible.Data.allBooks.indexOf( reference[ 0 ][ 0 ] ) + 1;
	const chapter = parseInt( reference[ 0 ][ 1 ] );
	const verse = parseInt( reference[ 0 ][ 2 ] );
	return bookId * 10000 + chapter * 100 + verse;
}

/* This can be removed I think
Leaving it in incase there's any useful code here.
export const getCombinedResults = ( list, group ) => {
	let combined = [];
	list.forEach( ( item ) => {
		let results = item.results;
		if ( item.results && item.results.length > 0 ) {
			results = item.results.map( ( { reference } ) => {
				if ( group === 'book' ) {
					return reference.split( '.' )[ 0 ];
				}
				if ( group === 'chapter' ) {
					return reference.split( '.' )[ 0 ] + '.' + reference.split( '.' )[ 1 ];
				}
				return reference;
			 } );
		}
		const uniqueResults = [ ...new Set( results ) ];
		combined = combined.concat( uniqueResults );
	} );

	const countedResults = countBy( combined );
	const countedResultsArray = Object.keys( countedResults ).map(reference => ({ reference, value: countedResults[reference] }));
	const sortedResults = countedResultsArray.sort( sortCountedReferences ).filter( result => result.value > 1 );
	return sortedResults;
};*/

export function getCombinedResults( listResults, group ) {
	let combinedResults = [];
	listResults.forEach( ( results ) => {
		const resultsArray =
			results &&
			results.map( ( { reference } ) => {
				const referenceArray = reference.split( '.' );
				if ( group === 'book' ) {
					return referenceArray[ 0 ];
				} else if ( group === 'chapter' ) {
					return referenceArray[ 0 ] + '.' + referenceArray[ 1 ];
				}
				return reference;
			} );
		// Make these results unique.
		const uniqueResults = [ ...new Set( resultsArray ) ];
		combinedResults = combinedResults.concat( uniqueResults );
	} );
	return combinedResults;
}

export const getGroupedResults = (
	results,
	selectedGroup,
	sort,
	interfaceLanguage
) => {
	let resultsToDisplay;
	// Allow results to be an array of strings or an array of objects with a reference property.
	const resultsArray = results.map( ( result ) => {
		if ( ! result ) {
			return;
		}
		let reference = '';
		if ( typeof result.reference === 'string' ) {
			reference = result.reference;
		}
		if ( typeof result === 'string' ) {
			reference = result;
		}
		if ( typeof reference === 'string' ) {
			return reference.split( '.' );
		}
		return reference;
	} );

	if ( selectedGroup === 'book' ) {
		resultsToDisplay = groupBy( resultsArray, function ( item ) {
			if ( Array.isArray( item ) ) {
				return bible.getTranslatedBookName(
					item[ 0 ],
					interfaceLanguage
				);
			}
		} );
	} else if ( selectedGroup === 'chapter' ) {
		resultsToDisplay = groupBy( resultsArray, function ( item ) {
			if ( Array.isArray( item ) ) {
				return (
					bible.getTranslatedBookName(
						item[ 0 ],
						interfaceLanguage
					) +
					' ' +
					item[ 1 ]
				);
			}
		} );
	} else if ( selectedGroup === 'verse' ) {
		resultsToDisplay = groupBy( resultsArray, function ( item ) {
			if ( Array.isArray( item ) ) {
				return (
					bible.getTranslatedBookName(
						item[ 0 ],
						interfaceLanguage
					) +
					' ' +
					item[ 1 ] +
					':' +
					item[ 2 ]
				);
			}
		} );
	} else if ( selectedGroup === 'word' ) {
		resultsToDisplay = groupBy( results, function ( { word } ) {
			return word && word[ 0 ];
		} );
	} else if ( selectedGroup === 'morph' ) {
		resultsToDisplay = groupBy( results, function ( { word } ) {
			return word && word[ 2 ];
		} );
	}

	if ( sort !== 'reference' ) {
		return orderBy( resultsToDisplay, [ 'length' ], [ sort ] );
	} else {
		return orderBy( resultsToDisplay, [ sortByReference ] );
	}
};
