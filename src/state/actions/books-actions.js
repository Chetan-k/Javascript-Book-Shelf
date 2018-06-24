// Internal Dependencies
import { fetchBooksAction } from './action-creator';
import { firebaseRef } from '../../config/firebase_config';

// Local variables
const Books = firebaseRef.child('books');

let allBooks = [];
let totalBooks = 0;

// Action Definitions
export const fetchBooks = () => {
  allBooks = [];

  return (dispatch) => {
    Books.on('value', (snapshot) => {
      totalBooks = Object.keys(snapshot.val()).length;
    });

    Books.orderByChild('bookName').on('child_added', (snapshot) => {
      allBooks.push(snapshot.val());
      if (allBooks.length === totalBooks) {
        dispatch(fetchBooksAction(allBooks));
      }
    });
  };
};

export default {
  fetchBooks,
};
