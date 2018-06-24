// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui-next/Avatar';
import Chip from 'material-ui-next/Chip';
import DatePicker from 'material-ui/DatePicker';
import { DialogContent } from 'material-ui-next/Dialog';
import Input from 'material-ui-next/Input';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui-next/TextField';
import {
  red300,
  red400,
  green300,
} from 'material-ui/styles/colors';

// Internal Dependencies
import connectComponent from '../connect-component';
import { updateBookForm } from '../state/update-books-dialog/actions';

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

const menuStyles = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 300,
    },
  },
};

const rowStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: 24,
};

const rowStyles3 = {
  display: 'flex',
  flexDirection: 'column',
};

const textFieldStyles = {
  marginRight: 24,
};

const datePickerStyles = {
  width: '100%',
  paddingTop: 10,
};

const chipStyles = {
  margin: 4,
};

const chipTopicStyles = {
  backgroundColor: green300,
  margin: 3,
}

const coveredChipTopicStyles = {
  backgroundColor: red300,
  margin: 3,
}

const topicsLabelColor = {
  labelColor: green300,
}

const chipDivStyles = {
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: 16,
  display: 'flex',
  paddingTop: 24,
};

const selectedStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  marginRight: 2,
};

const subheaderStyles = {
  paddingLeft: 0,
};

const listItemStyles = {
  paddingTop: 10,
};

const avatarStyles = {
  width: 45,
  height: 45,
  paddingLeft: 0,
};

const bookImageStyles = {
  marginLeft: '23%',
  padding: '10px',
  width: '160px',
  height: '225px',
};

const chipDivStyles1 = {
  margin: '15px',
  overflow: 'overlay',
  maxHeight: '160px',
  maxWidth: '500px',
  // textAlign: 'center',
}

class BookInfoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topicsToRead: '',
      topicsRead: '',
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

    const handleKeyStroke = (e) => {
      if(e.keyCode === 13) {
       if(e.target.id === "topicsToRead") {
        topics.unshift(this.state.topicsToRead);
        updateForm({topics});
        this.setState({
          topicsToRead: "",
        });
       }
       if (e.target.id === "topicsRead") {
        topicsCovered.unshift(this.state.topicsRead);
        updateForm(topicsCovered);
       }
       this.setState({
        topicsRead: "",
      });
      }
    };

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
    }

    const renderTopics = topics.map(topic => {
      return (
        <Chip
          key={topic}
          label={topic}
          style={chipTopicStyles}
        />
      );
    });

    const renderCoveredTopics = topicsCovered.map(topic => {
      return (
        <Chip
          key={topic}
          label={topic}
          style={coveredChipTopicStyles}
        />
      );
    });

    const image = `${window.location.pathname}images/books/${imageName}`;

    const renderForm = (
      <DialogContent>
        <div>
          <img alt={image} src={image} style={bookImageStyles} />
        </div>
        <div style={rowStyles}>
          <TextField
            required
            id={authorName}
            label="Author Name"
            placeholder="Kyle Simpson"
            fullWidth
            style={textFieldStyles}
            value={authorName}
            onChange={e => updateForm({ authorName: e.target.value })}
          />
          <TextField
            required
            id={bookName}
            label="Book Name"
            placeholder="You Dont't Know JS"
            fullWidth
            value={bookName}
            onChange={e => updateForm({ bookName: e.target.value })}
          />
        </div>
        <div style={rowStyles}>
          <TextField
            required
            id="topicsToRead"
            label="Topics to read"
            placeholder="Enter topics to read..."
            fullWidth
            style={textFieldStyles}
            value={this.state.topics}
            onChange={e => handleChange(e)}
            onKeyUp={(e) => handleKeyStroke(e)}
          />
        </div>
        <div style={chipStyles}>
          {renderTopics}
        </div>
        <div style={rowStyles}>
          <TextField
            required
            id="topicsRead"
            label="Topics Read"
            placeholder="Enter finished topics..."
            fullWidth
            style={textFieldStyles}
            value={this.state.topicsToCover}
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
            id={notes}
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
            id={link}
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
