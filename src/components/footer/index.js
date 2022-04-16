// External dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal dependencies
import { syncReferences, unSyncReferences } from '../../actions';
import BookSvg from '../svg/book.js';
import BookmarksSvg from '../svg/bookmarks.js';
import HelpSvg from '../svg/help.js';
import EyeSvg from '../svg/eye.js';
import InfoSvg from '../svg/info.js';
import SearchSvg from '../svg/search.js';
import CalendarSvg from '../svg/calendar.js';
import TrayFilter from '../../components/trays/filter.js';
import JoinFull from '../svg/join-full.js';
import SyncBible from '../svg/syncbible.js';
import SyncBibleDisabled from '../svg/sync-disabled';
import CogSvg from '../svg/cog.js';
import { closeSidebar } from '../../actions/index.js';
import styles from './styles.scss';

const icons = {
	BookSvg: <BookSvg />,
	EyeSvg: <EyeSvg />,
	SearchSvg: <SearchSvg />,
	BookmarksSvg: <BookmarksSvg />,
	HelpSvg: <HelpSvg />,
	InfoSvg: <InfoSvg />,
	CalendarSvg: <CalendarSvg />,
	JoinFull: <JoinFull />,
	CogSvg: <CogSvg />
};

const Footer = React.memo( () => {
	const inSync = useSelector( state => state.settings.inSync );
	const trays = useSelector( state => state.trays );

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
				<TrayFilter key={ tray.id } title={ tray.text } filter={ tray.id }>
					{ icons[ tray.icon ] }
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
