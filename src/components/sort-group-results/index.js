// External dependencies
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from 'classnames';

// Internal dependencies.
import { goToReferenceAction } from '../../actions';
import styles from "./styles.scss";
import { getReferenceFromSearchResult, getGroupedResults } from '../../lib/reference';

const SortGroupResults = ( { results, strongsNumber, initialGroup, initialSort } ) => {
    const dispatch = useDispatch();
	const [ group, setGroup ] = useState( initialGroup );
	const [ sort, setSort ] = useState( initialSort );
	const { interfaceLanguage } = useSelector( state => {
		return {
			interfaceLanguage: state.settings.interfaceLanguage,
		}
 	} );

	const groupSelector = (
		<div>
			<label>Group by</label>
			<select className={ styles.select } value={ group } onChange={ ( event ) => setGroup( event.target.value ) }>
				<option value="book">book</option>
				<option value="chapter">chapter</option>
				<option value="verse">verse</option>
				<option value="word">word</option>
				<option value="morph">morph</option>
			</select>
		</div>
	);

	const sortSelector = (
		<div>
			<label>Sort by</label>
			<select className={ styles.select } value={ sort } onChange={ ( event ) => setSort( event.target.value ) }>
				<option value="reference">Reference</option>
				<option value="desc">Descending ↓</option>
				<option value="asc">Ascending ↑</option>
			</select>
		</div>
	);

	if ( ! results ) {
		return null;
	}

	const getLabel = ( result ) => {
		if ( group === 'morph' ) {
			return result.word[2];
		}
		if ( group === 'word' ) {
			return result.word[0];
		}
		if ( group === 'book' ) {
			return result[0];
		}
		if ( group === 'chapter' ) {
			return result[0] + ' ' + result[1];
		}
		if ( group === 'verse' ) {
			return result[0] + ' ' + result[1] + ':' + result[2];
		}

		return result;
	}

	const selectedResults = useMemo( () => getGroupedResults( results, group, sort, interfaceLanguage ),
        [ results, group, sort, interfaceLanguage ]
    );

	const getReference = ( result ) => {
		let referenceString ;
		if ( group === 'word' || group === 'morph' ) {
			referenceString  = result[0].reference;
		} else {
			const reference = result[0];
			referenceString = reference[0] + '.' + reference[1] + '.' + reference[2]
		}

		return getReferenceFromSearchResult( referenceString  );
	}

	return (
		<div className={ styles.sortGroupResults }>
			<fieldset>
				{ groupSelector }
				{ sortSelector }
			</fieldset>
			{ Object.keys( selectedResults ).map( ( result, index ) => {
				const label = Array.isArray( selectedResults ) ? getLabel( selectedResults[result][0] ) : result;
				const percent = Math.round( selectedResults[ result ].length / results.length * 100 );
				const reference = getReference( selectedResults[ result ] );
				return (
					<div key={ index } className={ styles.sortGroupResult }>
						<span className={ classnames( styles.sortGroupResultCount, strongsNumber ) } style={ { width: percent } }></span>
						<a className={ styles.sortGroupResultText } onClick={ () => {
							if ( reference ) {
								dispatch( goToReferenceAction( reference ) );
							}
						} }>
                            { /*TODO: This should use SearchLink*/ }
							{ label } ({ selectedResults[ result ].length }{ percent > 1 && ' - ' + percent + '%' })
						</a>
					</div>
				);
			} ) }
		</div>
	);
};

export default React.memo( SortGroupResults );