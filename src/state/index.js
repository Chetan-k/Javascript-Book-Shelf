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

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(rootReducer, intialState, applyMiddleware(...middleware));

// export default store;

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
				// eslint-disable-next-line global-require
				require('../redux-dev-tools').default.instrument(),
			)
		: applyMiddleware(
			thunk,
		);

	return storeEnhancer;
};


// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const initializeStore = intialState =>
	createStore(reducer, intialState, initialStoreEnhancer());

export default initializeStore;
