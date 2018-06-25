// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui-next/Button';
import Dialog, {
  DialogActions,
  DialogTitle,
} from 'material-ui-next/Dialog';

// Internal Dependencies
import connectComponent from '../connect-component';
import {
  dialogForm,
  dialogClose,
  deleteBook,
  addOrUpdateBook,
} from '../state/update-books-dialog/actions';
import BookInfoForm from './bookInfoForm';

const dialogTitleStyles = {
  paddingBotom: 0,
};

const mainDiv = {
  margin: 'auto',
  color: 'red',
  maxWidth: 500,
};

// Component Definition
class DialogAddBook extends Component {
  static propTypes = {
    id: PropTypes.number,
    isOpen: PropTypes.bool,
    onAddOrUpdateBook: PropTypes.func,
    onDeleteBook: PropTypes.func,
    updateDialogForm: PropTypes.func,
    closeDialog: PropTypes.func,
  }

  static defaultProps = {
    id: null,
    isOpen: false,
    onAddOrUpdateBook: null,
    onDeleteBook: null,
    updateDialogForm: null,
    closeDialog: null,
  };

  handleClose = (e) => {
    e.stopPropagation();
    Promise.all([
      this.props.closeDialog(),
      this.props.updateDialogForm({}),
    ]);
  }

  render() {
    const {
      id,
      isOpen,
      onAddOrUpdateBook,
      onDeleteBook,
    } = this.props;
    const dialogTitle = `${id ? 'Update' : 'Add'} Book`;
    return (
      <div style={mainDiv}>
        <Dialog
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle style={dialogTitleStyles} id="form-dialog-title">{dialogTitle}</DialogTitle>
          <BookInfoForm />
          <DialogActions>
            <Button onClick={() => onDeleteBook()} color="secondary">
              Delete Book
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={() => onAddOrUpdateBook()} color="secondary">
              {dialogTitle}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connectComponent((state) => {
  const {
    form,
    isOpen,
  } = state.booksDialog;
  const {
    id,
  } = form;
  return {
    id,
    isOpen,
  };
}, {
  onDeleteBook: deleteBook,
  onAddOrUpdateBook: addOrUpdateBook,
  updateDialogForm: dialogForm,
  closeDialog: dialogClose,
}, DialogAddBook);
