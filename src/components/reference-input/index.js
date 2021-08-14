// External dependencies
import React, { useRef, useState, useEffect } from 'react';
import mousetrap from 'mousetrap';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

// Internal dependencies
import { goToReferenceAction, openReferenceSelectorMobile } from '../../actions';

// Internal dependencies
import styles from './styles.scss';

const getBookFromState = ( reference, scrollChapter ) => {
	if ( scrollChapter && scrollChapter.book ) {
		return scrollChapter.book;
	} else {
		if ( reference ) {
			return reference.book;
		}
	}
}
const getReferenceValue = ( reference, scrollChapter, version ) => {
	const chapter = ( scrollChapter && scrollChapter.chapter ) ? scrollChapter.chapter : reference.chapter;
	const book = getBookFromState( reference, scrollChapter );
	const tranlatedBook = bible.getTranslatedBookName( book, version );
	return tranlatedBook + ' ' + chapter;
};

const ReferenceInput = React.memo( ( { index, last } ) => {
	const dispatch = useDispatch();
	const inSync = useSelector( ( state ) => state.settings.inSync );
	const localIndex = inSync ? 0 : index;
	const reference = useSelector( ( state ) => state.reference );
	const scrollChapter = useSelector( ( state ) => state.scrollChapter[ localIndex ] );
	const version = reference[ index ].version;
	const referenceValue = getReferenceValue( reference[ localIndex ], scrollChapter, version );
	const [ localReference, setLocalReference ] = useState( referenceValue );
	const referenceInputField = useRef();

	const change = ( event ) => {
		setLocalReference( event.target.value )
	};

	const goToReferenceField = ( event ) => {
		event.preventDefault();
		referenceInputField.current.focus();
		referenceInputField.current.selectionStart = referenceInputField.current.selectionEnd = 0;
		setLocalReference( event.key );
	};

	const getLocalReferenceObject = () => {
		const newLocalReference = bible.parseReference( localReference );
		newLocalReference.book = bible.Data.books[newLocalReference.bookID - 1][0];
		return newLocalReference;
	};

	const goToReference = ( event ) => {
		event.preventDefault();
		dispatch( goToReferenceAction( getLocalReferenceObject(), index ) );
		referenceInputField.current.blur();
	};

	useEffect( () => {
		setLocalReference( referenceValue );
	}, [ reference, scrollChapter, inSync ] );

	useEffect( () => {
		if ( index === 0 ) {
			mousetrap.bind( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ], goToReferenceField );
		}
		if ( index === 1 ) {
			mousetrap.bind( [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ], goToReferenceField );
		}
	} );

	const focus = () => {
		dispatch( openReferenceSelectorMobile( index ) );
	};

	return (
		<div className={ styles.versionSelectorFlexible }>
			<form onSubmit={ goToReference } className={ styles.versionSelectorInput} >
				<input type="text" id="goToReference" name="reference" placeholder="Type a reference" className={ styles.input } value={ localReference } onChange={ change } ref={ referenceInputField } onFocus={ focus } />
			</form>
		</div>
	);
} );

export default ReferenceInput;
