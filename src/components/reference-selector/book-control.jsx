// External
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

// Internal
import { goToReferenceAction } from '../../actions';
import ReferenceText from '../reference-text';
import styles from './styles.scss';

const BookControl = ( { chapters, name } ) => {
	const dispatch = useDispatch();
	const [ chapter, setChapter ] = useState( 1 );
	const [ touched, setTouched ] = useState( false );
	const [ touchChapter, setTouchChapter ] = useState( false );
	const referenceSelector = useRef( null );
	const handleGoToReference = () => {
		dispatch( goToReferenceAction( { book: name, chapter, verse: 1 } ) );
	};

	const handleMouseMove = ( event ) => {
		handleSetChapter( event.clientX );
	};

	const handleTouchMove = ( event ) => {
		if ( event.touches ) {
			setTouchChapter( true );
			handleSetChapter( event.touches[ 0 ].clientX );
		}
	};

	const handleTouchStart = () => {
		setTouched( true );
	};

	const handleTouchEnd = ( event ) => {
		setTouchChapter( false );
		handleGoToReference();
	};

	const handleSetChapter = ( clientX ) => {
		const width = referenceSelector.current.offsetWidth;
		const position = clientX - 60; // 60 is the sidebar width
		const spacing = width / chapters;
		let newChapter = Math.ceil( position / spacing );

		if ( newChapter < 1 ) {
			newChapter = 1;
		}

		if ( newChapter > chapters ) {
			newChapter = chapters;
		}

		setChapter( newChapter );
	};

	var buttonText = touchChapter ? chapter : '';
	return (
		<div
			className={ styles.bookControl }
			onClick={ handleGoToReference }
			onTouchStart={ handleTouchStart }
			onMouseMove={ handleMouseMove }
			onTouchMove={ handleTouchMove }
			onTouchEnd={ handleTouchEnd }
			ref={ referenceSelector }
		>
			<ReferenceText reference={ { book: name } } />{ ' ' }
			<span onTouchEnd={ handleGoToReference } className="chapter-number">
				{ chapter }
			</span>
			<span className={ styles.go }>{ buttonText }</span>
		</div>
	);
};

export default React.memo( BookControl );
