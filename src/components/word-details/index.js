// External dependencies
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import styles from './styles.scss';
import CombinedResults from './combined';
import WordBlock from './word-block';

const WordDetails = () => {
	const list = useSelector( state => state.list );
	const words = list.filter( ( { listType } ) => listType === 'word' );
	const [ focus, setFocus ] = useState( null );

	return words && words.length ? (
		<div className={ styles.wordDetails }>
			{ words.map( ( word, index ) => {
				return (
					<WordBlock
						key={ index }
						highlight={ ! focus || focus && focus === word.data.lemma }
						setFocus={ setFocus }
						data={ word.data }
						visible={ word.visible }
						results={ word.results }
						id={ word.id } // ID is needed when we call toggleListItemVisible
					/>
				);
			} ) }
			<CombinedResults type="word" />
		</div>
	) : <div className={ styles.wordBlockHelp }>Select a word to show more details about it here.</div>;

};

export default React.memo( WordDetails );
