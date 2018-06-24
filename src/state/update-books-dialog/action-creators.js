import {
	ADD_BOOK_DIALOG_CLOSE,
	ADD_BOOK_DIALOG_FORM,
	ADD_BOOK_DIALOG_OPEN,
	UPDATE_BOOK_DIALOG_FORM,
} from './action-types';

export const addBookDialogClose = () => ({
	type: ADD_BOOK_DIALOG_CLOSE,
});

export const addBookDialogForm = addNinjaObject => ({
	type: ADD_BOOK_DIALOG_FORM,
	payload: addNinjaObject,
});

export const addBookDialogOpen = () => ({
	type: ADD_BOOK_DIALOG_OPEN,
});

export const bookFormUpdate = form => ({
	type: UPDATE_BOOK_DIALOG_FORM,
	payload: form,
});
