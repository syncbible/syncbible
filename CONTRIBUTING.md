# Contributing to sync.bible

Thanks for your interest in contributing to sync.bible.

There are many ways to contribute – reporting bugs, feature suggestions, fixing bugs, submitting pull requests for enhancements.

## Reporting Bugs, Asking Questions, Sending Suggestions

We'd love to hear about any issues you have or ideas for new features. You can just [file a GitHub issue](https://github.com/syncbible/syncbible/issues/), or [contact me](http://ben.blog/contact).

## Running sync.bible Locally

If you’d like to contribute code, first, you will need to run sync.bible locally. Here is the short version:

1.	Make sure you have git, node and npm installed
2.	Clone this repository locally with git@github.com:syncbible/syncbible.git
3.	Execute npm start to install packages and start the server
4.	Open http://localhost:7777 in your browser. I find it best to work in Firefox in private mode to avoid caching issues.

## Pull Requests

When you have a patch ready to submit in your local version you need to submit a pull request so it can be reviewed before being merged. Here is a typical workflow:

1. Make sure your local repo is up to date: `git pull`
2. Create a new branch locally and check it out: `git checkout -b branch-name"
3. Add the files you have changed: `git add filename.js`
4. Commit the files: `git commit -m "Commit message goes here"
5. Push your local branch to the remote server: `git push --set-upstream origin branch-name`
6. Open the repo and use the GUI to create and submit a pull request from this branch: https://github.com/syncbible/syncbible

## Data Structure
Because sync.bible preloads all the data for the selected bible version, its important for the data files to be as small as possible. To achieve this we format the data using a JSON object with the chapters, verses and words stored in arrays. The format is of this structure:

```
{
	"version": "NET",
	"versionName": "New English Translation",
	"meta": "This part varies for each version",
	"books": {
		"Genesis": [ // This is a book array.
			[ // This is a chapter array.
				"Verse one goes here",
				"Verse two goes here",
				...
			],
			[
				// Chapter two goes here.
			]
		],
		"Exodus": [
			[
				// Exodus 1v1 goes here.
			],
			...
		],
		...
	}
```

For versions that also contain Strong's numbers the format is like this:

```
{
	"version": "KJV",
	"versionName": "Authorized King James Version",
	"meta": "This part varies for each version",
	"books": {
		"Genesis": [ // This is the book array.
			[ // This is a chapter array.
				[ // This is a verse array.
					["In the beginning", "H7225"], // This is a word array.
					["God", "H430"],
					["created", "H853 H1254", "TH8804"], // The first array element is the word to display, the second is the strongs number(s), the third is any morphological data.
					...
				],
				[
					// The next verse goes here.
				],
				...
			],
			[
				// The next chapter goes here.
			],
			...
		],
		"Exodus": [
			// The next book goes here...
		],
		...
	}
}
```

All the data is stored in the `/bibles` directory. Book names are all in English and are according to the OSIS standard:

```
Genesis
Exodus
Leviticus
Numbers
Deuteronomy
Joshua
Judges
Ruth
I Samuel
II Samuel
I Kings
II Kings
I Chronicles
II Chronicles
Ezra
Nehemiah
Esther
Job
Psalms
Proverbs
Ecclesiastes
Song of Solomon
Isaiah
Jeremiah
Lamentations
Ezekiel
Daniel
Hosea
Joel
Amos
Obadiah
Jonah
Micah
Nahum
Habakkuk
Zephaniah
Haggai
Zechariah
Malachi
Matthew
Mark
Luke
John
Acts
Romans
I Corinthians
II Corinthians
Galatians
Ephesians
Philippians
Colossians
I Thessalonians
II Thessalonians
I Timothy
II Timothy
Titus
Philemon
Hebrews
James
I Peter
II Peter
I John
II John
III John
Jude
Revelation of John
```
