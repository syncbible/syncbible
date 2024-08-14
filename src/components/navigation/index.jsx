// External dependencies
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Internal dependencies
import { changeVersion } from '../../actions';
import ReferenceSelectorMobile from '../reference-selector-mobile';
import ReferenceInput from '../reference-input';
import VersionSelect from '../version-select';

// Internal dependencies
import styles from './styles.scss';

const Navigation = ( { index, version } ) => {
	const dispatch = useDispatch();
	const handleChangeVersion = useCallback(
		( event ) => {
			dispatch( changeVersion( event.target.name, event.target.value ) );
			event.target.blur();
		},
		[ changeVersion ]
	);
	const isRTL = bible.isRtlVersion( version );

	return (
		<div className={ styles.navigation } dir={ isRTL ? 'rtl' : 'ltr' }>
			<ReferenceSelectorMobile index={ index } version={ version } />
			<ReferenceInput version={ version } index={ index } />
			<VersionSelect
				name={ index }
				value={ version }
				onChange={ handleChangeVersion }
			/>
		</div>
	);
};

export default React.memo( Navigation );
