// External Dependencies
import firebase from 'firebase';

// Firebase keys
const config = {
  apiKey: 'AIzaSyA0nkXZzNBxu6nMhrazW7zwzllnBLTEMuA',
  authDomain: 'js-book-shelf.firebaseapp.com',
  databaseURL: 'https://js-book-shelf.firebaseio.com',
  projectId: "js-book-shelf",
  storageBucket: "js-book-shelf.appspot.com",
  messagingSenderId: "659204508482"
};

firebase.initializeApp(config);

export const firebaseRef = firebase.database().ref();

// Provides link to the firevase storage for images
export const firestoreImageURL = (imageName) => {
  var url = `https://firebasestorage.googleapis.com/v0/b/js-book-shelf.appspot.com/o/BooksImages%2F${imageName}?alt=media&token=fccd0eaf-06a1-4d43-bd4e-2157307c8252`;
  return url;
};
export default firebase;
