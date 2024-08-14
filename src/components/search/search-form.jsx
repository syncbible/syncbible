// External dependencies
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { motion } from 'framer-motion';

// Internal dependencies
import {
	addSearch,
	closeAdvancedSearch,
	openAdvancedSearch,
	settingsChange,
	activateSearchSelect,
	updateSearchForm,
	clearSearch,
	fetchData,
	selectWord,
} from '../../actions';
import PickerSvg from '../svg/picker';
import VersionSelect from '../version-select';
import styles from './styles.scss';

const isSimpleLemmaSearch = ( { lemma, word, morph, clusivity, range } ) => {
	return (
		lemma &&
		lemma.indexOf( ' ' ) < 1 &&
		! word &&
		! morph &&
		clusivity === 'exclusive' &&
		range === 'verse'
	);
};

const SearchForm = ( { isActive } ) => {
	const searchAdvanced = useSelector( ( state ) => state.searchAdvanced );
	// TODO - get the actual settings and form details, not an object.
	const settings = useSelector( ( state ) => state.settings, shallowEqual );
	const searchForm = useSelector(
		( state ) => state.searchForm,
		shallowEqual
	);
	const versionHasLoaded = useSelector( ( state ) => {
		const version = state.searchForm.version;
		if ( version && state.data[ version ] ) {
			return Object.keys( state.data[ version ] ).length > 0;
		}
		return false;
	} );

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
		dispatch( clearSearch() );
	};
	const isSubmitButtonDisabled = () => {
		return false;
		return (
			! versionHasLoaded || Object.keys( versionHasLoaded ).length === 0
		);
	};

	const searchButtonText = () => {
		if ( isSubmitButtonDisabled() ) {
			return 'Loading ' + searchForm.version + '...';
		}

		return 'Search';
	};
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
	const selectChange = useCallback(
		( event ) => {
			change( event );
			dispatch( fetchData( event.target.value ) );
		},
		[ change, fetchData ]
	);
	const pickerButton = ( mode ) => {
		return (
			<button
				className={ styles.pickerButton }
				type="button"
				onClick={ () => dispatch( activateSearchSelect( mode ) ) }
				title="Use this to select the term you want to search for."
			>
				<PickerSvg />
			</button>
		);
	};

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

	const variants = {
		open: { height: 'auto' },
		closed: { height: '0' },
	};

	return (
		<div className={ styles.search }>
			<form onSubmit={ submit }>
				<fieldset>
					<label htmlFor="word" className="has-placeholder">
						Word
					</label>
					<input
						className={ styles.hasPicker }
						type="text"
						name="word"
						placeholder="Word"
						onChange={ change }
						value={ searchForm.word }
						ref={ ( button ) => {
							textInput = button;
						} }
					/>
					{ pickerButton( 'word' ) }
				</fieldset>
				{ searchAdvanced && (
					<motion.div
						initial={ searchAdvanced ? 'open' : 'closed' }
						animate={ searchAdvanced ? 'open' : 'closed' }
						variants={ variants }
						style={ { overflow: 'hidden' } }
					>
						<fieldset>
							<label htmlFor="lemma" className="has-placeholder">
								Strongs number
							</label>
							<input
								className={ styles.hasPicker }
								type="text"
								name="lemma"
								placeholder="Strongs number"
								onChange={ change }
								value={ searchForm.lemma }
							/>
							{ pickerButton( 'lemma' ) }
						</fieldset>
						<fieldset>
							<label htmlFor="morph" className="has-placeholder">
								Morphology
							</label>
							<input
								className={ styles.hasPicker }
								type="text"
								name="morph"
								placeholder="Morphology"
								onChange={ change }
								value={ searchForm.morph }
							/>
							{ pickerButton( 'morph' ) }
						</fieldset>
						<fieldset>
							<label htmlFor="version">Version: </label>
							<VersionSelect
								name="version"
								onChange={ selectChange }
								value={ searchForm.version }
							/>
						</fieldset>
						<fieldset className={ styles.clusivity }>
							<label htmlFor="clusivity">Find</label>{ ' ' }
							<select
								name="clusivity"
								onChange={ change }
								value={ searchForm.clusivity }
							>
								<option value="exclusive">all</option>
								<option value="inclusive">any</option>
							</select>{ ' ' }
							<label htmlFor="range">terms in a</label>{ ' ' }
							<select
								name="range"
								onChange={ change }
								value={ searchForm.range }
							>
								<option>word</option>
								<option>verse</option>
								<option>chapter</option>
							</select>
						</fieldset>
						<fieldset>
							<label>Match whole word?</label>{ ' ' }
							<input
								type="checkbox"
								name="strict"
								onChange={ toggle }
								value={ searchForm.strict }
							/>
						</fieldset>
					</motion.div>
				) }
				<fieldset className={ styles.advanced }>
					<a onClick={ showAdvanced }>
						{ searchAdvanced ? 'Hide advanced' : 'Show advanced' }
					</a>
				</fieldset>
				<fieldset>
					<input
						type="submit"
						value={ searchButtonText() }
						disabled={ isSubmitButtonDisabled() }
					/>
					<input type="reset" value="Reset" onClick={ reset } />
				</fieldset>
			</form>
		</div>
	);
};

export default React.memo( SearchForm );
