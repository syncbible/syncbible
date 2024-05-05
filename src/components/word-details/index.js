// External dependencies
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import styles from './styles.scss';
import CombinedResults from './combined';
import WordBlock from './word-block';
import ListHeader from '../list-header';

const WordDetails = () => {
	const list = useSelector( ( state ) => state.list );
	const userInterface = useSelector( ( state ) => state.userInterface );
	const words = list.filter( ( { listType } ) => listType === 'word' );
	const [ focus, setFocus ] = useState( null );

	return words && words.length ? (
		<div className={ styles.wordDetails }>
			<ListHeader tray="word" />
			{ words.map( ( word, index ) => {
				return (
					<WordBlock
						word={ word }
						key={ index }
						highlight={
							! focus || ( focus && focus === word.data.lemma )
						}
						setFocus={ setFocus }
						data={ word.data }
						visible={ userInterface[ word.id ] }
						results={ word.results }
						loading={ word.loading }
						id={ word.id } // ID is needed when we call toggleListItemVisible
					/>
				);
			} ) }
			<CombinedResults type="word" />
		</div>
	) : (
		<div className={ styles.wordBlockHelp }>
			Select a word to show more details about it here.
		</div>
	);
};

export default React.memo( WordDetails );
