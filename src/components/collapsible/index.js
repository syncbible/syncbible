// External dependencies
import classnames from 'classnames';
import React from 'react';
import { motion } from "framer-motion"

// Internal dependencies
import styles from './styles.scss';
import WordBlockHeader from '../word-block-header';

const Collapsible = ( { children, className, header, onToggle, textToCopy, title, onRemove, onMouseOver, onMouseOut, open } ) => {
	const variants = {
		open: {
			height: 'auto'
		},
		closed: {
			height: "0",
			transition: {
				duration: 0
			}

		},
	};

	return (
		<div className={ styles.collapsible }>
			<div
				className={ classnames( styles.header, open ? styles.open : styles.closed ) }
				onClick={ () => {
					onToggle()
				} }
				title={ title }
				onMouseOver={ () => onMouseOver && onMouseOver() }
				onMouseOut={ () => onMouseOut && onMouseOut() }
			>
				<WordBlockHeader
					className={ className }
					textToCopy={ textToCopy }
					onRemove={ onRemove }
				>
					{ header }
				</WordBlockHeader>
			</div>
			<motion.div
				initial="closed"
				animate={ open ? "open" : "closed" }
				variants={ variants }
				style={{ overflow: 'hidden' }}
			>
				<div className={ classnames( styles.content ) }>
					{ children }
				</div>
			</motion.div>
		</div>
	)
};

export default React.memo( Collapsible );
