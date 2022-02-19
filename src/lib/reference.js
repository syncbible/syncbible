import _, { stubFalse } from 'lodash';
import { uniq, sortBy, forEach, toPairs, fromPairs, orderBy } from 'lodash';
import reference from '../reducers/reference';

export const createReferenceLink = ( reference ) => {
	let newReference = '/' + reference.version + '/' + reference.book + '/' + reference.chapter + '/' + reference.verse + '/';
	if ( reference.endVerse ) {
		newReference += reference.endVerse + '/';
	}
	return newReference;
};

export const createSyncedHashFromReference = ( stateReference, newReference ) => {
	return stateReference.map( referenceToIgnore => {
		newReference.version = referenceToIgnore.version;
		return createReferenceLink( newReference );
	} ).join( '&' );
}

export const getHashFromStateReference = ( stateReference ) => {
	return stateReference.map( reference => {
		return createReferenceLink( reference );
	} ).join( '&' );
};

export const getHashAndUpdateWithIndex = ( stateReference, newReference, index ) => {
	const unmutatedReference = stateReference.map( ( reference, key ) => {
		if ( key === parseInt( index ) ) {
			newReference.version = reference.version;
			return newReference;
		}

		return reference;
	} );

	return getHashFromStateReference( unmutatedReference );
}

export const getVerseData = ( reference, version, data ) => {
	return data[ version ][ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ];
};

export const mapVersionToData = ( book, version ) => {
	if (  version === 'LC' ) {
		return 'original';
	}

	return version;
};

export const getReferenceText = ( referenceObject ) => {
	return referenceObject.book + ' ' + referenceObject.chapter + ':' + referenceObject.verse;
};

export const getAllLemmasFromReference = ( reference, data ) => {
	const verse = data[ reference.version ][ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ];
	const lemmas = verse.map( word => {
		const lemma = word[ 1 ].split( '/' );
		// filter out non-numeric lemmas
		return lemma.filter( singleLemma => ! isNaN( singleLemma[1] ) );
	} );

	// convert to string
	return lemmas.join( ' ' );
};

export const getLemmasForReference = ( reference, data ) => {
	if ( typeof data === 'undefined' || typeof data.original === 'undefined' || typeof data.original[ reference.book ] === 'undefined' ) {
		return [];
	}

	if ( ! reference.verse || reference.verse === 'all' ) {
		return data.original[ reference.book ][ reference.chapter - 1 ].map( verse => {
			return verse.map( word => {
				return word[ 1 ].split('/');
			} ).flat();
		} ).flat();
	}

	return data[ 'original' ][ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ].map( word => {
		return word[ 1 ].split('/');
	} ).flat();

};

export const getReferenceFromSearchResult = ( result ) => {
	const reference = result.split( '.' );
	return {
		book: reference[0],
		chapter: reference[1],
		verse: reference[2],
	};
};

const getDataFromBook = ( reference, data ) => {
	return bible.Data.otBooks.indexOf( reference.book ) > -1 ? data.hebrew : data.greek;
}

export const compareTwoReferences = ( { referenceInfo: { reference, referenceToCompareWith, limit } , data } ) => {
	if ( ! reference || ! referenceToCompareWith ) {
		return null;
	}

	const ref1Lemmas = getLemmasForReference( reference, data );
	const ref2Lemmas = getLemmasForReference( referenceToCompareWith, data );
	const comparison = ref1Lemmas.filter( lemma => {
		if ( javascripture.data.strongsObjectWithFamilies[ lemma ].count < limit ) {
			if ( ref2Lemmas.indexOf( lemma ) > -1 ) {
				return lemma;
			}
		}
	} );

	return uniq( comparison );
};

export const calculateRareWords = ( { referenceInfo: { reference, limit }, data } ) => {
	if ( ! reference ) {
		return null;
	}

	const lemmas = getLemmasForReference( reference, data );
	return uniq( lemmas.filter( lemma => {
		return javascripture.data.strongsObjectWithFamilies[ lemma ].count < limit;
	} ) );
};

export const calculateCommonWords = ( { referenceInfo: { reference }, data } ) => {
	if ( ! reference ) {
		return null;
	}

	const lemmas = getLemmasForReference( reference, data );
	const counted = {};
	forEach( lemmas, lemma => {
		if ( typeof counted[ lemma ] === 'undefined' ) {
			counted[ lemma ] = 1;
		} else {
			counted[ lemma ] = counted[ lemma ] + 1;
		}
	} );

	return _( counted ).toPairs( counted ).orderBy( [1], ['desc'] ).fromPairs().value();
};

