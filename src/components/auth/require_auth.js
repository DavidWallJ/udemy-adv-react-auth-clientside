/**
 * Created by david on 6/30/17.
 */
// this is a gatekeeper component
// my wording not official
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    // this is set your state to authenticated or not
    // authentication is set on our state.auth.authenticated property for this project
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}