const copyToClipboardHelper = ( event, textToCopy ) => {
	let finalText = textToCopy;
	if ( textToCopy.current ) {
		const parentElement = textToCopy.current.parentElement;
		parentElement.style.display = 'block';
		finalText = textToCopy.current.innerText.replace(/([0-9])(?:\r\n|\r|\n)/g, '$1. ' );
		parentElement.style.display = 'none';
	}

	event.stopPropagation();
	const textarea = document.createElement( 'textarea' )
	textarea.value = finalText;
	document.body.appendChild( textarea );
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	event.target.focus();
};

export default copyToClipboardHelper;
