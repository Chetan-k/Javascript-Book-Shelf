// External Dependencies
import firebase from 'firebase';

// Internal Dependencies
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
	return (dispatch) => {
		firebaseRef.child('books').child(bookObj.id).set(bookObj);
	};
};

export const deleteFromFirebase = (key) => {
	return (dispatch) => {
		firebaseRef.child('books').child(key).remove();
	}
}

export const deleteBook = () => 
(dispatch, getState) => {
	const {
		id,
		imageName,
	} = getState().booksDialog.form;

	// Create a storage reference from our storage service
	var storageRef = firebase.storage().ref();

	// Create a reference to the file to delete
	var imageRef = storageRef.child(`BooksImages/${imageName}`);

	// Delete the file
	imageRef.delete().then(function() {
	// File deleted successfully
		console.log('Image deleted successfully from firebase storage');
	}).catch(function(error) {
		console.log(error);
	});

	dispatch(dialogClose());
	dispatch(deleteFromFirebase(id));
	dispatch(fetchBooks());
};

export const updateBook = (updatedBook) => {
	return (dispatch) => {
		firebaseRef.child('books').child(updatedBook.id).update(updatedBook);
	};
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

	if (id) { // update Book
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

		dispatch(dialogClose());
		dispatch(updateBook(updatedBook));
		dispatch(fetchBooks());

	} else { // add Book
		const newBookId = !id && books.length;
		const img = `${books.length}.png`;
		const book = {
			authorName,
			bookName,
			id: newBookId,
			imageName: img,
			link,
			notes,
			topics,
			topicsCovered,
		};
		dispatch(dialogClose());
		dispatch(addBook(book));
		dispatch(fetchBooks());
		const newTopics = [];
		const emptyBook = {
			authorName,
			bookName,
			id,
			imageName,
			link,
			notes,
			topics: newTopics,
			topicsCovered: newTopics,
		};
		dispatch(updateBook(emptyBook));
	}
};

