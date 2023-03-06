// External dependencies
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from 'classnames';

// Internal dependencies.
import Verse from '../reference/verse';
import styles from './styles.scss';

const ExpandedSearchResults = ( { reference } ) => {
    const { compareMode, expandedSearchResults, interfaceLanguage } = useSelector( state => {
		return {
            compareMode: state.settings.compareMode,
            expandedSearchResults: state.settings.expandedSearchResults,
            interfaceLanguage: state.settings.interfaceLanguage,
		}
 	} );

    const adjustedReference = { book: reference.book, chapter: reference.chapter - 1, verse: reference.verse - 1 };
    const className = classnames(
        styles.verse,
        expandedSearchResults ? styles.verseExpanded : null,
        compareMode ? styles.compareMode : styles.smallSidebar,
    );
    return (
        <div className={ className }>
            <Verse reference={ adjustedReference } index={ adjustedReference.verse } version={ interfaceLanguage } />
        </div>
    );
};

export default React.memo( ExpandedSearchResults );
