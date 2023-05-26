import { promises as fs } from 'fs';
import { exit } from 'process';

const bookNames = [
	[ 'Genesis', 'Gen', 'Ge' ],
	[ 'Exodus', 'Exod', 'Ex' ],
	[ 'Leviticus', 'Lev', 'Le' ],
	[ 'Numbers', 'Num', 'Nu' ],
	[ 'Deuteronomy', 'Deut', 'Deu', 'De' ],
	[ 'Joshua', 'Josh', 'Jos', 'Jo' ],
	[ 'Judges', 'Judg', 'Jud', 'Jdg', 'Jg' ],
	[ 'Ruth', 'Ruth', 'Rut', 'Ru' ],
	[
		'I Samuel',
		'1Sam',
		'1 Samuel',
		'1 Sam',
		'1 Sa',
		'1Sa',
		'I Sam',
		'I Sa',
		'1S',
	],
	[
		'II Samuel',
		'2Sam',
		'2 Samuel',
		'2 Sam',
		'2 Sa',
		'2Sa',
		'II Sam',
		'II Sa',
		'2S',
	],
	[
		'I Kings',
		'1Kgs',
		'1 Kings',
		'1 Kin',
		'1Kin',
		'1 Ki',
		'1Ki',
		'I Kin',
		'I Ki',
		'1K',
	],
	[
		'II Kings',
		'2Kgs',
		'2 Kings',
		'2 Kin',
		'2Kin',
		'2 Ki',
		'2Ki',
		'II Kin',
		'II Ki',
		'2K',
	],
	[
		'I Chronicles',
		'1Chr',
		'1 Chronicles',
		'1 Chr',
		'1 Ch',
		'1Ch',
		'I Chr',
		'I Ch',
		'1C',
	],
	[
		'II Chronicles',
		'2Chr',
		'2 Chronicles',
		'2 Chr',
		'2 Ch',
		'2Ch',
		'II Chr',
		'II Ch',
		'2C',
	],
	[ 'Ezra', 'Ezra', 'Ezr', 'Ez' ],
	[ 'Nehemiah', 'Neh', 'Ne' ],
	[ 'Esther', 'Esth', 'Est', 'Es' ],
	[ 'Job', 'Job', 'Jb' ],
	[ 'Psalms', 'Ps', 'Psalm', 'Psa', 'Ps' ],
	[ 'Proverbs', 'Prov', 'Pro', 'Pr' ],
	[ 'Ecclesiastes', 'Eccl', 'Ecc', 'Ec' ],
	[ 'Song of Solomon', 'Song', 'Song of Songs', 'Songs', 'SOS', 'SS' ],
	[ 'Isaiah', 'Isa', 'Is' ],
	[ 'Jeremiah', 'Jer', 'Jr' ],
	[ 'Lamentations', 'Lam', 'La' ],
	[ 'Ezekiel', 'Ezek', 'Eze', 'Ez' ],
	[ 'Daniel', 'Dan', 'Da' ],
	[ 'Hosea', 'Hos', 'Ho' ],
	[ 'Joel', 'Joel', 'Jl' ],
	[ 'Amos', 'Amos', 'Am' ],
	[ 'Obadiah', 'Oba', 'Obad', 'Ob' ],
	[ 'Jonah', 'Jon', 'Jh' ],
	[ 'Micah', 'Mic', 'Mi' ],
	[ 'Nahum', 'Nah', 'Na' ],
	[ 'Habakkuk', 'Hab', 'Hk' ],
	[ 'Zephaniah', 'Zep', 'Zeph', 'Zp' ],
	[ 'Haggai', 'Hag', 'Hi' ],
	[ 'Zechariah', 'Zech', 'Zec', 'Zc' ],
	[ 'Malachi', 'Mal', 'Mi' ],
	[ 'Matthew', 'Matt', 'Mat', 'Mt' ],
	[ 'Mark', 'Mar', 'Mk' ],
	[ 'Luke', 'Luk', 'Lu' ],
	[ 'John', 'Joh', 'Jn' ],
	[ 'Acts', 'Acts', 'Act', 'Ac' ],
	[ 'Romans', 'Rom', 'Ro' ],
	[
		'I Corinthians',
		'1Cor',
		'1 Corinthians',
		'1 Cor',
		'1 Co',
		'1Co',
		'I Cor',
		'I Co',
		'1a',
	],
	[
		'II Corinthians',
		'2Cor',
		'2 Corinthians',
		'2 Cor',
		'2 Co',
		'2Co',
		'II Cor',
		'II Co',
		'2a',
	],
	[ 'Galatians', 'Gal', 'Ga' ],
	[ 'Ephesians', 'Eph', 'Ep' ],
	[ 'Philippians', 'Phil', 'Phi', 'Pp' ],
	[ 'Colossians', 'Col', 'Co' ],
	[
		'I Thessalonians',
		'1Thess',
		'1 Thessalonians',
		'1 Thess',
		'1 Thes',
		'1Thes',
		'1 The',
		'1The',
		'1 Th',
		'1Th',
		'I Thess',
		'I The',
		'I Th',
		'1T',
	],
	[
		'II Thessalonians',
		'2Thess',
		'2 Thessalonians',
		'2 Thess',
		'2 Thes',
		'2Thes',
		'2 The',
		'2The',
		'2 Th',
		'2Th',
		'II Thess',
		'II The',
		'II Th',
		'2T',
	],
	[
		'I Timothy',
		'1Tim',
		'1 Timothy',
		'1 Tim',
		'1 Ti',
		'1Ti',
		'I Tim',
		'I Ti',
		'1m',
	],
	[
		'II Timothy',
		'2Tim',
		'2 Timothy',
		'2 Tim',
		'2 Ti',
		'2Ti',
		'II Tim',
		'II Ti',
		'2m',
	],
	[ 'Titus', 'Tit', 'Ti' ],
	[ 'Philemon', 'Phile', 'Philm', 'Phlm', 'Pn' ],
	[ 'Hebrews', 'Heb', 'He' ],
	[ 'James', 'Jas', 'Jam', 'Jm' ],
	[ 'I Peter', '1Pet', '1 Peter', '1 Pet', '1Pe', 'I Pet', 'I Pe', '1P' ],
	[ 'II Peter', '2Pet', '2 Peter', '2 Pet', '2Pe', 'II Pet', 'II Pe', '2P' ],
	[
		'I John',
		'1John',
		'1 John',
		'1 Jn',
		'1Jn',
		'1 Jo',
		'1Jo',
		'I Jo',
		'I Jn',
		'1J',
	],
	[
		'II John',
		'2John',
		'2 John',
		'2 Jn',
		'2Jn',
		'2 Jo',
		'2Jo',
		'II Jo',
		'II Jn',
		'2J',
	],
	[
		'III John',
		'3John',
		'3 John',
		'3 Jn',
		'3Jn',
		'3 Jo',
		'3Jo',
		'III Jo',
		'III Jn',
		'3J',
	],
	[ 'Jude', 'Jude', 'Je' ],
	[ 'Revelation of John', 'Rev', 'Revelation', 'Apocalypse', 'Re' ],
];