export const calculateConnectionQuality = ( state ) => {
	const { referenceInfo: { reference, limit } , data } = state;
	if ( ! reference ) {
		return null;
	}

	const comparisonState = JSON.parse( JSON.stringify( state ) );
	comparisonState.referenceInfo.limit = 99999999999;
	const numberOfWordsInReference = uniq( getLemmasForReference( reference, data ) ).length;
	const comparison = compareTwoReferences( comparisonState );
	const numberOfConnections = comparison ? comparison.length : 0;
	return numberOfConnections / numberOfWordsInReference;
};

export const getReferenceFromHashFragment = function( hash ) {
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

export const getReferenceFromHash = function( hash ) {
	const cleanHash = hash.replace( '#', '' ).split( '&' );
	return cleanHash.map( hashFragment => {
		return getReferenceFromHashFragment( hashFragment );
	} );
};

export const getRandomReference = function( version = 'KJV') {
	var bookNumber = Math.floor(Math.random() * bible.Data.books.length),
		chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length),
		numberOfVerses = bible.Data.verses[bookNumber][chapterNumber],
		verseNumber = Math.floor(Math.random() * numberOfVerses),
		referenceObject = {};
	referenceObject.book = bible.Data.books[bookNumber][0];
	referenceObject.chapter = chapterNumber + 1;
	referenceObject.verse = verseNumber + 1;
	referenceObject.version = version;
	return referenceObject;
};

export const areReferencesInSync = ( stateReference ) => {
	let inSync = true;
	let previousReference = stateReference[ 0 ];
	stateReference.forEach( reference => {
		if ( previousReference.book !== reference.book ) {
			inSync = false;
		};
		if ( previousReference.chapter !== reference.chapter ) {
			inSync = false;
		};
		if ( previousReference.verse !== reference.verse ) {
			inSync = false;
		};
		previousReference = reference;
	} );
	return inSync;
}

export const goToReferenceHelper = ( stateReference, newReference, index, inSync = false ) => {
	if ( inSync ) {
		return createSyncedHashFromReference( stateReference, newReference );
	} else {
		return getHashAndUpdateWithIndex( stateReference, newReference, index );
	}
}

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
}

export const deleteColumnHelper = ( stateReference ) => {
	stateReference.splice( stateReference.length - 1, 1 );
	return getHashFromStateReference( stateReference );
}

export const getSyncReference = ( stateReference ) => {
	const syncedReference = stateReference.map( reference => {
		let newSyncedReference = {
			book: stateReference[ 0 ].book,
			chapter: stateReference[ 0 ].chapter,
			verse: stateReference[ 0 ].verse,
			version: reference.version
		};

		if ( stateReference[ 0 ].endVerse ) {
			newSyncedReference.endVerse = stateReference[ 0 ].endVerse;
		}


		return newSyncedReference;
	});
	return getHashFromStateReference( syncedReference );
}

export const getUnSyncReference = ( stateReference ) => {
	const unSyncedReference = stateReference.map( ( reference, index ) => {
		if ( index > 0 ) {
			return getRandomReference( reference.version );
		}

		return reference;
	} );
	return getHashFromStateReference( unSyncedReference );
}

export const getNewVersionHash = ( stateReference, index, version ) => {
	const newReference = stateReference.map( ( reference, referenceIndex ) => {
		if ( referenceIndex === index ) {
			reference.version = version;
		}

		return reference;
	} );

	return getHashFromStateReference( newReference );
}

export const sortReferences = ( referenceA, referenceB ) => {
	const referenceAArray = referenceA.split('.');
	const referenceBArray = referenceB.split('.');
	const positionOfReferenceA = bible.Data.allBooks.indexOf( referenceAArray[ 0 ] );
	const positionOfReferenceB = bible.Data.allBooks.indexOf( referenceBArray[ 0 ] );

	if ( positionOfReferenceA === positionOfReferenceB ) {
		if ( referenceAArray[1] === referenceBArray[1] ) {
			return referenceAArray[2] - referenceBArray[2];
		}

		return referenceAArray[1] - referenceBArray[1];
	}

	return positionOfReferenceA - positionOfReferenceB;
}
