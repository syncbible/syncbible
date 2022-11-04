// External dependencies
import React from 'react';

// Internal dependencies
import styles from './styles.scss';

const HelpTray = () => {

	const clear = () => {
		localStorage.clear();
		window.location.href="/";
	};

	const exportLC = () => {
		const element = document.createElement("a");
		const file = new Blob([ JSON.stringify( javascripture.data.LC, null, "\t" ) ], {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = "LC.json";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	}
	return (
		<div>
			<div id="helpPanel" className={ styles.helpPanel }>
				<div className="content">
					<div className="content-padding">
						<h2>Help</h2>
						<p><a href="/help">Get help here</a></p>
						<p>To find out about a word, click on it</p>
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
				<p><a href="https://github.com/morphgnt/tischendorf">Greek text: Tischendorf</a></p>
				<p><a href="https://github.com/openscriptures/morphhb">Hebrew text source</a></p>
				<p><a href="https://github.com/javascripture/javascripture/blob/gh-pages/data/literalConsistent.js">Literal: A work in progress</a>. <a onClick={ ()=>exportLC() }>export</a></p>
				<br />
				ESV: The Holy Bible, English Standard Version ©2011 Crossway Bibles, a division of Good News Publishers. All rights reserved.<br />
				<p><br />Version: { typeof( javascripture.sw ) !== 'undefined' ? javascripture.sw : null }</p>
				<p><a href="#" onClick={ clear }>Clear settings and start over</a></p>
				<p>Built in Firefox. Tested in Chrome.</p>
			</div>
		</div>
	);
};

export default React.memo( HelpTray );
