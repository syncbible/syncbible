export const getFamily = ( strongsNumber, strongsObjectWithFamilies ) => {
	if ( ! strongsObjectWithFamilies ) {
		return null;
	}

	if ( strongsObjectWithFamilies[ strongsNumber ] && strongsObjectWithFamilies[ strongsNumber ].family ) {
		return strongsObjectWithFamilies[ strongsNumber ].family;
	} else {
		return strongsNumber;
	}
};
