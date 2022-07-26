// External dependencies
import React, { useRef, useEffect } from "react";
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import stripPointing from '../../lib/strip-pointing.js';

// Internal dependencies
import Collapsible from '../collapsible';
import { getHighlight } from '../strongs-color.js';
import styles from './styles.scss';
import WordBlockDetails from './word-block-details';
import { removeFromList, toggleListItemVisible } from '../../actions';


const WordBlock = React.memo( ( props ) => {
	const { data, visible, highlight, setFocus } = props;
	const { clickedWord, morphology, lemma, version } = data;
	const subdue = useSelector( state => state.settings.subdue );
	const strongsDictionary = useSelector( state => state.data.strongsDictionary );
	const strongsDictionaryWithFamilies = useSelector( state => state.data.strongsDictionaryWithFamilies );
	const wordBlockRef = useRef( null );
	const getSearchParameters = () => {
		return {
			clusivity: 'exclusive',
			version: version,
			lemma,
			range: 'verse',
			clickedWord,
		};
	};

	const getClassName = ( rootNumber ) => {
		return classnames( rootNumber, styles.wordTree, styles.wordListHeader );
	};

	const termTitle = ( { clusivity, version, lemma, range, clickedWord } ) => {
		return 'strongs number: ' + lemma + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nclicked word: ' + clickedWord;
	};

	const wordDetail = strongsDictionary && strongsDictionary[ lemma ];

	if ( lemma === 'G3588' ) {
		return null;
	}

	const dispatch = useDispatch();

	const header = (
		<span>
			<span className={ styles.strongsNumberTitle }>{ lemma }</span>
			{ wordDetail && stripPointing( wordDetail.lemma ) }
		</span>
	);

	return (
		<Collapsible
			title={ termTitle( getSearchParameters() ) }
			header={ header }
			open={ visible }
			onToggle={ () => dispatch( toggleListItemVisible( props ) ) }
			className={ getClassName( lemma ) }
			textToCopy={ wordBlockRef }
			onRemove={ () => {
				setFocus( null );
				dispatch( removeFromList( props ) );
			} }
			onMouseOver={ () => setFocus( lemma ) }
			onMouseOut={ () => setFocus( null ) }
		>
			{ highlight && <style>{ getHighlight( lemma, subdue, null, strongsDictionaryWithFamilies ) }</style> }
			<div ref={ wordBlockRef }>
				<div className={ classnames( styles.wordBlock, visible ? styles.visible : styles.hidden ) }>
					<WordBlockDetails morphologyProp={ morphology } strongsNumber={ lemma } version={ version } word={ props } />
				</div>
			</div>
		</Collapsible>
	);
} );

export default WordBlock;
