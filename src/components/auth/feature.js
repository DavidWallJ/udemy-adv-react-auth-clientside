/**
 * Created by david on 6/30/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div>
        Featured Component w/ 'get' for super, secret code. GET = '{this.props.message}'.
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.feat.message };
}

export default connect(mapStateToProps, actions)(Feature);