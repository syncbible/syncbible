// External
import React from 'react';
import { useDispatch } from 'react-redux';

// Internal
import { removeColumn } from '../../actions';
import RemoveSvg from '../svg/remove';

const RemoveColumnButton = ( { index } ) => {
	const dispatch = useDispatch();

	return (
		<button
			type="button"
			onClick={ () => dispatch( removeColumn( index ) ) }
		>
			<RemoveSvg />
		</button>
	);
};

export default React.memo( RemoveColumnButton );
