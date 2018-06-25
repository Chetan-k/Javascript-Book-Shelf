// External Dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Helps in mapping state and actions to component props.
export default(mapStateToProps, actionCreators, component) =>
  connect(mapStateToProps, dispatch =>
    bindActionCreators(actionCreators, dispatch))(component);
