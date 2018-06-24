import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component definition
class BookCard extends Component {

	static propTypes = {
    authorName: PropTypes.string.isRequired,
    bookName: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
	}

  render() {
		const {
      authorName,
      bookName,
      notes,
    } = this.props;
		return (
			<div>
				{authorName}
			</div>
		);
  }
}

export default BookCard;
