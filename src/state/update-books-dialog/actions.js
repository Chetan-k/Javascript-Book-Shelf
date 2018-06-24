import {
	addBookDialogClose,
	addBookDialogForm,
	addBookDialogOpen,
	bookFormUpdate,
} from './action-creators';

import { firebaseRef } from '../../config/firebase_config';

import { fetchBooks } from '../actions/books-actions';

export const dialogClose = () =>
dispatch =>
	dispatch(addBookDialogClose());

export const dialogForm = obj =>
dispatch =>
	dispatch(addBookDialogForm(obj));

export const dialogOpen = () =>
dispatch =>
	dispatch(addBookDialogOpen());

export const updateBookForm = form =>
dispatch =>
	dispatch(bookFormUpdate(form));

export const addBook = (bookObj) => {
	firebaseRef.child('books').child(bookObj.id).set(bookObj);
};

export const updateBook = (updatedBook) => {
	firebaseRef.child('books').child(updatedBook.id).update(updatedBook);
};

export const addOrUpdateBook = () =>
(dispatch, getState) => {
	const {
		books,
		booksDialog,
	} = getState();

	const {
		authorName,
		bookName,
		id,
		imageName,
		link,
		notes,
		topics,
		topicsCovered,
	} = booksDialog.form;

	if (id > -1) { // update Book
		const updatedBook = {
			authorName,
			bookName,
			id,
			imageName,
			link,
			notes,
			topics,
			topicsCovered,
		};

		dispatch(updateBook(updatedBook))
			.then(dialogClose())
			.then(fetchBooks());


		// dispatch(dialogClose());
		// dispatch(updateBook(updatedBook)).then(fetchBooks());
		// dispatch(dialogClose(), updateBook(updatedBook), fetchBooks());
		// Promise.all([
		// 	updateBook(updatedBook),
		// 	fetchBooks(),
		// ]);
		// updateBook(updatedBook);
		// fetchBooks();

	} else { // add Book
		const newBookId = !id && books.length;
		const book = {
			authorName,
			bookName,
			id: newBookId,
			imageName,
			link,
			notes,
			topics,
			topicsCovered,
		};
		dispatch(dialogClose())
			.then(addBook(book))
			.then(fetchBooks());
	}
};

