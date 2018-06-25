// External Dependencies
import {
	applyMiddleware,
	combineReducers,
	compose,
	createStore,
} from 'redux';
import thunk from 'redux-thunk';

// Internal Dependencies
import books from './reducers/books-reducer';
import { isOpen, form } from './update-books-dialog/books-dialog-reducer';

const booksDialog = combineReducers({
  isOpen,
  form,
});

const reducers = {
	books,
	booksDialog,
};

// Create the root reducer
const reducer = combineReducers(reducers);

// Include redux dev tools in the store enhancer if on development
const initialStoreEnhancer = () => {
	const storeEnhancer = process.env.NODE_ENV === 'development'
		? compose(
				applyMiddleware(
					thunk,
				),
				require('../redux-dev-tools').default.instrument(),
			)
		: applyMiddleware(
			thunk,
		);

	return storeEnhancer;
};

const initializeStore = intialState =>
	createStore(reducer, intialState, initialStoreEnhancer());

export default initializeStore;
