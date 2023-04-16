// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import { goToReferenceAction } from '../../actions';
import { goToReferenceHelper } from '../../lib/reference';

const DailyReadingLink = ({ book, chapter, verses }) => {
	const stateReference = useSelector((state) => state.reference);
	const settings = useSelector((state) => state.settings);
	const dispatch = useDispatch();

	let referenceString = book + ' ' + chapter;
	const reference = { book, chapter };

	if (verses) {
		const versesArray = verses.split('-');
		reference.verse = versesArray[0];
		// Don't add an end verse as this will limit the verses output.
		// reference.endVerse = versesArray[1];
		referenceString += ':' + verses;
	} else {
		reference.verse = 1;
	}

	const newHash =
		'/#' +
		goToReferenceHelper(
			stateReference,
			reference,
			settings.targetColumn,
			settings.inSync
		);

	return (
		<a
			href={newHash}
			onClick={(event) => {
				event.stopPropagation();
				event.preventDefault();
				dispatch(goToReferenceAction(reference));
			}}
		>
			{referenceString}
		</a>
	);
};

export default React.memo(DailyReadingLink);
