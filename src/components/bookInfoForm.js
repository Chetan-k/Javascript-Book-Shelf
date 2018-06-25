// External Dependencies
import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import Chip from 'material-ui-next/Chip';
import { DialogContent } from 'material-ui-next/Dialog';
import TextField from 'material-ui-next/TextField';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import {
  red300,
  green300,
} from 'material-ui/styles/colors';

// Internal Dependencies
import connectComponent from '../connect-component';
import { updateBookForm } from '../state/update-books-dialog/actions';
import { firestoreImageURL } from '../config/firebase_config';

// Local Variables
const propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  authorName: PropTypes.string,
  bookName: PropTypes.string,
  imageName: PropTypes.string,
  link: PropTypes.string,
  notes: PropTypes.string,
  topics: PropTypes.arrayOf(PropTypes.string),
  topicsCovered: PropTypes.arrayOf(PropTypes.string),
  updateForm: PropTypes.func,
};

// Styling variables
const defaultProps = {
  books: [],
  authorName: '',
  bookName: '',
  imageName: '',
  link: '',
  notes: '',
  topics: [],
  topicsCovered: [],
  updateForm: null,
};

const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: 24,
};

const textFieldStyles = {
  marginRight: 24,
};

const chipStyles = {
  margin: 4,
};

const chipTopicStyles = {
  backgroundColor: red300,
  margin: 3,
}

const coveredChipTopicStyles = {
  backgroundColor: green300,
  margin: 3,
}

const bookImageStyles = {
  marginLeft: '27%',
  padding: '10px',
  width: '160px',
  height: '225px',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderColor: green300,
};

const uploadStyles = {
  alignItems: 'center',
  justifyContent: 'center',
}

