import { getFamily } from '../lib/word';
import tinycolor from "tinycolor2";

function getStrongsColor( lemma ) {
		var strongsInt = parseInt( lemma );
		if ( isNaN ( strongsInt ) ) {
			var hue = 0,
				staturation = '0%',
				lightness = '50%'
		} else {
			var theSizeOfAColorSegment = 360 / 8000,
				hue = Math.floor( strongsInt * theSizeOfAColorSegment ),
				staturation = ( strongsInt % 80 + 10 ) + '%',
				lightness = ( strongsInt % 10 * 4 ) + 30 + '%';
		}
		return 'hsl(' + hue + ',' + staturation + ',' + lightness + ')';
};

function getStrongsColorWithSettings( strongsNumber, highlightWordsWith, strongsObjectWithFamilies ) {
	var hightlightFamilies = highlightWordsWith === 'family',
		classInt;

	if ( hightlightFamilies ) {
		classInt = parseFloat( getFamily( strongsNumber, strongsObjectWithFamilies ).substring( 1, strongsNumber.length ), 10 );
	} else {
		classInt = parseInt( strongsNumber.substring( 1, strongsNumber.length ), 10 );
	}

	return getStrongsColor( classInt );
};

function getClassNameWithSettings( strongsNumber, highlightWordsWith, strongsObjectWithFamilies ) {
	if ( highlightWordsWith === 'family' ) {
		return getFamily( strongsNumber, strongsObjectWithFamilies ) + '-family';
	} else {
		return strongsNumber;
	}
};

function getHighlight( strongsNumber, highlightWordsWith, strongsObjectWithFamilies ) {
	var newColor = getStrongsColorWithSettings( strongsNumber, highlightWordsWith, strongsObjectWithFamilies );
	var className = getClassNameWithSettings( strongsNumber, highlightWordsWith, strongsObjectWithFamilies  );
	let color = '#000';
	var aTinyColor = tinycolor( newColor );
	if ( aTinyColor.isDark() ) {
		color = '#fff';
	}

	return '.' + className + ' {color:' + color + ' !important;background:' + newColor + ' !important;}' + '.' + className + ' svg{fill:' + color + '!important;}';
};

function getHighlightBorder( strongsNumber, highlightWordsWith, strongsObjectWithFamilies ) {
	var newColor = getStrongsColorWithSettings( strongsNumber, highlightWordsWith, strongsObjectWithFamilies );
	var className = getClassNameWithSettings( strongsNumber, highlightWordsWith, strongsObjectWithFamilies );
	return '.' + className + ' {outline: 3px solid ' + newColor + ' !important;}';
};

export { getHighlight, getHighlightBorder };
