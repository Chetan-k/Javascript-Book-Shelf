import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui-next/Button';
import PlusboxIcon from 'mdi-material-ui/PlusBox';

// Internal Dependencies
import { fetchBooks } from '../state/actions/books-actions';
import styles from '../styles/styles';
import connectComponent from '../connect-component';
import { dialogForm, dialogOpen } from '../state/update-books-dialog/actions';
import DialogAddBook from './bookDialog';

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

const bookStyles = styles.badgeList;

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

	addBookClicked() {
		console.log("clicked add book button");
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
					<div style={styles.coderList.searchSection}>
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
							hintStyle={styles.coderList.hintStyle}
							hintText={<div>&nbsp;🔎 &nbsp;&nbsp;&nbsp;Search by book name</div>}
							inputStyle={styles.coderList.inputStyle}
							onChange={event => this.updateSearch(event)}
							style={styles.coderList.searchTextBox}
						/>
					</div>
					<br />
					<div style={bookStyles.mainSection}>
						{
							Object.keys(filteredBooks).map((key, index) => {
								const image = `${window.location.pathname}images/books/${filteredBooks[key].id}.png`;

								return (
									<Paper
										onClick = {(event) => this.handleClick(event, filteredBooks[key])}
										key={key}
										rounded={false}
										style={bookStyles.container}
										zDepth={5}
									>
										<div>
											<a href={filteredBooks[key].link}><img alt={image} src={image} style={bookStyles.badgeImage} /></a>
											<div style={bookStyles.badgeCardText}>
												<div><span style={bookStyles.badgeSubtitleText}>Author :</span> {filteredBooks[key].authorName}</div>
												{/* {books[key].notes} */}
											</div>
											<div key={index} style={bookStyles.badgeInfoSection}>
												<div style={bookStyles.badgeTitleText}>{filteredBooks[key].bookName}</div>
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
													<div style={bookStyles.badgeCardText}>
														{/* <div><span style={bookStyles.badgeSubtitleText}>Description :</span> {books[key].notes}</div> */}
														<div style={bookStyles.badgeSubtitleText}>Description :</div>
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
export default connectComponent(state => ({
  books: state.books,
}), {
	fetchBooks,
	updateDialogForm: dialogForm,
	openDialog: dialogOpen,
}, Books);
