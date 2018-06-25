// External Dependencies
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Internal Dependencies
import './App.css';
import Books from './components/books';
import initializeStore from './state';

const store = initializeStore();

// Render redux dev tools if on development
const reduxDevTools = process.env.NODE_ENV === 'development'
  ? React.createElement(require('./redux-dev-tools').default)
  : null;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">JS Book Shelf</h1>
            </header>
            <div>
              <Books
              />
            </div>
            { reduxDevTools }
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