( async function start() {
	const src = await fs.readFile( 'bibles/original.json' );
	const JsonSRC = JSON.parse( src );
	const srcBooks = JsonSRC.books;

	const words = {};

	Object.keys( srcBooks ).forEach( async ( bookName ) => {
		srcBooks[ bookName ].forEach( async ( chapter ) => {
			chapter.forEach( async ( verse ) => {
				verse.forEach( async ( wordString ) => {
					wordString[ 1 ]
						.split( '/' )
						.forEach( async ( strongsNumber ) => {
							words[ strongsNumber ] = [];
						} );
				} );
			} );
		} );
	} );

	const strongsNumbers = Object.keys( words ).sort();

	strongsNumbers.forEach( async ( strongsNumberToFind ) => {
		Object.keys( srcBooks ).forEach( async ( bookNameInLoop ) => {
			const bookArray = bookNames.filter( ( bookNameArray ) => {
				return bookNameArray.indexOf( bookNameInLoop ) === 0;
			} )[ 0 ];
			const shortBookName = bookArray[ bookArray.length - 1 ];
			srcBooks[ bookNameInLoop ].forEach(
				async ( chapter, chapterNumber ) => {
					chapter.forEach( async ( verse, verseNumber ) => {
						verse.forEach( async ( wordString, wordIndex ) => {
							wordString[ 1 ]
								.split( '/' )
								.forEach( async ( strongsNumber ) => {
									if (
										strongsNumberToFind === strongsNumber
									) {
										words[ strongsNumberToFind ].push(
											shortBookName +
												'.' +
												( chapterNumber + 1 ) +
												'.' +
												( verseNumber + 1 )
										);
									}
								} );
						} );
					} );
				}
			);
		} );
	} );

	// Remove very common words
	Object.keys( words ).forEach( async ( strongsNumber ) => {
		if ( words[ strongsNumber ].length > 3000 ) {
			delete words[ strongsNumber ];
		}
	} );

	await fs.writeFile( 'data/searchResults.json', JSON.stringify( words ) );
} )();
