// External Dependencies
import firebase from 'firebase';

// Firebase keys
const config = {
  apiKey: 'AIzaSyA0nkXZzNBxu6nMhrazW7zwzllnBLTEMuA',
  authDomain: 'js-book-shelf.firebaseapp.com',
  databaseURL: 'https://js-book-shelf.firebaseio.com',
};

firebase.initializeApp(config);

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseRef = firebase.database().ref();
export default firebase;
