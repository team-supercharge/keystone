import {
	OPEN_MODAL,
} from './constants';

export function selectItem (itemId) {
	return {
		type: SELECT_ITEM,
		id: itemId,
	};
}

