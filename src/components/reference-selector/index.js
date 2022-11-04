/*global javascripture*/

// External
import React, { useState } from 'react';

// Internal
import BookControl from './book-control';

const ReferenceSelector = ( { onGoToReference, onChangeDisplayState } ) => {
	const [ active, setActive ] = useState( -1 );

	return bible.Data.books.map( ( bookArray, index ) => {
		const chapters = parseInt( bible.Data.verses[ index ].length );
		const isActive = ( active === index );
		return (
			<BookControl
				key={ index }
				index={ index }
				name={ bookArray[0] }
				chapters={ chapters }
				onSetActiveBook={ ( book ) => { setActive( book ); } }
				onGoToReference={ () => onGoToReference() }
				onChangeDisplayState={ () => onChangeDisplayState() }
				active={ isActive } />
		);
	} );
};

export default React.memo( ReferenceSelector );
