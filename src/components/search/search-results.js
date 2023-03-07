// External dependencies
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import Collapsible from '../collapsible';
import SearchBlock from './search-block';
import SearchStats from './search-stats';
import Search from '../svg/search';
import Stats from '../svg/stats';
import styles from './styles.scss';
import { removeFromList, toggleListItemVisible } from '../../actions';

const SearchResults = () => {
	const dispatch = useDispatch();
	const [ activeTab, setActiveTab ] = useState( 'search' );
	const list = useSelector( state => state.list );
	const searchTerms = list.filter( ( { listType } ) => listType === 'search' )
	const termTitle = ( { clusivity, version, lemma, morph, range, strict, word } ) => {
		return 'word: ' + word + '\nstrongs number: ' + lemma + '\nmorphology: ' + morph + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nstrict: ' + strict;
	};
	const textToCopy = useRef( null );

	return searchTerms.map( ( searchTerm, index ) => {
		const header = searchTerm.data.word + ' ' + searchTerm.data.lemma + ' ' + searchTerm.data.morph;

		const getActiveTab = () => {
			if ( activeTab === 'search' ) {
				return (
					<div ref={ textToCopy }>
						<SearchBlock { ...searchTerm } />
					</div>
				);
			}

			if ( activeTab === 'stats' ) {
				return <SearchStats { ...searchTerm } />;
			}
		};

		return (
			<Collapsible
				title={ termTitle( searchTerm.data ) }
				key={ index }
				header={ header }
				open={ searchTerm.visible }
				textToCopy={ textToCopy }
				onToggle={ () => dispatch( toggleListItemVisible( searchTerm ) ) }
				onRemove={ () => dispatch( removeFromList( searchTerm ) ) }
			>
				<div className={ styles.tabs }>
					<a className={ activeTab === 'search' ? styles.active : '' } onClick={ () => setActiveTab( 'search' ) }><Search /></a>
					<a className={ activeTab === 'stats' ? styles.active : '' } onClick={ () => setActiveTab( 'stats' ) }><Stats /></a>
				</div>

				{ getActiveTab() }

			</Collapsible>
		);
	} );
}

export default React.memo( SearchResults );
