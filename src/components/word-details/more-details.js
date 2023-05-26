// External dependencies
import map from 'lodash/map';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Internal dependencies
import KJVDef from './kjv-def';
import morphology from '../../lib/morphology';
import stripPointing from '../../lib/strip-pointing.js';
import { getFamily } from '../../lib/word';
import WordBlockLink from './word-block-link';

const MoreDetails = ( { morphologyProp, strongsNumber, version } ) => {
	const strongsDictionary = useSelector(
		( state ) => state.data.strongsDictionary
	);
	const strongsWithFamilies = useSelector(
		( state ) => state.data.strongsObjectWithFamilies
	);

	const getBranchesData = () => {
		return (
			strongsWithFamilies &&
			map(
				strongsWithFamilies,
				( strongsObjectData, strongsObjectNumber ) => {
					if (
						strongsObjectData.roots &&
						strongsObjectData.roots.indexOf( strongsNumber ) > -1
					) {
						return (
							<WordBlockLink
								key={ strongsObjectNumber }
								strongsNumber={ strongsObjectNumber }
								version={ version }
							/>
						);
					}
				}
			).filter( ( branches ) => branches )
		);
	};

	const getBranches = () => {
		const branchesData = getBranchesData();
		if ( branchesData && branchesData.length > 0 ) {
			return branchesData;
		}

		return 'None';
	};

	const getRoots = () => {
		if ( ! strongsWithFamilies || ! strongsWithFamilies[ strongsNumber ] ) {
			return;
		}

		const rootsData = strongsWithFamilies[ strongsNumber ].roots;
		if ( rootsData ) {
			return rootsData.map( ( rootNumber, index ) => {
				return (
					<WordBlockLink
						key={ index }
						strongsNumber={ rootNumber }
						version={ version }
					/>
				);
			} );
		}

		return 'None';
	};

	const getMorphology = () => {
		return (
			morphologyProp &&
			morphologyProp.split( ' ' ).map( ( morph, index ) => {
				return (
					( index !== 0 ? ' - ' : '' ) +
					morphology( morph, 'noLinks', strongsNumber )
				);
			} )
		);
	};

	const wordDetail = strongsDictionary && strongsDictionary[ strongsNumber ];
	const getKJVDefinitions = () => {
		return (
			wordDetail &&
			wordDetail.kjv_def &&
			wordDetail.kjv_def.split( ',' ).map( ( word, index ) => {
				const wordString = word.trim().replace( /\./g, '' );

				return (
					<span key={ index }>
						{ index === 0 ? '' : ', ' }
						<KJVDef
							word={ wordString }
							strongsNumber={ strongsNumber }
						/>
					</span>
				);
			} )
		);
	};

	return (
		<>
			{ strongsNumber } |{ ' ' }
			{ wordDetail && stripPointing( wordDetail.lemma ) }
			{ wordDetail && wordDetail.xlit ? ' | ' + wordDetail.xlit : null }
			{ wordDetail && wordDetail.translit
				? ' | ' + wordDetail.translit
				: null }
			{ wordDetail && wordDetail.pronounciation
				? ' | ' + wordDetail.pronounciation
				: null }
			<br />
			<div>
				<strong>Roots: </strong>
				{ getRoots() }
			</div>
			<div>
				<strong>Branches: </strong>
				{ getBranches() }
			</div>
			<div>
				<strong>Family: </strong>
				{ getFamily( strongsNumber, strongsWithFamilies ) }
			</div>
			<br />
			<div>
				<strong>Morphology</strong>
				<br />
				{ morphologyProp } - { morphologyProp && getMorphology() }
				<br />
				<br />
				<strong>KJV translations</strong>
				<br />
				{ getKJVDefinitions( strongsNumber ) }
				<br />
				<br />
				<strong>Strong's Derivation</strong>
				<br />
				{ wordDetail && wordDetail.derivation }
				<br />
			</div>
		</>
	);
};

export default React.memo( MoreDetails );
