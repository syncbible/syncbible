var module = {};
var javascripture = {};
javascripture.api = {};

importScripts('../data/bible.js');
self.postMessage( { task: 'loading', html: 'loading API' } );
importScripts('../api/searchApi.js');
self.postMessage( { task: 'loading', html: 'loading complete!' } );

// Copied from actions/index.js.
function getResultsForWord( parameters, versionData ) {
	strongsNumber = parameters.lemma;
	const resultData = {};
	Object.keys( versionData ).forEach( book => versionData[ book ].forEach( ( chapter, chapterNumber ) => chapter.forEach( ( verse, verseNumber ) => verse.forEach( word => {
		const lemmaArray = word[1] && word[1].split(/ |\//); // should also split by &.
		if ( lemmaArray && lemmaArray.indexOf( strongsNumber ) > -1 ) {
			resultData[ book + '.' + ( chapterNumber + 1 ) + '.' + ( verseNumber + 1 ) ] = word;
		}
	} ) ) ) );
	return resultData;
}

self.addEventListener('message', function( e ) {
	let result;
	if ( e.data.task === 'search' ) {
		result = javascripture.api.search.getReferences( e.data.parameters, e.data.data );
	}
	if ( e.data.task === 'word' ) {
		result = getResultsForWord( e.data.parameters, e.data.data );
	}

	if ( result ) {
		self.postMessage( {
			task: e.data.task,
			parameters: e.data.parameters,
			result: result
		} );
	}

}, false);
