import {
	ADD_BOOK_DIALOG_CLOSE,
	ADD_BOOK_DIALOG_FORM,
	ADD_BOOK_DIALOG_OPEN,
	UPDATE_BOOK_DIALOG_FORM,
} from './action-types';

export function isOpen(state = false, action) {
	switch (action.type) {
		case ADD_BOOK_DIALOG_OPEN:
			return true;
		case ADD_BOOK_DIALOG_CLOSE:
			return false;
		default:
	}

	return state;
}

export function form(state = {}, action) {
	switch (action.type) {
		case ADD_BOOK_DIALOG_FORM:
			return action.payload;
		case UPDATE_BOOK_DIALOG_FORM:
			return {
				...state,
				...action.payload,
			};
		default:
	}

	return state;
}

