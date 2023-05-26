const copyToClipboardHelper = ( textToCopy ) => {
	let finalText = textToCopy;

	if ( textToCopy.current ) {
		const parentElement = textToCopy.current.parentElement;
		const savedDisplay = parentElement.style.display;
		parentElement.style.display = 'block';
		finalText = textToCopy.current.innerText.replace(
			/([0-9]+)/g,
			'\r\n$1. '
		);
		//finalText = textToCopy.current.innerText.replace(/([0-9])(?:\r\n|\r|\n)/g, '$1. ' );
		parentElement.style.display = savedDisplay;
	}

	const textarea = document.createElement( 'textarea' );
	textarea.value = finalText;
	document.body.appendChild( textarea );
	textarea.select();
	document.execCommand( 'copy' );
	textarea.remove();
};

export default copyToClipboardHelper;
