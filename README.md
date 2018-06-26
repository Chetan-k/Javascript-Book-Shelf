# Javascript Book Shelf

JS Book Shelf is a web based application used to track Javascript books and topics one wants to read from. It provides a beautiful interface to upload a book's URL (where ever you like to read from), topics you want to read, which you already read and want to track them for future references and take some related notes.

### Installation

JBS requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.
Download or clone the repo and then follow the instructions:

```sh
$ cd js-book-shelf
$ npm install
$ npm start
```

### Tech Used

JBS is basically built on [create-react-app](https://github.com/facebook/create-react-app) boilerplate, [ReactJS](https://reactjs.org/), [REDUX](https://redux.js.org/), and other full stack tools listed below:

* [ReactJS] - For Frontend build.
* [REDUX] - For application's global state management.
* [Material UI] - For beautiful frontend UI components.
* [Firebase] - Firebase "Database" for application's real time data storage and Firebase "Storage" for binary data (images).
* [Redux-Dev-Tools] - For visualising and ease use of applicaiton's state.
* [PropTypes] - For component prop and object type checking.

### Usage after installing the application:
* Click on any book card (don't click on book image which takes you to book URL to read) and an edit dialog opens where you can edit a book (or) Add a new book by clicking "ADD A BOOK" button with required information. (few images are included in the "test" folder to upload and go through the app).

### Functionalites

* [Add Book] - Add a new book to read track your progress, giving required information like book name, author name, topics to read or topics which you already read and want to track them, notes and a link from where you want to read it.
* [Update Book] - Update a book while you progress your reading. You can click on any book card on your main page to open an edit dialog. (Do not click on the book image, which takes you to the URL you provided to read).
* [Search Book] - Search any book by its name using the search bar on top right corner.
* [Add a Topic to list in update dialog] - type any key word or topic which you want to read in future or you already did by typing the word and "Press Enter".
* [Adding same topic] - If you add pre existing topic to the same list, respective textfeild will not take and throws and error.
* [Delete Book] - Delete a book from edit dialog when you are done reading or tracking it. (Note: if you want to add a new book after you delete any book gives UI errors...couldn't able to address it for now.)
* [Upload Image & Progress Bar] - upload a book image while adding a new book and see its upload progress in the progress bar.

