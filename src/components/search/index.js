// External dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import {
	addSearch,
	closeAdvancedSearch,
	openAdvancedSearch,
	settingsChange,
	activateSearchSelect,
	updateSearchForm,
	clearSearchForm,
	fetchData,
	selectWord,
} from '../../actions'
import PickerSvg from '../svg/picker.js';
import VersionSelect from '../version-select';
import styles from './styles.scss';
import SearchResults from './search-results';
import CombinedResults from '../word-details/combined';
import withPropsChecker from '../determine-changed-props';

const isSimpleLemmaSearch = ( { lemma, word, morph, clusivity, range } ) => {
	return lemma && lemma.indexOf( ' ' ) < 1 && ! word && ! morph && clusivity === 'exclusive' && range === 'verse';
};

const Search = ( { isActive } ) => {
	const searchAdvanced = useSelector( state => state.searchAdvanced );
	const settings = useSelector( state => state.settings );
	const searchForm = useSelector( state => state.searchForm );
	const data = useSelector( state => state.data );
	const dispatch = useDispatch();
	javascripture.reactHelpers.dispatch = dispatch;

	const submit = ( event ) => {
		event.preventDefault();
		const terms = searchForm;
		if ( isSimpleLemmaSearch( terms ) ) {
			dispatch( selectWord( terms ) );
		} else {
			dispatch( addSearch( terms, 'search' ) );
		}
		//dispatch( clearSearchForm() );
	};
	const reset = ( event ) => {
		event.preventDefault();
		dispatch( clearSearchForm() );
	}
	const isSubmitButtonDisabled = () => {
		const versionData = data[ searchForm.version ];
		return ! versionData || Object.keys( versionData ).length === 0;
	};

	const searchButtonText = () => {
		if ( isSubmitButtonDisabled() ) {
			return 'Loading ' + searchForm.version + '...';
		}

		return 'Search';
	}
	const showAdvanced = () => {
		if ( searchAdvanced ) {
			dispatch( closeAdvancedSearch() );
		} else {
			dispatch( openAdvancedSearch() );
		}
	};
	const toggle = ( event ) => {
		dispatch( updateSearchForm( event.target.name, event.target.checked ) );
	};
	const changeExpandedResultsSetting = () => {
		if ( settings.expandedSearchResults ) {
			dispatch( settingsChange( 'expandedSearchResults', false ) );
		} else {
			dispatch( settingsChange( 'expandedSearchResults', true ) );
		}
	};
	const change = ( event ) => {
		dispatch( updateSearchForm( event.target.name, event.target.value ) );
	};
	const selectChange = ( event ) => {
		change( event );
		dispatch( fetchData( event.target.value ) );
	};
	const pickerButton = ( mode ) => {
		return (
			<button
				className={ styles.pickerButton }
				type="button" onClick={ () => dispatch( activateSearchSelect( mode ) ) }
				title="Use this to select the term you want to search for.">
				<PickerSvg />
			</button>
		);
	}

	let textInput = null;
	useEffect( () => {
		textInput.focus();
	}, [ isActive ] );

	// Get the data if its not loaded
	useEffect( () => {
		if ( isSubmitButtonDisabled ) {
			dispatch( fetchData( searchForm.version ) );
		}
	}, [ searchForm.version ] );

	return (
		<>
			<div className={ styles.search }>
			<form onSubmit={ submit }>
				<fieldset>
					<label htmlFor="word" className="has-placeholder">Word</label>
					<input className={ styles.hasPicker } type="text" name="word" placeholder="Word" onChange={ change } value={ searchForm.word } ref={ (button) => { textInput = button; }} />
					{ pickerButton( 'word' ) }
				</fieldset>
				{ searchAdvanced && (
					<div>
						<fieldset>
							<label htmlFor="lemma" className="has-placeholder">Strongs number</label>
							<input className={ styles.hasPicker } type="text" name="lemma" placeholder="Strongs number" onChange={ change } value={ searchForm.lemma } />
							{ pickerButton( 'lemma' ) }
						</fieldset>
						<fieldset>
							<label htmlFor="morph" className="has-placeholder">Morphology</label>
							<input className={ styles.hasPicker } type="text" name="morph" placeholder="Morphology" onChange={ change } value={ searchForm.morph } />
							{ pickerButton( 'morph' ) }
						</fieldset>
						<fieldset>
							<label htmlFor="version">Version: </label>
							<VersionSelect name="version" onChange={ selectChange } value={ searchForm.version } />
						</fieldset>
						<fieldset className={ styles.clusivity }>
							<label htmlFor="clusivity">Find</label> <select name="clusivity" onChange={ change } value={ searchForm.clusivity }>
								<option value="exclusive">all</option>
								<option value="inclusive">any</option>
							</select> <label htmlFor="range">terms in a</label> <select name="range" onChange={ change } value={ searchForm.range }>
								<option>word</option>
								<option>verse</option>
								<option>chapter</option>
							</select>
						</fieldset>
						<fieldset>
							<label>Match whole word?</label> <input type="checkbox" name="strict" onChange={ toggle } value={ searchForm.strict } />
						</fieldset>
						<fieldset>
							<label>Show the verse for context:</label> <input type="checkbox" name="expandedSearchResults" checked={ settings.expandedSearchResults } onChange={ changeExpandedResultsSetting } />
						</fieldset>
					</div>
				) }
				<fieldset className={ styles.advanced }><a onClick={ showAdvanced }>{ searchAdvanced ? 'Hide advanced' : 'Show advanced' }</a></fieldset>
				<fieldset>
					<input type="submit" value={ searchButtonText() } disabled={ isSubmitButtonDisabled() } />
					<input type="reset" value="Reset" onClick={ reset } />
				</fieldset>
			</form>
			</div>
			<SearchResults />
			<CombinedResults type="search" />
		</>
	);
};


export default React.memo( Search );