// Component definition
class BookInfoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topicsToRead: '',
      topicsRead: '',
      percentage: '',
      topicsError: false,
      topicsCoveredError: false,
    };
  }

  render() {

    const {
      books,
      authorName,
      bookName,
      imageName,
      link,
      notes,
      topics,
      topicsCovered,
      updateForm,
    } = this.props;

    // adds/error on key press enter for adding topics
    const handleKeyStroke = (e) => {
      if(e.keyCode === 13) {
       if(e.target.id === "topicsToRead") {
        const newData = this.state.topicsToRead;
        if(!topics.includes(newData)) {
          this.setState({
            topicsError: false,
          });
          topics.unshift(this.state.topicsToRead);
          updateForm({topics});
        } else {
          this.setState({
            topicsError: true,
          });
        }
  
        this.setState({
          topicsToRead: "",
        });
       }
       if (e.target.id === "topicsRead") {
        const newData = this.state.topicsRead;
        if(!topicsCovered.includes(newData)) {
          this.setState({
            topicsCoveredError: false,
          });
          topicsCovered.unshift(this.state.topicsRead);
          updateForm({topicsCovered});

        } else {
          this.setState({
            topicsCoveredError: true,
          });
        }
       }
       this.setState({
        topicsRead: "",
      });
      }
    };

    // on textfeild change
    const handleChange = (e) => {
      if(e.target.id === "topicsToRead") {
        this.setState({
          topicsToRead: e.target.value
        });
      }
      if(e.target.id === "topicsRead") {
        this.setState({
          topicsRead: e.target.value
        });
      }
    };

    // handles delete book functionality from the firebase.
    const handleDelete = data => {
      console.log(data);
      const topicIndex = topics.indexOf(data);
      topics.splice(topicIndex, 1);
      updateForm({topics});
    };

    const handleTopicsCoveredDelete = data => {
      console.log(data);
      const topicIndex = topicsCovered.indexOf(data);
      topicsCovered.splice(topicIndex, 1);
      updateForm({topicsCovered});
    }

    // saves image to firebase storage
    const handleImageSave = (e) => {
      // get the file
      const file = e.target.files[0];

      // create a storage ref
      const storageRef = firebase.storage().ref('BooksImages/' + `${books.length}.png`);
      
      // upload file
      let task = storageRef.put(file);

      // update progress
      task.on('state_changed',
        function progress(snapshot) {
          let per = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
            percentage: per,
          });
        }.bind(this),
        // any possible errors
        function error(err) {
          console.log(err);
        },

        function complete() {
          console.log("Firebase image upload finished");
        }.bind(this)
      );
    };

    // render the topics to read chips
    const renderTopics = topics.map(topic => {
      return (
        <Chip
          onDelete={() => handleDelete(topic)}
          key={topic}
          label={topic}
          style={chipTopicStyles}
        />
      );
    });

    const renderCoveredTopics = topicsCovered.map(topic => {
      return (
        <Chip
          onDelete={() => handleTopicsCoveredDelete(topic)}
          key={topic}
          label={topic}
          style={coveredChipTopicStyles}
        />
      );
    });

    const renderImage = (
      <img alt="Image" src={firestoreImageURL(imageName)} style={bookImageStyles} />
    );

    // UI for uploading a new image in add new book
    const renderUpload = (
      <div style={uploadStyles}>
        <FlatButton
          containerElement="label"
          label="Choose an Image: "
          labelPosition="before"
          secondary
        >
          <input
            onChange={e => handleImageSave(e)}
            id="upload"
            type="file"
          />
        </FlatButton>
        <LinearProgress
          mode="determinate"
          value={this.state.percentage}
        />
      </div>
    );

    const imageElement = imageName ? renderImage : renderUpload;

    const renderForm = (
      <DialogContent>
        <div>
          {imageElement}
        </div>
        <div style={rowStyles}>
          <TextField
            required
            id="authorName"
            label="Author Name"
            placeholder="Kyle Simpson"
            fullWidth
            style={textFieldStyles}
            value={authorName}
            onChange={e => updateForm({ authorName: e.target.value })}
          />
          <TextField
            required
            id="bookName"
            label="Book Name"
            placeholder="You Don't Know JS!"
            fullWidth
            value={bookName}
            onChange={e => updateForm({ bookName: e.target.value })}
          />
        </div>
        <div style={rowStyles}>
          <TextField
            error={this.state.topicsError}
            required
            id="topicsToRead"
            label="Topics to read"
            placeholder="Enter topic to read and press enter"
            fullWidth
            style={textFieldStyles}
            value={this.state.topicsToRead}
            onChange={e => handleChange(e)}
            onKeyUp={(e) => handleKeyStroke(e)}
          />
        </div>
        <div style={chipStyles}>
          {renderTopics}
        </div>
        <div style={rowStyles}>
          <TextField
            error={this.state.topicsCoveredError}
            required
            id="topicsRead"
            label="Topics Read"
            placeholder="Enter finished topic and press enter"
            fullWidth
            style={textFieldStyles}
            value={this.state.topicsRead}
            onChange={e => handleChange(e)}
            onKeyUp={(e) => handleKeyStroke(e)}
          />
        </div>
        <div style={chipStyles}>
          {renderCoveredTopics}
        </div>
        <div style={rowStyles}>
          <TextField
            required
            id="notes"
            label="Notes"
            placeholder="Write something imp about the book"
            fullWidth
            style={textFieldStyles}
            value={notes}
            onChange={e => updateForm({ notes: e.target.value })}
          />
        </div>
        <div style={rowStyles}>
          <TextField
            required
            id="link"
            label="Link"
            placeholder="Provide link to the book"
            fullWidth
            style={textFieldStyles}
            value={link}
            onChange={e => updateForm({ link: e.target.value })}
          />
        </div>
      </DialogContent>
    );

    return (
      <div>
        {renderForm}
      </div>
    );
  }
}

BookInfoForm.propTypes = propTypes;
BookInfoForm.defaultProps = defaultProps;

export default connectComponent((state) => {
  const { books, booksDialog } = state;
  const {
    authorName,
    bookName,
    imageName,
    link,
    notes,
    topics,
    topicsCovered,
  } = booksDialog.form;
  return {
    books,
    authorName,
    bookName,
    imageName,
    link,
    notes,
    topics,
    topicsCovered,
  };
}, {
  updateForm: updateBookForm,
}, BookInfoForm);
