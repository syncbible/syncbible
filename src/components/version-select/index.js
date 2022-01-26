// External
import React from 'react';
import classnames from 'classnames';

// Internal
import styles from './styles.scss';

const VersionSelect = React.memo( ( { name, value="default", onChange, large } ) => {
	const classes = classnames( styles.sidebarSelect, large ? styles.large : styles.small );
	return (
		<select className={ classes } name={ name } value={ value } onChange={ ( event ) => {
			if( typeof ga !== 'undefined' ) {
				ga('send', 'event', 'version', 'select', 'Version Selected', value );
			}
			onChange( event );
		} }>
			<option disabled hidden value="default">Select a version to get started</option>
			{ Object.keys( bible.Data.interfaceLanguages ).map( ( key ) => {
				const versionsForLanguage = Object.keys( bible.Data.supportedVersions ).filter( versionForLanguage => bible.Data.supportedVersions[ versionForLanguage ].language === key );
				const versionOption = versionsForLanguage.map( version => {
					const versionData = bible.Data.supportedVersions[ version ];
					return (
						<option value={ version } key={ version } title={ versionData.name }>
							{ version }{ versionData.strongs ? ' *' : '' } - { versionData.name }
						</option>
					);
				} );
				return <optgroup key={ 'optgroup' + key } label={ bible.Data.interfaceLanguages[ key ] }>{ versionOption }</optgroup>;
			} ) }
		</select>
	);
} );

export default VersionSelect;
