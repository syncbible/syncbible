// External dependencies
import React from 'react';
import { useDispatch } from 'react-redux';

// Internal dependencies
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
import CogSvg from '../svg/cog.js';
import { closeSidebar } from '../../actions/index.js';

import styles from './styles.scss';

const Footer = React.memo( () => {
	const dispatch = useDispatch();
	return (
	<div className={ styles.footer }>
		<button style={ { border: 'none', padding: '10px' } } onClick={ ()=> {
			dispatch( closeSidebar() );
		} }>
			<SyncBible />
		</button>
		<TrayFilter filter="goto">
			<BookSvg />
		</TrayFilter>
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
		</TrayFilter>

	</div>
) } );

export default Footer;
