// External Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui-next/Button';
import PlusboxIcon from 'mdi-material-ui/PlusBox';
import {
	grey200,
	teal300,
	red800,
	grey700,
  } from 'material-ui/styles/colors';

// Internal Dependencies
import { fetchBooks } from '../state/actions/books-actions';
import connectComponent from '../connect-component';
import { dialogForm, dialogOpen } from '../state/update-books-dialog/actions';
import DialogAddBook from './bookDialog';
import { firestoreImageURL } from '../config/firebase_config';

// Local variables
const propTypes = {
	books: PropTypes.arrayOf(PropTypes.object),
	fetchBooks: PropTypes.func,
	updateDialogForm: PropTypes.func,
	openDialog: PropTypes.func,
};

const defaultProps = {
	books: [],
	fetchBooks: null,
	updateDialogForm: null,
	openDialog: null,
};

// Styling variables
const bookStyles = {
	mainSection: {
		marginTop: '1%',
		marginLeft: '20px',
		display: 'table',
		width: '85%',
	},
	container: {
		width: '250px',
		height: '400px',
		left: '13%',
		position: 'relative',
		margin: '20px',
		marginBottom: '45px',
		display: 'flex',
		float: 'left',
		background: grey200,
		borderRadius: '0',
	},
	bookImage: {
		padding: '10px',
		width: '180px',
		height: '200px',
	},
	bookInfoSection: {
		position: 'relative',
		marginBottom: '0',
		width: '250px',
	},
	bookTitleText: {
		fontSize: '18pt',
		fontWeight: '300',
		lineHeight: '25pt',
		color: 'white',
		textAlign: 'center',
		padding: '2px',
		background: teal300,
		textShadow: '1px 1px 1px grey',
	},
	bookSubtitleText: {
		color: red800,
		fontSize: '10pt',
		float: 'left',
		paddingRight: '2px',
		fontWeight: '300',
	},
	bookCardText: {
		color: grey700,
		fontSize: '10pt',
		padding: '0px 10px',
		paddingBottom: '5px',
		marginLeft: '3px',
		wordWrap: 'normal',
		fontWeight: '250',
	},
	infoDiv: {
		background: 'white',
		height: '150px',
	},
	infoInnerDiv: {
		padding: '10px',
		width: '90%',
		height: '75px',
		overflow: 'scroll',
	},
	categoryChip: {
		textAlign: 'center',
		float: 'left',
		background: '#FF5252',
		color: 'white',
		padding: '1px',
		margin: '1px',
		display: 'inline',
		fontWeight: '250',
		fontSize: '5pt',
	},
	labelColor: '#FFEBEE',
	}

const bookList = {
	searchSection: {
		position: 'fixed',
		width: '100%',
		padding: '5px',
	},
	searchIconSize: '12px',
	searchTextBox: {
		float: 'right',
		color: 'white',
		paddingRight: '4px',
	},
	hintStyle: {
		color: 'grey',
		fontWeight: '100',
	},
	inputStyle: {
		color: 'white',
	},
}

const addStyles = {
  paddingLeft: 10,
};

const buttonStyles = {
	zIndex: 5,
	paddingLeft: 0,
	marginLeft: 0,
	color: '#FFEBEE',
};

const bookDivStyles = {
	float: 'left',
	paddingLeft: '20px',
}

// Component Definition
class Books extends Component {
	constructor() {
    super();
    this.state = {
      searchString: '',
    };
	}

	componentWillMount() {
		this.props.fetchBooks();
	}

	updateSearch(event) {
		this.setState({
      searchString: event.target.value.substr(0, 20).toLowerCase(),
    });
	}

	// click event on book card click.
	handleClick(e, book) {

		e.stopPropagation();
		const bookData = {
		authorName: book.authorName,
		bookName: book.bookName,
				id: book.id,
				imageName: book.imageName,
		link: book.link,
				notes: book.notes,
				topics: book.topics,
				topicsCovered: book.topicsCovered,
		};

		Promise.all([
			this.props.updateDialogForm(bookData),
			this.props.openDialog(),
    ]);
	}

  render() {
		const { books } = this.props;

		const filteredBooks = Object.keys(books).filter((key) => {
      const book = `${books[key].bookName}`;
      return book.toLowerCase().indexOf(this.state.searchString) !== -1;
    })
    .map(key => books[key],
    );

		if(this.props.books != null) {
			return (
				<div>
					<div style={bookList.searchSection}>
						<div style={bookDivStyles}>
							<Button
								onClick = {(event) => this.handleClick(event, {})}
								style={buttonStyles}
								variant="outlined"
								color="secondary"
							>
								<PlusboxIcon color="#FFEBEE" />
								<span style={addStyles}>Add a Book</span>
							</Button>
						</div>
						<TextField
							hintStyle={bookList.hintStyle}
							hintText={<div>&nbsp;🔎 &nbsp;&nbsp;&nbsp;Search by book name</div>}
							inputStyle={bookList.inputStyle}
							onChange={event => this.updateSearch(event)}
							style={bookList.searchTextBox}
						/>
					</div>
					<br />
					<div style={bookStyles.mainSection}>
						{
							Object.keys(filteredBooks).map((key, index) => {

								return (
									<Paper
										onClick = {(event) => this.handleClick(event, filteredBooks[key])}
										key={key}
										rounded={false}
										style={bookStyles.container}
										zDepth={5}
									>
										<div>
											<a href={filteredBooks[key].link}><img alt="Book Image" src={firestoreImageURL(filteredBooks[key].imageName)} style={bookStyles.bookImage} /></a>
											<div style={bookStyles.bookCardText}>
												<div><span style={bookStyles.bookSubtitleText}>Author :</span> {filteredBooks[key].authorName}</div>
											</div>
											<div key={index} style={bookStyles.bookInfoSection}>
												<div style={bookStyles.bookTitleText}>{filteredBooks[key].bookName}</div>
												<Divider />
												<div style={bookStyles.infoDiv}>
													<div style={bookStyles.infoInnerDiv}>
															{filteredBooks[key].topicsCovered.map((item, i) =>
																(
																	<Chip
																		key={i}
																		labelColor={bookStyles.labelColor}
																		style={bookStyles.categoryChip}
																	>
																		{item}
																	</Chip>
																))
															}
													</div>
													<div style={bookStyles.bookCardText}>
														<div style={bookStyles.bookSubtitleText}>Description :</div>
														{filteredBooks[key].notes}
													</div>
												</div>
											</div>
										</div>
									</Paper>
								);
							})
						}
					</div>
					<DialogAddBook />
				</div>
			);
		}
		return null;
  }
}

Books.propTypes = propTypes;
Books.defaultProps = defaultProps;
export default connectComponent(state => ({
  books: state.books,
}), {
	fetchBooks,
	updateDialogForm: dialogForm,
	openDialog: dialogOpen,
}, Books);
