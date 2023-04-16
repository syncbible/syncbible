const userInterface = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_TO_LIST':
			const dataForId = Object.assign({}, action.item.data);
			delete dataForId.clickedWord;
			delete dataForId.morphology;
			const id = JSON.stringify(dataForId);
			state[id] = true;
			return { ...state };

		case 'REMOVE_FROM_LIST':
			delete state[action.item.id];
			return { ...state };

		case 'TOGGLE_LIST_ITEM_VISIBLE':
			state[action.item.id] = !state[action.item.id];
			return { ...state };

		default:
			return state;
	}
};

export default userInterface;
