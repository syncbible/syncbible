const copyToClipboardHelper = ( event, textToCopy ) => {
	if ( textToCopy.current ) {
		textToCopy = textToCopy.current.innerText.replace(/([0-9])(?:\r\n|\r|\n)/g, '$1. ' );
	}

	event.stopPropagation();
	const textarea = document.createElement( 'textarea' )
	textarea.value = textToCopy;
	document.body.appendChild( textarea );
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	event.target.focus();
};

export default copyToClipboardHelper;
