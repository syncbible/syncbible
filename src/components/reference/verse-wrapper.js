// External
import React, { useRef } from 'react';
import classnames from 'classnames';
import { Waypoint } from 'react-waypoint';
import { useDispatch } from 'react-redux';

// Internal
import { setScrollChapter } from '../../actions';
import CopyToClipboard from '../copy-to-clipboard';
import Verse from './verse';
import VerseNumber from './verse-number';
import styles from './styles.scss';

const getClassName = ( book, version ) => {
	if (
		( version === 'original' || version === 'accented' ) &&
		bible.Data.otBooks.indexOf( book ) > -1
	) {
		return classnames( styles.verse, styles.hebrew );
	}

	if ( version === 'OPV' || version === 'TPV' || version === 'NMV' ) {
		return classnames( styles.verse, styles.farsi );
	}

	return styles.verse;
};

const VerseWrapper = ( {
	book,
	version,
	chapter,
	verse,
	isCurrentRef,
	lang,
	index,
	harmonised,
} ) => {
	const verseWrapperRef = useRef( null );
	const reference = { book, chapter: chapter - 1, verse: verse - 1 };

	const dispatch = useDispatch();

	const verseWrapped = (
		<div
			lang={ lang }
			className={ classnames(
				styles.verseWrapper,
				isCurrentRef ? styles.isCurrent : null
			) }
			dir={ bible.isRtlVersion( version, book ) ? 'rtl' : 'ltr' }
			ref={ verseWrapperRef }
		>
			{ chapter && verse && (
				<div className={ styles.helpers }>
					<VerseNumber
						book={ book }
						chapter={ chapter }
						verse={ verse }
						isCurrentRef={ isCurrentRef }
					/>
					<span className={ styles.hidden }>
						<CopyToClipboard
							fill={ '#999' }
							textToCopy={ verseWrapperRef }
						/>
					</span>
				</div>
			) }
			<div className={ getClassName( book, version ) }>
				<Verse reference={ reference } version={ version } />
			</div>
		</div>
	);

	{
		return harmonised ? (
			<Waypoint
				topOffset={ 0 }
				onEnter={ ( event ) => {
					if ( event.previousPosition === 'below' ) {
						if ( chapter ) {
							dispatch(
								setScrollChapter( book, chapter, index )
							);
						} else {
							dispatch( setScrollChapter( null, null, index ) );
						}
					}
				} }
				onLeave={ ( event ) => {
					if ( event.currentPosition === 'above' ) {
						if ( chapter ) {
							dispatch(
								setScrollChapter( book, chapter, index )
							);
						} else {
							dispatch( setScrollChapter( null, null, index ) );
						}
					}
				} }
			>
				{ verseWrapped }
			</Waypoint>
		) : (
			verseWrapped
		);
	}
};

export default React.memo( VerseWrapper );
