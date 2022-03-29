// External dependencies
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { goToReferenceAction, removeFromList, toggleListItemVisible } from '../../actions';
import ReferenceText from '../reference-text';
import { goToReferenceHelper } from '../../lib/reference.js';
import Collapsible from '../collapsible';
import ReferenceLink from '../reference-link';

const getReferenceFromCrossReference = ( referenceString ) => {
	const referenceArray = referenceString.split('.'),
	bookId = bible.getBookId( referenceArray[0] ),
	referenceObject = {
		book: bible.Data.books[bookId - 1][0],
		chapter: referenceArray[1],
		verse: referenceArray[2]
	};
	return referenceObject;
};

const Single = ( { bookmark, index } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( state => state.settings.inSync );
	const targetColumn = useSelector( state => state.settings.targetColumn );
	const data = useSelector( state => state.data );
	const stateReference = useSelector( state => state.reference );
	const interfaceLanguage = useSelector( state => state.settings.interfaceLanguage );
	const bookmarkRef = useRef();
	const { data: { reference } } = bookmark;

	const handleToggle = () => {
		dispatch( toggleListItemVisible( bookmark ) );
	};

	const header = (
		<ReferenceLink reference={ reference } />
	);

	const renderCrossReferences = () => {
		if ( ! data.crossReferences ) {
			return 'Loading cross references';
		}
		return (
			<div>
				{ bookmark.results.length > 0 ? 'Cross references:' : 'No cross references' }
				<div dir={ bible.isRtlVersion( interfaceLanguage ) ? 'rtl' : 'ltr' }>
					{ bookmark.results.map( ( crossReference, index2 ) => {
						const referenceSections = crossReference.split('-');
						const referenceArrays = referenceSections.map( ( referenceSection ) => getReferenceFromCrossReference( referenceSection ) );
						const newHash = '/#' + goToReferenceHelper( stateReference, referenceArrays[ 0 ], targetColumn, inSync );

						return (
							<div key={ index2 }>
								<a href={ newHash } onClick={ ( event ) => {
									event.stopPropagation();
									event.preventDefault();
									dispatch( goToReferenceAction( referenceArrays[ 0 ] ) );
								} }>
									{ index2 + 1 }. <ReferenceText reference={ referenceArrays[ 0 ] } />
									{ referenceArrays[ 1 ] && ( <span> - <ReferenceText reference={ referenceArrays[ 1 ] } /></span> ) }
								</a>
							</div>
						);
					} ) }
				</div>
			</div>
		);
	}

	return (
		<Collapsible
			key={ index }
			header={ header }
			open={ bookmark.visible }
			onToggle={ () => handleToggle() }
			textToCopy={ bookmarkRef }
			onRemove={ () => dispatch( removeFromList( bookmark ) ) }
		>
			<div ref={ bookmarkRef }>
				{ renderCrossReferences() }
			</div>
		</Collapsible>
	);
};

export default Single;
