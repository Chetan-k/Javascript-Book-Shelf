// Internal Dependencies
import { BOOKS_FETCH } from '../actions/action-types';

export default function (state = [], action) {
  switch (action.type) {
    case BOOKS_FETCH:
      return action.payload;
    default:
  }

  return state;
}
