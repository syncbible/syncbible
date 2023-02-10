// External dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import styles from './styles.scss';


const HelpTray = () => {
	const data = useSelector( state => state.data );

	const clear = () => {
		localStorage.clear();
		window.location.href="/";
	};

	const exportFile = ( fileName ) => {
		const element = document.createElement("a");
		const file = new Blob([ JSON.stringify( data[ fileName ], null, "\t" ) ], {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = fileName + ".json";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	}

	return (
		<div>
			<div id="helpPanel" className={ styles.helpPanel }>
				<div className="content">
					<div className="content-padding">
						<p><a href="/help">Watch help videos.</a></p>
						<h3>Keyboard shortcuts</h3>
						<ul>
							<li><strong>Go to a reference:</strong> just start typing</li>
							<li><strong>Next reference:</strong> =</li>
							<li><strong>Previous reference</strong>: -</li>
							<li><strong>Jump to chapter</strong>: type a number</li>
						</ul>
						<p>
							Versions with a * are indexed with Strong's numbers.
						</p>
					</div>
				</div>

				<h3>Legacy versions</h3>
				<p><a href="https://javascripture.org">javascripture.org</a></p>

				<h3>Texts</h3>
				<p>Original:<br /><a href="https://github.com/openscriptures/morphhb">Hebrew</a> | <a href="https://github.com/morphgnt/tischendorf">Greek</a></p>
				<p><a href="https://github.com/javascripture/javascripture/blob/gh-pages/data/literalConsistent.js">Literal consistent</a> | <a onClick={ () => exportFile( 'LC' ) }>export</a></p>
				<p><a href="https://github.com/syncbible/syncbible/blob/trunk/bibles/NMV_strongs.js">NMV_strongs</a> | <a onClick={ () => exportFile( 'NMV_strongs') }>export</a></p>
				<p>ESV: The Holy Bible, English Standard Version ©2011 Crossway Bibles, a division of Good News Publishers. All rights reserved.</p>
				<p><a href="https://www.dropbox.com/s/7e05iklpkrtn46n/Genesis%20-%20Jeremiah.pdf?dl=0">Mark's Hebrew Literal</a>.<br/> <a href="https://www.dropbox.com/s/lrhzis4d9532gf4/Introduction.pdf?dl=0">Please read the introduction</a>.</p>
				<p><br />Version: { typeof( javascripture.sw ) !== 'undefined' ? javascripture.sw : null }</p>
				<p><a href="#" onClick={ clear }>Clear settings and start over</a></p>
				<p>Built in Firefox.<br />Tested in Chrome.</p>
			</div>
		</div>
	);
};

export default React.memo( HelpTray );
