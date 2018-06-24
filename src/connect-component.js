// External Dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default(mapStateToProps, actionCreators, component) =>
  connect(mapStateToProps, dispatch =>
    bindActionCreators(actionCreators, dispatch))(component);
