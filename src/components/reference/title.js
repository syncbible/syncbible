// External
import React from 'react';
import { useDispatch } from 'react-redux';

// Internal
import { setTrayVisibilityFilter, setReferenceInfo } from '../../actions';
import CopyToClipboard from '../copy-to-clipboard';
import styles from './styles.scss';

const Title = ( { book, chapter, verse, version, customClickHandler } ) => {
	const dispatch = useDispatch();

	const tranlatedBook = bible.getTranslatedBookName( book, version );
	const showChapterDetails = () => {
		dispatch( setTrayVisibilityFilter( 'stats' ) );
		dispatch( setReferenceInfo( { book, chapter } ) );
	};

	const titleText = chapter && `${ tranlatedBook } ${ chapter }​`;

	// There is a zero width character at the end of the title
	// This is so that when you copy the chapter the title doesn't get put on the same line as the first verse
	return (
		<h1 className={ styles.heading } onClick={ showChapterDetails }>
			{ titleText }
			<span className={ styles.copyHidden }>
				<CopyToClipboard
					fill={ '#999' }
					customClickHandler={ customClickHandler }
					version={ version }
				/>
			</span>
		</h1>
	);
};

export default React.memo( Title );
