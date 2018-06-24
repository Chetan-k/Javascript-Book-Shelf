// Internal Dependencies
import {
	BOOKS_FETCH
} from './action-types';

export const fetchBooksAction = books => ({
  type: BOOKS_FETCH,
  payload: books,
});