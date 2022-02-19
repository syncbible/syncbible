// External
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal
import { setTrayVisibilityFilter, setReferenceInfo } from '../../actions';
import { mapVersionToData } from '../../lib/reference';
import CopyToClipboard from '../copy-to-clipboard';
import styles from './styles.scss';
import VerseNumber from './verse-number';

const Title =  React.memo( ( { book, chapter, version, textToCopy } ) => {
	const dispatch = useDispatch();
	const data = useSelector( state => state.data );
	const language = mapVersionToData( book, version );

	const tranlatedBook = bible.getTranslatedBookName( book, version );
	const showChapterDetails = () => {
		dispatch( setTrayVisibilityFilter( 'reference' ) );
		dispatch( setReferenceInfo( { book, chapter } ) );
	};

	// There is a zero width character at the end of the title
	// This is so that when you copy the chapter the title doesn't get put on the same line as the first verse
	return (
		<h1 className={ styles.heading } onClick={ showChapterDetails }>
			{ tranlatedBook + ' ' + chapter + '‍' }
			<span className={ styles.copyHidden }>
				<CopyToClipboard fill={ '#999' } textToCopy={ textToCopy } />
			</span>
		</h1>
	);
} );

export default Title;
