// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import { syncReferences, unSyncReferences } from '../../actions';
import SyncBible from '../svg/syncbible.js';
import SyncBibleDisabled from '../svg/sync-disabled';
import TrayFilter from '../../components/trays/filter.js';
import { closeSidebar } from '../../actions/index.js';
import styles from './styles.scss';

const Footer = React.memo( ( { trays } ) => {
	const inSync = useSelector( state => state.settings.inSync );

	const dispatch = useDispatch();

	return (
	<div className={ styles.footer }>
		<button title={ inSync ? 'un-sync references' : 'sync references' } style={ { border: 'none', padding: '10px' } } onClick={ ()=> {
			dispatch( closeSidebar() );
			inSync ? dispatch( unSyncReferences() ) : dispatch( syncReferences() );
		} }>
			{ inSync ? <SyncBible /> : <SyncBibleDisabled /> }
		</button>

		{ trays.map( tray => {
			return (
				<TrayFilter trays={ trays } key={ tray.id } title={ tray.text } filter={ tray.id }>
					{ tray.icon }
				</TrayFilter>
			);
		} ) }
	</div>
) } );

export default Footer;
/*
<TrayFilter filter="word">
<EyeSvg />
</TrayFilter>
<TrayFilter filter="search">
<SearchSvg />
</TrayFilter>
<TrayFilter filter="bookmarks">
<BookmarksSvg />
</TrayFilter>
<TrayFilter filter="combinedall">
<JoinFull />
</TrayFilter>
<TrayFilter filter="reference">
<InfoSvg />
</TrayFilter>
<TrayFilter filter="dailyreadings">
<CalendarSvg />
</TrayFilter>
<TrayFilter filter="settings">
<CogSvg />
</TrayFilter>
<TrayFilter filter="help">
<HelpSvg />
</TrayFilter>*/
