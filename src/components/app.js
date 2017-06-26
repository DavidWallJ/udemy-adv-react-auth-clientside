import React, { Component } from 'react';

import Header from './header';
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

// to show nested routes use {this.props.children}
